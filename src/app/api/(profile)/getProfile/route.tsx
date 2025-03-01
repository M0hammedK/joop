import UserSchema from "@/models/userSchema";
import { GetProfile } from "@/server/Profile";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    console.log(req.headers.get("Authorization"));
    const res: any = await GetProfile(req.headers.get("Authorization"));
    console.log(res)
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error();
  }
};
