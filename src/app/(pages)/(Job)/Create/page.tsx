"use client";

import { useUser } from "@/app/components/contexts/UserContext";
import { checkComplateProfile } from "@/utils/ProfileUtils";
import { redirect } from "next/navigation";

export default function page() {
  const { user } = useUser();
  if (user) {
    if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  } else redirect("/");
  return <div>page</div>;
}
