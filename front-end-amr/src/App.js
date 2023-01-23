import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Dasbhoard from "./pages/customer/Dasbhoard";
import { AppProvider } from "./context/app-context";
import Template from "./pages/Template";
import Kendaraan from "./pages/customer/Kendaraan";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <AppProvider>
              <Template>
                <Dasbhoard />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/kendaraan"
          element={
            <AppProvider>
              <Template>
                <Kendaraan />
              </Template>
            </AppProvider>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
