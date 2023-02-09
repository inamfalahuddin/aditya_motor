import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardData from "../../components/CardData";
import Loading from "../../components/Loading";
import { useAppContext } from "../../context/app-context";
import useRefreshToken from "../../hooks/useRefreshToken";
import LogoBrand from "../../images/logo-aditya-motor.png";
import Template from "../Template";

function Dasbhoard() {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const auth = useRefreshToken();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "dashboard" });

    auth();
  }, []);

  return state.isLoading ? (
    <Loading />
  ) : (
    <Template>
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
    </Template>
  );
}

export default Dasbhoard;
