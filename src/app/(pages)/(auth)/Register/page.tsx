"use client";

import { useState } from "react";
import AuthForm from "../AuthForm";
import { useRouter } from "next/navigation";
import RegisterSchema from "@/models/registerSchema";
import { Register } from "@/app/services/AuthServices";
import { checkRegiterCredentials } from "@/utils/AuthUtils";
import { tryUploadImage } from "@/app/services/ImageSrevices";

export default function RegisterPage() {
  const [error, setError] = useState<string[] | null | string>(null);
  const router = useRouter();

  const handleRegister = (
    e: React.FormEvent<HTMLFormElement>,
    data: any,
    image: Blob | null
  ) => {
    e.preventDefault();
    setError(null);
    const registerValidate = checkRegiterCredentials(data);
    if (!registerValidate) {
      tryUploadImage(image, data["email"]).then((res) => {
        if (res.includes("/Images/")) {
          Register({ ...data, imagePath: res })
          .then((res) => {
              if (res) {
                return router.push("/Login");
              }
            })
            .catch((err) => {
              setError(err);
            });
        } else setError(res);
      });
    }
    setError(registerValidate)
  };

  return (
    <div className="h-full items-end">
      <div className="p-6 flex flex-col items-center bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <AuthForm type="register" onSubmit={handleRegister} />
        {error && <h3 className="text-red-600">{error}</h3>}
      </div>
    </div>
  );
}
