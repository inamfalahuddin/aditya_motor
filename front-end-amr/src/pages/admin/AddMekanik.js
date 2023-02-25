import React, { useEffect } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function AddMekanik() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "tambah mekanik" });
  }, []);

  useEffect(() => {
    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Tambah Data Mekanik</span>
      </div>
      <div className="card-body">
        <form>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Username
              </label>
            </div>
            <div className="col-10">
              <input
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="text"
              />
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Alamat
              </label>
            </div>
            <div className="col-10">
              <textarea
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="text"
              />
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                No Hp
              </label>
            </div>
            <div className="col-10">
              <input
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="number"
              />
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Jabatan
              </label>
            </div>
            <div className="col-10">
              <input
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="text"
              />
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Foto
              </label>
            </div>
            <div className="col-10">
              <input
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="file"
              />
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2"></div>
            <div className="col-10">
              <Button
                className="me-3"
                color="danger"
                onclick={() => navigate("/mekanik")}
              >
                Kembali
              </Button>
              <Button className="me-3" color="primary">
                Tambah
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMekanik;
