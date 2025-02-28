import axios from "axios";

export const uploadImage = async (
  image: Blob | null,
  email: string,
  type: string
): Promise<string> => {
  let response;
  if (!image) return "/uploads/images/defaultImage.svg";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("email", email);
  formData.append("type", type);
  await axios
    .post("/api/upload", formData)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      response = err;
    });
  return response!;
};
