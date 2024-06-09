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
paymentid VARCHAR(100) UNIQUE,
amount VARCHAR(50),
date VARCHAR(50) UNIQUE
)
`;

pool
  .query(createTableQuery)
  .then(() => console.log("User Table created successfully"))
  .catch((err) => console.error("Error creating table:", err));

pool
  .query(createPaymentHistoryTable)
  .then(() => console.log("Payment Table created successfully"))
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

    //bcrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    //saving user
    const query =
      "INSERT INTO userdata (name, email, password, contact) VALUES ($1, $2, $3, $4)";
    const values = [name, email, hashedPassword, contact];

    await pool.query(query, values);

    res.json({ status: 200, message: "Data received and saved successfully!" });
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

//to change password
app.put("/forgotpassword", async (req, res) => {
  try {
    const { email, confirmPassword } = req.body;

    const emailQuery = "SELECT * FROM userdata WHERE email = $1";
    const user = await pool.query(emailQuery, [email]);

    if (!user.rows[0]) {
      return res.status(404).json({ error: "User Not Found!" });
    } else {
      const hashedPassword = await bcrypt.hash(confirmPassword, 10);
      const updatePassword = "UPDATE userdata SET password=$1 WHERE email = $2";
      await pool.query(updatePassword, [hashedPassword, email]);
      res.json({ success: true, status: 200 });
    }
  } catch (error) {
    res.status(500).json({ error: "Error Creating new password!" });
  }
});

//create order api
app.post("/order/create", async (req, res) => {
  try {
    const { amount, currency, receipt, customer } = req.body;
    var options = {
      amount: amount * 100,
      currency: currency,
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);
    if (order) {
      const query =
        "INSERT INTO paymenthistory (name, email, contact, orderid, paymentid, amount, date) VALUES ($1, $2, $3, $4, $5, $6, $7)";
      const values = [
        customer.name,
        customer.email,
        customer.contact,
        order.id,
        null,
        amount,
        new Date().toISOString().split("T")[0],
      ];
      await pool.query(query, values);
      res.status(200).json({ success: true, order });
    } else {
      return res.status(500).send("Error creating order");
    }
  } catch (e) {
    res.status(500).json({ msg: "Server not found!", status: 500 });
  }
});

//validate order api
app.post("/order/validate", async (req, res) => {
  try {
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
      const query = "UPDATE paymenthistory SET paymentid=$1 WHERE orderid = $2";
      const values = [razorpay_payment_id, razorpay_order_id];
      await pool.query(query, values);
      res.redirect("http://localhost:3000/success");

      const newQuery = "DELETE FROM paymenthistory WHERE paymentid ISNULL";
      await pool.query(newQuery);
    }
  } catch (error) {
    res.redirect("http://localhost:3000/cancel");
  }
});

//get payment details api
app.post("/find/paymenthistory", async (req, res) => {
  const { email } = req.body;
  try {
    const newQuery = "DELETE FROM paymenthistory WHERE paymentid ISNULL";
    await pool.query(newQuery);

    const query = "SELECT * FROM paymenthistory WHERE email = $1";
    const value = [email];
    const data = await pool.query(query, value);
    res.send({ status: 200, data: data.rows });
  } catch (error) {}
});

app.listen(8000, () => {
  console.log("Server is running on the port 8000");
});
