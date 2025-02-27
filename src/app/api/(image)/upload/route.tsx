import { UploadImage } from "@/server/Image";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: Request) => {
  await UploadImage(req)
    .then((res) => {
      return NextResponse.json(res);
    })
    .catch((err) => {
      return NextResponse.json(err);
    });
};
