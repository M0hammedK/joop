"use client";

import Link from "next/link";
import { useUser } from "../contexts/UserContext";

interface Props {
  jobId: number;
}

export default function ApplyButton({ jobId }: Props) {
  const { user } = useUser();
  return (
    <Link
      href={`/Applying/${jobId}`}
      className={`${
        user?.role === "JOB_SEEKER" ? "block" : "hidden"
      } w-full bg-blue-600 text-slate-100 hover:text-blue-600 hover:bg-slate-100`}
    >
      Apply Now!
    </Link>
  );
}
