-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 19 Mar 2023 pada 14.37
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aditya_motor`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `auth`
--

CREATE TABLE `auth` (
  `id_customer` int(11) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `auth`
--

INSERT INTO `auth` (`id_customer`, `role`, `token`, `createdAt`, `updatedAt`) VALUES
(255841, 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jdXN0b21lciI6MjU1ODQxLCJyb2xlIjoidXNlciIsImlhdCI6MTY3ODYzNjMzMywiZXhwIjoxNjc4NzIyNzMzfQ.3Bw6-N4C3K9VWMWnqzY8orkLt6xd9X2X0pG4sa-R2p0', '2023-03-12 15:52:13', '0000-00-00 00:00:00'),
(710843, 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jdXN0b21lciI6NzEwODQzLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzkyMzA4OTEsImV4cCI6MTY3OTMxNzI5MX0.lNojnsaon0gun6P8J7VQuA8XwHHZRibratF_lrIbDSI', '2023-03-19 13:01:31', '0000-00-00 00:00:00'),
(152238, 'user', '', '2023-02-25 13:50:50', '0000-00-00 00:00:00'),
(267451, 'user', '', '2023-03-12 15:08:52', '0000-00-00 00:00:00'),
(872343, 'user', NULL, '2023-02-19 23:20:17', '0000-00-00 00:00:00'),
(740699, 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jdXN0b21lciI6NzQwNjk5LCJyb2xlIjoidXNlciIsImlhdCI6MTY3OTIzMDE2MSwiZXhwIjoxNjc5MzE2NTYxfQ.V51YCUgsxWZXboLkIZwbzqYUsQHTaNwTGrlfIKpokho', '2023-03-19 12:49:21', '0000-00-00 00:00:00'),
(201562, 'user', '', '2023-03-15 01:18:20', '0000-00-00 00:00:00'),
(930224, 'user', '', '2023-03-16 16:23:38', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `barang`
--

CREATE TABLE `barang` (
  `id_barang` int(11) NOT NULL,
  `kode_barang` int(11) NOT NULL,
  `nama_barang` varchar(30) NOT NULL,
  `harga_barang` int(11) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `barang`
--

INSERT INTO `barang` (`id_barang`, `kode_barang`, `nama_barang`, `harga_barang`, `qty`) VALUES
(4, 3456, 'Kampas rem belakang yamaha', 35000, 30),
(2160, 87864513, 'knalpot c56', 250000, 30),
(2564, 7845130, 'kanvas', 50000, 60);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `no_tlp` varchar(12) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`id_customer`, `username`, `alamat`, `no_tlp`, `email`, `password`) VALUES
(152238, 'budi sembada', 'bojong gebang', '083816014304', 'budi@gmail.com', '$2b$10$HPhRoj45u2WWak4w7G0zaeFq47a9.ufCUJS8LJpCD8MEUIjB6zHrW'),
(201562, 'Hanifah', 'babakan losari', '0875421345', 'hanifah@mail.com', '$2b$10$ZvM4FI81ulgS2/UIjdtiiet394d/PEhfoLJ10qODAWTCqmrQKa7/6'),
(255841, 'fathan sembada', 'pabuaran wetan I', '083816014356', 'patan@mail.com', '$2b$10$UJC9hOb6GSApLqqYffXkoO49FTj8lzZ3UNYSzkUJF4QVNTCI8Jami'),
(267451, 'riska widianti', 'sumber kidul', '087878455478', 'riska@mail.com', '$2b$10$k4BsJ4Cj9SHB8mMmrf4MK.rgCTzobI6tjbyzcIamdaiFu7jPzuHvG'),
(710843, 'Ir. Budi Setiawan', 'kudumulya', '083816014356', 'budi@mail.com', '$2b$10$To8lcafTvoCuALxNMvsGyOMim/v5GAbsf1orgo03c8MbGffZC0CF2'),
(740699, 'Novi Layla', 'boyolali wetan', '088745621328', 'lala@mail.com', '$2b$10$A5Q9ns00FVEiJgniKXAFKePqixGoXQ.S72NlBGK.saFKawmEm2D.O'),
(872343, 'unknow', 'asdflj ', '54464', 'asdfasdf6', '$2b$10$zccBZ.DFVY6vPQI4CtlDHOpb0vRQGbkYuXQfWnd1rKFrPUsdrZZLq'),
(930224, 'nadya putri suwandi', 'cikancas kuningan jawa barat', '087547874312', 'nadya@mail.com', '$2b$10$oW.AjhGdKv1t5sQnOOzCpuxlx1SclMoc83V/UkQBDNjiZS00mmPT.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kendaraan`
--

CREATE TABLE `kendaraan` (
  `id_kendaraan` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `nomor_polisi` varchar(25) NOT NULL,
  `warna_kendaraan` varchar(30) NOT NULL,
  `merk_kendaraan` varchar(30) NOT NULL,
  `jenis_model` varchar(30) NOT NULL,
  `tahun_kendaraan` int(11) NOT NULL,
  `isi_silinder` varchar(30) NOT NULL,
  `bahan_bakar` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kendaraan`
--

INSERT INTO `kendaraan` (`id_kendaraan`, `id_customer`, `nomor_polisi`, `warna_kendaraan`, `merk_kendaraan`, `jenis_model`, `tahun_kendaraan`, `isi_silinder`, `bahan_bakar`) VALUES
(487524, 255841, 'ed8748er', 'putih', 'honda', 'beat strit', 2020, '140', 'bensin'),
(487526, 255841, 'AB3456HD', 'hitam', 'honda', 'vario', 2015, '120', 'bensin'),
(487527, 255841, 'E87656HD', 'merah', 'honda', 'vario', 2008, '120', 'bensin'),
(487528, 267451, 'AB547GS', 'hitam', 'yamaha', 'vario', 2002, '120', 'minyak'),
(487529, 740699, 'AB8754HD', 'hitam', 'yamaha', 'mio j', 2018, '70', 'minyak goreng'),
(487530, 201562, 'E784HD', 'hitam', 'honda', 'supra x', 2020, '200', 'bensin/pertalite/pertamax'),
(487531, 740699, 'AB87542GH', 'putih', 'honda', 'beat stret', 2020, '120', 'minyak'),
(487533, 930224, 'E45782HJ', 'orange', 'honda', 'beat', 2015, '90', 'minyak goreng');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mekanik`
--

CREATE TABLE `mekanik` (
  `id_mekanik` int(11) NOT NULL,
  `nama_mekanik` varchar(30) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `foto` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mekanik`
--

INSERT INTO `mekanik` (`id_mekanik`, `nama_mekanik`, `alamat`, `no_hp`, `jabatan`, `foto`) VALUES
(25231, 'andika', 'hulubanteng', '234232', 'Mekanik 1', '3'),
(45233, 'yoga', 'sumber', '234092', 'Mekanik 1', '2'),
(45235, 'lukman hakim', 'gebang', '082214658750', 'Mekanik 1', '3'),
(48233, 'aditya imam', 'tegal', '875421212', 'front end', '/home/inam/Documents/aditya motor/back-end/uploads/LOGO-BALITBANGDA-pwt4d6kohudfif0r7dam83ddzl4774am42lqml9l34.png'),
(48254, 'hasan albanna', 'bantul', '0875424578', 'cyber security', '/home/inam/Documents/aditya motor/back-end/uploads/incubator-10-min-768x545.jpeg'),
(48255, 'in\'am falahuddin', 'l;jaddsflj ', '4321321', 'dalfsj', '/home/inam/Documents/aditya motor/back-end/uploads/thumbnail-2.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `owner`
--

CREATE TABLE `owner` (
  `id_owner` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `owner`
--

INSERT INTO `owner` (`id_owner`, `username`, `email`, `password`) VALUES
(1, 'admin', 'admin@gmai.com', '21232f297a57a5a743894a0e4a801fc3');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `metode` varchar(50) NOT NULL,
  `bukti_pembayaran` varchar(254) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pembayaran`
--

INSERT INTO `pembayaran` (`id_pembayaran`, `id_transaksi`, `metode`, `bukti_pembayaran`, `status`, `createdAt`) VALUES
(245413179, 174564, 'debit', '/images/incubator-10-min-768x545.jpeg', 'konfirmasi', '2023-03-19 13:10:57'),
(245413180, 174565, 'cash', '', 'konfirmasi', '2023-03-19 13:23:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `no_hp` varchar(30) NOT NULL,
  `no_polisi` varchar(30) NOT NULL,
  `merk_kendaraan` varchar(30) NOT NULL,
  `permasalahan` varchar(200) NOT NULL,
  `pelayanan` enum('booking','home service') NOT NULL,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL,
  `status` varchar(25) NOT NULL,
  `no_antrian` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `id_customer`, `alamat`, `no_hp`, `no_polisi`, `merk_kendaraan`, `permasalahan`, `pelayanan`, `tanggal`, `jam`, `status`, `no_antrian`) VALUES
(44, 255841, 'Jl. Pangeran sutajaya no. 142 kec. pabuaran kab. cirebon jawa barat', '087854561234', 'AB7584SD', 'yamaha', '- ganti oli\n- kanvas rem', 'booking', '2023-02-25', '22:00:20', 'pending', 2),
(45, 255841, 'Jl. Pangeran Sutajaya No. 142 Kec. Pabuaran Kab. Cirebon Jawa Barat', '082236451', 'AB7854DS', 'yamaha', '- ganti oli\n- ganti knalpot', 'booking', '2023-02-25', '22:24:20', 'selesai', 3),
(46, 255841, 'Jl. Pangeran Sutajaya No. 142 Kec. Pabuaran Kab. Cirebon Jawa Barat', '087453156', 'AB4547AD', 'honda', '- tidak ada', 'booking', '2023-02-25', '22:25:11', 'selesai', 4),
(47, 267451, 'tidak adfa', '05487', 'AB1234GAS', 'vario', 'ganti oli', 'booking', '2023-02-26', '00:43:36', 'selesai', 1),
(48, 740699, 'desa kudumulya kec. babakan kab. cirebon jawa barat 45191', '083874741234', 'AB78423HD', 'mio j', 'ganti oli ', 'booking', '2023-03-10', '05:42:48', 'pending', 1),
(49, 267451, 'adf', 'asdf', 'AB547GS', 'yamaha', 'adsf', 'booking', '2023-03-12', '00:43:22', 'pending', 1),
(50, 267451, 'asfd', 'asdf', 'AB547GS', 'yamaha', 'asdf', 'home service', '2023-03-12', '00:43:44', 'pending', 2),
(51, 267451, 'desa sumber kidul dan lor', '087532132132', 'AB547GS', 'yamaha', '- tidak ada\n- tidak memiliki rem\n- mampu menahan panas', 'home service', '2023-03-12', '00:45:23', 'progres', 3),
(52, 267451, 'Kali deres', '085842134568', 'AB547GS', 'yamaha', '- belajar react js', 'home service', '2023-03-12', '12:39:01', 'progres', 4),
(53, 201562, 'babakan losari kec. babakan kab. cirebon', '0875423187', 'E784HD', 'honda', '- motor sering mogok\n- stater tidak bisa nyala\n- ganti oli \n- ganti lampu sen\n- ganti lampu depan\n- ganti klakson', 'booking', '2023-03-14', '20:04:45', 'progres', 1),
(54, 740699, 'boyolali', '2020220545', 'AB87542GH', 'honda', 'makan nasi goreng', 'home service', '2023-03-15', '22:10:42', 'selesai', 1),
(55, 740699, 'dassadasdas', '213123', 'AB8754HD', 'yamaha', 'motornya rusak', 'booking', '2023-03-16', '10:53:50', 'pending', 1),
(56, 930224, 'cikancas kec. waled kab. kuningan jawa barat', '087542134567', 'E45782HJ', 'honda', 'tidak bisa kopling', 'booking', '2023-03-16', '21:07:42', 'progres', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `rekening`
--

CREATE TABLE `rekening` (
  `id_rekening` int(10) NOT NULL,
  `atas_nama` varchar(100) NOT NULL,
  `nama_bank` varchar(50) NOT NULL,
  `no_rekening` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `rekening`
--

INSERT INTO `rekening` (`id_rekening`, `atas_nama`, `nama_bank`, `no_rekening`) VALUES
(2154882, 'aditya imam', 'BRI', '22154078032103');

-- --------------------------------------------------------

--
-- Struktur dari tabel `suplier`
--

CREATE TABLE `suplier` (
  `id_suplier` int(11) NOT NULL,
  `nama_toko` varchar(100) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `no_hp` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `suplier`
--

INSERT INTO `suplier` (`id_suplier`, `nama_toko`, `alamat`, `no_hp`) VALUES
(45778, 'Toko Dea', 'Dusun 04 Desa Kudumulya RT/RW 005/004 Kec. Babakan Kab. Cirebon 45191', '083845647897'),
(45800, 'tuku penasaran II', 'jalan makam roma II', '008784512457');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(5) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_mekanik` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `biaya_operasi` float NOT NULL,
  `total` float DEFAULT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp(),
  `barang` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_customer`, `id_pesanan`, `id_mekanik`, `qty`, `biaya_operasi`, `total`, `tanggal`, `barang`) VALUES
(174548, 255841, 46, 2, 0, 0, 0, '2023-03-04 00:00:00', '[]'),
(174549, 255841, 44, 6, 0, 0, 0, '2023-03-04 00:00:00', '[]'),
(174550, 267451, 47, 7, 4, 0, 585000, '2023-03-04 00:00:00', '[{\"id\":4,\"nama\":\"Kampas rem belakang yamaha\",\"harga\":35000},{\"id\":2160,\"nama\":\"knalpot c56\",\"harga\":250000},{\"id\":2564,\"nama\":\"kanvas\",\"harga\":50000},{\"id\":2160,\"nama\":\"knalpot c56\",\"harga\":250000}]'),
(174551, 267451, 50, 45231, 2, 300000, 285000, '2023-03-11 00:00:00', '[{\"id\":4,\"nama\":\"Kampas rem belakang yamaha\",\"harga\":35000},{\"id\":2160,\"nama\":\"knalpot c56\",\"harga\":250000}]'),
(174552, 267451, 52, 48232, 1, 5000, 40000, '2023-03-12 00:00:00', '[{\"id\":4,\"nama\":\"Kampas rem belakang yamaha\",\"harga\":35000}]'),
(174556, 201562, 53, 48233, 2, 100000, 400000, '2023-03-14 00:00:00', '[{\"id\":2564,\"nama\":\"kanvas\",\"harga\":50000},{\"id\":2160,\"nama\":\"knalpot c56\",\"harga\":250000}]'),
(174559, 255841, 45, 48233, 2, 20000, 105000, '2023-03-16 00:00:00', '[{\"id\":4,\"nama\":\"Kampas rem belakang yamaha\",\"harga\":35000},{\"id\":2564,\"nama\":\"kanvas\",\"harga\":50000}]'),
(174560, 930224, 56, 25231, 2, 50000, 335000, '2023-03-16 00:00:00', '[{\"id\":2160,\"nama\":\"knalpot c56\",\"harga\":250000},{\"id\":4,\"nama\":\"Kampas rem belakang yamaha\",\"harga\":35000}]'),
(174564, 740699, 54, 48233, 1, 20000, 55000, '2023-03-18 00:00:00', '[{\"id\":4,\"nama\":\"Kampas rem belakang yamaha\",\"harga\":35000}]'),
(174565, 740699, 55, 45233, 3, 200000, 535000, '2023-03-18 00:00:00', '[{\"id\":2160,\"nama\":\"knalpot c56\",\"harga\":250000},{\"id\":4,\"nama\":\"Kampas rem belakang yamaha\",\"harga\":35000},{\"id\":2564,\"nama\":\"kanvas\",\"harga\":50000}]');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `auth`
--
ALTER TABLE `auth`
  ADD KEY `id_customer` (`id_customer`);

--
-- Indeks untuk tabel `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indeks untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  ADD PRIMARY KEY (`id_kendaraan`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Indeks untuk tabel `mekanik`
--
ALTER TABLE `mekanik`
  ADD PRIMARY KEY (`id_mekanik`);

--
-- Indeks untuk tabel `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`id_owner`);

--
-- Indeks untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Indeks untuk tabel `rekening`
--
ALTER TABLE `rekening`
  ADD PRIMARY KEY (`id_rekening`);

--
-- Indeks untuk tabel `suplier`
--
ALTER TABLE `suplier`
  ADD PRIMARY KEY (`id_suplier`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  MODIFY `id_kendaraan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=487534;

--
-- AUTO_INCREMENT untuk tabel `mekanik`
--
ALTER TABLE `mekanik`
  MODIFY `id_mekanik` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48256;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245413181;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT untuk tabel `rekening`
--
ALTER TABLE `rekening`
  MODIFY `id_rekening` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2154884;

--
-- AUTO_INCREMENT untuk tabel `suplier`
--
ALTER TABLE `suplier`
  MODIFY `id_suplier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45803;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174566;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `auth_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  ADD CONSTRAINT `kendaraan_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `auth` (`id_customer`);

--
-- Ketidakleluasaan untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
