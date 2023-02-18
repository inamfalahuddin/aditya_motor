import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import Toolbar from "../../components/Toolbar";
import useAxiosPrivate from "../../hooks/usePrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import Action from "../../components/Action";
import jwtDecode from "jwt-decode";
import Alert from "../../components/Alert";

function Pemesan() {
  const [state, dispatch] = useAppContext();
  const [dataPesanan, setDataPesanan] = useState();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "pesanan" });

    if (state.token.bearer === "") {
      refresh();
    }
  }, []);

  useEffect(() => {
    getDataPesanan();
  }, [state.token.bearer]);

  useEffect(() => {
    setDataPesanan(state.data.pesanan);
  }, [state.data.pesanan]);

  const getDataPesanan = async () => {
    try {
      const idCust = jwtDecode(state.token.bearer).id_customer;
      const response = await axiosPrivate.get(`pesanan/cust/${idCust}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      dispatch({
        type: "SET_DATA",
        payload: {
          ...state.data,
          pesanan: response.data.data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {state.message.message !== undefined ? (
        <Alert data={state.message} />
      ) : null}

      <div className="card">
        <Toolbar to="/pesanan/add" />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="border-start border-end bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Nama Lengkap</td>
                <td>Alamat</td>
                <td>No HP</td>
                <td>Pelayanan</td>
                <td>No Antrian</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="border-start border-end">
              {dataPesanan && dataPesanan.length > 0 ? (
                dataPesanan.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{data.username}</td>
                    <td>{data.alamat}</td>
                    <td>{data.no_hp}</td>
                    <td>{data.pelayanan}</td>
                    <td>{data.no_antrian}</td>
                    <td>{data.status}</td>
                    <td>
                      <Action
                        detail={`/pesanan/detail/${data.id_pesanan}`}
                        edit={`/pesanan/edit/${data.id_pesanan}`}
                        remove={`/pesanan/${data.id_pesanan}`}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={8} className="pt-4">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pemesan;