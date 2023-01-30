import React, { useEffect } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Pengguna() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "pengguna" });
  }, []);

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Data Pengguna</span>
      </div>
      <div className="card-body">
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Username
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
              Andika Lubis
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Alamat
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
              Andika Lubis
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2"></div>
          <div className="col-10">
            <Button
              className="me-3"
              color="danger"
              onclick={() => navigate("/dashboard")}
            >
              Kembali
            </Button>
            <Button className="me-3" color="primary">
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pengguna;
