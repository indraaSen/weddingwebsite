import { setUserData } from "../MainStore/Slice/LoginReducer/LoginReducer";

export const appId = "YOUR_RAZORPAY_KEY_ID";
export const secret = "YOUR_RAZORPAY_SECRET_KEY";

//to add new users
export const signupUser = async (
  name,
  email,
  password,
  confirmPassword,
  contact,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setContact,
  setOpen,
  setMessage
) => {
  const body = { name, email, password, confirmPassword, contact };

  if (!(name && email && password && confirmPassword && contact)) {
    alert("Field should not be Empty!");
  }

  if (!(password === confirmPassword)) {
    alert("Password is not matching!");
  }
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  if (response.status === 200) {
    setMessage("Account Created!");
    setOpen(true);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setContact("");
  }

  if (response.status === 400) {
    setMessage("Email Already Exists! Please try different Email.");
    setOpen(true);
  }
};

//to login user
export const loginUser = async (
  email,
  password,
  navigate,
  dispatch,
  setUserData
) => {
  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.status === 200) {
      localStorage.setItem("token", data.token);
      dispatch(setUserData({ userdata: data.data }));
      navigate("/home");
    } else {
      alert("Invalid credentials!");
    }
  } catch (error) {
    alert("Internal server error");
  }
};

//to retrive logged in user
export const retriveUser = (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");

    if (token) {
      const tokenPayload = token.split(".")[1];
      const decodedPayload = decodeURIComponent(
        atob(tokenPayload)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const payloadData = JSON.parse(decodedPayload);
      dispatch(setUserData({ userdata: payloadData }));
      return payloadData;
    }
  } catch (error) {
    console.log(error);
  }
};

//to get person's purchase history
export const getPaymentHistory = async (email, setPaymentData) => {
  try {
    const response = await fetch("http://localhost:8000/find/paymenthistory", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const alldata = await response.json();
    setPaymentData(alldata.data);
  } catch (error) {
    console.log(error);
  }
};
