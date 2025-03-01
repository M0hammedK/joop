"use client";

import { useUser } from "@/app/components/contexts/UserContext";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import { checkComplateProfile } from "@/utils/ProfileUtils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const [username, setUsername] = useState("User Name");
  const [description, setDescription] = useState("User description here...");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const { user, setUser } = useUser();
  if (user) {
    if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  } else redirect("/");
  return (
    <section className="p-6 mt-12 flex flex-col items-center bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <label htmlFor="profileImage" className="cursor-pointer">
        <Image
          src="/uploads/images/defaultImage.svg"
          alt="Profile Picture"
          width={120}
          height={120}
          className="image"
        />
      </label>
      <input id="profileImage" type="file" className="hidden" />

      <div className="w-full mt-4">
        {isEditingUsername ? (
          <div className="w-full flex items-center justify-between gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-xl font-semibold bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-full"
            />
            <button
              onClick={() => setIsEditingUsername(false)}
              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">{username}</h2>
            <button
              onClick={() => setIsEditingUsername(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="w-full mt-4">
        {isEditingDescription ? (
          <div className="w-full flex items-center justify-between gap-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-gray-600 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 w-full"
            />
            <button
              onClick={() => setIsEditingDescription(false)}
              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between gap-2">
            <p className="text-gray-600">{description}</p>
            <button
              onClick={() => setIsEditingDescription(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
