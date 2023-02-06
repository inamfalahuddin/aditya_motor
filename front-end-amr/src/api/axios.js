import axios from "axios";
import { useAppContext } from "../context/app-context";

const baseURL = "http://localhost:5000/v1/";

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosJwt = axios.create({ baseURL });
// axiosJwt.interceptors.request.use(
//   async (config) => {
//     const currentDate = new Date();

//     if (state.token.exp * 1000 < currentDate.getTime()) {
//       const response = await axios.get("auth/token", {
//         withCredentials: true,
//       });
//       config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
//     }
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );
