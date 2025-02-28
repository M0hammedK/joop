"use client";

import LoginSchema from "@/models/loginSchema";
import AuthForm from "../AuthForm";
import { Login } from "../../../services/AuthServices";
import { useState } from "react";
import EmployerSchema from "@/models/employerSchema";
import JobSekeerSchema from "@/models/jobSekeerSchema";
import { useUser } from "@/app/components/contexts/UserContext";
import { useRouter } from "next/navigation";
import RegisterSchema from "@/models/registerSchema";
import UserSchema from "@/models/userSchema";

export default function LoginPage() {
  const [error, setError] = useState<string | string[] | null>(null);
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = (e: any, data: any): any => {
    e.preventDefault();
    setError(null);
    const { email, password } = data;
    const newData = { email, password };
    const loginValidate = LoginSchema.validate(newData);
    if (loginValidate) setError(loginValidate);
    else {
      Login(newData).then((res) => {
        if (res["role"])
          switch (res["role"]) {
            case "JOB_SEEKER":
              if (!JobSekeerSchema.validate(res)) {
                setUser(new JobSekeerSchema(res));
                return router.push("/");
              }
              setUser(new UserSchema(res));
              return router.push("/Profile/Continue");

            case "EMPLOYER":
              if (!EmployerSchema.validate(res)) {
                setUser(new EmployerSchema(res));
                return router.push("/");
              }
              setUser(new UserSchema(res));
              return router.push("/Profile/Continue");
            default:
              setError(res);
              break;
          }
      });
    }
  };

  return (
    <div className="h-full items-end">
      <div className="p-6 flex flex-col items-center bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <AuthForm type="login" onSubmit={handleLogin} />
        {error && <h3 className="text-red-600">{`${error}`}</h3>}
      </div>
    </div>
  );
}
