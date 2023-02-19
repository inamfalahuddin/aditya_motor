import React from "react";
import Button from "./Button";

function ModalBayar() {
  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade show"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        style={{ display: "block" }}
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
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              /> */}
            </div>
            <div className="modal-body d-flex justify-content-center gap-3 py-5">
              <Button color="success">Cash</Button>
              <Button color="primary">Debit</Button>
              <Button color="danger">Kembali</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBayar;
