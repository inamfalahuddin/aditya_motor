import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "../images/user-profile.svg";
import IconDashboard from "../images/dashboard-icon.svg";
import IconData from "../images/icon-data.svg";
import IconLogout from "../images/logout-icon.svg";
import IconPengguna from "../images/user-icon.svg";
import { useAppContext } from "../context/app-context";

function Sidebar() {
  const [state, dispatch] = useAppContext();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 992px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <div
      className="bg-danger py-4 text-white position-fixed bottom-0 top-0 left-0 right-0"
      style={{
        width: "16rem",
        transition: "all .2s ease-out 0s",
        transform: `${
          state.isMenu || matches ? "translateX(0%)" : "translateX(-100%)"
        }`,
      }}
    >
      <div className="side-head text-center my-5">
        <img className="d-inline-block" src={UserProfile} alt="user-profile" />
        <h5 className="mt-3 text-center">Nama Customer</h5>
        <p className="mb-3 text-center">Customer</p>
      </div>

      <div className="side-body">
        <div className="list-group">
          <Link
            to="/dashboard"
            className="list-group-item bg-danger text-white"
          >
            <img src={IconDashboard} alt="dashboard" width={20} />
            <span className="ms-3">Dasbhoard</span>
          </Link>
          <Link
            to="/kendaraan"
            className="list-group-item bg-danger text-white"
          >
            <img src={IconData} alt="dashboard" width={20} />
            <span className="ms-3">Data Kendaraan</span>
          </Link>
          <Link
            to="/dashboard"
            className="list-group-item bg-danger text-white"
          >
            <img src={IconData} alt="dashboard" width={20} />
            <span className="ms-3">Pemesanan</span>
          </Link>
          <Link
            to="/dashboard"
            className="list-group-item bg-danger text-white"
          >
            <img src={IconData} alt="dashboard" width={20} />
            <span className="ms-3">Transaksi</span>
          </Link>
          <div className="list-group-item bg-danger text-white">
            <span style={{ fontSize: ".85rem" }}>Pengaturan</span>
            <Link
              to="/dashboard"
              className="list-group-item bg-danger text-white border-0"
            >
              <img src={IconPengguna} alt="dashboard" width={20} />
              <span className="ms-3">Pengguna</span>
            </Link>
          </div>
          <Link
            to="/dashboard"
            className="list-group-item bg-danger text-white"
          >
            <img src={IconLogout} alt="dashboard" width={20} />
            <span className="ms-3">Log Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
