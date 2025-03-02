import { requestToBuffer } from "@/utils/FileUtils";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";

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
      // Convert request to Buffer
      const buffer = await requestToBuffer(file);

      // Ensure upload directory exists
      const uploadDir = path.join(process.cwd(), `public/uploads/${type}s`);
      if (!existsSync(uploadDir)) {
        await fs.mkdir(uploadDir, { recursive: true });
      }
      const filetype: string[] = file.name.split(".");
      // Generate a unique file path
      const filename = `${type}-${email}.${filetype[filetype.length - 1]}`;
      const filepath = path.join(uploadDir, filename);

      // Save the raw file
      await fs.writeFile(filepath, buffer);

      // Resolve promise with the image URL
      resolve(`/uploads/${type}s/${filename}`);
    } catch (error) {
      reject(error);
    }
  });
};
