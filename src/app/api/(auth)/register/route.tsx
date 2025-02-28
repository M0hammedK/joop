import RegisterSchema from "@/models/registerSchema";
import { Register } from "@/server/Auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log('3');
  const data = await req.json();
  const validate = RegisterSchema.validate(data);
  if (validate) return NextResponse.json(validate);
  try {
    console.log('3.5')
    const user: any = await Register(data);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
};
