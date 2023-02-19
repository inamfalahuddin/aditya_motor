-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 19 Feb 2023 pada 12.06
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
(255841, 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jdXN0b21lciI6MjU1ODQxLCJyb2xlIjoidXNlciIsImlhdCI6MTY3Njc1OTczMSwiZXhwIjoxNjc2ODQ2MTMxfQ.nhYNKq3XdmCMKUAosIYk1zyYEy6N55Oytxyi_1AN918', '2023-02-18 22:35:31', '0000-00-00 00:00:00'),
(710843, 'admin', '', '2023-02-17 01:33:26', '0000-00-00 00:00:00'),
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

--
-- Dumping data untuk tabel `kendaraan`
--

INSERT INTO `kendaraan` (`id_kendaraan`, `id_customer`, `nomor_polisi`, `warna_kendaraan`, `merk_kendaraan`, `jenis_model`, `tahun_kendaraan`, `isi_silinder`, `bahan_bakar`) VALUES
(487524, 255841, 'ed8748er', 'putih', 'honda', 'beat strit', 2020, '140', 'bensin'),
(487526, 255841, 'AB3456HD', 'hitam', 'honda', 'vario', 2015, '120', 'bensin'),
(487527, 255841, 'E87656HD', 'merah', 'honda', 'vario', 2008, '120', 'bensin');

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
  `id_customer` int(11) NOT NULL,
  `alamat` varchar(200) NOT NULL,
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

INSERT INTO `pesanan` (`id_pesanan`, `id_customer`, `alamat`, `no_hp`, `no_polisi`, `merk_kendaraan`, `permasalahan`, `pelayanan`, `tanggal`, `jam`, `status`, `no_antrian`) VALUES
(34, 255841, 'dusun 02 desa kudumulya rt/rw 005/003 kec.babakan kab.cirebon 45191', '8745123456', 'D78451DA', 'yamaha', 'ganti kanvas rem', 'booking', '2023-02-18', '11:14:43', 'progres', 6),
(41, 255841, 'Dusun 02 Desa Kudumulya Rt/Rw 005/003 Kec.Babakan Kab.Cirebon 45191	', '0824505210', 'D45782GH', 'scopy', 'ganti lampu', 'booking', '2023-02-19', '06:10:42', 'selesai', 1),
(42, 255841, 'Dusun 02 Desa Kudumulya Rt/Rw 005/003 Kec.Babakan Kab.Cirebon 45191	', '0875478751330', 'AB78542BG', 'mio j', 'buluk', 'home service', '2023-02-19', '06:14:46', 'pending', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(5) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `id_mekanik` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `tanggal` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_customer`, `id_mekanik`, `id_pesanan`, `id_barang`, `qty`, `total`, `tanggal`) VALUES
(174523, 255841, 3, 34, 4, 1, 200000, '2023-02-19 03:52:52');

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
  ADD PRIMARY KEY (`id_pesanan`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_customer` (`id_customer`,`id_pesanan`,`id_barang`),
  ADD KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `id_barang` (`id_barang`),
  ADD KEY `id_mekanik` (`id_mekanik`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  MODIFY `id_kendaraan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=487528;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174524;

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
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_4` FOREIGN KEY (`id_mekanik`) REFERENCES `mekanik` (`id_mekanik`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
