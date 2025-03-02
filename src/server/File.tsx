import { requestToBuffer } from "@/utils/FileUtils";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { put } from "@vercel/blob";

export const config = {
  api: { bodyParser: false },
};

export const UploadImage = (req: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      const email = formData.get("email") as string;
      const type = formData.get("type") as string;

      if (!file) {
        reject({ error: "No file uploaded", status: 400 });
      }

      const filetype: string[] = file.name.split(".");
      // Generate a unique file path
      const filename = `${type}-${email}.${filetype[filetype.length - 1]}`;
      // Upload file to Vercel Blob
      const blob = await put(filename, file, { access: "public" });

      resolve(blob.url);
    } catch (error) {
      reject({ error: "Upload failed", status: 500 });
    }
  });
};
