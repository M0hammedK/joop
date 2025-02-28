import { IncomingForm } from "formidable";
import path from "path";
import sharp from "sharp";


export const requestToBuffer = async (file: any) => {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
};
