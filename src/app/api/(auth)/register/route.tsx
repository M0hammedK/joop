import RegisterSchema from "@/models/registerSchema";
import { Register } from "@/server/Auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  const validate = RegisterSchema.validate(data);
  if (validate) return NextResponse.json(validate);
  try {
    const user: any = await Register(data);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
};
