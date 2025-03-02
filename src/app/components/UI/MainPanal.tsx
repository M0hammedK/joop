"use client";

import Link from "next/link";
import { useUser } from "../contexts/UserContext";

export default function MainPanal() {
  const { user } = useUser();
  return (
    <div className="flex-col sm:flex-row mt-6 p-6 bg-gradient-to-br from-blue-500 to-blue-300 w-full rounded-3xl text-white justify-between item">
      {!user ? (
        <div className="flex flex-col md:flex-row justify-between w-full">
          <h1 className="text-3xl font-bold text-start">Welcome to JooP</h1>{" "}
          <h3>Your Platform for Finding Jobs</h3>
          <div className="mt-6 md:mt-0 flex gap-3 justify-center items-center">
            <Link
              href="/Login"
              className="text-blue-500 bg-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:text-white transition"
            >
              Sign in
            </Link>
            <Link
              href="/Register"
              className="text-blue-500 bg-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:text-white transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      ) : (
        <h1 className=" w-full text-center">Welcome {user.name}</h1>
      )}
    </div>
  );
}
