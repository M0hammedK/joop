"use client";

import { useEffect, useState } from "react";
import { useUser } from "../../../components/contexts/UserContext";
import JobSekeerSchema from "@/models/jobSekeerSchema";
import { uploadImage } from "@/app/services/FileSrevices";
import EmployerSchema from "@/models/employerSchema";
import { useRouter } from "next/navigation";
import { sendProfile } from "@/app/services/ProfileServices";
import { setTypeUser } from "@/utils/UserUtils";

export default function ContinueProfile() {
  const { user, setUser } = useUser(); // Assuming user is stored in context
  const [error, setError] = useState<string | string[] | null>(null); // Assuming user is stored in context
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    resume: null,
    skills: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ensure default form submission is prevented
    setError(null);

    if (user?.role === "JOB_SEEKER") {
      if (!formData.resume) {
        setError("You have to upload a resume");
        return;
      }

      try {
        await uploadImage(formData.resume, user.email, "resume").then((res) => {
          const jobSeeker = {
            ...user,
            resume: res,
            skills: formData.skills,
          };
          if (JobSekeerSchema.validate(jobSeeker) === null)
            sendProfile({
              user: jobSeeker,
              Token: localStorage.getItem("Token"),
            })
              .then((profile) => {
                localStorage.setItem("user", JSON.stringify(jobSeeker));

                setUser(new JobSekeerSchema(jobSeeker));
                router.push("/");
              })
              .catch((err) => setError(err));
        }); // Await file upload
      } catch (err) {
        console.log(err);
        setError("failed to upload resume");
      }
    } else if (user?.role === "EMPLOYER") {
      const employer = { ...user, ...formData };
      const employerValidate = EmployerSchema.validate(employer);

      if (employerValidate === null) {
        sendProfile({
          user: employer,
          Token: localStorage.getItem("Token"),
        })
          .then((profile) => {
            localStorage.setItem("user", JSON.stringify(employer));
            setUser(new EmployerSchema(employer));
            router.push("/");
          })
          .catch((err) => setError(err));
      } else {
        setError(employerValidate);
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
              accept=".pdf,.png,.jpg,.jpeg"
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
      {error && (
        <h3 className="text-red-600">
          {Array.isArray(error) ? error.join(", ") : String(error)}
        </h3>
      )}
    </div>
  );
}
