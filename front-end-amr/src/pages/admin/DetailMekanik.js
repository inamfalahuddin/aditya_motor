/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import UserProfile from "../../images/icon-user-dark.svg";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";

function DetailMekanik() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [dataMekanik, setDataMekanik] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "tambah mekanik" });

    if (state.token.bearer === "") {
      auth();
    }
  }, []);

  useEffect(() => {
    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }

    getDetailMekanik(id);
  }, []);

  const getDetailMekanik = async (id) => {
    try {
      const response = await axiosPrivate.get(`mekanik/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataMekanik(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Tambah Data Mekanik</span>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col col-8">
            <div className="row g-3 px-4 align-items-center mb-4">
              <div className="col-2">
                <label htmlFor="inputPassword6" className="col-form-label">
                  Nama Mekanik
                </label>
              </div>
              <div className="col-10">
                <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
                  {dataMekanik[0] && dataMekanik[0].nama_mekanik}
                </span>
              </div>
            </div>
            <div className="row g-3 px-4 align-items-center mb-4">
              <div className="col-2">
                <label htmlFor="inputPassword6" className="col-form-label">
                  Alamat
                </label>
              </div>
              <div className="col-10">
                <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
                  {dataMekanik[0] && dataMekanik[0].alamat}
                </span>
              </div>
            </div>
            <div className="row g-3 px-4 align-items-center mb-4">
              <div className="col-2">
                <label htmlFor="inputPassword6" className="col-form-label">
                  No Hp
                </label>
              </div>
              <div className="col-10">
                <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
                  {dataMekanik[0] && dataMekanik[0].no_hp}
                </span>
              </div>
            </div>
            <div className="row g-3 px-4 align-items-center mb-4">
              <div className="col-2">
                <label htmlFor="inputPassword6" className="col-form-label">
                  Jabatan
                </label>
              </div>
              <div className="col-10">
                <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
                  {dataMekanik[0] && dataMekanik[0].jabatan}
                </span>
              </div>
            </div>
            <div className="row g-3 px-4 align-items-center mb-4">
              <div className="col-2"></div>
              <div className="col-10">
                <Button
                  className="me-3"
                  color="danger"
                  onclick={() => navigate("/mekanik")}
                >
                  Kembali
                </Button>
              </div>
            </div>
          </div>
          <div className="col col-4">
            <img
              className="img-thumbnail bg-light border-0 p-2"
              src={UserProfile}
              alt="profile image"
              style={{ width: "75%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMekanik;
