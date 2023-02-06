import React from "react";

function Spiner() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <div className="spinner-border mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span>Memuat Data</span>
    </div>
  );
}

export default Spiner;
