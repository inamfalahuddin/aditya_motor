import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Alert from "../../components/Alert";

function AddMekanik() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [message, setMessage] = useState({});

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "tambah mekanik" });

    auth();
  }, []);

  useEffect(() => {
    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  const submit = async (e) => {
    e.preventDefault();

    const dataFile = new FormData();
    dataFile.append("username", username);
    dataFile.append("alamat", alamat);
    dataFile.append("no_hp", noHp);
    dataFile.append("jabatan", jabatan);
    dataFile.append("foto", selectedFile);

    try {
      const response = await axios({
        method: "post",
        url: "/mekanik",
        data: dataFile,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ message: response.data.message, color: "success" });
    } catch (err) {
      console.log(err);
      setMessage({ message: err.response.data.message, color: "danger" });
    }
  };

  return (
    <>
      {message !== undefined ? <Alert data={message} /> : null}

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
                  value={username}
                  onChange={useCallback((e) => {
                    setUsername(e.target.value);
                  }, [])}
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
                  value={alamat}
                  onChange={useCallback((e) => {
                    setAlamat(e.target.value);
                  }, [])}
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
                  value={noHp}
                  onChange={useCallback((e) => {
                    setNoHp(e.target.value);
                  }, [])}
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
                  value={jabatan}
                  onChange={useCallback((e) => {
                    setJabatan(e.target.value);
                  }, [])}
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
                  name="foto"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="row g-3 px-4 mb-4">
              <div className="col-2"></div>
              <div className="col-10">
                <Button className="me-3" color="primary" onclick={submit}>
                  Tambah
                </Button>
                <Button
                  className="me-3"
                  color="danger"
                  onclick={() => navigate("/mekanik")}
                >
                  Kembali
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddMekanik;
