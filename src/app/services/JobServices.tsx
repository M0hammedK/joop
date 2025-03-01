import axios from "axios";

export const getJobs = async (data: any) => {
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
