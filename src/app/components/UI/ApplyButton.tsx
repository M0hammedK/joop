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
      } px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition`}
    >
      Apply Now!
    </Link>
  );
}
