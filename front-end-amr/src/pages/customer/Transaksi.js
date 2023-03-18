import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/app-context";
import Toolbar from "../../components/Toolbar";
import Action from "../../components/Action";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/usePrivate";
import jwt_decode from "jwt-decode";
import Alert from "../../components/Alert";
import { useReactToPrint } from "react-to-print";

function Transaksi() {
  const [state, dispatch] = useAppContext();
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  const [role, setRole] = useState("");

  const componentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("print sukses"),
  });

  useEffect(() => {
    if (state.isPrint) {
      handlePrint();
      dispatch({ type: "SET_PRINT", payload: false });
    }
  }, [state.isPrint]);

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "transaksi" });
    dispatch({
      type: "SET_MESSAGE",
      payload: {},
    });

    if (state.token.bearer === "") {
      refresh();
    }
  }, []);

  useEffect(() => {
    if (state.token.bearer) {
      const decode = jwt_decode(state.token.bearer);
      setRole(decode.role);

      if (decode.role === "admin") {
        getTransaksiAll();
      } else {
        getTransaksiByCustId(decode.id_customer);
      }
    }
  }, [state.token.bearer]);

  useEffect(() => {
    setDataTransaksi(state.data.transaksi);
  }, [state.data]);

  const getTransaksiAll = async () => {
    try {
      const response = await axiosPrivate.get("transaksi/all", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      // setDataTransaksi(response.data.data);
      dispatch({
        type: "SET_DATA",
        payload: {
          ...state.data,
          transaksi: response.data.data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getTransaksiByCustId = async (id) => {
    try {
      const custId = jwt_decode(state.token.bearer).id_customer;
      const response = await axiosPrivate.get(`transaksi/user/${custId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      dispatch({
        type: "SET_DATA",
        payload: {
          ...state.data,
          transaksi: response.data.data,
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
        <Toolbar to="/transaksi/add" />
        <div className="card-body m-0 p-0" ref={componentsRef}>
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Tanggal</td>
                <td>Username</td>
                <td>No Polisi</td>
                <td>Merk Kendaraan</td>
                <td>Nama Mekanik</td>
                {state.isPrint ? null : <td>Action</td>}
              </tr>
            </thead>
            <tbody>
              {dataTransaksi && dataTransaksi.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={7}>Tidak ada transaksi</td>
                </tr>
              ) : (
                dataTransaksi &&
                dataTransaksi.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td className="text-capitalize">{data.tanggal}</td>
                    <td className="text-capitalize">{data.username}</td>
                    <td className="text-capitalize">{data.no_polisi}</td>
                    <td className="text-capitalize">{data.merk_kendaraan}</td>
                    <td className="text-capitalize">{data.nama_mekanik}</td>
                    <td>
                      {state.isPrint ? null : (
                        <Action
                          detail={
                            data.status
                              ? `/pembayaran/${data.id_transaksi}`
                              : `/transaksi/detail/${data.id_transaksi}`
                          }
                          edit={`/transaksi/edit/${data.id_transaksi}`}
                          remove={`/transaksi/${data.id_transaksi}`}
                          accessed={role}
                        />
                      )}
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
