import { requestToBuffer } from "@/utils/FileUtils";
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
      // const buffer = await requestToBuffer(file);
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Upload file to Vercel Blob
      const blob = await put(file.name, fileBuffer, {
        access: "public",
      });
    } catch (error) {
      reject({ error: "Upload failed", status: 400 });
    }
  });
};
