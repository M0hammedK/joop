import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

export const UploadImage = async (req:any) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject("Upload failed: " + err);
        return;
      }

      const file = files.file![0];
      const oldPath = file.filepath;
      const uploadDir = path.join(process.cwd(), "../src/Images");
      const newPath = path.join(uploadDir, file.originalFilename!);

      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          reject("File move failed: " + err);
          return;
        }

        
        resolve( newPath );
      });
    });
  });
};
