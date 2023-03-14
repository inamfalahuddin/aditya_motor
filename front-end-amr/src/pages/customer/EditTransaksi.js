import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconData from "../../images/icon-data.svg";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/usePrivate";
import Alert from "../../components/Alert";
import Rupiah from "../../helper/Rupiah";

function EditBarang() {
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
  const [barangParse, setBarangParse] = useState([]);
  const [getTransaksi, setGetTransaksi] = useState([]);

  const { id: idTransaksi } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "edit transaksi" });

    auth();
    getDataTransaksi();
  }, []);

  useEffect(() => {
    getBarang();
    getMekanik();
  }, [state.token.bearer]);

  useEffect(() => {
    let sum = 0;
    const total = barangParse.map((data) => {
      sum += data.harga;
    });

    setHarga(sum + Number(dataTransaksi.biaya_operasi));
    updateBarang();
  }, [barang, harga, dataTransaksi.biaya_operasi]);

  useEffect(() => {
    barang.map((val) => {
      setBarangParse([...barangParse, JSON.parse(val)]);
    });
  }, [barang]);

  useEffect(() => {
    getDataPesanan();
  }, [id]);

  const updateBarang = (e) => {
    if (e) {
      let index = e.target.getAttribute("index");

      const result = barangParse.filter((val, i) => {
        return Number(index) !== Number(i);
      });

      setBarangParse(result);
    }

    setDataTransaksi({
      ...dataTransaksi,
      barang: JSON.stringify(barangParse),
      qty: barangParse.length,
      total: harga,
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
      setMessage({
        message: err.response.data.message.sqlMessage,
        color: "danger",
      });
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
      setMessage({
        message: err.response.data.message.sqlMessage,
        color: "danger",
      });
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
      setMessage({
        message: err.response.data.message.sqlMessage,
        color: "danger",
      });
    }
  };

  const editTransaksi = async () => {
    try {
      const response = await axiosPrivate.put(
        `transaksi/${idTransaksi}`,
        dataTransaksi,
        {
          headers: {
            Authorization: `Bearer ${state.token.bearer}`,
          },
        }
      );
      setMessage({
        message: response.data.message,
        color: "success",
      });
    } catch (err) {
      setMessage({
        message: err.response.data.message.sqlMessage,
        color: "danger",
      });
    }
  };

  const getDataTransaksi = async () => {
    try {
      const response = await axiosPrivate.get(`/transaksi/${idTransaksi}`);
      const data = response.data.data[0];

      setGetTransaksi(data);
      setBarangParse(JSON.parse(data.barang));
      setNamaPemesan(data.username);
      // setBarangParse(...barangParse, response.data.data[0].barang);
    } catch (err) {
      setMessage({
        message: err.response.data.message.sqlMessage,
        color: "danger",
      });
    }
  };

  return (
    <>
      {message.message !== undefined ? <Alert data={message} /> : null}

      <div className="card">
        <div className="card-header bg-danger text-white">
          <img src={IconData} alt="icon pengguna" />
          <span className="ms-3">Edit Data Transaksi</span>
        </div>
        <div className="card-body">
          {/* <form> */}
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label className="col-form-label">ID - Nama Pemesan</label>
            </div>
            <div className="col-10">
              <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100 border-0 form-control text-capitalize">
                {dataTransaksi.length !== 0 ? namaPemesan : "tidak ada"}
              </span>
            </div>
          </div>
          <div className="row g-3 px-4 mb-4">
            <div className="col-2">
              <label className="col-form-label">Nama Barang</label>
            </div>
            <div className="col-10">
              <div className="row px-2">
                <div className="col-8 border rounded p-2">
                  {barangParse.length > 0
                    ? barangParse.map((data, i) => (
                        <span
                          key={i}
                          className="bg-light rounded px-2 py-1 m-1 d-inline-block"
                          style={{ cursor: "pointer" }}
                          index={i}
                          onClick={updateBarang}
                        >
                          {data.nama}
                        </span>
                      ))
                    : "Tidak ada data"}
                </div>
                <div className="col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setBarang([...barang, e.target.value]);
                      }
                    }}
                  >
                    <option value={""}>--- Pilih Barang ---</option>
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
                    id_mekanik: JSON.parse(e.target.value).idMekanik,
                  });
                }}
              >
                <option value={""}>--- Pilih Nama Mekanik ---</option>
                {mekanik.map((data, i) => (
                  <option
                    className="text-capitalize"
                    key={i}
                    value={JSON.stringify({
                      idMekanik: data.id_mekanik,
                    })}
                    selected={getTransaksi.nama_mekanik === data.nama_mekanik}
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
                Biaya Operasional
              </label>
            </div>
            <div className="col-10">
              <input
                type="number"
                className="border py-2 px-4 rounded-2 d-inline-block w-100 form-control"
                placeholder="200000"
                onChange={(e) => {
                  setDataTransaksi({
                    ...dataTransaksi,
                    biaya_operasi: e.target.value,
                  });
                }}
              />
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
                {barangParse.length}
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
                  {barangParse &&
                    barangParse.map((data, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{data.nama}</td>
                        <td>{Rupiah(data.harga)}</td>
                      </tr>
                    ))}
                  <tr>
                    <td colSpan={2}>Biaya Operasi</td>
                    <td>
                      {dataTransaksi.biaya_operasi === 0
                        ? 0
                        : Rupiah(dataTransaksi.biaya_operasi)}
                    </td>
                  </tr>
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
                onclick={() => editTransaksi()}
              >
                Perbarui Data
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
    </>
  );
}

export default EditBarang;
