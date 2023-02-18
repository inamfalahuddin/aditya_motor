import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwtDecode from "jwt-decode";
import Alert from "../../components/Alert";

function AddPesanan() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [noPolisi, setNoPolisi] = useState("");
  const [merk, setMerk] = useState(0);
  const [permasalahan, setPermasalahan] = useState(0);
  const [pelayanan, setPelayanan] = useState("");
  const [tanggal, setTanggal] = useState("Otomatis");
  const [jam, setJam] = useState("Otomatis");

  const [message, setMessage] = useState({});

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "tambah pesanan" });

    auth();
  }, []);

  const addDataKendaraan = async () => {
    try {
      if (formValidation()) {
        const response = await axiosPrivate.post(
          "/pesanan",
          {
            nama_customer: nama,
            alamat: alamat,
            no_hp: noHp,
            no_polisi: noPolisi,
            merk_kendaraan: merk,
            permasalahan: permasalahan,
            pelayanan: pelayanan,
          },
          {
            withCredentials: true,
          }
        );

        setMessage({ message: response.data.message, color: "success" });
      }
    } catch (err) {
      setMessage({ message: err.response.data.message, color: "danger" });
    }
  };

  const formValidation = () => {
    if (noPolisi === "") {
      setMessage({ message: "Nomor Polisi wajib di isi", color: "warning" });
      return false;
    } else {
      if (nama === "") {
        setMessage({
          message: "Nama wajib di isi",
          color: "warning",
        });
        return false;
      } else {
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
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Tambah Data Peseanan</span>
      </div>
      <div className="card-body">
        {message.message !== undefined ? <Alert data={message} /> : null}

        {/* <form> */}
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label className="col-form-label">Nama Lengkap</label>
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
              type="number"
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
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={pelayanan}
              onChange={useCallback((e) => {
                setPelayanan(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Tanggal
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={tanggal}
              onChange={useCallback((e) => {
                setTanggal(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Jam
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={jam}
              onChange={useCallback((e) => {
                setJam(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2"></div>
          <div className="col-10">
            <Button
              className="me-3"
              color="primary"
              onclick={() => addDataKendaraan()}
            >
              Tambah
            </Button>
            <Button
              className="me-3"
              color="danger"
              onclick={() => navigate("/kendaraan")}
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

export default AddPesanan;
