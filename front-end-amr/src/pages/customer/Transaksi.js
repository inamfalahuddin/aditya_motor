import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import Toolbar from "../../components/Toolbar";
import Action from "../../components/Action";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwt_decode from "jwt-decode";

function Transaksi() {
  const [state, dispatch] = useAppContext();
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "transaksi" });
    if (state.token.bearer === "") {
      refresh();
    }
  }, []);

  useEffect(() => {
    if (state.token.bearer) {
      const decode = jwt_decode(state.token.bearer);

      if (decode.role === "admin") {
        getTransaksiAll();
      } else {
        getTransaksiById(decode.id_customer);
      }
    }
  }, [state.token]);

  const getTransaksiAll = async () => {
    try {
      const response = await axiosPrivate.get("transaksi/all", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataTransaksi(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTransaksiById = async (id) => {
    console.log(id);
    try {
      const response = await axiosPrivate.get(`transaksi/user/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataTransaksi(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dataTransaksi);

  return (
    <div>
      <div className="card">
        <Toolbar />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Tanggal</td>
                <td>Nama Lengkap</td>
                <td>No Polisi</td>
                <td>Merk Kendaraan</td>
                <td>Nama Mekanik</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {dataTransaksi.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={7}>Tidak ada transaksi</td>
                </tr>
              ) : (
                dataTransaksi &&
                dataTransaksi.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{data.tanggal}</td>
                    <td className="text-capitalize">{data.username}</td>
                    <td>{data.no_polisi}</td>
                    <td>{data.merk_kendaraan}</td>
                    <td>{data.nama_mekanik}</td>
                    <td>
                      <Action />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transaksi;
