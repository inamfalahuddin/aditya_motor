import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import Action from "../../components/Action";
import Toolbar from "../../components/Toolbar";
import IconUser from "../../images/icon-user-dark.svg";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import Template from "../Template";
import axios, { axiosJwt } from "../../api/axios";
import Spiner from "../../components/Spiner";

function Mekanik() {
  const [state, dispatch] = useAppContext();
  const auth = useAuth();

  const [dataMekanik, setDataMekanik] = useState([]);

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "mekanik" });
  }, []);

  useEffect(() => {
    if (state.token.bearer === "") {
      auth();
    }

    if (state.token.bearer) {
      getMekanik();
    }
  }, [state.token.bearer]);

  const getMekanik = async () => {
    try {
      const response = await axiosJwt.get("mekanik/all", {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataMekanik(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dataMekanik);

  return state.isLoading ? (
    <Loading />
  ) : (
    <Template>
      <div className="card">
        <Toolbar title={state.pages.title} to={`/${state.pages.title}/add`} />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Foto</td>
                <td>Nama Lengkap</td>
                <td>Alamat</td>
                <td>No Hp</td>
                <td>Jabatan</td>
                <td>Action</td>
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
                      <Action />
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
    </Template>
  );
}

export default Mekanik;
