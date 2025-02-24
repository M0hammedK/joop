"use client";

import AuthForm from "../AuthForm";

export default function Login() {
  const handleLogin = (data: any) => {
    console.log("Logging in with", data);
    // Add login logic here
  };

  return (
    <div className="h-full items-end">
      <div className="p-6 flex flex-col items-center bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
}
