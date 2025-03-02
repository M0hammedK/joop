"use client";

import { checkComplateProfile } from "@/utils/ProfileUtils";
import { useUser } from "./components/contexts/UserContext";
import JobCard from "./components/UI/JobCard";
import MainPanal from "./components/UI/MainPanal";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { setTypeUser } from "@/utils/UserUtils";
import { RestoreSession } from "./services/AuthServices";

export default function Home() {
  const { user, setUser } = useUser();
  useEffect(() => {
    const updateUser = async () => {
      if (localStorage.getItem("Token")) {
        await RestoreSession(localStorage.getItem("Token")!).then((user) => {
          setUser(user);
        });
      }
    };
    updateUser();
    if (user) if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  }, []);
  console.log(user)
  if (user) if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  return (
    <section className="p-6 flex flex-col w-full">
      <div className="w-full ">
        <MainPanal />
      </div>
      <div className="flex mt-12 w-full justify-start ">
        <JobCard />
      </div>
    </section>
  );
}
