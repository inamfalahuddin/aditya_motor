import { useEffect, useState } from "react";
import axios, { axiosPrivate } from "../api/axios";
import { useAppContext } from "../context/app-context";

const useAxiosPrivate = () => {
  const [state, dispatch] = useAppContext();
  const [exp, setExp] = useState(0);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if(!config.headers['Authorization']) {
          
          config.headers['Authorization'] = `Bearer ${}`
        }
      },
      (err) => Promise.reject(err)
    );
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
