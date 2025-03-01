import axios from "axios";

export const sendApplication = async (data: any) => {
    let response: any;
    await axios
      .post("/api/", data["user"], {
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
}