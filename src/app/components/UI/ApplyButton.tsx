"use client";

import Link from "next/link";
import { useUser } from "../contexts/UserContext";

export default function ApplyButton() {
  const { user } = useUser();
  return (
    <Link
      href={"#"}
      className={`${
        user?.role === "JOB SEEKER" ? "block" : "hidden"
      } w-full bg-blue-600 text-slate-100 hover:text-blue-600 hover:bg-slate-100`}
    >
      Apply Now!
    </Link>
  );
}
