import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardData from "../../components/CardData";
import { useAppContext } from "../../context/app-context";
import LogoBrand from "../../images/logo-aditya-motor.png";

function Dasbhoard() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "dashboard" });
  }, []);

  return (
    <>
      <img className="my-5" src={LogoBrand} alt="logo brand" />
      <div className="row">
        <div className="col-md-6" onClick={() => navigate("/kendaraan")}>
          <CardData title="data kendaraan" />
        </div>
        <div className="col-md-6" onClick={() => navigate("/pemesanan")}>
          <CardData title="pemesanan" />
        </div>
        <div className="col-md-6" onClick={() => navigate("/transaksi")}>
          <CardData title="transaksi" />
        </div>
      </div>
    </>
  );
}

export default Dasbhoard;
