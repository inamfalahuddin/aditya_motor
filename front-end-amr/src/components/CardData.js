import React from "react";
import { useNavigate } from "react-router-dom";
import IconData from "../images/icon-data-dark.svg";

function CardData({ title }) {
  const navigate = useNavigate("");
  const url = `/${title.split(" ")[1]}`;

  return (
    <div
      className="card text-center mb-4"
      style={{ cursor: "pointer" }}
      onClick={() => {
        console.log(url);
        navigate(url);
      }}
    >
      <div className="card-body mb-3 mt-2">
        <p className="text-capitalize">{title}</p>
        <img src={IconData} alt="data kendaraan" />
      </div>
      <div className="card-footer">Selengkapnya &#8594;</div>
    </div>
  );
}

export default CardData;
