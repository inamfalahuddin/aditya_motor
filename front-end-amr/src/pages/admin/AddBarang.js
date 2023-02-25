import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/usePrivate";
import useAuth from "../../hooks/useAuth";
import { type } from "@testing-library/user-event/dist/type";
import Alert from "../../components/Alert";
import jwtDecode from "jwt-decode";

function AddBarang() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();

  const [message, setMessage] = useState({});
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [qty, setQty] = useState("");

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "tambah barang" });

    auth();
  }, []);

  useEffect(() => {
    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  const addBarang = async (e) => {
    e.preventDefault();

    try {
      console.log(kode, nama, harga, qty);
      if (formValidation()) {
        const response = await axiosPrivate.post(
          "barang",
          {
            kode_barang: kode,
            nama_barang: nama,
            harga_barang: harga,
            qty: qty,
          },
          { headers: { Authorization: `Bearer ${state.token.bearer}` } }
        );

        dispatch({
          type: "SET_DATA",
          payload: {
            ...state.data,
            barang: response.data.data,
          },
        });
        setMessage({ message: response.data.message, color: "success" });

        setKode("");
        setNama("");
        setHarga("");
        setQty("");
      }
    } catch (err) {
      setMessage({ message: err.response.data.message, color: "danger" });
    }
  };

  const formValidation = () => {
    if (kode === "") {
      setMessage({
        message: "kode barang wajib di isi",
        color: "warning",
      });
      return false;
    } else if (nama === "") {
      setMessage({
        message: "nama barang wajib di isi",
        color: "warning",
      });
      return false;
    } else if (harga === "") {
      setMessage({
        message: "harga barang wajib di isi",
        color: "warning",
      });
      return false;
    } else if (qty === "") {
      setMessage({
        message: "qty wajib di isi",
        color: "warning",
      });
      return false;
    } else {
      setMessage({});
      return true;
    }
  };

  return (
    <>
      {message !== undefined ? <Alert data={message} /> : null}

      <div className="card">
        <div className="card-header bg-danger text-white">
          <img src={IconData} alt="icon pengguna" />
          <span className="ms-3">Tambah Data Barang</span>
        </div>
        <div className="card-body">
          {/* <form> */}
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Kode Barang
              </label>
            </div>
            <div className="col-10">
              <input
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="number"
                value={kode}
                onChange={useCallback((e) => {
                  setKode(e.target.value);
                }, [])}
              />
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Nama Barang
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
                Harga Barang
              </label>
            </div>
            <div className="col-10">
              <input
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="number"
                value={harga}
                onChange={useCallback((e) => {
                  setHarga(e.target.value);
                }, [])}
              />
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Qty
              </label>
            </div>
            <div className="col-10">
              <input
                className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                type="number"
                value={qty}
                onChange={useCallback((e) => {
                  setQty(e.target.value);
                }, [])}
              />
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2"></div>
            <div className="col-10">
              <Button className="me-3" color="success" onclick={addBarang}>
                Simpan
              </Button>
              <Button
                className="me-3"
                color="danger"
                onclick={() => {
                  navigate("/barang");
                }}
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

export default AddBarang;
