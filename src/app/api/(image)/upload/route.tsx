import { UploadImage } from "@/server/File";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: Request) => {
  let response;
  await UploadImage(req)
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err;
    });
  return NextResponse.json(response);
};
