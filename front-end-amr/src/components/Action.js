import jwtDecode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import useAxiosPrivate from "../hooks/usePrivate";
import IconDetail from "../images/icon-detail-dark.svg";
import IconEdit from "../images/icon-edit-dark.svg";
import IconDelete from "../images/icon-temp.svg";

function Action({ detail, edit, remove }) {
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
          const id = jwtDecode(state.token.bearer).id_customer;
          const response = await axiosPrivate.get(`kendaraan/cust/${id}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state.token.bearer}`,
            },
          });

          return disptach({
            type: "SET_DATA_KENDARAAN",
            payload: response.data.data,
          });
        }

        if (remove.split("/")[1] === "pesanan") {
          const id = jwtDecode(state.token.bearer).id_customer;
          const response = await axiosPrivate.get(`pesanan/cust/${id}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state.token.bearer}`,
            },
          });

          return disptach({
            type: "SET_DATA_PESANAN",
            payload: response.data.data,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <img
        className="pe-2 cursor-pointer"
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
  );
}

export default Action;
