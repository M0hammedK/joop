"use client"; // Mark the component as a Client Component

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import ApplyButton from "@/app/components/UI/ApplyButton";

export default function JobDetails() {
  const { id } = useParams(); // Get job ID from URL

  interface Job {
    company: string;
    title: string;
    description: string;
    requirements: string[];
    salary: number;
    category: string;
    location: string;
  }

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job/${id}`)
        .then((response) => setJob(response.data))
        .catch((error) =>
          console.error("Error fetching job details:", error)
        );
    }
  }, [id]);

  if (!job) {
    return (
      <p className="text-center text-gray-500">Loading job details...</p>
    );
  }

  return (
    <section className="contain-content mt-12 p-6 w-full flex flex-col max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 gap-6">
      <div>
        <Link href="/">
          <MdKeyboardBackspace className="m-4 w-16 fixed top-0 start-0 text-white bg-blue-500 text-4xl rounded-xl hover:bg-blue-600 transition" />
        </Link>
      </div>
      <div className="flex-col items-center text-center row-span-1 col-span-2">
        <h1 className="text-3xl font-bold mt-4">{job.title}</h1>
        <h3 className="text-lg text-gray-600">{job.company}</h3>
      </div>

      <div className="w-full justify-normal">
        <h2 className="text-xl font-semibold w-48">Category</h2>
        <p className="text-gray-700 mt-2">{job.category}</p>
      </div>

      <div className="w-full justify-normal">
        <h2 className="text-xl font-semibold w-48">Location</h2>
        <p className="text-gray-700 mt-2">{job.location}</p>
      </div>

      <div className="w-full justify-normal">
        <h2 className="text-xl font-semibold w-48">Job Description</h2>
        <p className="text-gray-700 mt-2">{job.description}</p>
      </div>

      <div className="w-full justify-normal">
        <h2 className="text-xl font-semibold w-40">Salary & Benefits</h2>
        <p className="text-gray-700 mt-2 ml-8">
          ${job.salary.toLocaleString()} Yearly
        </p>
      </div>

      <div className="mt-4">
      <ApplyButton />
      </div>
    </section>
  );
}
