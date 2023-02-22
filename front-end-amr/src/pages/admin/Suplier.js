import React, { useEffect, useState } from "react";
import Action from "../../components/Action";
import Toolbar from "../../components/Toolbar";
import { useAppContext } from "../../context/app-context";
import useAxiosPrivate from "../../hooks/usePrivate";
import useRefreshToken from "../../hooks/useRefreshToken";

function Suplier() {
  const [state, dispatch] = useAppContext();
  const [dataSuplier, setDataSuplier] = useState();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "suplier" });

    if (state.token.bearer === "") {
      refresh();
    }

    getDataSuplier();
  }, []);

  const getDataSuplier = async () => {
    try {
      const response = await axiosPrivate.get("suplier/all", {
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataSuplier(response.data.data);
    } catch (err) {
      console.log(err.response.message);
    }
  };

  return (
    <div>
      <div className="card">
        <Toolbar title={state.pages.title} to={`/${state.pages.title}/add`} />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Nama Toko</td>
                <td>Alamat</td>
                <td>No HP</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {dataSuplier && dataSuplier.length > 0 ? (
                dataSuplier.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ verticalAlign: "middle" }}>{index + 1}.</td>
                      <td
                        className="text-capitalize"
                        style={{ verticalAlign: "middle" }}
                      >
                        {data.nama_toko}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ verticalAlign: "middle" }}
                      >
                        {data.alamat}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>{data.no_hp}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        <Action />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center pt-4">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Suplier;
