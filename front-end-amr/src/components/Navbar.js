import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../context/app-context";
import { capitalize } from "../helper/Capitalize";

function Navbar() {
  const [state, dispatch] = useAppContext();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  );

  useEffect(() => {
    document.title = state.pages.title
      ? `${capitalize(state.pages.title)} | Aditya Motor`
      : "Aditya Motor";
  }, [state.pages.title]);

  useEffect(() => {
    window
      .matchMedia("(min-width: 992px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const btnMenu = (e) => {
    dispatch({ type: "SET_MENU", payload: !state.isMenu });
  };

  return (
    <div>
      {/* As a heading */}
      <nav className="navbar bg-danger">
        <div className={`container-fluid px-4 py-2 ${matches && "py-3"}`}>
          {/* <span className="navbar-brand mb-0 h1">Navbar</span> */}
          <div
            className={`d-flex flex-column justify-content-between ${
              matches && "d-none"
            }`}
            style={{ width: "1.75rem", height: "1.3rem", cursor: "pointer" }}
            onClick={btnMenu}
          >
            <span
              className="bg-white w-100 rounded-4"
              style={{ height: "4px" }}
            ></span>
            <span
              className="bg-white w-100 rounded-4"
              style={{ height: "4px" }}
            ></span>
            <span
              className="bg-white w-100 rounded-4"
              style={{ height: "4px" }}
            ></span>
          </div>

          <h5 className="text-capitalize text-white p-0 m-0">
            {state.pages.title}
          </h5>
        </div>
      </nav>
      {/* 
      {matches && <h1>Big Screen</h1>}
      {!matches && <h3>Small Screen</h3>} */}
    </div>
  );
}

export default Navbar;
