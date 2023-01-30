import React, { useEffect } from "react";
import { useAppContext } from "../../context/app-context";
import Action from "../../components/Action";
import Toolbar from "../../components/Toolbar";
import IconUser from "../../images/icon-user-dark.svg";

function Mekanik() {
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "mekanik" });
  }, []);

  return (
    <div>
      <div className="card">
        <Toolbar title={state.pages.title} to={`/${state.pages.title}/add`} />
        <div className="card-body m-0 p-0">
          <table className="table table-hover border-white">
            <thead className="bg-danger text-white">
              <tr>
                <td>No.</td>
                <td>Foto</td>
                <td>Nama Lengkap</td>
                <td>Alamat</td>
                <td>No Hp</td>
                <td>Jabatan</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "middle" }}>1.</td>
                <td>
                  <img src={IconUser} alt="user" width="50" height="50" />
                </td>
                <td style={{ verticalAlign: "middle" }}>Hitam</td>
                <td style={{ verticalAlign: "middle" }}>Yamaha</td>
                <td style={{ verticalAlign: "middle" }}>Sepeda Motor</td>
                <td style={{ verticalAlign: "middle" }}>2005</td>
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

export default Mekanik;
