import React, { useEffect } from "react";
import CardData from "../../components/CardData";
import { useAppContext } from "../../context/app-context";
import LogoBrand from "../../images/logo-aditya-motor.png";

function Dasbhoard() {
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "dashboard" });
  }, []);

  return (
    <>
      <img className="my-5" src={LogoBrand} alt="logo brand" />
      <div className="row">
        <div className="col-md-6">
          <CardData title="data kendaraan" />
        </div>
        <div className="col-md-6">
          <CardData title="pemesanan" />
        </div>
        <div className="col-md-6">
          <CardData title="transaksi" />
        </div>
      </div>
    </>
  );
}

export default Dasbhoard;
