import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import Toolbar from "../../components/Toolbar";
import Action from "../../components/Action";
import useAxiosPrivate from "../../hooks/usePrivate";
import useRefreshToken from "../../hooks/useRefreshToken";

function Kendaraan() {
  const [state, dispatch] = useAppContext();
  const [dataKendaraan, setDataKendaraan] = useState();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "kendaraan" });

    if (state.token.bearer === "") {
      refresh();
    }

    getKendaraan();
  }, []);

  const getKendaraan = async () => {
    try {
      const response = await axiosPrivate.get("kendaraan/all", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataKendaraan(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card">
        <Toolbar />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>No Polisi</td>
                <td>Warna Kendaraan</td>
                <td>Merk Kendaraan</td>
                <td>Jenis</td>
                <td>Tahun Kendaraan</td>
                <td>Isi Cylinder</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>B300999</td>
                <td>Hitam</td>
                <td>Yamaha</td>
                <td>Sepeda Motor</td>
                <td>2005</td>
                <td>150 CC</td>
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

export default Kendaraan;
