"use client";

import EmployerSchema from "@/models/employerSchema";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import UserSchema from "@/models/userSchema";
import { useState, createContext, useContext } from "react";

interface UserContextType {
  user: UserSchema | JobSeekerSchema | EmployerSchema | null;
  setUser: (user: UserSchema | JobSeekerSchema | EmployerSchema | null) => void;
}

export const userContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<
    UserSchema | JobSeekerSchema | EmployerSchema | null
  >(null);

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
