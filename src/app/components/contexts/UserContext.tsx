"use client";

import EmployerSchema from "@/models/employerSchema";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import UserSchema from "@/models/userSchema";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation"; // Import router for redirection
import { checkComplateProfile } from "@/utils/ProfileUtils";
import { restoreUser } from "@/utils/UserUtils";

interface UserContextType {
  user: UserSchema | JobSeekerSchema | EmployerSchema | null;
  setUser: (user: UserSchema | JobSeekerSchema | EmployerSchema | null) => void;
}

export const userContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSchema | JobSeekerSchema | EmployerSchema | null>(null);
  const router = useRouter(); // Use Next.js router for navigation

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const restoredUser = restoreUser(JSON.parse(storedUser));
      setUser(restoredUser);

      // Check if profile is incomplete and redirect
      if (!checkComplateProfile(restoredUser)) {
        router.push("/Profile/Continue");
      }
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) throw new Error("useUser must be inside a UserProvider");
  return context;
};
