import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwtDecode from "jwt-decode";
import Alert from "../../components/Alert";
import Rupiah from "../../helper/Rupiah";

function AddTransaksi() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [message, setMessage] = useState({});

  const [namaPemesan, setNamaPemesan] = useState([]);
  const [namaBarang, setNamaBarang] = useState([]);
  const [barang, setBarang] = useState([]);
  const [harga, setHarga] = useState([]);
  const [pesanan, setPesanan] = useState([]);
  const [mekanik, setMekanik] = useState([]);
  const [id, setId] = useState("");
  const [dataTransaksi, setDataTransaksi] = useState({});

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "tambah transaksi" });

    auth();
  }, []);

  useEffect(() => {
    getNamaPemesan();
    getBarang();
    getMekanik();
  }, [state.token.bearer]);

  useEffect(() => {
    let sum = 0;
    const total = barang.map((data) => {
      sum += JSON.parse(data).harga;
    });
    setHarga(sum);
    updateBarang();
  }, [barang]);

  useEffect(() => {
    getDataPesanan();
  }, [id]);

  const updateBarang = (e) => {
    if (e) {
      let index = e.target.getAttribute("index");

      const result = barang.filter((val) => {
        return Number(JSON.parse(val).id) !== Number(index);
      });
      setBarang(result);
    }

    setDataTransaksi({
      ...dataTransaksi,
      barang: barang,
      qty: barang.length,
      permasalahan: pesanan.permasalahan,
    });
  };

  const getMekanik = async () => {
    try {
      const response = await axiosPrivate.get(`/mekanik/all`, {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setMekanik(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataPesanan = async () => {
    try {
      if (id !== "") {
        const response = await axiosPrivate.get(`/pesanan/${id}`, {
          headers: {
            Authorization: `Bearer ${state.token.bearer}`,
          },
        });

        setPesanan(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getNamaPemesan = async () => {
    try {
      const response = await axiosPrivate.get("/pesanan/completed", {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setNamaPemesan(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBarang = async () => {
    try {
      const response = await axiosPrivate.get("barang/all", {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setNamaBarang(response.data.data);
    } catch (err) {
      console.log(err.response.message);
    }
  };

  const addTransaksi = async () => {
    console.log(dataTransaksi);
  };

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <img src={IconData} alt="icon pengguna" />
        <span className="ms-3">Tambah Data Transaksi</span>
      </div>
      <div className="card-body">
        {message.message !== undefined ? <Alert data={message} /> : null}

        {/* <form> */}
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label className="col-form-label">ID - Nama Pemesan</label>
          </div>
          <div className="col-10">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setId(e.target.value);
                setDataTransaksi({
                  ...dataTransaksi,
                  id: e.target.value,
                });
              }}
            >
              <option value={""}>--- Pilih Pesanan ---</option>
              {namaPemesan.map((data, i) => (
                <option key={i} value={data.id_pesanan}>
                  {data.id_pesanan} - {data.username} - {data.jam}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label className="col-form-label">Nama Barang</label>
          </div>
          <div className="col-10">
            <div className="row px-2">
              <div className="col-8 border rounded p-2">
                {barang.map((data, i) => (
                  <span
                    key={i}
                    className="bg-light rounded px-2 py-1 m-1 d-inline-block"
                    style={{ cursor: "pointer" }}
                    index={JSON.parse(data).id}
                    onClick={updateBarang}
                  >
                    {JSON.parse(data).nama}
                  </span>
                ))}
              </div>
              <div className="col-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setBarang([...barang, e.target.value]);
                  }}
                >
                  {namaBarang &&
                    namaBarang.map((data, i) => (
                      <option
                        key={i}
                        value={JSON.stringify({
                          id: data.id_barang,
                          nama: data.nama_barang,
                          harga: data.harga_barang,
                        })}
                      >
                        {data.nama_barang}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Nama Mekanik
            </label>
          </div>
          <div className="col-10">
            <select
              className="form-select text-capitalize"
              aria-label="Default select example"
              onChange={(e) => {
                setDataTransaksi({
                  ...dataTransaksi,
                  id_mekanik: e.target.value,
                });
              }}
            >
              <option value={""}>--- Pilih Nama Mekanik ---</option>
              {mekanik.map((data, i) => (
                <option
                  className="text-capitalize"
                  key={i}
                  value={data.id_mekanik}
                >
                  {data.nama_mekanik}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Merk Kendaraan
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control">
              {pesanan.length !== 0 ? pesanan.merk_kendaraan : "tidak ada"}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              No Polisi
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control">
              {pesanan.length !== 0 ? pesanan.no_polisi : "tidak ada"}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Qty
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control">
              {barang.length}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Permasalahan
            </label>
          </div>
          <div className="col-10">
            <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control">
              {pesanan.length !== 0 ? pesanan.permasalahan : "tidak ada"}
            </span>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2">
            <label htmlFor="inputPassword6" className="col-form-label">
              Harga Barang
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
                {barang &&
                  barang.map((data, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{JSON.parse(data).nama}</td>
                      <td>{Rupiah(JSON.parse(data).harga)}</td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan={2}>Total</td>
                  <td>Rp. {harga === 0 ? 0 : Rupiah(harga)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row g-3 px-4 mb-4">
          <div className="col-2"></div>
          <div className="col-10">
            <Button
              className="me-3"
              color="primary"
              onclick={() => addTransaksi()}
            >
              Buat Transaksi
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
        {/* </form> */}
      </div>
    </div>
  );
}

export default AddTransaksi;
