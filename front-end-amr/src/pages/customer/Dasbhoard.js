import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardData from "../../components/CardData";
import Loading from "../../components/Loading";
import { useAppContext } from "../../context/app-context";
import useAuth from "../../hooks/useAuth";
import LogoBrand from "../../images/logo-aditya-motor.png";
import Template from "../Template";

function Dasbhoard() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "dashboard" });

    dispatch({
      type: "SET_MESSAGE",
      payload: {},
    });

    auth();
  }, []);

  useEffect(() => {
    const decode = state.token.bearer && jwtDecode(state.token.bearer);

    setRole(decode.role);
  }, [state.token.bearer]);

  return (
    <div>
      <img className="my-5" src={LogoBrand} alt="logo brand" />
      <div className="row">
        <div className="col-md-6">
          {role && role === "user" ? (
            <CardData title="data kendaraan" />
          ) : (
            <CardData title="data mekanik" />
          )}
        </div>
        <div className="col-md-6">
          {role && role === "user" ? (
            <CardData title="data pesanan" />
          ) : (
            <CardData title="data barang" />
          )}
        </div>
        <div className="col-md-6">
          {role && role === "user" ? (
            <CardData title="data transaksi" />
          ) : (
            <CardData title="data pesanan" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dasbhoard;
