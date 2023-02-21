import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwt_decode from "jwt-decode";

function Pengguna() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [dataPengguna, setDataPengguna] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [alamat, setAlamat] = useState("");

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

  return (
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
              }, [isEdit, username, alamat])}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pengguna;
