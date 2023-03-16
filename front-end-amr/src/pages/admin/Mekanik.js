import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/app-context";
import Action from "../../components/Action";
import Toolbar from "../../components/Toolbar";
import IconUser from "../../images/icon-user-dark.svg";
import Spiner from "../../components/Spiner";
import useAxiosPrivate from "../../hooks/usePrivate";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { useReactToPrint } from "react-to-print";

function Mekanik() {
  const [state, dispatch] = useAppContext();
  const [dataMekanik, setDataMekanik] = useState([]);
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
    dispatch({ type: "SET_TITLE", payload: "mekanik" });
    dispatch({
      type: "SET_MESSAGE",
      payload: {},
    });

    auth();
    getMekanik();
  }, []);

  useEffect(() => {
    setDataMekanik(state.data.mekanik);
  }, [state.data]);

  useEffect(() => {
    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    if (decode.role === "user") {
      navigate(`/dashboard`);
    }
  }, [state.token.bearer]);

  const getMekanik = async () => {
    try {
      const response = await axiosPrivate.get("mekanik/all", {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      dispatch({
        type: "SET_DATA",
        payload: {
          ...state.data,
          mekanik: response.data.data,
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
        <Toolbar title={state.pages.title} to={`/${state.pages.title}/add`} />
        <div className="card-body m-0 p-0" ref={componentsRef}>
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Foto</td>
                <td>Nama Lengkap</td>
                <td>Alamat</td>
                <td>No Hp</td>
                <td>Jabatan</td>
                {state.isPrint ? null : <td>Action</td>}
              </tr>
            </thead>
            <tbody>
              {dataMekanik ? (
                dataMekanik.map((data, index) => (
                  <tr key={index}>
                    <td style={{ verticalAlign: "middle" }}>{index + 1}.</td>
                    <td>
                      <img src={IconUser} alt="user" width="50" height="50" />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {data.nama_mekanik}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{data.alamat}</td>
                    <td style={{ verticalAlign: "middle" }}>{data.no_hp}</td>
                    <td style={{ verticalAlign: "middle" }}>{data.jabatan}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      {state.isPrint ? null : (
                        <Action
                          detail={`/mekanik/detail/${data.id_mekanik}`}
                          edit={`/mekanik/edit/${data.id_mekanik}`}
                          remove={`/mekanik/${data.id_mekanik}`}
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <Spiner />
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

export default Mekanik;
