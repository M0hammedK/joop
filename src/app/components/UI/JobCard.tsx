"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ApplyButton from "./ApplyButton";

export default function JobList() {
  const [jobs, setJobs] = useState<
    Array<{
      company: string;
      location: string;
      title: string;
      description: string;
      salary: number;
      id: number;
    }>
  >([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job`
        );
        console.log("fetched");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
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

          <div className="mt-4 flex justify-between items-center">
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
