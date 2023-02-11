import React, { useEffect, useState } from "react";
import Action from "../../components/Action";
import Loading from "../../components/Loading";
import Toolbar from "../../components/Toolbar";
import { useAppContext } from "../../context/app-context";
import Rupiah from "../../helper/Rupiah";
import useAxiosPrivate from "../../hooks/usePrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import Template from "../Template";

function Barang() {
  const [state, dispatch] = useAppContext();
  const [dataBarang, setDataBarang] = useState();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "barang" });

    if (state.token.bearer === "") {
      refresh();
    }

    getBarang();
  }, []);

  const getBarang = async () => {
    try {
      const response = await axiosPrivate.get("barang/all", {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataBarang(response.data.data);
    } catch (err) {
      console.log(err.response.message);
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
                <td>Kode Barang</td>
                <td>Nama Barang</td>
                <td>Harga Barang</td>
                <td>Qty</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {dataBarang &&
                dataBarang.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ verticalAlign: "middle" }}>{index + 1}.</td>
                      <td style={{ verticalAlign: "middle" }}>
                        {data.kode_barang}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {data.nama_barang}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        Rp. {Rupiah(data.harga_barang)}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>{data.qty}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        <Action />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Barang;
