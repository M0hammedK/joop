import LoginSchema from "@/models/loginSchema";
import RegisterSchema from "@/models/registerSchema";
import axios from "axios";

export const Login = async (user: any) => {
  let response: any;
  await axios
    .post("/api/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      if (res.data === "Invalid User") return (response = res.data);
      response = res.data["data"];
      localStorage.setItem("Token", res.data["token"]);
    })
    .catch((error: any) => {
      response = error.message;
    });
  return response;
};

export const Register = async (user: object) => {
  let response: any;
  await axios
    .post("/api/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((error) => {
      response = error;
    });
  return response;
};

export const checkFirstTime = async (token: any) => {
  let response: any;
  await axios
    .get("/api/getProfile", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((error) => {
      response = error;
    });
  return response;
};
