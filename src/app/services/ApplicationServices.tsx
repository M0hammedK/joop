import axios from "axios";

export const sendApplication = async (data: any) => {
  let response: any;
  await axios
    .post("/api/sendApply", data["id"], {
      headers: {
        "Content-Type": "application/json",
        Authorization: data["token"],
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

export const getApplication = async (data: any) => {
  let response: any;
  await axios
    .post("/api/", data["data"], {
      headers: {
        "Content-Type": "application/json",
        Authorization: data["Token"],
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
