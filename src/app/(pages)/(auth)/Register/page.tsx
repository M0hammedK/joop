"use client";

import AuthForm from "../AuthForm";

export default function Register() {
  const handleRegister = (dsta: any) => {};

  return (
    <div className="h-full items-end">
      <div className="p-6 flex flex-col items-center bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
    </div>
  );
}
