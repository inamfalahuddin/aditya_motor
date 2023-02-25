import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwt_decode from "jwt-decode";

function DetailSuplier() {
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

      getDetailSuplier(id);
    }
  }, [state.token.bearer]);

  const getDetailSuplier = async (id) => {
    try {
      const response = await axiosPrivate.get(`suplier/${id}`, {
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
              Nama
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
              {dataDetail[0] && dataDetail[0].nama_toko}
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
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
              {dataDetail[0] && dataDetail[0].alamat}
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
              {dataDetail[0] && dataDetail[0].no_hp}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2"></div>
          <div className="col-10">
            <Button
              className="me-3"
              color="danger"
              onclick={() => navigate("/suplier")}
            >
              Kembali
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSuplier;
