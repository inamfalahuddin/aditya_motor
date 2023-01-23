import React from "react";
import { Link } from "react-router-dom";
import LogoBrand from "../images/logo-aditya-motor.png";
import Button from "../components/Button";
import Alert from "../components/Alert";

function Login() {
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
            <Alert />
            <form>
              <div className="mb-3 text-start">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
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
                />
              </div>
              <Button title="Masuk" />
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
