"use client";

import { useEffect } from "react";
import { useUser } from "@/app/components/contexts/UserContext";
import { logout } from "@/utils/AuthUtils";
import { redirect } from "next/navigation";

export default function LogoutPage() {
  const { setUser } = useUser();

  useEffect(() => {
    logout();
    setUser(null);
    redirect("/");
  }, []);

  return <h1>Logging out...</h1>;
}
