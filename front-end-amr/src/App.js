import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { AppProvider, useAppContext } from "./context/app-context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Dasbhoard from "./pages/customer/Dasbhoard";
import Template from "./pages/Template";
import Kendaraan from "./pages/customer/Kendaraan";
import Pemesan from "./pages/customer/Pemesan";
import Transaksi from "./pages/customer/Transaksi";
import Pengguna from "./pages/customer/Pengguna";
import Mekanik from "./pages/admin/Mekanik";
import Barang from "./pages/admin/Barang";
import AddMekanik from "./pages/admin/AddMekanik";
import DetailMekanik from "./pages/admin/DetailMekanik";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AppProvider>
              <Login />
            </AppProvider>
          }
        />

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
        <Route
          path="/pemesanan"
          element={
            <AppProvider>
              <Template>
                <Pemesan />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/transaksi"
          element={
            <AppProvider>
              <Template>
                <Transaksi />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/pengguna"
          element={
            <AppProvider>
              <Template>
                <Pengguna />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/mekanik"
          element={
            <AppProvider>
              <Template>
                <Mekanik />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/mekanik/add"
          element={
            <AppProvider>
              <Template>
                <AddMekanik />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/mekanik/detail"
          element={
            <AppProvider>
              <Template>
                <DetailMekanik />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/barang"
          element={
            <AppProvider>
              <Template>
                <Barang />
              </Template>
            </AppProvider>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
