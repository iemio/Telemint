import axios from "axios";
import { SERVER_DOMAIN } from "../env";

export const axiosBaseInstance = axios.create({
  baseURL: `${SERVER_DOMAIN}/api/v1`, // Backend server URL
  withCredentials: true, // To send cookies with requests
});

export const axiosDashboardInstance = axios.create({
  baseURL: `${SERVER_DOMAIN}/api/v1/dashboard`, // Backend server URL
  withCredentials: true, // To send cookies with requests
});
