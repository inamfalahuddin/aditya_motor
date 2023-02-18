import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwtDecode from "jwt-decode";
import Alert from "../../components/Alert";
import axios from "../../api/axios";

function EditKendaraan() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [idKendaraan, setIdKendaraan] = useState("");
  const [noPolisi, setNoPolisi] = useState("");
  const [warna, setWarna] = useState("");
  const [merk, setMerk] = useState("");
  const [jenis, setJenis] = useState("");
  const [tahun, setTahun] = useState("");
  const [cyilinder, setCyilinder] = useState("");
  const [bahanbakar, setBahanbakar] = useState("");

  const [message, setMessage] = useState({});

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "edit kendaraan" });

    auth();
  }, []);

  useEffect(() => {
    getDetailDataKendaraan(id);
  }, [state.token.bearer]);

  const addDataKendaraan = async () => {
    console.log(
      idKendaraan,
      noPolisi,
      warna,
      merk,
      jenis,
      tahun,
      cyilinder,
      bahanbakar
    );
    try {
      if (formValidation()) {
        const response = await axiosPrivate.put(
          `/kendaraan/${idKendaraan}`,
          {
            nomor_polisi: noPolisi,
            warna_kendaraan: warna,
            merk_kendaraan: merk,
            jenis_model: jenis,
            tahun_kendaraan: tahun,
            isi_silinder: cyilinder,
            bahan_bakar: bahanbakar,
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

  const getDetailDataKendaraan = async (id) => {
    try {
      const response = await axiosPrivate.get(`kendaraan/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      const data = response.data.data[0];

      setIdKendaraan(data.id_kendaraan);
      setNoPolisi(data.nomor_polisi);
      setWarna(data.warna_kendaraan);
      setMerk(data.merk_kendaraan);
      setJenis(data.jenis_model);
      setTahun(data.tahun_kendaraan);
      setCyilinder(data.isi_silinder);
      setBahanbakar(data.bahan_bakar);
    } catch (err) {
      console.log(err);
    }
  };

  const formValidation = () => {
    if (noPolisi === "") {
      setMessage({ message: "Nomor Polisi wajib di isi", color: "warning" });
      return false;
    } else {
      if (warna === "") {
        setMessage({
          message: "Warna kendaraan wajib di isi",
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
          if (jenis === "") {
            setMessage({
              message: "Jenis Kendaraan wajib di isi",
              color: "warning",
            });
            return false;
          } else {
            if (tahun === "") {
              setMessage({
                message: "Tahun kendaraan wajib di isi",
                color: "warning",
              });
              return false;
            } else {
              if (cyilinder === "") {
                setMessage({
                  message: "Cyilinder wajib di isi",
                  color: "warning",
                });
                return false;
              } else {
                if (bahanbakar === "") {
                  setMessage({
                    message: "Bahan bakar wajib di isi",
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
  };

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Edit Data Kendaraan</span>
      </div>
      <div className="card-body">
        {message.message !== undefined ? <Alert data={message} /> : null}

        {/* <form> */}
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label className="col-form-label">No Polisi</label>
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
            <label className="col-form-label">Warna Kendaraan</label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={warna}
              onChange={useCallback((e) => {
                setWarna(e.target.value);
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
              Jenis
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={jenis}
              onChange={useCallback((e) => {
                setJenis(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Tahun Kendaraan
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="number"
              value={tahun}
              onChange={useCallback((e) => {
                setTahun(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Isi / Cyilinder
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={cyilinder}
              onChange={useCallback((e) => {
                setCyilinder(e.target.value);
              }, [])}
            />
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Bahan Bakar
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="text"
              value={bahanbakar}
              onChange={useCallback((e) => {
                setBahanbakar(e.target.value);
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

export default EditKendaraan;
