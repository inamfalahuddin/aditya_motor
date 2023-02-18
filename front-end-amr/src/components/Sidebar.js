import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "../images/user-profile.svg";
import IconDashboard from "../images/dashboard-icon.svg";
import IconData from "../images/icon-data.svg";
import IconLogout from "../images/logout-icon.svg";
import IconPengguna from "../images/user-icon.svg";
import { useAppContext } from "../context/app-context";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";
import Loading from "../components/Loading";

function Sidebar() {
  const [state, dispatch] = useAppContext();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  );
  const [role, setRole] = useState("");

  useEffect(() => {
    window
      .matchMedia("(min-width: 992px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    const token = state.token.bearer;

    if (token) {
      const decode = jwt_decode(token);

      dispatch({ type: "SET_ROLE", payload: decode.role });
    }

    setRole(state.role);
  }, [state.role, state.token]);

  const Logout = useCallback(async (e) => {
    try {
      const response = await axios.delete("auth/logout", {
        withCredentials: true,
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return !role ? (
    <Loading />
  ) : (
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
            className="list-group-item bg-danger text-white item-hover"
          >
            <img src={IconDashboard} alt="dashboard" width={20} />
            <span className="ms-3">Dasbhoard</span>
          </Link>
          {role === "admin" ? (
            <>
              <Link
                to="/mekanik"
                className="list-group-item bg-danger text-white item-hover"
              >
                <img src={IconData} alt="barang" width={20} />
                <span className="ms-3">Data Mekanik</span>
              </Link>
              <Link
                to="/barang"
                className="list-group-item bg-danger text-white  item-hover"
              >
                <img src={IconData} alt="Barang" width={20} />
                <span className="ms-3">Data Barang</span>
              </Link>
              <Link
                to="/pesanan"
                className="list-group-item bg-danger text-white  item-hover"
              >
                <img src={IconData} alt="Barang" width={20} />
                <span className="ms-3">Data Pesanan</span>
              </Link>
              <Link
                to="/transaksi"
                className="list-group-item bg-danger text-white  item-hover"
              >
                <img src={IconData} alt="Barang" width={20} />
                <span className="ms-3">Data Transaksi</span>
              </Link>
              <Link
                to="/suplier"
                className="list-group-item bg-danger text-white  item-hover"
              >
                <img src={IconData} alt="Barang" width={20} />
                <span className="ms-3">Data Suplier</span>
              </Link>
            </>
          ) : null}
          {role === "user" ? (
            <>
              <Link
                to="/kendaraan"
                className="list-group-item bg-danger text-white  item-hover"
              >
                <img src={IconData} alt="dashboard" width={20} />
                <span className="ms-3">Data Kendaraan</span>
              </Link>
              <Link
                to="/pesanan"
                className="list-group-item bg-danger text-white  item-hover"
              >
                <img src={IconData} alt="dashboard" width={20} />
                <span className="ms-3">Pemesanan</span>
              </Link>
              <Link
                to="/transaksi"
                className="list-group-item bg-danger text-white  item-hover"
              >
                <img src={IconData} alt="dashboard" width={20} />
                <span className="ms-3">Transaksi</span>
              </Link>
            </>
          ) : null}

          <div className="list-group-item bg-danger text-white">
            <span style={{ fontSize: ".85rem" }}>Pengaturan</span>
            <Link
              to="/pengguna"
              className="list-group-item bg-danger text-white  item-hover border-0"
            >
              <img src={IconPengguna} alt="dashboard" width={20} />
              <span className="ms-3">Pengguna</span>
            </Link>
          </div>
          <Link
            to="/"
            className="list-group-item bg-danger text-white item-hover"
            onClick={Logout}
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
