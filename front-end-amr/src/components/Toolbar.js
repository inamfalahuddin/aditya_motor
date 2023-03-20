import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAppContext } from "../context/app-context";
import IconAdd from "../images/icon-add.svg";
import IconPrint from "../images/icon-print.svg";

function Toolbar({ title, to }) {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const redirect = () => {
    navigate(to);
  };

  useEffect(() => {
    const decode = state.token.bearer && jwtDecode(state.token.bearer);
    setRole(decode.role);
  }, [state.token.bearer]);

  const btnPrint = () => {
    dispatch({
      type: "SET_PRINT",
      payload: !state.isPrint,
    });
  };

  return (
    <div className="card-header d-flex justify-content-between align-items-center bg-white py-4">
      <span>Data {state.pages.title}</span>
      {role === "user" && state.pages.title === "transaksi" ? null : (
        <Button color="primary" onclick={redirect}>
          <img className="me-2" src={IconAdd} alt="add" />
          <span className="text-capitalize" style={{ fontSize: ".85rem" }}>
            tambah data {state.pages.title}
          </span>
        </Button>
      )}
      <Button color="success" onclick={btnPrint}>
        <img className="me-2" src={IconPrint} alt="add" />
        <span style={{ fontSize: ".85rem" }}>Print</span>
      </Button>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <input
            type="text"
            id="inputPassword6"
            className="form-control py-1 px-2"
            aria-describedby="passwordHelpInline"
          />
        </div>
        <div className="col-auto">
          <span htmlFor="inputPassword6" className="col-form-label">
            <Button color="danger">Search</Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
