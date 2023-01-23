import React from "react";
import IconData from "../images/icon-data-dark.svg";

function CardData({ title }) {
  return (
    <div className="card text-center mb-4" style={{ cursor: "pointer" }}>
      <div className="card-body mb-3 mt-2">
        <p className="text-capitalize">{title}</p>
        <img src={IconData} alt="data kendaraan" />
      </div>
      <div className="card-footer">Selengkapnya &#8594;</div>
    </div>
  );
}

export default CardData;
