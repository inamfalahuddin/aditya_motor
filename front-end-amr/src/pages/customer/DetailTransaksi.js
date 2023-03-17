import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { redirect, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import Rupiah from "../../helper/Rupiah";
import ModalBayar from "../../components/ModalBayar";

function DetailTransaksi() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [dataDetail, setDataDetail] = useState([]);
  const [dataPembayaran, setDataPembayaran] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "detail transaksi" });

    if (state.token.bearer === "") {
      auth();
    }
  }, []);

  useEffect(() => {
    if (state.token.bearer) {
      //   const decode = jwt_decode(state.token.bearer);
      getDataTransaksi(id);
    }
    getPembayaran();
  }, [state.token.bearer]);

  const getDataTransaksi = async (id) => {
    try {
      const response = await axiosPrivate.get(`transaksi/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataDetail(response.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getPembayaran = async () => {
    try {
      const response = await axiosPrivate.get(`pembayaran/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataPembayaran(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const btnBayar = useCallback(() => {
    dispatch({ type: "SET_MODAL", payload: !state.isModal });
  }, []);

  useEffect(() => {
    if (dataPembayaran.length > 0) {
      navigate(`/pembayaran/${id}`);
    }
  }, [dataPembayaran]);

  return (
    <>
      {state.role === "admin" ? null : (
        <ModalBayar id={dataDetail.id_transaksi} />
      )}
      <div className="card">
        <div className="card-header bg-danger text-white">
          <img src={IconData} alt="icon pengguna" />
          <span className="ms-3">Detail Data Transaksi</span>
        </div>
        <div className="card-body">
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Nama Lengkap
              </label>
            </div>
            <div className="col-10">
              <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                {dataDetail && dataDetail.username}
              </span>
            </div>
          </div>
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                No Polisi
              </label>
            </div>
            <div className="col-10">
              <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
                {dataDetail && dataDetail.no_polisi}
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
              <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                {dataDetail && dataDetail.merk_kendaraan}
              </span>
            </div>
          </div>
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Nama Mekanik
              </label>
            </div>
            <div className="col-10">
              <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                {dataDetail && dataDetail.nama_mekanik}
              </span>
            </div>
          </div>
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label className="col-form-label">Detail Barang</label>
            </div>
            <div className="col-10">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDetail.barang &&
                    JSON.parse(dataDetail.barang).map((data, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{data.nama}</td>
                        <td>{Rupiah(data.harga)}</td>
                      </tr>
                    ))}
                  <tr>
                    <td colSpan={2} className="fw-bold">
                      Biaya Operasi
                    </td>
                    <td>
                      {dataDetail.biaya_operasi &&
                        Rupiah(dataDetail.biaya_operasi)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="fw-bold">
                      Total
                    </td>
                    <td className="fw-bold">
                      Rp. {dataDetail.total && Rupiah(dataDetail.total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Qty
              </label>
            </div>
            <div className="col-10">
              <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                {dataDetail && dataDetail.qty}
              </span>
            </div>
          </div>
          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                Permasalahan
              </label>
            </div>
            <div className="col-10">
              <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 text-capitalize">
                {dataDetail && dataDetail.permasalahan}
              </span>
            </div>
          </div>

          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-2"></div>
            <div className="col-10">
              {state.role === "admin" ? null : (
                <Button
                  className="me-3"
                  color="success"
                  //   onclick={() => navigate("/transaksi")}
                  onclick={btnBayar}
                >
                  Bayar
                </Button>
              )}
              <Button
                className="me-3"
                color="danger"
                onclick={() => {
                  navigate("/transaksi");
                }}
              >
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailTransaksi;
