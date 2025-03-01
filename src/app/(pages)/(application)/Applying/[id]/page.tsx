"use client";

import { useEffect } from "react";
import { useUser } from "@/app/components/contexts/UserContext";
import { useRouter, useParams } from "next/navigation";
import { checkComplateProfile } from "@/utils/ProfileUtils";
import { sendApplication } from "@/app/services/ApplicationServices";

export default function Applying() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    if (!checkComplateProfile(user)) redirect("/Profile/Continue");
  } else router.push("/");
  const { id } = useParams();
  useEffect(() => {
    const sendApply = async () => {
      try {
        await sendApplication({ id: id, token: localStorage.getItem("Token") });
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    sendApply();
  }, []);

  return <h1>Applying...</h1>;
}
