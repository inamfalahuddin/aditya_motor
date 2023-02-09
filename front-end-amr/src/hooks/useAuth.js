import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAppContext } from "../context/app-context";
import useRefreshToken from "./useRefreshToken";

const useAuth = () => {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate("");
  const refresh = useRefreshToken();

  const auth = async () => {
    const authentication = await refresh();

    if (authentication) {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return auth;
};

export default useAuth;
