import React from "react";
import IconDetail from "../images/icon-detail-dark.svg";
import IconEdit from "../images/icon-edit-dark.svg";
import IconDelete from "../images/icon-temp.svg";

function Action() {
  const actionDetail = (e) => {};
  const actionEdit = (e) => {};
  const actionDelete = (e) => {};

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
      />
      <img
        className="px-2 cursor-pointer"
        src={IconDelete}
        alt="delete"
        style={{ cursor: "pointer" }}
      />
    </>
  );
}

export default Action;
