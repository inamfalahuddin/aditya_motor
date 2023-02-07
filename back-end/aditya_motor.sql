-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 07 Feb 2023 pada 04.18
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
(255841, 'user', '', '2023-02-07 03:16:30', '0000-00-00 00:00:00'),
(710843, 'user', '', '2023-02-07 03:16:30', '0000-00-00 00:00:00'),
(182924, 'user', NULL, '2023-02-07 03:16:30', '0000-00-00 00:00:00'),
(321711, 'admin', NULL, '2023-02-07 03:16:47', '0000-00-00 00:00:00'),
(512867, 'user', NULL, '2023-02-07 03:16:30', '0000-00-00 00:00:00');

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
(2, 1234, 'Kampas rem honda', 35000, 20),
(3, 234, 'kampas rem depan yamaha', 35000, 20),
(4, 3456, 'Kampas rem belakang yamaha', 35000, 30),
(5, 555, 'gas spontan universal', 80000, 10),
(6, 567, 'tali gas universal', 15000, 15);

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
(182924, 'budi setiawan', 'desa kudumulya kec. babakan kab. cirebon', '083816014304', 'budi@gmail.com', 'budi'),
(255841, 'fathan', 'Bojong gebang', '083816014356', 'patan@mail.com', '$2b$10$UJC9hOb6GSApLqqYffXkoO49FTj8lzZ3UNYSzkUJF4QVNTCI8Jami'),
(290501, 'budi setiawan', 'desa kudumulya kec. babakan kab. cirebon', '083816014304', 'budi@gmail.com', 'budi'),
(321711, 'canu cartanu', 'kdk', '87', 'canu@mail.com', 'canu'),
(495092, 'budi setiawan', 'desa kudumulya kec. babakan kab. cirebon', '083816014304', 'budi@gmail.com', 'budi'),
(512867, 'gajah', 'kudukuras', '9928', 'gajah@mail.com', 'gajah'),
(679947, 'budi setiawan', 'desa kudumulya kec. babakan kab. cirebon', '083816014304', 'budi@gmail.com', 'budi'),
(710843, 'Fathanilah', 'Bojong gebang', '083816014356', 'budi@mail.com', '$2b$10$To8lcafTvoCuALxNMvsGyOMim/v5GAbsf1orgo03c8MbGffZC0CF2'),
(979465, 'budi setiawan', 'desa kudumulya kec. babakan kab. cirebon', '083816014304', 'budi@gmail.com', 'budi');

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

-- --------------------------------------------------------

--
-- Struktur dari tabel `mekanik`
--

CREATE TABLE `mekanik` (
  `id_mekanik` int(11) NOT NULL,
  `nama_mekanik` varchar(30) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `no_hp` int(15) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `foto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mekanik`
--

INSERT INTO `mekanik` (`id_mekanik`, `nama_mekanik`, `alamat`, `no_hp`, `jabatan`, `foto`) VALUES
(1, 'yoga', 'sumber', 234092, 'Mekanik 1', '2'),
(2, 'opal', 'gebang', 23904, 'Mekanik 1', '2'),
(3, 'andika', 'hulubanteng', 234232, 'Mekanik 1', '3'),
(4, 'lukman', 'gebang', 23423, 'Mekanik 1', '3'),
(5, 'maman', 'sindang', 32927309, 'Mekanik 1', '2'),
(6, 'fuad', 'sumber lor', 203993, 'Mekanik 1', '2'),
(7, 'In\'am Falahuddin', 'Jl. Pangeran Sutajaya No. 142 Kec. Babakan Kab. Cirebon Jawa Barat 45191', 822441578, 'Mekanik 1', 'hasil');

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
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `nama_customer` varchar(30) NOT NULL,
  `alamat` varchar(30) NOT NULL,
  `no_hp` varchar(30) NOT NULL,
  `no_polisi` varchar(30) NOT NULL,
  `merk_kendaraan` varchar(30) NOT NULL,
  `permasalahan` varchar(30) NOT NULL,
  `pelayanan` enum('booking','home service') NOT NULL,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL,
  `status` varchar(25) NOT NULL,
  `no_antrian` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `nama_customer`, `alamat`, `no_hp`, `no_polisi`, `merk_kendaraan`, `permasalahan`, `pelayanan`, `tanggal`, `jam`, `status`, `no_antrian`) VALUES
(2, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '02:46:47', 'pending', 5),
(3, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-30', '02:48:16', 'pending', 5),
(6, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:02:01', 'pending', 3),
(7, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:02:08', 'pending', 4),
(10, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:03:24', 'pending', 6),
(12, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:04:22', 'pending', 7),
(13, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:04:42', 'pending', 8),
(14, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:05:05', 'pending', 1),
(15, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:05:48', 'pending', 9),
(16, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:06:03', 'pending', 6),
(17, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:06:23', 'pending', 1),
(18, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:07:05', 'pending', 10),
(19, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:08:47', 'pending', 11),
(20, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:12:02', 'pending', 12),
(21, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:12:37', 'pending', 13),
(22, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:14:33', 'pending', 14),
(23, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:15:06', 'pending', 15),
(24, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2022-12-31', '03:15:23', 'pending', 16),
(25, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2023-01-01', '10:18:45', 'pending', 1),
(26, 'Kokompor', 'Pabuaran Wetan', '083816014304', 'E 21572 XZ', 'Honda', 'Rem pakem', 'booking', '2023-01-01', '10:19:37', 'pending', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `suplier`
--

CREATE TABLE `suplier` (
  `id_suplier` int(11) NOT NULL,
  `nama_suplier` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `no_hp` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `suplier`
--

INSERT INTO `suplier` (`id_suplier`, `nama_suplier`, `alamat`, `no_hp`) VALUES
(1, 'toko indah', 'gebang', '18374'),
(2, 'toko makmur', 'sindang', '239847'),
(3, 'toko mesin', 'waled', '2344'),
(4, 'toko wajan', 'adskhfajk', '928374'),
(5, 'toko', 'ciledug', '829374'),
(6, 'toko jiwa', 'pabuaran', '9323'),
(10, 'Kokompor', 'Pabuaran Wetan', '083816014304');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `id_mekanik` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `qty` int(11) NOT NULL,
  `harga_barang` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`);

--
-- Indeks untuk tabel `suplier`
--
ALTER TABLE `suplier`
  ADD PRIMARY KEY (`id_suplier`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_customer` (`id_customer`,`id_mekanik`,`id_barang`,`id_pesanan`),
  ADD KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `id_mekanik` (`id_mekanik`),
  ADD KEY `id_barang` (`id_barang`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `barang`
--
ALTER TABLE `barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=984322;

--
-- AUTO_INCREMENT untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  MODIFY `id_kendaraan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `mekanik`
--
ALTER TABLE `mekanik`
  MODIFY `id_mekanik` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2457822;

--
-- AUTO_INCREMENT untuk tabel `owner`
--
ALTER TABLE `owner`
  MODIFY `id_owner` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `suplier`
--
ALTER TABLE `suplier`
  MODIFY `id_suplier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5521217;

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
  ADD CONSTRAINT `kendaraan_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_mekanik`) REFERENCES `mekanik` (`id_mekanik`),
  ADD CONSTRAINT `transaksi_ibfk_4` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
