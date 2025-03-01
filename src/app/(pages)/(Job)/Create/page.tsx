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
    employerId: user?.id,
  });

  const [loading, setLoading] = useState(false); // State for loading

  if (user) {
    if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  } else redirect("/");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: name === "salary" ? parseFloat(value) : value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submit

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job/create`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Job created successfully!");
      }
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {

      setLoading(false); // Reset loading when done
      redirect("/")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Title fixed at the very top */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create a Job</h2>

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
            {loading ? "Submitting..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
