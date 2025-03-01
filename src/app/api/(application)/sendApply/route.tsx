import LoginSchema from "@/models/loginSchema";
import { SendApplication } from "@/server/Application";
import { Login } from "@/server/Auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data: any = await req.json();
  try {
    const res: any = await SendApplication(data, req.headers.get('Authorization'));
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error();
  }
};
