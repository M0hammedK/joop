import any from "@/models/loginSchema";
import UserSchema from "@/models/userSchema";
import axios from "axios";

export const Login = async (user: any): Promise<any | string> => {
  let response: any | string;
  await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      response = res.data;
    })
    .catch((err: any) => {
      response = "Invalid User";
    });
  return response!;
};

export const Register = async (user: UserSchema): Promise<any | string> => {
  let response: any | string;
  await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      response = res.data;
    })
    .catch((err: any) => {
      response = err.message as string;
    });
  return response!;
};
