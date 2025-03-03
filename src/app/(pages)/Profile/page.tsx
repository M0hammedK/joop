"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useUser } from "@/app/components/contexts/UserContext";
import EmployerSchema from "@/models/employerSchema";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import { updateProfile } from "@/app/services/ProfileServices";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [profile, setProfile] = useState({
    companyName: (user as EmployerSchema)?.companyName || "",
    companyWebsite: (user as EmployerSchema)?.companyWebsite || "",
    resume: (user as JobSeekerSchema)?.resume || "", // Now represents the Description field
    skills: (user as JobSeekerSchema)?.skills || "",
  });

  useEffect(() => {
    setProfile({
      companyName: (user as EmployerSchema)?.companyName || "",
      companyWebsite: (user as EmployerSchema)?.companyWebsite || "",
      resume: (user as JobSeekerSchema)?.resume || "",
      skills: (user as JobSeekerSchema)?.skills || "",
    });
  }, [user]);

  const [error, setError] = useState<string | string[] | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [initialProfile, setInitialProfile] = useState(profile);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setInitialProfile(profile);
    setEditField(null);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setEditField(null);
  };

  const onUpdateProfile = async () => {
    const token = localStorage.getItem("Token");

    if (user?.role === "JOB_SEEKER") {
      updateProfile({
        data: {
          ...user,
          skills: profile.skills,
          resume: profile.resume,
        },
        Token: token,
      })
        .then((response) => {
          // Update the user context to reflect new changes
          setUser({ ...user, skills: profile.skills, resume: profile.resume });
          alert("Profile updated successfully");
          router.push("/");
        })
        .catch((err) => {
          console.error("Error updating profile for JOB_SEEKER:", err);
          setError(err);
        });
    } else {
      const newUser: EmployerSchema = new EmployerSchema({
        ...user,
        companyName: profile.companyName,
        companyWebsite: profile.companyWebsite,
      });
      setUser(newUser);
      updateProfile({
        data: newUser,
        Token: token,
      })
        .then((response) => {
          alert("Profile updated successfully");
          router.push("/");
        })
        .catch((err) => {
          console.error("Error updating employer profile:", err);
          setError(err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex-col w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Edit Profile
        </h2>

        {user?.role === "JOB_SEEKER" && (
          <div className="flex-col space-y-6 w-full">
            {/* Description Section */}
            <div className="flex-col w-full mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Description
              </label>
              <div className="mt-3 w-full">
                {editField === "resume" ? (
                  <textarea
                    name="resume"
                    value={profile.resume}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  />
                ) : (
                  <p className="border p-3 rounded-lg bg-gray-50 w-full">
                    {profile.resume || "Not set"}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                {editField === "resume" ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditField("resume")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="flex-col w-full mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Skills
              </label>
              <div className="mt-3 w-full">
                {editField === "skills" ? (
                  <textarea
                    name="skills"
                    value={profile.skills}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  />
                ) : (
                  <p className="border p-3 rounded-lg bg-gray-50 w-full">
                    {profile.skills || "Not set"}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                {editField === "skills" ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditField("skills")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onUpdateProfile}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-6"
        >
          Save Profile
        </button>

        {error && (
          <h3 className="text-red-600">
            {Array.isArray(error) ? error.join(", ") : String(error)}
          </h3>
        )}
      </div>
    </div>
  );
}
