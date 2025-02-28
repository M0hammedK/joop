"use client";

import { FormEvent, useEffect, useState } from "react";
import { useUser } from "../../../components/contexts/UserContext";
import { useRouter } from "next/router";
import JobSekeerSchema from "@/models/jobSekeerSchema";
import UserSchema from "@/models/userSchema";
import { UploadImage } from "@/server/File";
import { uploadImage } from "@/app/services/FileSrevices";
import EmployerSchema from "@/models/employerSchema";

export default function ContinueProfile() {
  const { user, setUser } = useUser(); // Assuming user is stored in context
  const [error, setError] = useState<string | string[] | null>(null); // Assuming user is stored in context
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    resume: null,
    skills: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const { resume, skills, ...rest } = formData;
    if (user?.role === "JOB_SEEKER") {
      if (!resume) return setError("you have to upload resume");
      uploadImage(resume, user.email, "resume").then((res) => {
        const jobSeeker = { ...user, resume: res, skills };
        console.log(jobSeeker)
        const jobSeekerValidate = JobSekeerSchema.validate(jobSeeker);
        if (!jobSeekerValidate) setUser(new JobSekeerSchema(jobSeeker));
        else setError(jobSeekerValidate);
      });
    } else {
      if (user?.role === "EMPLOYER") {
        const employer = { ...user, rest };
        const employerValidate = EmployerSchema.validate(employer);
        if (!employerValidate) setUser(new EmployerSchema(employer));
        else setError(employerValidate);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-4xl mb-4">Final Step {user?.name}</h1>
      <h3 className="mb-4">you have to Complete Your Profile first</h3>
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
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.svg"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
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
      {error && <h3 className="text-red-600">{error}</h3>}
    </div>
  );
}
