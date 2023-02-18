import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAppContext } from "../context/app-context";
import IconAdd from "../images/icon-add.svg";
import IconPrint from "../images/icon-print.svg";

function Toolbar({ title, to }) {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();

  const redirect = () => {
    navigate(to);
  };

  return (
    <div className="card-header d-flex justify-content-between align-items-center bg-white py-4">
      <span>Data {state.pages.title}</span>
      <Button color="primary" onclick={redirect}>
        <img className="me-2" src={IconAdd} alt="add" />
        <span className="text-capitalize" style={{ fontSize: ".85rem" }}>
          tambah data {state.pages.title}
        </span>
      </Button>
      <Button color="success">
        <img className="me-2" src={IconPrint} alt="add" />
        <span style={{ fontSize: ".85rem" }}>Print</span>
      </Button>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <input
            type="password"
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
