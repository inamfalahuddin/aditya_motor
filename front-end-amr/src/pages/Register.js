import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import LogoBrand from "../images/logo-aditya-motor.png";
import Button from "../components/Button";
import Alert from "../components/Alert";
import axios from "../api/axios";

function Register() {
  const [message, setMessage] = useState({});
  const [username, setUsername] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTlp, setNoTlp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Register = async (e) => {
    e.preventDefault();

    try {
      if (formValidation() === true) {
        const response = await axios.post("auth/register", {
          username,
          alamat,
          no_tlp: noTlp,
          email,
          password,
        });

        setUsername("");
        setAlamat("");
        setNoTlp("");
        setEmail("");
        setPassword("");
        setMessage({ message: response.data.message, color: "success" });
      }
    } catch (err) {
      setMessage({ message: err.response.data.message, color: "danger" });
      console.log(Response);
    }
  };

  const formValidation = () => {
    if (username === "") {
      setMessage({ message: "Username wajib di isi", color: "warning" });
      return false;
    } else {
      if (alamat === "") {
        setMessage({ message: "alamat wajib di isi", color: "warning" });
        return false;
      } else {
        if (noTlp === "") {
          setMessage({ message: "noTlp wajib di isi", color: "warning" });
          return false;
        } else {
          if (email === "") {
            setMessage({ message: "email wajib di isi", color: "warning" });
            return false;
          } else {
            if (password === "") {
              setMessage({
                message: "password wajib di isi",
                color: "warning",
              });
              return false;
            } else {
              setMessage("");
              return true;
            }
          }
        }
      }
    }
    // username === ""
    //   ? setMessage({ message: "Username wajib di isi", color: "warning" })
    //   : alamat === ""
    //   ? setMessage({ message: "Alamat wajib di isi", color: "warning" })
    //   : noTlp === ""
    //   ? setMessage({ message: "Nomor Telpon wajib di isi", color: "warning" })
    //   : noPolisi === ""
    //   ? setMessage({ message: "Nomor Polisi wajib di isi", color: "warning" })
    //   : merkKendaraan === ""
    //   ? setMessage({
    //       message: "Merk Kendaraan wajib di isi",
    //       color: "warning",
    //     })
    //   : email === ""
    //   ? setMessage({ message: "Email wajib di isi", color: "warning" })
    //   : password === ""
    //   ? setMessage({ message: "Password wajib di isi", color: "warning" })
    //   : setMessage("");
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
                    value={username}
                    onChange={useCallback((e) => {
                      setUsername(e.target.value);
                    }, [])}
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
                    value={alamat}
                    onChange={useCallback((e) => {
                      setAlamat(e.target.value);
                    }, [])}
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    No Tlp
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={noTlp}
                    onChange={useCallback((e) => {
                      setNoTlp(e.target.value);
                    }, [])}
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
                <Button color="primary" onclick={Register}>
                  Register
                </Button>
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
