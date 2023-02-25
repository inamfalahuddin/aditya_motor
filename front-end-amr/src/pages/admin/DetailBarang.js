import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwt_decode from "jwt-decode";

function DetailBarangf() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [dataDetail, setDataDetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "detail kendaraan" });

    if (state.token.bearer === "") {
      auth();
    }
  }, []);

  useEffect(() => {
    if (state.token.bearer) {
      const decode = jwt_decode(state.token.bearer);

      if (decode.role === "user") {
        navigate(`/dashboard`);
      }

      getDetailDataKendaraan(id);
    }
  }, [state.token.bearer]);

  const getDetailDataKendaraan = async (id) => {
    try {
      const response = await axiosPrivate.get(`kendaraan/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataDetail(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Detail Data Kendaraan</span>
      </div>
      <div className="card-body">
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              No Polisi
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
              {dataDetail[0] && dataDetail[0].nomor_polisi}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Warna Kendaraan
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
              {dataDetail[0] && dataDetail[0].warna_kendaraan}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Merk Kendaraan
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
              {dataDetail[0] && dataDetail[0].merk_kendaraan}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Jenis
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
              {dataDetail[0] && dataDetail[0].jenis_model}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Tahun Kendaraan
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
              {dataDetail[0] && dataDetail[0].tahun_kendaraan}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Isi / Cylinder
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
              {dataDetail[0] && dataDetail[0].isi_silinder}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Bahan Bakar
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
              {dataDetail[0] && dataDetail[0].bahan_bakar}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2"></div>
          <div className="col-10">
            <Button
              className="me-3"
              color="danger"
              onclick={() => navigate("/barang")}
            >
              Kembali
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBarangf;
