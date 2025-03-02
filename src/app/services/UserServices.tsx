import axios from "axios";

export const getUser = async (token: any) => {
    let response: any;
    await axios
      .get("/api/getUser", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
        response = error;
      });
    return response;
  };