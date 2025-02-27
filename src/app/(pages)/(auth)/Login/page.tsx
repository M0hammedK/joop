"use client";

import LoginSchema from "@/models/loginSchema";
import AuthForm from "../AuthForm";
import { Login } from "../../../services/AuthServices";
import { useState } from "react";
import EmployerSchema from "@/models/employerSchema";
import JobSekeerSchema from "@/models/jobSekeerSchema";
import { useUser } from "@/app/components/globalStates/UserContext";
import { useRouter } from "next/navigation";

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
        console.log(res)
        const jobSekeerValidate = JobSekeerSchema.validate(res);
        if (!jobSekeerValidate) {
          setUser(new JobSekeerSchema(res));
          return router.push("/");
        }
        const employerValidate = EmployerSchema.validate(res);
        if (!employerValidate) {
          setUser(new EmployerSchema(res));
          return router.push("/");
        } else setError(res);
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
