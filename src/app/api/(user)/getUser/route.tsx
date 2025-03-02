import { GetUser } from "@/server/User";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const res: any = await GetUser(req.headers.get("Authorization"));
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error();
  }
};
