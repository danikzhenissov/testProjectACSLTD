import axios from "axios";

export const axiosReq = axios.create({
  baseURL: "https://randomuser.me",
  headers: {
    "Content-Type": "application/json",
  },
});
