"use client"; // Mark the component as a Client Component

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import ApplyButton from "@/app/components/UI/ApplyButton";
import { useUser } from "@/app/components/contexts/UserContext"; // Assuming you have a UserContext to get user data

export default function JobDetails() {
  const { id } = useParams(); // Get job ID from URL
  const { user } = useUser(); // Get the current user from context

  interface Job {
    company: string;
    title: string;
    description: string;
    requirements: string[];
    salary: number;
    category: string;
    location: string;
    employerId: number; // Add employerId to the Job type
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

  const isJobOwner = user?.id === job?.employerId; // Check if the current user is the job owner
  console.log(isJobOwner)
  // Handle delete request
  const handleDelete = async () => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this job?");
      if (!confirmation) return;

      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`, // Assuming user object has a token property
        },
      });

      alert("Job deleted successfully");
      window.location.href = "/"; // Redirect to homepage after delete
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

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
        
        {/* Conditionally render the Edit button only if the current user is the job owner */}
        {isJobOwner && (
          <>
            <button
              className="w-full bg-blue-600 text-slate-100 pl-10 pt-2 rounded-sm pb-2 pr-10 hover:text-blue-600 hover:bg-slate-100"
              onClick={() => window.location.href = `/update/${id}`}
            >
              Edit
            </button>
            <button
              className="w-full bg-red-600 text-slate-100 pl-10 pt-2 ml-3 mb-2 rounded-sm pb-2 pr-10 hover:text-red-600 hover:bg-slate-100 mt-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </section>
  );
}
