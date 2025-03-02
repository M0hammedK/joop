"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();
  useEffect(() => {
    if (window.screen.width > 640) setIsOpen(true);
  }, []);
  return (
    <section className="fixed start-0 top-0 w-[10%] md:w-[30%] lg:w-[20%] h-full z-50 bg-blue-700">
      {/* Menu Button */}
      <BiMenu
        className="sm:hidden block pt-3 text-5xl text-white cursor-pointer self-start "
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Sliding Nav Menu */}
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed top-0 start-0 w-64 h-full bg-blue-700 text-white flex flex-col items-center pt-8 pb-4 z-50 
        sm:translate-x-0 sm:flex sm:w-full sm:h-full sm:relative`}
      >
        {/* Close Button (Optional) */}
        <button
          className="sm:hidden absolute top-4 right-4 text-3xl"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        <div className="flex flex-col items-center h-full w-full justify-between">
          {/* Profile Section */}
          <div className="flex flex-col items-center w-full">
            <Link href={user? "/Profile": "/"}>
            <Image
              src={user?.imagePath || "/uploads/images/defaultImage.svg"}
              alt="Profile Picture"
              width={100}
              height={100}
              className="image"
              />
              </Link>
            <h3 className="mt-3 text-lg font-semibold">
              {user?.name || "JooP"}
            </h3>
          </div>
          {/* Navigation Links */}
          <div className="w-full mb-44">
            <ul className="mt-8 space-y-4 w-full text-center">
              {[
                { label: "Home", path: "/" },
                ...(user?.role === "JOB_SEEKER"
                  ? [{ label: "Your Applications", path: "/All" }]
                  : user?.role === "EMPLOYER"
                  ? [{ label: "Add Job", path: "/Create" }, { label: "Your Applications", path: "/All" }]
                  : []),
              ].map(({ label, path }) => (
                <li
                  key={label}
                  className="p-3 hover:bg-selected transition hover:shadow-xl"
                >
                  <Link
                    href={path}
                    onClick={() => {
                      window.screen.width < 640 && setIsOpen(false);
                    }}
                  >
                    <h3>{label}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <ul className="mt-8 space-y-4 w-full text-center">
              {[
                ...(!user
                  ? [
                      { label: "Sign In", path: "/Login" },
                      { label: "Sign Up", path: "/Register" },
                    ]
                  : [
                      // If user is logged in, show Profile & Logout
                      { label: "Profile", path: "/Profile" },
                      { label: "Logout", path: "/Logout" }, // Logout doesn't need a path
                    ]),
              ].map(({ label, path }) => (
                <li
                  key={label}
                  className="p-3 hover:bg-selected transition hover:shadow-xl"
                >
                  <Link
                    href={path}
                    onClick={() => {
                      window.screen.width < 640 && setIsOpen(false);
                    }}
                  >
                    <h3>{label}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>
    </section>
  );
}
