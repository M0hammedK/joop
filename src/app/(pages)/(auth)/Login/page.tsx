"use client";

import LoginSchema from "@/models/loginSchema";
import AuthForm from "../AuthForm";
import { checkFirstTime, Login } from "../../../services/AuthServices";
import { useState } from "react";
import { useUser } from "@/app/components/contexts/UserContext";
import { useRouter } from "next/navigation";
import { setTypeUser } from "@/utils/UserUtils";

export default function LoginPage() {
  const [error, setError] = useState<string | string[] | null>(null);
  const { setUser } = useUser();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: any, data: any): Promise<any> => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state to true

    e.preventDefault();
    setError(null);
    const { email, password } = data;
    const newData = { email, password };
    const loginValidate = LoginSchema.validate(newData);
    if (loginValidate) setError(loginValidate);
    else {
      await Login(newData).then((user) => {
        setIsSubmitting(false); // Reset loading state after login

        if (user["role"]) {
          checkFirstTime(localStorage.getItem("Token"))
            .then((profile) => {
              if (profile !== "notfound") {
                setUser(setTypeUser(user, profile));
                router.push("/");
              } else {
                setUser(user);
                router.push("/Profile/Continue");
              }
            })
            .catch((err) => {
              setError(err);
            });
        } else setError(user);
      });
    }
  };

  return (
    <div className="h-full items-end">
      <div className="p-6 flex flex-col items-center bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          isSubmitting={isSubmitting}
        />

        {error && <h3 className="text-red-600">{`${error}`}</h3>}
      </div>
    </div>
  );
}
