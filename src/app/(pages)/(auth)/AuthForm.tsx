"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
interface Props {
  type: string;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    { email, password, repeatPassword, name, role }: any,
    image: Blob | null
  ) => void;
}

export default function AuthForm({ type, onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Job Seeker");
  const [name, setName] = useState("");
  const [image, setImage] = useState<Blob | null>(null);
  const [preview, setPreviw] = useState<string>(
    "/uploads/images/defaultImage.svg"
  );
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const defualtImageUrl = URL.createObjectURL(image as Blob);
      setPreviw(defualtImageUrl);
    };
    if (image !== null) getImage();
  }, [image]);
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
        onSubmit(
          e,
          {
            email,
            password,
            repeatPassword,
            name,
            role: role.toUpperCase().replace(" ", "_"),
          },
          image
        )
      }
      className=" w-full"
    >
      {type === "register" && (
        <div className="mb-4">
          <label htmlFor="profileImage" className="cursor-pointer">
            <Image
              src={preview}
              alt="Profile Picture"
              width={120}
              height={120}
              className="image"
            />
          </label>
          <input
            id="profileImage"
            type="file"
            accept=".png,.jpg,.jpeg,.svg"
            className="hidden"
            onChange={(e: any) => setImage(e.target.files?.[0])}
          />
        </div>
      )}
      {type === "register" && (
        <div className="mb-4">
          <label className="block text-gray-700 w-24">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 w-24">Email</label>
        <input
        name="email"
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
        name="password"
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
      {type === "register" && (
        <div className="mb-4">
          <label className="block text-gray-700 w-24">Role</label>
          <select
            className="w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Job Seeker</option>
            <option>Employer</option>
          </select>
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
