"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/app/components/contexts/UserContext";
import { checkComplateProfile } from "@/utils/ProfileUtils";
import { useParams } from "next/navigation"; // Import useParams
import axios from "axios";

export default function EditJobPage() {
  const { user } = useUser();
  const { id } = useParams();  // Use useParams to get the id from the URL
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: 0,
    category: "",
    employerId: user?.id, // Assuming `user?.id` is the user ID from the token
  });

  // Redirect if user is not authenticated or has an incomplete profile
  useEffect(() => {
    if (user) {
      if (!checkComplateProfile(user)) {
        window.location.href = "/Profile/Continue";  // Replace redirect() with window.location.href for client-side redirect
      }
    } else {
      window.location.href = "/";  // Redirect to home page if not authenticated
    }
  }, [user]);

  // Fetch the job details if id is available
  useEffect(() => {
    if (!id) return;  // Don't fetch if id is not available yet

    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.status === 200) {
          setJobData(response.data); // Populate form with job data
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);  // Depend on id to re-run when it changes

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: name === "salary" ? parseFloat(value) : value, // Convert salary to number
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  // Handle form submission (for editing)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(jobData);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job/${id}`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Job updated successfully!");
        window.location.href = "/job"; // Redirect to job listing after successful update
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
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
          Update Job
        </button>
      </form>
    </div>
  );
}
