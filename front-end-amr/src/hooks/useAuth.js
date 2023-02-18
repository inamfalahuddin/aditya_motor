import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAppContext } from "../context/app-context";
import useRefreshToken from "./useRefreshToken";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate("");
  const refresh = useRefreshToken();

  const auth = async () => {
    try {
      const response = await axios.get("auth/token", {
        withCredentials: true,
      });

      const accessToken = response.data.data.accessToken;
      const decoded = jwtDecode(accessToken);

      dispatch({
        type: "SET_TOKEN",
        payload: {
          bearer: response.data.data.accessToken,
          exp: decoded.exp,
        },
      });

      return true;
    } catch (err) {
      console.log(err);
      navigate("/login");
      return false;
    }
  };

  return auth;
};

export default useAuth;
