import axios from "axios";

export const api = "http://localhost:3001";
export const apiPost = async (path: string, body: any) => {
  const response = await axios.post(api + path, body);

  return response;
};
