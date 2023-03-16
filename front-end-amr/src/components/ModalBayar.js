import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import Button from "./Button";

function ModalBayar({ id }) {
  const [state, dispatch] = useAppContext();
  const navigate = useNavigate();

  return (
    <div>
      <div
        className={`modal fade ${
          state.isModal ? "show bg-dark bg-opacity-25" : ""
        }`}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        style={{ display: `${state.isModal ? "block" : "none"}` }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title w-100 text-center"
                id="exampleModalLabel"
              >
                Memilih metode pembayaran !
              </h5>
            </div>
            <div className="modal-body d-flex justify-content-center gap-3 py-5">
              <Button
                color="success"
                onclick={() => {
                  navigate(`/pembayaran/${id}`);
                  dispatch({ type: "SET_MODAL", payload: false });
                  dispatch({
                    type: "SET_PEMBAYARAN",
                    payload: {
                      metode: "cash",
                    },
                  });
                }}
              >
                Cash
              </Button>
              <Button
                color="primary"
                onclick={() => {
                  navigate(`/pembayaran/${id}`);
                  dispatch({ type: "SET_MODAL", payload: false });
                  dispatch({
                    type: "SET_PEMBAYARAN",
                    payload: {
                      metode: "debit",
                    },
                  });
                }}
              >
                Debit
              </Button>
              <Button
                color="danger"
                onclick={useCallback(() => {
                  dispatch({ type: "SET_MODAL", payload: false });
                }, [])}
              >
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBayar;
