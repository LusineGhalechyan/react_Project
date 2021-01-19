import axios from "axios";
import { REACT_APP_API_URL } from "../../../../helpers/baseURL";

const defaultAPI = async ({ body = null, url, method = "GET" }) => {
  const response = await axios({
    data: body,
    url: REACT_APP_API_URL + url,
    method,
    headers: new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  });
  return response;
};

const send = async (values) => {
  const body = {
    name: values.name,
    email: values.email,
    body: values.message,
  };

  try {
    const result = await defaultAPI({
      body: body,
      url: "/form",
      method: "POST",
    });
    if (result) {
      alert(" 🎉Success !!!");
    }
  } catch (e) {
    alert("Please, try again!");
  }
};

export default send;
