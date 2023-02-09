import { useEffect, useState } from "react";
import axios, { axiosPrivate } from "../api/axios";
import { useAppContext } from "../context/app-context";

const useAxiosPrivate = () => {
  const [state, dispatch] = useAppContext();
  const [exp, setExp] = useState(0);

  useEffect(() => {
    setExp(state.token.exp);
    console.log(exp);
    console.log(state.token.exp);
    // const responseIntercept = axiosPrivate.interceptors.response.use(
    //   async (config) => {
    //     const currentDate = new Date();
    //     console.log(exp);
    //     // console.log(state.token.exp, currentDate.getTime());
    //     if (state.token.exp * 1000 < currentDate.getTime()) {
    //       const response = await axios.get("auth/token");
    //       config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
    //       dispatch({
    //         type: "SET_TOKEN",
    //         payload: response.data.data.accessToken,
    //       });
    //     }

    //     return config;
    //   },
    //   (err) => {
    //     return Promise.reject(err);
    //   }
    // );

    // return () => {
    //   axiosPrivate.interceptors.response.eject();
    // };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
