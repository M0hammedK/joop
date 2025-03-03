"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "../../../components/contexts/UserContext";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import { useRouter } from "next/navigation";
import { sendProfile } from "@/app/services/ProfileServices";
import EmployerSchema from "@/models/employerSchema";

export default function ContinueProfile() {
  const { user, setUser } = useUser();
  const [error, setError] = useState<string | string[] | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    resume: "",
    skills: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (user?.role === "JOB_SEEKER") {
        if (!formData.resume.trim()) {
          setError("You have to write a description");
          return;
        }

        const jobSeeker = { ...user, resume: formData.resume, skills: formData.skills };

        const validationError = JobSeekerSchema.validate(jobSeeker);
        if (validationError) {
          setError(validationError);
          return;
        }

        await sendProfile({ user: jobSeeker, Token: localStorage.getItem("Token") });

        localStorage.setItem("user", JSON.stringify(jobSeeker));
        setUser(new JobSeekerSchema(jobSeeker));
        router.push("/");
      } else if (user?.role === "EMPLOYER") {
        const employer = { ...user, ...formData };
        const employerValidate = EmployerSchema.validate(employer);

        if (employerValidate) {
          setError(employerValidate);
          return;
        }

        await sendProfile({ user: employer, Token: localStorage.getItem("Token") });

        localStorage.setItem("user", JSON.stringify(employer));
        setUser(new EmployerSchema(employer));
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-4xl mb-4">Final Step {user?.name}</h1>
      <h3 className="mb-4">You have to complete your profile first</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {user?.role === "EMPLOYER" ? (
          <>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Company Website"
              className="w-full p-2 border rounded-md"
              required
            />
          </>
        ) : (
          <>
            <label htmlFor="resume" className="font-semibold">Description</label>
            <textarea
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              placeholder="Write about yourself..."
              className="w-full p-2 border rounded-md h-24 resize-none"
              required
            />
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Skills (comma-separated)"
              className="w-full p-2 border rounded-md"
              required
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Continue
        </button>
      </form>
      {error && (
        <h3 className="text-red-600">
          {Array.isArray(error) ? error.join(", ") : String(error)}
        </h3>
      )}
    </div>
  );
}
