import { useState } from "react";
import { useUser } from "../../../components/contexts/UserContext";
import { useRouter } from "next/router";
import JobSekeerSchema from "@/models/jobSekeerSchema";

export default function ContinueProfile() {
  const { user, setUser } = useUser(); // Assuming user is stored in context
  const router = useRouter();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Update user data (backend call can be added here)
    const newUser = { ...user, ...formData };
    const profileValidate = JobSekeerSchema.validate(newUser);
    setUser(new JobSekeerSchema(newUser));
    router.push("/"); // Redirect after completion
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {user!.role === "EMPLOYER" ? (
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
              accept=".pdf,.doc,.docx"
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
    </div>
  );
}
