import React, { useEffect } from "react";
import { useAppContext } from "../../context/app-context";

function Kendaraan() {
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({ type: "SET_TITLE", payload: "kendaraan" });
  }, []);

  return <div>Hallo</div>;
}

export default Kendaraan;
