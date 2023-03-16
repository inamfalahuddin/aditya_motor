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
import EditSuplier from "./pages/admin/EditSuplier";
import DetailSuplier from "./pages/admin/DetailSuplier";
import DetailBarang from "./pages/admin/DetailBarang";
import EditBarang from "./pages/admin/EditBarang";
import EditTransaksi from "./pages/customer/EditTransaksi";
import Pembayaran from "./pages/customer/Pembayaran";
import EditMekanik from "./pages/admin/EditMekanik";
import Print from "./pages/Print";

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
          path="/transaksi/print"
          element={
            <AppProvider>
              <Print />
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
          path="/transaksi/edit/:id"
          element={
            <AppProvider>
              <Template>
                <EditTransaksi />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/pembayaran/:id"
          element={
            <AppProvider>
              <Template>
                <Pembayaran />
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
          path="/mekanik/detail/:id"
          element={
            <AppProvider>
              <Template>
                <DetailMekanik />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/mekanik/edit/:id"
          element={
            <AppProvider>
              <Template>
                <EditMekanik />
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
          path="/barang/detail/:id"
          element={
            <AppProvider>
              <Template>
                <DetailBarang />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/barang/edit/:id"
          element={
            <AppProvider>
              <Template>
                <EditBarang />
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
        <Route
          path="/suplier/edit/:id"
          element={
            <AppProvider>
              <Template>
                <EditSuplier />
              </Template>
            </AppProvider>
          }
        />
        <Route
          path="/suplier/detail/:id"
          element={
            <AppProvider>
              <Template>
                <DetailSuplier />
              </Template>
            </AppProvider>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
