"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ApplyButton from "./ApplyButton";
import { useUser } from "@/app/components/contexts/UserContext"; // Assuming you have a UserContext to get user data

export default function JobList() {
  const { user } = useUser(); // Get the current user from context
  const [jobs, setJobs] = useState<
    Array<{
      company: string;
      location: string;
      title: string;
      description: string;
      salary: number;
      id: number;
      employerId: string; // assuming you have employerId to identify the job owner
    }>
  >([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Determine the API endpoint based on the user role
        const url =
          user?.role === "EMPLOYER"
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job/employer`
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job`;

        const headers: any = {};

        // If the user is an employer, include the Bearer token
        if (user?.role === "EMPLOYER") {
          const token = localStorage.getItem("Token");
          if (token) {
            headers.Authorization = `Bearer ${token}`; // Attach the token to the request
          }
        }

        const response = await axios.get(url, { headers });
        setJobs(response.data);
      } catch (error) {}
    };

    fetchJobs();
  }, [user?.role, user?.id]);
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="relative flex flex-col bg-white shadow-md hover:shadow-xl transition-all border border-gray-200 rounded-lg p-6"
        >
          {/* Location Badge (Positioned Top Left) */}
          <span className="absolute top-0.5 right-1 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {job.location}
          </span>

          <h3 className="font-semibold text-lg mt-2">{job.company}</h3>

          <h1 className="mt-2 text-xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {job.description}
          </p>

          <p className="text-blue-600 font-semibold mt-3">
            ${job.salary.toLocaleString()} per year
          </p>

          <div className="mt-4 flex justify-between items-center gap-2">
            <Link
              href={`/JobDetails/${job.id}`}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Read More
            </Link>
            <ApplyButton jobId={job.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
