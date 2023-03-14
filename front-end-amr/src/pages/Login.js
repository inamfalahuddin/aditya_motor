import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoBrand from "../images/logo-aditya-motor.png";
import Button from "../components/Button";
import Alert from "../components/Alert";
import axios, { axiosPrivate } from "../api/axios";
import { useAppContext } from "../context/app-context";
import jwt_decoded from "jwt-decode";
import useRefreshToken from "../hooks/useRefreshToken";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});

  const navigate = useNavigate("");
  const [state, dispatch] = useAppContext();
  const auth = useRefreshToken();

  useEffect(() => {
    const userToken = auth();

    userToken.then((res) => {
      res ? navigate("/dashboard") : navigate("/login");
    });
  }, []);

  const Auth = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const accessToken = response?.data.data?.token;

      dispatch({
        type: "SET_TOKEN",
        payload: {
          bearer: accessToken,
          exp: jwt_decoded(response.data.data.token).exp,
        },
      });

      setMessage({ message: response.data.message, color: "success" });
      navigate("/dashboard");
    } catch (err) {
      // console.log(err);
      setMessage({ message: err.response.data.message, color: "danger" });
      // navigate("/login");
    }
  };

  return (
    <div className="container h-full vh-100 d-flex justify-content-center align-items-md-center">
      <div className="d-lg-flex align-items-center">
        <img
          src={LogoBrand}
          width="300"
          height="150"
          className="me-5 my-5"
          alt="logo-brand"
        />
        <div className="card w-lg">
          <div className="card-header text-center fw-bold bg-danger text-white">
            Login
          </div>
          <div className="card-body text-center">
            {message.message !== undefined ? <Alert data={message} /> : null}
            <form>
              <div className="mb-3 text-start">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={useCallback((e) => {
                    setEmail(e.target.value);
                  }, [])}
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={useCallback((e) => {
                    setPassword(e.target.value);
                  }, [])}
                />
              </div>
              <Button color="primary" onclick={Auth}>
                Masuk
              </Button>
            </form>
            <p className="my-4">
              Membuat akun | <Link to={"/register"}>Register</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
