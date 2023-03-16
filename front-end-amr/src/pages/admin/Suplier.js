import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Action from "../../components/Action";
import Alert from "../../components/Alert";
import Toolbar from "../../components/Toolbar";
import { useAppContext } from "../../context/app-context";
import useAuth from "../../hooks/useAuth";
import useAuthorized from "../../hooks/useAuthorization";
import useAxiosPrivate from "../../hooks/usePrivate";

function Suplier() {
  const [state, dispatch] = useAppContext();
  const [dataSuplier, setDataSuplier] = useState();
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();
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
    dispatch({ type: "SET_TITLE", payload: "suplier" });
    dispatch({
      type: "SET_MESSAGE",
      payload: {},
    });

    auth();
  }, []);

  useEffect(() => {
    setDataSuplier(state.data.suplier);
  }, [state.data.suplier]);

  useEffect(() => {
    getDataSuplier();

    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  const getDataSuplier = async () => {
    try {
      const response = await axiosPrivate.get("suplier/all", {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      dispatch({
        type: "SET_DATA",
        payload: {
          ...state.data,
          suplier: response.data.data,
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
        <Toolbar title={state.pages.title} to={`/${state.pages.title}/add`} />
        <div className="card-body m-0 p-0" ref={componentsRef}>
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Nama Toko</td>
                <td>Alamat</td>
                <td>No HP</td>
                {state.isPrint ? null : <td>Action</td>}
              </tr>
            </thead>
            <tbody>
              {dataSuplier && dataSuplier.length > 0 ? (
                dataSuplier.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ verticalAlign: "middle" }}>{index + 1}.</td>
                      <td
                        className="text-capitalize"
                        style={{ verticalAlign: "middle" }}
                      >
                        {data.nama_toko}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ verticalAlign: "middle" }}
                      >
                        {data.alamat}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>{data.no_hp}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        {state.isPrint ? null : (
                          <Action
                            detail={`/suplier/detail/${data.id_suplier}`}
                            edit={`/suplier/edit/${data.id_suplier}`}
                            remove={`/suplier/${data.id_suplier}`}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center pt-4">
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

export default Suplier;
