import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwt_decode from "jwt-decode";
import Rupiah from "../../helper/Rupiah";

function Pembayaran() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [dataDetail, setDataDetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "pembayaran" });

    if (state.token.bearer === "") {
      auth();
    }

    getDataTransaksi();
  }, []);

  const getDataTransaksi = async () => {
    try {
      const response = await axiosPrivate.get(`transaksi/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      console.log(response);
      setDataDetail(response.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Pembayaran Debit</span>
      </div>
      <div className="card-body">
        <div className="row g-3 px-4 align-items-start mb-4">
          <div className="col-12">
            <h1>Invoice #{id}</h1>
          </div>
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Nama Lengkap
            </label>
          </div>
          <div className="col-10">
            <span>:</span>
            <span className="py-2 px-4 rounded-2 w-100 text-capitalize">
              {dataDetail.username}
            </span>
          </div>
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Rincian Biaya
            </label>
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
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Nomor Rekening Tujuan
            </label>
          </div>
          <div className="col-10">
            <span className="py-2 rounded-2 w-100 text-capitalize">
              a.n In'am Falahuddin
            </span>
            <h5>#784312135689232 - BRI</h5>
            <h5>#784312135689232 - BCA</h5>
            <h5>#784312135689232 - Mandiri</h5>
          </div>{" "}
        </div>

        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Upload Bukti Pembayaran
            </label>
          </div>
          <div className="col-10">
            <input
              className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control"
              type="file"
            />
          </div>
        </div>

        <div className="row g-3 px-4 align-items-center mb-4">
          <div className="col-2"></div>
          <div className="col-10">
            <Button
              className="me-3"
              color="primary"
              onclick={() => navigate("/transaksi")}
            >
              Kirim
            </Button>
            <Button
              className="me-3"
              color="danger"
              onclick={() => navigate("/transaksi")}
            >
              Kembali
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pembayaran;
