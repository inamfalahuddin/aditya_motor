import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import IconDetail from "../../images/icon-detail-dark.svg";
import IconEdit from "../../images/icon-edit-dark.svg";
import IconDelete from "../../images/icon-temp.svg";
import Toolbar from "../../components/Toolbar";
import useAxiosPrivate from "../../hooks/usePrivate";
import useRefreshToken from "../../hooks/useRefreshToken";

function Pemesan() {
  const [state, dispatch] = useAppContext();
  const [dataPesanan, setDataPesanan] = useState();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "kendaraan" });

    if (state.token.bearer === "") {
      refresh();
    }

    getDataPesanan();
  }, []);

  const getDataPesanan = async () => {
    try {
      const response = await axiosPrivate.get("pesanan/all", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state.token.bearer}`,
        },
      });

      setDataPesanan(response.data.data);
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
              {console.log(dataPesanan)}
              {dataPesanan &&
                dataPesanan.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{data.nama_customer}</td>
                    <td>{data.alamat}</td>
                    <td>{data.no_hp}</td>
                    <td>{data.pelayanan}</td>
                    <td>{data.no_antrian}</td>
                    <td>{data.status}</td>
                    <td>
                      <img className="pe-2" src={IconDetail} alt="detail" />
                      <img className="px-2" src={IconEdit} alt="edit" />
                      <img className="px-2" src={IconDelete} alt="delete" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pemesan;
