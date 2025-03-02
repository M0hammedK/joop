import EmployerSchema from "@/models/employerSchema";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import { SendProfile } from "@/server/Profile";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data: any = await req.json();
  if (data["role"] === "JOB_SEEKER")
    if (JobSeekerSchema.validate(data)) NextResponse.error();
    else if (EmployerSchema.validate(data)) NextResponse.error();
  try {
    const res: any = await SendProfile(data, req.headers.get("Authorization"));
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.error();
  }
};
