import jwtDecode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import useAxiosPrivate from "../hooks/usePrivate";
import IconDetail from "../images/icon-detail-dark.svg";
import IconEdit from "../images/icon-edit-dark.svg";
import IconDelete from "../images/icon-temp.svg";

function Action({ detail, edit, remove, accessed }) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [state, disptach] = useAppContext();

  const actionDetail = (e) => {
    navigate(detail);
  };

  const actionEdit = (e) => {
    navigate(edit);
  };

  const actionDelete = async (e) => {
    try {
      if (window.confirm("Lanjut menghapus ? ")) {
        const id = jwtDecode(state.token.bearer).id_customer;

        const resDelete = await axiosPrivate.delete(`${remove}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state.token.bearer}`,
          },
        });

        console.log(resDelete);

        disptach({
          type: "SET_MESSAGE",
          payload: { message: resDelete.data.message, color: "success" },
        });

        if (remove.split("/")[1] === "kendaraan") {
          reFetchData(`kendaraan/cust/${id}`, "SET_KENDARAAN");
        } else if (remove.split("/")[1] === "pesanan") {
          reFetchData(`pesanan/cust/${id}`, "SET_PESANAN");
        } else if (remove.split("/")[1] === "suplier") {
          reFetchData(`suplier/all`, "SET_SUPLIER");
        } else if (remove.split("/")[1] === "barang") {
          reFetchData(`barang/all`, "SET_BARANG");
        } else if (remove.split("/")[1] === "transaksi") {
          reFetchData(`transaksi/all`, "SET_TRANSAKSI");
        } else if (remove.split("/")[1] === "mekanik") {
          reFetchData(`mekanik/all`, "SET_MEKANIK");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reFetchData = async (url, type) => {
    // const id = jwtDecode(state.token.bearer).id_customer;
    const response = await axiosPrivate.get(url, {
      headers: {
        Authorization: `Bearer ${state.token.bearer}`,
      },
    });

    switch (type) {
      case "SET_KENDARAAN":
        return disptach({
          type: "SET_DATA",
          payload: {
            ...state.data,
            kendaraan: response.data.data,
          },
        });
      case "SET_PESANAN":
        return disptach({
          type: "SET_DATA",
          payload: {
            ...state.data,
            pesanan: response.data.data,
          },
        });
      case "SET_SUPLIER":
        return disptach({
          type: "SET_DATA",
          payload: {
            ...state.data,
            suplier: response.data.data,
          },
        });
      case "SET_BARANG":
        return disptach({
          type: "SET_DATA",
          payload: {
            ...state.data,
            barang: response.data.data,
          },
        });
      case "SET_TRANSAKSI":
        return disptach({
          type: "SET_DATA",
          payload: {
            ...state.data,
            transaksi: response.data.data,
          },
        });
      case "SET_MEKANIK":
        return disptach({
          type: "SET_DATA",
          payload: {
            ...state.data,
            mekanik: response.data.data,
          },
        });
      default:
        throw new Error();
    }
  };

  return (
    <>
      {accessed && accessed === "user" ? (
        <img
          className="pe-2 cursor-pointer"
          src={IconDetail}
          alt="detail"
          style={{ cursor: "pointer" }}
          onClick={actionDetail}
        />
      ) : (
        <>
          <img
            className={`pe-2 cursor-pointer ${
              detail === "none" ? "d-none" : ""
            }`}
            src={IconDetail}
            alt="detail"
            style={{ cursor: "pointer" }}
            onClick={actionDetail}
          />
          <img
            className="px-2 cursor-pointer"
            src={IconEdit}
            alt="edit"
            style={{ cursor: "pointer" }}
            onClick={actionEdit}
          />
          <img
            className="px-2 cursor-pointer"
            src={IconDelete}
            alt="delete"
            style={{ cursor: "pointer" }}
            onClick={actionDelete}
          />
        </>
      )}
    </>
  );
}

export default Action;
