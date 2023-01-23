import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return <div>Hai sayang</div>;
}

export default Home;
