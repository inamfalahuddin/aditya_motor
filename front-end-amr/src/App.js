import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { AppProvider } from "./context/app-context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Dasbhoard from "./pages/customer/Dasbhoard";
import Template from "./pages/Template";
import Kendaraan from "./pages/customer/Kendaraan";
import Pesanan from "./pages/customer/Pesanan";
import Transaksi from "./pages/customer/Transaksi";
import Pengguna from "./pages/customer/Pengguna";
import Mekanik from "./pages/admin/Mekanik";
import Barang from "./pages/admin/Barang";
import AddMekanik from "./pages/admin/AddMekanik";
import DetailMekanik from "./pages/admin/DetailMekanik";
import Suplier from "./pages/admin/Suplier";
import AddBarang from "./pages/admin/AddBarang";
import AddSuplier from "./pages/admin/AddSuplier";
import AddKendaraan from "./pages/customer/AddKendaraan";
import DetailKendaraan from "./pages/customer/DetailKendaraan";
import EditKendaraan from "./pages/customer/EditKendraan";
import DetailPesanan from "./pages/customer/DetailPesanan";
import AddPesanan from "./pages/customer/AddPesanan";
import EditPesanan from "./pages/customer/EditPesanan";
import AddTransaksi from "./pages/customer/AddTransaksi";
import DetailTransaksi from "./pages/customer/DetailTransaksi";

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
          path="/kendaraan/add"
          element={
            <AppProvider>
              <Template>
                <AddKendaraan />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/kendaraan/detail/:id"
          element={
            <AppProvider>
              <Template>
                <DetailKendaraan />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/kendaraan/edit/:id"
          element={
            <AppProvider>
              <Template>
                <EditKendaraan />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/pesanan"
          element={
            <AppProvider>
              <Template>
                <Pesanan />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/pesanan/add"
          element={
            <AppProvider>
              <Template>
                <AddPesanan />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/pesanan/detail/:id"
          element={
            <AppProvider>
              <Template>
                <DetailPesanan />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/pesanan/edit/:id"
          element={
            <AppProvider>
              <Template>
                <EditPesanan />
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
          path="/transaksi/add"
          element={
            <AppProvider>
              <Template>
                <AddTransaksi />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/transaksi/detail/:id"
          element={
            <AppProvider>
              <Template>
                <DetailTransaksi />
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
        <Route
          path="/barang/add"
          element={
            <AppProvider>
              <Template>
                <AddBarang />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/suplier"
          element={
            <AppProvider>
              <Template>
                <Suplier />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/suplier/add"
          element={
            <AppProvider>
              <Template>
                <AddSuplier />
              </Template>
            </AppProvider>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
