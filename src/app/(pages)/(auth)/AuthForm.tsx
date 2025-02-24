"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  type: string;
  onSubmit: (data: any) => void;
}

export default function AuthForm({ type, onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (type === "register" && password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      alert("Passwords must be at least 8 characters!");
      return;
    }
    onSubmit({ email, password, username, image });
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full">
      {type === "register" && (
        <div className="mb-4">
          <label htmlFor="profileImage" className="cursor-pointer">
            <Image
              src="/file.svg"
              alt="Profile Picture"
              width={120}
              height={120}
              className="image"
            />
          </label>
          <input id="profileImage" type="file" className="hidden" />
        </div>
      )}
      {type === "register" && (
        <div className="mb-4">
          <label className="block text-gray-700 w-24">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 w-24">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 w-24">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {type === "register" && (
        <div className="mb-4">
          <label className="block text-gray-700 w-24">Repeat Password</label>
          <input
            type="password"
            placeholder="Enter Password again"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {type === "register" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
}
