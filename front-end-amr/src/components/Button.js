import React from "react";

function Button({ children, color, className, onclick }) {
  return (
    <button
      type="submit"
      className={`btn btn-${color} px-3 py-1 ${className}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
}

export default Button;
