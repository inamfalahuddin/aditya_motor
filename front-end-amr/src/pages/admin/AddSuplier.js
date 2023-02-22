import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import Alert from "../../components/Alert";

function AddSuplier() {
  const auth = useAuth();
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [message, setMessage] = useState({});

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "tambah suplier" });

    auth();
  }, []);

  const AddSuplier = async (e) => {
    e.preventDefault();

    try {
      if (formValidation()) {
        const response = await axiosPrivate.post(
          "suplier/",
          {
            nama_toko: nama,
            alamat: alamat,
            no_hp: noHp,
          },
          { headers: { Authorization: `Bearer ${state.token.bearer}` } }
        );
        setMessage({ message: response.data.message, color: "success" });
      }
    } catch (err) {
      setMessage({ message: err.response.data.message, color: "danger" });
    }
  };

  const formValidation = () => {
    if (nama === "") {
      setMessage({
        message: "nama wajib di isi",
        color: "warning",
      });
      return false;
    } else if (alamat === "") {
      setMessage({
        message: "alamat wajib di isi",
        color: "warning",
      });
      return false;
    } else if (noHp === "") {
      setMessage({
        message: "no hp wajib di isi",
        color: "warning",
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {message.message !== undefined ? <Alert data={message} /> : null}

      <div className="card">
        <div className="card-header bg-danger text-white">
          <img src={IconData} alt="icon pengguna" />
          <span className="ms-3">Tambah Data Suplier</span>
        </div>
        <div className="card-body">
          {/* <form> */}
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Nama Toko
              </label>
            </div>
            <div className="col-10">
              <input
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="text"
                value={nama}
                onChange={useCallback((e) => {
                  setNama(e.target.value);
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
            <div className="col-2"></div>
            <div className="col-10">
              <Button className="me-3" color="success" onclick={AddSuplier}>
                Tambah
              </Button>
              <Button
                className="me-3"
                color="danger"
                onclick={() => navigate("/suplier")}
              >
                Batal
              </Button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

export default AddSuplier;
