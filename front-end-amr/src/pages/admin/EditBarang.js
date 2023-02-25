import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import Alert from "../../components/Alert";
import jwtDecode from "jwt-decode";

function EditBarang() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [qty, setQty] = useState("");

  const [message, setMessage] = useState({});

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "edit barang" });

    auth();
  }, []);

  useEffect(() => {
    getDataBarang(id);

    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  const editDataBarang = async () => {
    try {
      if (formValidation()) {
        const response = await axiosPrivate.put(
          `/barang/${id}`,
          {
            kode_barang: kode,
            nama_barang: nama,
            harga_barang: harga,
            qty,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state.token.bearer}`,
            },
          }
        );
        setMessage({ message: response.data.message, color: "success" });
      }
    } catch (err) {
      setMessage({ message: err.response.data.message, color: "danger" });
    }
  };

  const getDataBarang = async (id) => {
    try {
      const response = await axiosPrivate.get(`barang/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      const data = response.data.data[0];

      console.log(data);
      setKode(data.kode_barang);
      setNama(data.nama_barang);
      setHarga(data.harga_barang);
      setQty(data.qty);
    } catch (err) {
      console.log(err);
    }
  };

  const formValidation = () => {
    if (nama === "") {
      setMessage({
        message: "nama wajib di isi",
        color: "warning",
      });
      return false;
    } else {
      if (harga === "") {
        setMessage({
          message: "alamat hp wajib di isi",
          color: "warning",
        });
        return false;
      } else {
        if (qty === "") {
          setMessage({
            message: "No hp wajib di isi",
            color: "warning",
          });
          return false;
        } else {
          setMessage({});
          return true;
        }
      }
    }
  };

  return (
    <>
      {message.message !== undefined ? <Alert data={message} /> : null}

      <div className="card">
        <div className="card-header bg-danger text-white">
          <img src={IconData} alt="icon pengguna" />
          <span className="ms-3">Edit Data Barang</span>
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
                type="text"
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
              <textarea
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
              <Button className="me-3" color="success" onclick={editDataBarang}>
                Edit Data Barang
              </Button>
              <Button
                className="me-3"
                color="danger"
                onclick={() => navigate("/barang")}
              >
                Kembali
              </Button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

export default EditBarang;
