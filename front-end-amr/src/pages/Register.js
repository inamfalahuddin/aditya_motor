import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoBrand from "../images/logo-aditya-motor.png";
import Button from "../components/Button";
import Alert from "../components/Alert";

function Register() {
  const [message, setMessage] = useState({});

  const Register = async (e) => {
    e.preventDefault();

    console.log("hai sayang");
  };

  return (
    <div className="container px-5 my-5">
      <div className="row">
        <div className="col-lg-6 d-flex order-lg-2 align-items-center justify-content-center">
          <img
            src={LogoBrand}
            width="300"
            height="150"
            className="text-center mb-5"
            alt="logo-brand"
          />
        </div>
        <div className="col-lg-6 order-lg-1">
          <div className="card">
            <div className="card-header text-center fw-bold bg-danger text-white">
              Register
            </div>
            <div className="card-body text-center">
              {message.message !== undefined ? <Alert data={message} /> : null}

              <form>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Alamat
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    No Tlp
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    No Polisi
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Merk Kendaraan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
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
                <Button title="Registrasi" />
              </form>
              <p className="my-4">
                Sudah memiliki akun | <Link to={"/login"}>Login</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
