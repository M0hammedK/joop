import axios from "axios";

export const GetProfile = async (token: any): Promise<any | string> => {
  let response: any | string;
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => {
      response = res.data;
    })
    .catch((err: any) => {
      if (err.response.status === 404) response = 'notfound';
    });
  return response!;
};

export const SendProfile = async (
  user: any,
  token: any
): Promise<any | string> => {
  let response: any | string;
  await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => {
      response = res.data;
    })
    .catch((err: any) => {
      response = err;
    });
  return response!;
};

export const UpadetProfile = async (
  user: any,
  token: any
): Promise<any | string> => {
  let response: any | string;
  await axios
    .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => {
      response = res.data;
    })
    .catch((err: any) => {
      response = err;
    });
  return response!;
};