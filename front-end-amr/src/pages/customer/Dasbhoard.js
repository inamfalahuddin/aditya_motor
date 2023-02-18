import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "dashboard" });

    return () => {
      auth();
    };
  }, []);

  return (
    <div>
      <img className="my-5" src={LogoBrand} alt="logo brand" />
      <div className="row">
        <div className="col-md-6" onClick={() => navigate("/kendaraan")}>
          <CardData title="data kendaraan" />
        </div>
        <div className="col-md-6" onClick={() => navigate("/pesanan")}>
          <CardData title="pesanan" />
        </div>
        <div className="col-md-6" onClick={() => navigate("/transaksi")}>
          <CardData title="transaksi" />
        </div>
      </div>
    </div>
  );
}

export default Dasbhoard;
