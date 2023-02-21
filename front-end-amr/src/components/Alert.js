import React from "react";
import { useAppContext } from "../context/app-context";

function Alert({ data }) {
  // const [state, dispatch] = useAppContext();

  return (
    // <div className={`alert alert-${data.color}`} role="alert">
    //   {data.message}
    // </div>

    <div
      className={`alert alert-${data.color} alert-dismissible fade show`}
      role="alert"
    >
      {data.message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => {
          // dispatch({ type: "SET_MESSAGE", payload: {} });
        }}
      ></button>
    </div>
  );
}

export default React.memo(Alert);
