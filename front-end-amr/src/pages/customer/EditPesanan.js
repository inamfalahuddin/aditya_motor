import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import Alert from "../../components/Alert";
import jwtDecode from "jwt-decode";

function EditPesanan() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [idPesanan, setIdPesanan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [noPolisi, setNoPolisi] = useState("");
  const [merk, setMerk] = useState("");
  const [permasalahan, setPermasalahan] = useState("");
  const [pelayanan, setPelayanan] = useState("");
  const [status, setStatus] = useState("");

  const [message, setMessage] = useState({});

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "edit pesanan" });

    auth();
  }, []);

  useEffect(() => {
    getDetailDataPesanan(id);
  }, [state.token.bearer]);

  const addDataPesanan = async () => {
    try {
      if (formValidation()) {
        const response = await axiosPrivate.put(
          `/pesanan/${idPesanan}`,
          {
            id_customer: jwtDecode(state.token.bearer).id_customer,
            alamat: alamat,
            no_hp: noHp,
            no_polisi: noPolisi,
            merk_kendaraan: merk,
            permasalahan: permasalahan,
            pelayanan: pelayanan,
            status,
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

  const getDetailDataPesanan = async (id) => {
    try {
      const response = await axiosPrivate.get(`pesanan/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      const data = response.data.data;

      setIdPesanan(data.id_pesanan);
      setAlamat(data.alamat);
      setNoHp(data.no_hp);
      setNoPolisi(data.no_polisi);
      setMerk(data.merk_kendaraan);
      setPermasalahan(data.permasalahan);
      setPelayanan(data.pelayanan);
      setStatus(data.status);
    } catch (err) {
      console.log(err);
    }
  };

  const formValidation = () => {
    if (alamat === "") {
      setMessage({
        message: "alamat wajib di isi",
        color: "warning",
      });
      return false;
    } else {
      if (noHp === "") {
        setMessage({
          message: "Nomor hp wajib di isi",
          color: "warning",
        });
        return false;
      } else {
        if (noPolisi === "") {
          setMessage({
            message: "Nomor Polisi wajib di isi",
            color: "warning",
          });
          return false;
        } else {
          if (merk === "") {
            setMessage({
              message: "Merk kendaraan wajib di isi",
              color: "warning",
            });
            return false;
          } else {
            if (permasalahan === "") {
              setMessage({
                message: "Permasalahan bakar wajib di isi",
                color: "warning",
              });
              return false;
            } else {
              if (pelayanan === "") {
                setMessage({
                  message: "Pelayanan bakar wajib di isi",
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
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Tambah Data Pesenan</span>
      </div>
      <div className="card-body">
        {message.message !== undefined ? <Alert data={message} /> : null}

        {/* <form> */}
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label className="col-form-label">Alamat</label>
          </div>
          <div className="col-10">
            <input
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
              type="text"
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
              No Polisi
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={noPolisi}
              onChange={useCallback((e) => {
                setNoPolisi(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Merk Kendaraan
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={merk}
              onChange={useCallback((e) => {
                setMerk(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Permasalahan
            </label>
          </div>
          <div className="col-10">
            <textarea
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={permasalahan}
              onChange={useCallback((e) => {
                setPermasalahan(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Pelayanan
            </label>
          </div>
          <div className="col-10">
            <select
              className="form-select"
              aria-label="Default select example"
              value={pelayanan}
              onChange={useCallback((e) => {
                setPelayanan(e.target.value);
              }, [])}
            >
              <option value="booking">Booking</option>
              <option value="home service">Home Services</option>
            </select>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Status
            </label>
          </div>
          <div className="col-10">
            <select
              className="form-select"
              aria-label="Default select example"
              value={status}
              onChange={useCallback((e) => {
                setStatus(e.target.value);
              }, [])}
            >
              <option value="pending">Pending</option>
              <option value="progres">Progres</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2"></div>
          <div className="col-10">
            <Button
              className="me-3"
              color="primary"
              onclick={() => addDataPesanan()}
            >
              Tambah
            </Button>
            <Button
              className="me-3"
              color="danger"
              onclick={() => navigate("/pesanan")}
            >
              Kembali
            </Button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default EditPesanan;
