import axios from "axios";

export const api = "http://localhost:3001";
export const apiPost = async (path: string, body: any) => {
  const response = await axios.post(api + path, body);

  return response;
};
export const secureApiPost = async (path: string, body: any, token: string) => {
  const response = await axios.post(api + path, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
