import React from "react";

function Button({ title }) {
  return (
    <button type="submit" className="btn btn-primary px-4 py-0">
      {title}
    </button>
  );
}

export default Button;
