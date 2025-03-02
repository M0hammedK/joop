"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaSave, FaUpload, FaDownload, FaTimes } from "react-icons/fa";
import { useUser } from "@/app/components/contexts/UserContext";
import EmployerSchema from "@/models/employerSchema";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import { uploadImage } from "@/app/services/FileSrevices";
import { updateProfile } from "@/app/services/ProfileServices";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [profile, setProfile] = useState({
    companyName: (user as EmployerSchema)?.companyName || "",
    companyWebsite: (user as EmployerSchema)?.companyWebsite || "",
    previewResume: (user as JobSeekerSchema)?.resume || "",
    skills: (user as JobSeekerSchema)?.skills || "",
    resume: null as File | null,
  });

  useEffect(() => {
    setProfile({
      companyName: (user as EmployerSchema)?.companyName || "",
      companyWebsite: (user as EmployerSchema)?.companyWebsite || "",
      previewResume: (user as JobSeekerSchema)?.resume || "",
      skills: (user as JobSeekerSchema)?.skills!,
      resume: null as File | null,
    });
  }, [user]);

  const [error, setError] = useState<string | string[] | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeType, setResumeType] = useState<string | null>(null);
  const [resumePreview, setResumePreview] = useState("");
  const [initialProfile, setInitialProfile] = useState(profile); // Store the initial profile to restore on cancel
  const router = useRouter();

  // Handle field editing
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle resume upload & previewResume
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeType(file.type);
      setResumePreview(URL.createObjectURL(file));
    }
  };

  // Handle save action
  const handleSave = () => {
    setProfile((prevState) => ({
      ...prevState,
      resume: resumeFile,
    }));
    setInitialProfile(profile);
    setEditField(null);
  };

  // Handle cancel action
  const handleCancel = () => {
    setProfile(initialProfile); // Restore original profile
    setEditField(null); // Exit editing mode
    setResumeFile(null);
  };

  const onUpdateProfile = async () => {
    if (user?.role === "JOB_SEEKER") {
      let resume;
      if (resumeFile) {
        await uploadImage(profile.resume, user.email, "resume").then((res) => {
          resume = res;
          setUser({ ...user, skills: profile.skills, resume: resume });
        });
      }
      updateProfile({
        data: {
          ...user,
          skills: profile.skills,
          resume: resume || (user as JobSeekerSchema).resume,
        },
        Token: localStorage.getItem("Token"),
      })
        .then(() => {
          alert("profile updated successfuly");
          router.push("/");
        })
        .catch((err) => {
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
        Token: localStorage.getItem("Token"),
      })
        .then(() => {
          alert("profile updated successfuly");
          router.push("/");
        })
        .catch((err) => {
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

        {/* Employer Fields */}
        {user?.role === "EMPLOYER" && (
          <div className="flex-col space-y-6 w-full">
            <div className="flex-col w-full mb-6">
              <div className="w-full justify-between">
                <label className="block text-lg font-medium text-gray-700">
                  Company Name
                </label>

                <div className="flex items-center gap-2 mt-2">
                  {editField === "companyName" ? (
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
                      onClick={() =>
                        setEditField(
                          editField === "companyName" ? null : "companyName"
                        )
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full mt-3">
                {editField === "companyName" ? (
                  <input
                    type="text"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  />
                ) : (
                  <p className="border p-3 rounded-lg bg-gray-50 w-full">
                    {profile.companyName || "Not set"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-col w-full mb-6">
              <div className="w-full justify-between">
                <label className="block text-lg font-medium text-gray-700">
                  Company Website
                </label>

                <div className="flex items-center gap-2 mt-2">
                  {editField === "companyWebsite" ? (
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
                      onClick={() =>
                        setEditField(
                          editField === "companyWebsite"
                            ? null
                            : "companyWebsite"
                        )
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full mt-3">
                {editField === "companyWebsite" ? (
                  <input
                    type="url"
                    name="companyWebsite"
                    value={profile.companyWebsite}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  />
                ) : (
                  <p className="border p-3 rounded-lg bg-gray-50 w-full">
                    {profile.companyWebsite ? (
                      <a
                        href={profile.companyWebsite}
                        className="text-blue-600 underline"
                      >
                        {profile.companyWebsite}
                      </a>
                    ) : (
                      "Not set"
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Job Seeker Fields */}
        {user?.role === "JOB_SEEKER" && (
          <div className="flex-col space-y-6 w-full">
            {/* Resume Section */}
            <div className="flex-col w-full justify-between mb-6">
              <div className="w-full justify-between">
                <label className="block text-lg font-medium text-gray-700">
                  Resume
                </label>
                <div className={editField === "resume" ? "hidden" : "block"}>
                  {profile.previewResume ? (
                    <a
                      href={profile.previewResume}
                      download
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <FaDownload /> Download Resume
                    </a>
                  ) : (
                    <p className="border p-3 rounded-lg bg-gray-50">
                      No resume uploaded
                    </p>
                  )}
                </div>
                {editField !== "resume" && (
                  <button
                    onClick={() =>
                      setEditField(editField === "resume" ? null : "resume")
                    }
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2"
                  >
                    <FaUpload /> Upload New
                  </button>
                )}

                {editField === "resume" && (
                  <>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleResumeChange}
                      className="w-full border p-3 rounded-lg mt-2"
                    />
                    <button
                      onClick={handleSave}
                      className="text-blue-600 hover:text-blue-800 mt-2"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-600 hover:text-red-800 mt-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                )}
              </div>

              {/* Resume Preview */}
              <div className="w-full">
                {resumeFile &&
                  (resumeType === "application/pdf" ? (
                    <div className="w-full mt-4 p-4 border rounded-lg bg-gray-100">
                      <p className="text-gray-700 font-medium">File Preview:</p>
                      <iframe
                        src={resumePreview}
                        className="w-full h-40 border mt-2 rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full mt-4 p-4 border rounded-lg bg-gray-100">
                      <p className="text-gray-700 font-medium">File Preview:</p>
                      <img
                        src={resumePreview}
                        alt="Resume Preview"
                        className="w-full h-40 object-cover border mt-2 rounded-lg"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="flex-col w-full mb-6">
              <div className="w-full justify-between">
                <label className="block text-lg font-medium text-gray-700">
                  Skills
                </label>
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
                      onClick={() =>
                        setEditField(editField === "skills" ? null : "skills")
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>
              </div>
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
            </div>
          </div>
        )}

        {/* Save Button */}
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
