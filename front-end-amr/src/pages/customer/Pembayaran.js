import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwt_decode from "jwt-decode";
import Rupiah from "../../helper/Rupiah";
import Alert from "../../components/Alert";
import axios from "../../api/axios";

function Pembayaran() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [dataDetail, setDataDetail] = useState([]);
  const [rekening, setRekening] = useState([]);
  const [message, setMessage] = useState({});
  const [pembayaran, setPembayaran] = useState([]);

  const [selectedFile, setSelectedFile] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "pembayaran" });

    if (state.token.bearer === "") {
      auth();
    }

    getDataTransaksi();
    getRekening();
  }, []);

  useEffect(() => {
    getDataPembayaran();
  }, [state.token.bearer]);

  const getDataTransaksi = async () => {
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

  const getDataPembayaran = async () => {
    try {
      const response = await axiosPrivate.get(`pembayaran/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setPembayaran(response.data.data);
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

  const submit = async (e) => {
    e.preventDefault();

    console.log("event submit ok");

    if (state.isPembayaran.metode === "debit") {
      const dataFile = new FormData();

      dataFile.append("id_transaksi", id);
      dataFile.append("metode", state.isPembayaran.metode);
      dataFile.append("bukti_pembayaran", selectedFile);
      dataFile.append("status", "pending");

      if (selectedFile !== "") {
        try {
          const response = await axios({
            method: "post",
            url: "/pembayaran",
            data: dataFile,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          setMessage({ message: "Pembayaran Berhasil", color: "success" });
          navigate(`/pembayaran/${id}`);
        } catch (err) {
          console.log(err);
          setMessage({ message: err.response.data.message, color: "danger" });
        }
      } else {
        if (state.isPembayaran.metode === "debit") {
          alert("mohon input bukti pembayaran!");
        }
      }
    }

    if (state.isPembayaran.metode === "cash") {
      const dataFile = new FormData();

      dataFile.append("id_transaksi", id);
      dataFile.append("metode", state.isPembayaran.metode);
      dataFile.append("bukti_pembayaran", "");
      dataFile.append("status", "pending");

      try {
        const response = await axios({
          method: "post",
          url: "/pembayaran",
          data: dataFile,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        navigate(`/pembayaran/${id}`);
        setMessage({ message: "Pembayaran Berhasil", color: "success" });
      } catch (err) {
        console.log(err);
        setMessage({ message: err.response.data.message, color: "danger" });
      }
    }
  };

  return (
    <>
      {message !== undefined ? <Alert data={message} /> : null}

      <div className="card">
        <div className="card-header bg-danger text-white">
          <img src={IconData} alt="icon pengguna" />
          <span className="ms-3">Pembayaran {state.isPembayaran.metode}</span>
        </div>
        <div className="card-body">
          <div className="row g-3 px-4 align-items-start mb-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h1>Invoice #{id}</h1>
              <span>{dataDetail.tanggal}</span>
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
          </div>

          {pembayaran && pembayaran.length === 0 ? null : (
            <Alert
              data={{
                message: `Berhasil ! status pembayaran anda saat ini  ${
                  pembayaran[0] && pembayaran[0].status
                } menggunakan metode ${
                  pembayaran[0] && pembayaran[0].metode
                }, mohon tunggu hinga tim kami mengkonfirmasikannya. Terimakasih atas kepercayaan anda`,
                color: "info",
              }}
            />
          )}

          {state.isPembayaran.metode === "cash" ? null : pembayaran[0] &&
            pembayaran[0].metode === "cash" ? null : pembayaran.length >
            0 ? null : (
            <>
              <div className="row g-3 px-4 mb-4">
                <div className="col-2">
                  <label htmlFor="inputPassword6" className="col-form-label">
                    Nomor Rekening Tujuan
                  </label>
                </div>
                <div className="col-10">
                  <span className="py-2 rounded-2 w-100 text-capitalize">
                    <span className="text-lowercase">a.n</span> {rekening.nama}
                  </span>
                  <h5>
                    {rekening.no_rek} - {rekening.bank}
                  </h5>
                </div>
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
                    name="bukti_pembayaran"
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </>
          )}

          <div className="row g-3 px-4 align-items-center mb-4">
            <div className="col-12">
              {pembayaran && pembayaran.length > 0 ? null : (
                <Button className="me-3" color="primary" onclick={submit}>
                  Kirim
                </Button>
              )}
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
    </>
  );
}

export default Pembayaran;
