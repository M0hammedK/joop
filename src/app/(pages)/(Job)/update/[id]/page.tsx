"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/app/components/contexts/UserContext";
import { checkComplateProfile } from "@/utils/ProfileUtils";
import { useParams } from "next/navigation";
import axios from "axios";

export default function EditJobPage() {
  const { user } = useUser();
  const { id } = useParams(); // Use useParams to get the id from the URL
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: 0,
    category: "",
    employerId: user?.id, // Assuming `user?.id` is the user ID from the token
  });

  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    if (user) {
      if (!checkComplateProfile(user)) {
        window.location.href = "/Profile/Continue"; // Redirect if profile is incomplete
      }
    } else {
      window.location.href = "/"; // Redirect if not authenticated
    }
  }, [user]);

  // Fetch the job details if id is available
  useEffect(() => {
    if (!id) return;

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
  }, [id]);

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
    setLoading(true); // Set loading to true on submit

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
        window.location.href = "/job"; // Redirect after successful update
      }
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setLoading(false); // Reset loading when done
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Title fixed at the very top */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Job</h2>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title Input First */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={jobData.title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Other Inputs */}
          {[
            { label: "Company", name: "company", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Salary", name: "salary", type: "number" },
            { label: "Category", name: "category", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={jobData[name as keyof typeof jobData]}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          ))}

          {/* Job Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleTextAreaChange}
              className="border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-lg font-medium py-3 rounded-lg transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Submitting..." : "Update Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
