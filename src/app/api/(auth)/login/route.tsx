import LoginSchema from "@/models/loginSchema";
import { Login } from "@/server/Auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data: any = await req.json();
  const validate = LoginSchema.validate(data);
  if (validate) return NextResponse.json(validate);
  try {
    const res: any = await Login(data);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error();
  }
};
