import React from "react";
import { useParams } from "react-router-dom";

function Print({ data }) {
  const { id } = useParams();

  return (
    <div className="container">
      <center>
        <div className="py-2 mb-4">
          <h1>Laporan Data Transaksi</h1>
          <h1>Aditya Motor</h1>
        </div>
        <div>
          <table className="table" border={1}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
}

export default Print;
