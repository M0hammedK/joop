import axios from "axios";
import { log } from "console";

export const SendApplication = async (
  data: any,
  token: any
): Promise<any | string> => {
  let response: any | string;
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/application/apply/${data}`,{},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res: any) => {
      console.log(res);
      response = res.data;
    })
    .catch((err: any) => {
      console.log(err);
      response = err;
    });
  return response!;
};

