import React from "react";

function Alert({ data }) {
  return (
    <div className={`alert alert-${data.color}`} role="alert">
      {data.message}
    </div>
  );
}

export default React.memo(Alert);
