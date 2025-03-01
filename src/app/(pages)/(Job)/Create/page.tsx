"use client";

import { useState } from "react";
import { useUser } from "@/app/components/contexts/UserContext";
import { checkComplateProfile } from "@/utils/ProfileUtils";
import { redirect } from "next/navigation";
import axios from "axios";

export default function Page() {
  const { user } = useUser();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: 0,
    category: "",
    employerId: user?.id, // Assuming `user?.id` is the user ID from the token
  });

  if (user) {
    if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  } else redirect("/");

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/job", jobData);
      if (response.status === 200) {
        // Redirect to the job listing page or show a success message
        // redirect("/job");
        console.log("Job created successfully!");
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Job Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={jobData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleTextAreaChange}
            className="mt-1 block w-full border rounded p-2"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            value={jobData.company}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={jobData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium">Salary</label>
          <input
            id="salary"
            name="salary"
            type="number"
            value={jobData.salary}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={jobData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
