import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";

function AddMekanik() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();

  const [username, setUsername] = useState();
  const [alamat, setAlamat] = useState();
  const [noHp, setNoHp] = useState();
  const [jabatan, setJabatan] = useState();
  const [file, setFile] = useState();

  const [dataSelect, setDataSelect] = useState({
    username: "",
    alamat: "",
    noHp: "",
    jabatan: "",
    file: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

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

    const data = new FormData();
    data.append("file", selectedFile);
    console.warn(selectedFile);

    setDataSelect({
      ...dataSelect,
      file: selectedFile,
    });

    console.log(dataSelect);
  };

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
                value={dataSelect.nama}
                onChange={useCallback((e) => {
                  setDataSelect({
                    ...dataSelect,
                    username: e.target.value,
                  });
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
                value={dataSelect.alamat}
                onChange={useCallback((e) => {
                  setDataSelect({
                    ...dataSelect,
                    alamat: e.target.value,
                  });
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
                value={dataSelect.noHp}
                onChange={useCallback((e) => {
                  setDataSelect({
                    ...dataSelect,
                    noHp: e.target.value,
                  });
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
                value={dataSelect.jabatan}
                onChange={useCallback((e) => {
                  setDataSelect({
                    ...dataSelect,
                    jabatan: e.target.value,
                  });
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
  );
}

export default AddMekanik;
