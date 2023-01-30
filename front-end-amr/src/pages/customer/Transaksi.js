import React, { useEffect } from "react";
import { useAppContext } from "../../context/app-context";
import Toolbar from "../../components/Toolbar";
import Action from "../../components/Action";

function Transaksi() {
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "transaksi" });
  }, []);

  return (
    <div>
      <div className="card">
        <Toolbar />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Tanggal</td>
                <td>Nama Lengkap</td>
                <td>No Polisi</td>
                <td>Merk Kendaraan</td>
                <td>Nama Mekanik</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>30, Januari 2023</td>
                <td>Andika Lubis</td>
                <td>B300999</td>
                <td>Yamaha</td>
                <td>Yoga Aditya</td>
                <td>
                  <Action />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transaksi;
