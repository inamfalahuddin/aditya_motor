import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppContext } from "../context/app-context";

function Template({ children }) {
  const [state, dispatch] = useAppContext();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 992px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <>
      <Sidebar />
      <div
        className="w-100"
        style={{
          paddingLeft: `${state.isMenu || matches ? "16rem" : "0rem"}`,
          transition: "all .2s ease-out 0s",
        }}
      >
        <Navbar />

        <main className="py-4 px-5">{children}</main>
      </div>
    </>
  );
}

export default Template;
