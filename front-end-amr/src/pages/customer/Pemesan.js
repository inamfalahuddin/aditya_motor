import React, { useEffect } from "react";
import { useAppContext } from "../../context/app-context";
import Button from "../../components/Button";
import IconAdd from "../../images/icon-add.svg";
import IconPrint from "../../images/icon-print.svg";
import IconDetail from "../../images/icon-detail-dark.svg";
import IconEdit from "../../images/icon-edit-dark.svg";
import IconDelete from "../../images/icon-temp.svg";
import Toolbar from "../../components/Toolbar";
import Action from "../../components/Action";

function Pemesan() {
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "pemesanan" });
  }, []);

  return (
    <div>
      <div className="card">
        <Toolbar />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="border-start border-end bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Nama Lengkap</td>
                <td>Alamat</td>
                <td>No HP</td>
                <td>Pelayanan</td>
                <td>No Antrian</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="border-start border-end">
              <tr>
                <td>1.</td>
                <td>Andika Lubis</td>
                <td>Hitam</td>
                <td>Yamaha</td>
                <td>Sepeda Motor</td>
                <td>2005</td>
                <td>150 CC</td>
                <td>
                  <img className="pe-2" src={IconDetail} alt="detail" />
                  <img className="px-2" src={IconEdit} alt="edit" />
                  <img className="px-2" src={IconDelete} alt="delete" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pemesan;
