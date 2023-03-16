import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/app-context";
import Toolbar from "../../components/Toolbar";
import Action from "../../components/Action";
import useAxiosPrivate from "../../hooks/usePrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import jwtDecode from "jwt-decode";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Kendaraan() {
  const [state, dispatch] = useAppContext();
  const [dataKendaraan, setDataKendaraan] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();
  const navigate = useNavigate("");

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
    dispatch({ type: "SET_TITLE", payload: "kendaraan" });

    dispatch({
      type: "SET_MESSAGE",
      payload: {},
    });

    if (state.token.bearer === "") {
      refresh();
    }
  }, []);

  useEffect(() => {
    getKendaraan();

    // const decode = state.token.bearer && jwtDecode(state.token.bearer);
    // if (decode.role === "user") {
    //   navigate(`/dashboard`);
    // }

    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "admin") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  useEffect(() => {
    setDataKendaraan(state.data.kendaraan);
  }, [state.data]);

  const getKendaraan = async () => {
    try {
      const id = jwtDecode(state.token.bearer).id_customer;
      const response = await axiosPrivate.get(`kendaraan/cust/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      dispatch({
        type: "SET_DATA",
        payload: {
          ...state.data,
          kendaraan: response.data.data,
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
        <Toolbar to="/kendaraan/add" />
        <div className="card-body m-0 p-0" ref={componentsRef}>
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>No Polisi</td>
                <td>Warna Kendaraan</td>
                <td>Merk Kendaraan</td>
                <td>Jenis</td>
                <td>Tahun Kendaraan</td>
                <td>Isi Cylinder</td>
                {state.isPrint ? null : <td>Action</td>}
              </tr>
            </thead>
            <tbody>
              {dataKendaraan && dataKendaraan.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={8} className="pt-4">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                dataKendaraan.map((data, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="text-uppercase">{data.nomor_polisi}</td>
                    <td className="text-capitalize">{data.warna_kendaraan}</td>
                    <td className="text-capitalize">{data.merk_kendaraan}</td>
                    <td className="text-capitalize">{data.jenis_model}</td>
                    <td>{data.tahun_kendaraan}</td>
                    <td>{data.isi_silinder}</td>
                    <td>
                      {state.isPrint ? null : (
                        <Action
                          detail={`/kendaraan/detail/${data.id_kendaraan}`}
                          edit={`/kendaraan/edit/${data.id_kendaraan}`}
                          remove={`/kendaraan/${data.id_kendaraan}`}
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

export default Kendaraan;
