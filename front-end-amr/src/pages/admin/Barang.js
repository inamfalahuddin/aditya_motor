import React from "react";
import Action from "../../components/Action";
import Toolbar from "../../components/Toolbar";

function Barang() {
  return (
    <div>
      <div className="card">
        <Toolbar />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Kode Barang</td>
                <td>Nama Barang</td>
                <td>Harga Barang</td>
                <td>Qty</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "middle" }}>1.</td>
                <td style={{ verticalAlign: "middle" }}>Hitam</td>
                <td style={{ verticalAlign: "middle" }}>Hitam</td>
                <td style={{ verticalAlign: "middle" }}>Yamaha</td>
                <td style={{ verticalAlign: "middle" }}>Sepeda Motor</td>
                <td style={{ verticalAlign: "middle" }}>
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

export default Barang;
