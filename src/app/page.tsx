"use client";

import { checkComplateProfile } from "@/utils/ProfileUtils";
import { useUser } from "./components/contexts/UserContext";
import JobCard from "./components/UI/JobCard";
import MainPanal from "./components/UI/MainPanal";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { restoreUser } from "@/utils/UserUtils";

export default function Home() {
  const { user, setUser } = useUser();
  useEffect(() => {
    const updateUser = async () => {
      if (localStorage.getItem("user")) {
        setUser(restoreUser(JSON.parse(localStorage.getItem("user")!)))
          setUser(user);
      }else localStorage.removeItem('user')
    };
    updateUser();
    if (user) if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  }, []);
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
