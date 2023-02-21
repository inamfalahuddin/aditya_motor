import React, { useCallback } from "react";
import { useAppContext } from "../context/app-context";
import Button from "./Button";

function ModalBayar() {
  const [state, dispatch] = useAppContext();

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
              <Button color="success">Cash</Button>
              <Button color="primary">Debit</Button>
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
