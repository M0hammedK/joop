import { GetProfile } from "@/server/Profile";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const res: any = await GetProfile(req.headers.get("Authorization"));
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error();
  }
};
