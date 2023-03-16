import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/app-context";
import Toolbar from "../../components/Toolbar";
import useAxiosPrivate from "../../hooks/usePrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import Action from "../../components/Action";
import jwtDecode from "jwt-decode";
import Alert from "../../components/Alert";
import { useReactToPrint } from "react-to-print";

function Pemesan() {
  const [state, dispatch] = useAppContext();
  const [dataPesanan, setDataPesanan] = useState();
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
    dispatch({ type: "SET_TITLE", payload: "pesanan" });

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
      setRole(jwtDecode(state.token.bearer).role);
    }

    if (role) {
      if (role === "admin") {
        state.token.bearer && getAllDataPesanan();
      } else {
        state.token.bearer && getDataPesanan();
      }
    }
  }, [state.token.bearer, role]);

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

  const getAllDataPesanan = async () => {
    try {
      const response = await axiosPrivate.get(`pesanan/all`, {
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
        <div className="card-body m-0 p-0" ref={componentsRef}>
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
                {state.isPrint ? null : <td>Action</td>}
              </tr>
            </thead>
            <tbody className="border-start border-end">
              {dataPesanan && dataPesanan.length > 0 ? (
                dataPesanan.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td className="text-capitalize">{data.username}</td>
                    <td className="text-capitalize">{data.alamat}</td>
                    <td className="text-capitalize">{data.no_hp}</td>
                    <td className="text-capitalize">{data.pelayanan}</td>
                    <td className="text-capitalize">{data.no_antrian}</td>
                    <td className="text-capitalize">
                      <span
                        className={`badge bg-${
                          data.status === "pending"
                            ? "warning text-dark"
                            : data.status === "progres"
                            ? "primary"
                            : "success  "
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td>
                      {state.isPrint ? null : (
                        <Action
                          detail={`/pesanan/detail/${data.id_pesanan}`}
                          edit={`/pesanan/edit/${data.id_pesanan}`}
                          remove={`/pesanan/${data.id_pesanan}`}
                          accessed={role}
                        />
                      )}
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
