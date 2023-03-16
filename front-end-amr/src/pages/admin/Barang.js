import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Action from "../../components/Action";
import Alert from "../../components/Alert";
import Toolbar from "../../components/Toolbar";
import { useAppContext } from "../../context/app-context";
import Rupiah from "../../helper/Rupiah";
import useAxiosPrivate from "../../hooks/usePrivate";
import useRefreshToken from "../../hooks/useRefreshToken";

function Barang() {
  const [state, dispatch] = useAppContext();
  const [dataBarang, setDataBarang] = useState();
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
    dispatch({ type: "SET_TITLE", payload: "barang" });
    dispatch({
      type: "SET_MESSAGE",
      payload: {},
    });

    if (state.token.bearer === "") {
      refresh();
    }

    getBarang();
  }, []);

  useEffect(() => {
    getBarang();

    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  useEffect(() => {
    setDataBarang(state.data.barang);
  }, [state.data.barang]);

  const getBarang = async () => {
    try {
      const response = await axiosPrivate.get("barang/all", {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      dispatch({
        type: "SET_DATA",
        payload: {
          ...state.data,
          barang: response.data.data,
        },
      });
    } catch (err) {
      console.log(err.response.message);
    }
  };

  return (
    <div>
      {state.message.message !== undefined ? (
        <Alert data={state.message} />
      ) : null}

      <div className="card">
        <Toolbar to="/barang/add" />
        <div className="card-body m-0 p-0" ref={componentsRef}>
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Kode Barang</td>
                <td>Nama Barang</td>
                <td>Harga Barang</td>
                <td>Qty</td>
                {state.isPrint ? null : <td>Action</td>}
              </tr>
            </thead>
            <tbody>
              {dataBarang &&
                dataBarang.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ verticalAlign: "middle" }}>{index + 1}.</td>
                      <td style={{ verticalAlign: "middle" }}>
                        {data.kode_barang}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ verticalAlign: "middle" }}
                      >
                        {data.nama_barang}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        Rp. {Rupiah(data.harga_barang)}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>{data.qty}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        {state.isPrint ? null : (
                          <Action
                            detail={`none`}
                            edit={`/barang/edit/${data.id_barang}`}
                            remove={`/barang/${data.id_barang}`}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Barang;
