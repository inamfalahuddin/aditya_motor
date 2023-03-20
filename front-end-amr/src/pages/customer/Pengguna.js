import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwt_decode from "jwt-decode";
import Alert from "../../components/Alert";

function Pengguna() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [dataPengguna, setDataPengguna] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState({ old: "", new: "" });
  const [message, setMessage] = useState({});
  const [rekening, setRekening] = useState({});

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "pengguna" });

    if (state.token.bearer === "") {
      auth();
    }
  }, []);

  useEffect(() => {
    if (state.token.bearer) {
      const decode = jwt_decode(state.token.bearer);

      getDataPengguna(decode.id_customer);
      getRekening();
    }
  }, [state.token.bearer]);

  const getDataPengguna = async (id) => {
    try {
      const response = await axiosPrivate.get(`customer/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });
      const data = response.data.data;

      setUsername(data[0].username);
      setAlamat(data[0].alamat);
      setDataPengguna(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRekening = async () => {
    try {
      const response = await axiosPrivate.get(`rekening`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });
      const data = response.data.data[0];

      setRekening({
        nama: data.atas_nama,
        bank: data.nama_bank,
        no_rek: data.no_rekening,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateDataPengguna = async (e) => {
    try {
      if (isEdit) {
        const id = jwt_decode(state.token.bearer).id_customer;
        const response = await axiosPrivate.put(
          `customer/${id}`,
          {
            username: username,
            alamat: alamat,
          },
          {
            headers: {
              Authorization: `Bearer ${state.token.bearer}`,
            },
          }
        );

        if (response.status === 200) {
          const response = await axiosPrivate.get(`customer/${id}`, {
            headers: {
              Authorization: `Bearer ${state.token.bearer}`,
            },
          });

          setDataPengguna(response.data.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateRekening = async (e) => {
    try {
      if (isEdit) {
        const id = jwt_decode(state.token.bearer).id_customer;
        const response = await axiosPrivate.put(`rekening`, rekening, {
          headers: {
            Authorization: `Bearer ${state.token.bearer}`,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updatePassword = async (e) => {
    try {
      if (isEdit) {
        const id = jwt_decode(state.token.bearer).id_customer;
        const response = await axiosPrivate.put(
          `auth/pwdchange?id=${id}`,
          {
            old: password.old,
            new: password.new,
          },
          {
            headers: {
              Authorization: `Bearer ${state.token.bearer}`,
            },
          }
        );

        setMessage({ message: response.data.message, color: "success" });
      }
    } catch (err) {
      // console.log(err);
      setMessage({ message: err.response.data.message, color: "danger" });
    }
  };

  return (
    <>
      {message.message !== undefined ? <Alert data={message} /> : null}

      <div className="card">
        <div className="card-header bg-danger text-white">
          <img src={IconData} alt="icon pengguna" />
          <span className="ms-3">Data Pengguna</span>
        </div>
        <div className="card-body">
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Username
              </label>
            </div>
            <div className="col-10">
              {isEdit ? (
                <input
                  className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              ) : (
                <span className="py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                  {dataPengguna[0] && dataPengguna[0].username}
                </span>
              )}
            </div>
          </div>
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Alamat
              </label>
            </div>
            <div className="col-10">
              {isEdit ? (
                <input
                  className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                  type="text"
                  value={alamat}
                  onChange={(e) => {
                    setAlamat(e.target.value);
                  }}
                />
              ) : (
                <span className="py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                  {dataPengguna[0] && dataPengguna[0].alamat}
                </span>
              )}
            </div>
          </div>
          {state.role === "user" ? null : (
            <div className="row g-3 px-4 align-items-center mb-4">
              <div className="col-2">
                <label htmlFor="inputPassword6" className="col-form-label">
                  No Rekening
                </label>
              </div>
              <div className="col-10">
                {isEdit ? (
                  <>
                    <input
                      className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control mb-3"
                      type="text"
                      value={rekening.nama}
                      onChange={(e) => {
                        setRekening({
                          ...rekening,
                          nama: e.target.value,
                        });
                      }}
                    />
                    <input
                      className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control mb-3"
                      type="text"
                      value={rekening.bank}
                      onChange={(e) => {
                        setRekening({
                          ...rekening,
                          bank: e.target.value,
                        });
                      }}
                    />
                    <input
                      className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control mb-3"
                      type="text"
                      value={rekening.no_rek}
                      onChange={(e) => {
                        setRekening({
                          ...rekening,
                          no_rek: e.target.value,
                        });
                      }}
                    />
                  </>
                ) : (
                  <span className="py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                    {rekening.no_rek}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Ubah Password
              </label>
            </div>
            <div className="col-10">
              {isEdit ? (
                <div className="row">
                  <div className="col">
                    <input
                      className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                      type="password"
                      placeholder="Masukan password lama"
                      value={password.old}
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          old: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col">
                    <input
                      className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
                      type="password"
                      placeholder="Masukan password baru"
                      value={password.new}
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          new: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col">
                    <Button
                      className="me-3"
                      color="danger"
                      onclick={() => {
                        updatePassword();
                      }}
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              ) : (
                <span className="py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                  ***********
                </span>
              )}
            </div>
          </div>
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2"></div>
            <div className="col-10">
              <Button
                className="me-3"
                color="danger"
                onclick={() => navigate("/dashboard")}
              >
                Kembali
              </Button>
              <Button
                className="me-3"
                color="primary"
                onclick={useCallback(() => {
                  setIsEdit(!isEdit);
                  updateDataPengguna();
                  updateRekening();
                }, [isEdit, username, alamat, rekening])}
              >
                {isEdit ? "Selesai Edit" : "Edit Sekarang"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pengguna;
