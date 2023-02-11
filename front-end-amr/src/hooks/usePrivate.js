import { useEffect, useState } from "react";
import axios, { axiosPrivate } from "../api/axios";
import { useAppContext } from "../context/app-context";
import jwt_decode from "jwt-decode";

const useAxiosPrivate = () => {
  const [state, dispatch] = useAppContext();
  const [exp, setExp] = useState(0);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (state.token.exp * 1000 < currentDate.getTime()) {
          const response = await axios.get("auth/token", {
            withCredentials: true,
          });
          const token = response.data.data.accessToken;
          config.headers["Authorization"] = `Bearer ${token}`;

          dispatch({
            type: "SET_TOKEN",
            payload: {
              bearer: token,
              exp: jwt_decode(token).exp,
            },
          });
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [state.token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
