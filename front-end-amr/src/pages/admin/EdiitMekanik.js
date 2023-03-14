// import React, { useCallback, useEffect, useState } from "react";
// import { useAppContext } from "../../context/app-context";
// import IconData from "../../images/icon-data.svg";
// import Button from "../../components/Button";
// import { useNavigate, useParams } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPrivate from "../../hooks/usePrivate";
// import Alert from "../../components/Alert";
// import jwtDecode from "jwt-decode";

// function EditMekanik() {
//   const [state, dispatch] = useAppContext();
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const axiosPrivate = useAxiosPrivate();

//   const [kode, setKode] = useState("");
//   const [nama, setNama] = useState("");
//   const [harga, setHarga] = useState("");
//   const [qty, setQty] = useState("");

//   const [message, setMessage] = useState({});

//   const { id } = useParams();

//   useEffect(() => {
//     dispatch({ type: "SET_TITLE", payload: "edit mekanik" });

//     auth();
//   }, []);

//   useEffect(() => {
//     getDataMekanik(id);

//     const decode = state.token.bearer && jwtDecode(state.token.bearer);
//     if (decode.role === "user") {
//       navigate(`/dashboard`);
//     }
//   }, [state.token.bearer]);

//   const editDataMekanik = async () => {
//     try {
//       if (formValidation()) {
//         const response = await axiosPrivate.put(
//           `/mekanik/${id}`,
//           {
//             kode_mekanik: kode,
//             nama_mekanik: nama,
//             harga_mekanik: harga,
//             qty,
//           },
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: `Bearer ${state.token.bearer}`,
//             },
//           }
//         );
//         setMessage({ message: response.data.message, color: "success" });
//       }
//     } catch (err) {
//       setMessage({ message: err.response.data.message, color: "danger" });
//     }
//   };

//   const getDataMekanik = async (id) => {
//     try {
//       const response = await axiosPrivate.get(`mekanik/${id}`, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${state.token.bearer}`,
//         },
//       });

//       const data = response.data.data[0];

//       console.log(data);
//       setKode(data.kode_mekanik);
//       setNama(data.nama_mekanik);
//       setHarga(data.harga_mekanik);
//       setQty(data.qty);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const formValidation = () => {
//     if (nama === "") {
//       setMessage({
//         message: "nama wajib di isi",
//         color: "warning",
//       });
//       return false;
//     } else {
//       if (harga === "") {
//         setMessage({
//           message: "alamat hp wajib di isi",
//           color: "warning",
//         });
//         return false;
//       } else {
//         if (qty === "") {
//           setMessage({
//             message: "No hp wajib di isi",
//             color: "warning",
//           });
//           return false;
//         } else {
//           setMessage({});
//           return true;
//         }
//       }
//     }
//   };

//   return (
//     <>
//       {message.message !== undefined ? <Alert data={message} /> : null}

//       <div className="card">
//         <div className="card-header bg-danger text-white">
//           <img src={IconData} alt="icon pengguna" />
//           <span className="ms-3">Tambah Data Mekanik</span>
//         </div>
//         <div className="card-body">
//           <div className="row">
//             <div className="col col-8">
//               <div className="row g-3 px-4 align-items-center mb-4">
//                 <div className="col-2">
//                   <label htmlFor="inputPassword6" className="col-form-label">
//                     Nama Mekanik
//                   </label>
//                 </div>
//                 <div className="col-10">
//                   <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
//                     {dataMekanik[0] && dataMekanik[0].nama_mekanik}
//                   </span>
//                 </div>
//               </div>
//               <div className="row g-3 px-4 align-items-center mb-4">
//                 <div className="col-2">
//                   <label htmlFor="inputPassword6" className="col-form-label">
//                     Alamat
//                   </label>
//                 </div>
//                 <div className="col-10">
//                   <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
//                     {dataMekanik[0] && dataMekanik[0].alamat}
//                   </span>
//                 </div>
//               </div>
//               <div className="row g-3 px-4 align-items-center mb-4">
//                 <div className="col-2">
//                   <label htmlFor="inputPassword6" className="col-form-label">
//                     No Hp
//                   </label>
//                 </div>
//                 <div className="col-10">
//                   <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
//                     {dataMekanik[0] && dataMekanik[0].no_hp}
//                   </span>
//                 </div>
//               </div>
//               <div className="row g-3 px-4 align-items-center mb-4">
//                 <div className="col-2">
//                   <label htmlFor="inputPassword6" className="col-form-label">
//                     Jabatan
//                   </label>
//                 </div>
//                 <div className="col-10">
//                   <span className="bg-light py-2 px-4 rounded-2 d-inline-block w-100">
//                     {dataMekanik[0] && dataMekanik[0].jabatan}
//                   </span>
//                 </div>
//               </div>
//               <div className="row g-3 px-4 align-items-center mb-4">
//                 <div className="col-2"></div>
//                 <div className="col-10">
//                   <Button
//                     className="me-3"
//                     color="danger"
//                     onclick={() => navigate("/mekanik")}
//                   >
//                     Kembali
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditMekanik;

import React from "react";

function EdiitMekanik() {
  return <div>Hallo sayang</div>;
}

export default EdiitMekanik;
