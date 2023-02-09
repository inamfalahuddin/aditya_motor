import { useAppContext } from "../context/app-context";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const useRefreshToken = () => {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate("");

  const refresh = async () => {
    try {
      const response = await axios.get("auth/token", { withCredentials: true });
      const decoded = jwtDecode(response.data.data.accessToken);

      if (state.token.bearer === "") {
        console.log("generate token baru");
        dispatch({
          type: "SET_TOKEN",
          payload: {
            bearer: response.data.data.accessToken,
            exp: decoded.exp,
          },
        });
      }

      return true;
    } catch (err) {
      navigate("/login");
      return false;
    }
  };

  return refresh;
};

export default useRefreshToken;
