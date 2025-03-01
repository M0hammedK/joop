"use client";

import { useUser } from "@/app/components/contexts/UserContext";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import { checkComplateProfile } from "@/utils/ProfileUtils";
import { redirect } from "next/navigation";

export default function Applications() {
  const { user } = useUser();
  if (user){ if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  }else redirect('/')
  return <div>Applications</div>;
}
