"use client";

import { checkComplateProfile } from "@/utils/ProfileUtils";
import { useUser } from "./components/contexts/UserContext";
import JobCard from "./components/UI/JobCard";
import MainPanal from "./components/UI/MainPanal";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  if (user) if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  return (
    <section className="p-6 flex flex-col w-full">
      <div className="w-full">
        <MainPanal />
      </div>
      <div className="flex mt-12 w-full justify-start">
        <JobCard />
      </div>
    </section>
  );
}
