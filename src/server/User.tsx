import axios from "axios";

export const GetUser = async (token: any): Promise<any | string> => {
  let response: any | string;
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => {
      response = res.data;
    })
    .catch((err: any) => {
      if (err.response.status === 404) response = "notfound";
    });
  return response!;
};
