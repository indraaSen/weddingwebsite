const express = require("express");
const cors = require("cors");
const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "admin",
  port: "5432",
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS userdata (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  contact VARCHAR(50) NOT NULL,
  usertype VARCHAR(50) NOT NULL  DEFAULT 'user'
)`;

const createPaymentHistoryTable = `
CREATE TABLE IF NOT EXISTS paymenthistory(
id SERIAL PRIMARY KEY,
name VARCHAR(200) NOT NULL,
email VARCHAR(100) NOT NULL,
contact VARCHAR(50) NOT NULL,
orderid VARCHAR(100) NOT NULL UNIQUE,
paymentid  VARCHAR(100) NOT NULL UNIQUE
)
`;
pool
  .query(createTableQuery)
  .then(() => console.log("Table created successfully"))
  .catch((err) => console.error("Error creating table:", err));

pool
  .query(createPaymentHistoryTable)
  .then(() => console.log("Table created successfully"))
  .catch((err) => console.error("Error creating table:", err));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// new resgistration api
app.post("/signup", async (req, res) => {
  try {
    //getting data
    const { name, email, password, contact } = req.body;

    // validation
    if (!(name && email && password && contact)) {
      res.status(400).json({ error: "Fields should not be Empty!" });
    }

    //if user already exist by their email
    const checkEmailQuery = `SELECT * FROM userdata WHERE email = $1`;
    const emailCheckResult = await pool.query(checkEmailQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    // bcrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // saving user
    const query =
      "INSERT INTO userdata (name, email, password, contact) VALUES ($1, $2, $3, $4)";
    const values = [name, email, hashedPassword, contact];

    await pool.query(query, values);

    res.json({ message: "Data received and saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error processing data" });
  }
});

//user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailQuery = "SELECT * FROM userdata WHERE email = $1";
    const user = await pool.query(emailQuery, [email]);

    if (!user.rows[0]) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    const isPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!isPassword) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: user.rows[0].email,
        user: user.rows[0].usertype,
        name: user.rows[0].name,
        contact: user.rows[0].contact,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.rows[0].password = undefined;

    res.json({ success: true, token: token, status: 200, data: user.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

//it is the middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid" });
    }
    req.user = decoded;
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

//create order api
app.post("/order/create", async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    var options = {
      amount: amount * 100,
      currency: currency,
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    } else {
      res.status(200).json({ success: true, order });
    }
  } catch (e) {
    res.status(500).json({ msg: "Server not found!", status: 500 });
  }
});

//validate order api
app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_signature || !razorpay_order_id) {
    return res.status(500).json({ msg: "Server Error!" });
  }

  const isAuthenticate = crypto.createHmac(
    "sha256",
    process.env.RAZORPAY_SECRET_KEY
  );
  isAuthenticate.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const newSignature = isAuthenticate.digest("hex");

  if (newSignature !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  } else {
    saveOrderDetails(razorpay_order_id, razorpay_payment_id);
    res.redirect("http://localhost:3000/success");
  }
});

//save order (working on)
const saveOrderDetails = async (razorpay_order_id, razorpay_payment_id) => {
  const query =
    "INSERT INTO paymenthistory (name, email, contact, orderid, paymentid) VALUES ($1, $2, $3, $4, $5)";
  const values = [
    "naam",
    "naam@gmail.com",
    "0000000000",
    razorpay_order_id,
    razorpay_payment_id,
  ];
  await pool.query(query, values);
};

app.listen(8000, () => {
  console.log("Server is running on the port 8000");
});
