import { UpadetProfile } from "@/server/Profile";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  const data: any = await req.json();
  try {

    console.log(data)
    const res: any = await UpadetProfile(
      data,
      req.headers.get("Authorization")
    );
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.error();
  }
};
