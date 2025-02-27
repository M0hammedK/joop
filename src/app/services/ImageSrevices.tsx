import { blobToFile, urlToBlob } from "@/utils/ImageUtils";
import axios from "axios";

export const tryUploadImage = async (
  blobImage: Blob | null,
  email: string
): Promise<string> => {
  let response: string;
  if (!blobImage) return "/src/Images/file.svg"
  const fileImage = blobToFile(blobImage, email);
  axios
    .post("/api/upload", fileImage)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      response = err;
    });
  return response!;
};
