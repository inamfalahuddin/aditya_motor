import axios from "../api/axios";

const useRefreshToken = async () => {
  const response = await axios.get("auth/token", { withCredentials: true });

  console.log("ok lah ya");

  return response;
};

export default useRefreshToken;
