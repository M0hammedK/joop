"use client";

import { useUser } from "@/app/components/contexts/UserContext";
import { checkComplateProfile } from "@/utils/ProfileUtils";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiBriefcase, FiUser, FiMail, FiCalendar, FiClock, FiCheck, FiX } from "react-icons/fi";

// Function to fetch all jobs posted by the employer
const fetchJobs = async (userId: number, token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/job/employer`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employer's jobs:", error);
    return [];
  }
};

// Function to fetch applications for a specific job
const fetchApplicationsForJob = async (jobId: number, token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/application/job/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applications for job:", error);
    return [];
  }
};

// Function to fetch all applications for a job seeker
const fetchJobSeekerApplications = async (userId: number, token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/application/myapplies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching job seeker's applications:", error);
    return [];
  }
};

// Function to handle application status update
const updateApplicationStatus = async (
  applicationId: number,
  status: string,
  token: string
) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/application/status/${applicationId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Error updating application status:", error);
    return false;
  }
};

export default function AllApplications() {
  const { user } = useUser();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    if (user) {
      if (!checkComplateProfile(user)) {
        redirect("/Profile/Continue");
      } else {
        const token = localStorage.getItem("Token");
        if (token) {
          if (user.role === "EMPLOYER") {
            fetchJobs(user.id!, token).then((jobs) => {
              const allApplications: any[] = [];
              const jobRequests = jobs.map((job: any) => {
                return fetchApplicationsForJob(job.id, token).then(
                  (applicationsForJob) => {
                    const applicationsWithJobTitle = applicationsForJob.map(
                      (app: any) => ({
                        ...app,
                        jobTitle: job.title || `Job #${job.id}`,
                        jobId: job.id,
                      })
                    );
                    allApplications.push(...applicationsWithJobTitle);
                  }
                );
              });
              Promise.all(jobRequests).then(() => {
                setApplications(allApplications);
                setLoading(false);
              });
            });
          } else if (user.role === "JOB_SEEKER") {
            fetchJobSeekerApplications(user.id!, token).then((applicationsForSeeker) => {
              setApplications(applicationsForSeeker);
              setLoading(false);
            });
          }
        } else {
          redirect("/Login");
        }
      }
    } else {
      redirect("/");
    }
  }, [user]);

  const handleStatusUpdate = async (applicationId: number, status: string) => {
    const token = localStorage.getItem("Token");
    if (!token) return;

    setUpdating(applicationId);

    const success = await updateApplicationStatus(applicationId, status, token);

    if (success) {
      setApplications(
        applications.map((app) =>
          app.id === applicationId ? { ...app, status } : app
        )
      );
    }

    setUpdating(null);
  };

  const filteredApplications =
    filterStatus === "ALL"
      ? applications
      : applications.filter((app) => app.status === filterStatus);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="container px-4 py-6 flex flex-col">
      {/* Application Header and Filter – now as a column at the top */}
      <div className="mb-6 flex flex-col items-start gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiBriefcase /> Applications
        </h1>
        <div className="w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ALL">All Applications</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No applications found.</p>
          </div>
        ) : (
          filteredApplications.map((application: any) => (
            <div
              key={application.id}
              className="bg-white rounded-lg shadow-md border border-gray-100 py-10 px-20 overflow-hidden"
            >
              <div className="p-6 space-y-4 flex flex-col items-start gap-4">
                {/* Stacked Vertical Data with Icons */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FiBriefcase /> {application.jobTitle || `Role :${application.job.title}`}
                </h2>
                <p className="text-md text-gray-700 font-bold mb-1 flex items-center gap-2">
                  <FiUser />   {application.jobSeeker?.name ? `Name: ${application.jobSeeker.name}` : `Company: ${application.job.company}`}
                </p>
                <p className="text-sm text-gray-600 font-bold mb-3 flex items-center gap-2">
                  {application.jobSeeker?.email ? (
                  <>
                    <FiMail /> Email: {application.jobSeeker.email}
                  </>
                  ) : (
                  <span className="ml-auto flex items-center gap-2">
                  <FiBriefcase /> {application.job.description}
                  </span>
                  )}
                </p>
                

                {/* Status and Date aligned to the right with Icons */}
                <div className="flex justify-end mb-4 w-full">
                  <div className="flex flex-col items-end">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                        application.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : application.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.status === "PENDING" ? (
                        <FiClock />
                      ) : application.status === "ACCEPTED" ? (
                        <FiCheck />
                      ) : (
                        <FiX />
                      )}
                      {application.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <FiCalendar /> {new Date(application.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons with Icons */}
                {user?.role === "EMPLOYER" && application.status === "PENDING" && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleStatusUpdate(application.id, "ACCEPTED")}
                      disabled={updating === application.id}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {updating === application.id ? (
                        "Processing..."
                      ) : (
                        <>
                          <FiCheck /> Accept Application
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(application.id, "REJECTED")}
                      disabled={updating === application.id}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {updating === application.id ? (
                        "Processing..."
                      ) : (
                        <>
                          <FiX /> Reject Application
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
