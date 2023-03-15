import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import Alert from "../../components/Alert";
import jwtDecode from "jwt-decode";

function EditMekanik() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [jabatan, setJabatan] = useState("");

  const [message, setMessage] = useState({});

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "edit barang" });

    auth();
  }, []);

  useEffect(() => {
    getDataMekanik(id);

    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  const editDataMekanik = async () => {
    try {
      if (formValidation()) {
        const response = await axiosPrivate.put(
          `/mekanik/${id}`,
          {
            nama_mekanik: nama,
            alamat: alamat,
            no_hp: noHp,
            jabatan: jabatan,
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

  const getDataMekanik = async (id) => {
    try {
      const response = await axiosPrivate.get(`mekanik/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      const data = response.data.data[0];

      setNama(data.nama_mekanik);
      setAlamat(data.alamat);
      setNoHp(data.no_hp);
      setJabatan(data.jabatan);
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
      if (alamat === "") {
        setMessage({
          message: "alamat hp wajib di isi",
          color: "warning",
        });
        return false;
      } else {
        if (noHp === "") {
          setMessage({
            message: "No hp wajib di isi",
            color: "warning",
          });
          return false;
        } else {
          if (noHp === "") {
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
    }
  };

  return (
    <>
      {message.message !== undefined ? <Alert data={message} /> : null}

      <div className="card">
        <div className="card-header bg-danger text-white">
          <img src={IconData} alt="icon pengguna" />
          <span className="ms-3">Edit Data Mekanik</span>
        </div>
        <div className="card-body">
          {/* <form> */}
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Nama Mekanik
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
            <div className="col-2"></div>
            <div className="col-10">
              <Button
                className="me-3"
                color="success"
                onclick={editDataMekanik}
              >
                Edit Data Mekanik
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
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

export default EditMekanik;
