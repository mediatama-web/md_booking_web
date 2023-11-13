-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Nov 2023 pada 09.56
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new_booking`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `absen`
--

CREATE TABLE `absen` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jam` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `absen`
--

INSERT INTO `absen` (`id`, `jam`, `tanggal`, `id_user`, `id_kelas`, `created_at`, `updated_at`) VALUES
(1, '09:39:35', '2023-08-24', 1, 6, '2023-08-24 02:39:35', '2023-08-24 02:39:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `banner`
--

CREATE TABLE `banner` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `jam` varchar(255) NOT NULL,
  `id_mentor` int(11) DEFAULT NULL,
  `id_daftarkelas` int(11) NOT NULL,
  `status` enum('pending','diterima','ditolak') NOT NULL,
  `absen` enum('0','1') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`id`, `id_user`, `tanggal`, `jam`, `id_mentor`, `id_daftarkelas`, `status`, `absen`, `created_at`, `updated_at`) VALUES
(1, 1, '2023-08-28', '14:00', 88, 3, 'diterima', '0', '2023-08-21 20:53:12', '2023-08-28 14:52:35'),
(2, 1, '2023-08-28', '09:00', NULL, 3, 'pending', '0', '2023-08-28 09:05:19', '2023-08-28 10:58:07'),
(3, 1, '2023-11-14', '10:00', NULL, 3, 'pending', '0', '2023-11-13 03:05:23', '2023-11-13 03:05:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `daftarkelas`
--

CREATE TABLE `daftarkelas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `status` enum('aktif','tidak aktif') NOT NULL,
  `sertifikat` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `daftarkelas`
--

INSERT INTO `daftarkelas` (`id`, `id_user`, `id_kelas`, `status`, `sertifikat`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 'aktif', 'test.pdf', '2023-08-21 20:52:42', '2023-08-21 20:52:42'),
(2, 1, 9, 'aktif', NULL, '2023-08-21 20:52:45', '2023-08-21 20:52:45'),
(3, 1, 6, 'aktif', NULL, '2023-08-21 20:52:51', '2023-08-21 20:52:51'),
(4, 2, 2, 'aktif', 'https://mediatamabooking.aplikasikasirku.com/upload/1693459806.pdf', '2023-08-31 05:17:31', '2023-08-31 05:28:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `materi` varchar(255) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `harga` varchar(255) NOT NULL,
  `pertemuan` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id`, `materi`, `jenis`, `harga`, `pertemuan`, `created_at`, `updated_at`) VALUES
(2, 'Microsoft Office', 'Regular', '300000', 0, NULL, NULL),
(3, 'Microsoft Office', 'Private', '500000', 0, NULL, NULL),
(4, 'Membuat Website Instant dengan CMS', 'Reguler', '500000', 0, NULL, NULL),
(5, 'Membuat Website Instant dengan CMS', 'Private', '700000', 0, NULL, NULL),
(6, 'Photoshop', 'Reguler', '450000', 0, NULL, NULL),
(7, 'Photoshop', 'Private', '700000', 0, NULL, NULL),
(8, 'PHP', 'Reguler', '450000', 0, NULL, NULL),
(9, 'PHP', 'Private', '650000', 0, NULL, NULL),
(10, 'VB', 'Reguler', '450000', 0, NULL, NULL),
(11, 'VB', 'Private', '650000', 0, NULL, NULL),
(12, 'Java Programming', 'Reguler', '450000', 0, NULL, NULL),
(13, 'Java Programming', 'Private', '650000', 0, NULL, NULL),
(14, 'Laravel Framework', 'Reguler', '450000', 0, NULL, NULL),
(15, 'Laravel Framework', 'Private', '700000', 0, NULL, NULL),
(16, 'Codeigniter Framework', 'Reguler', '450000', 0, NULL, NULL),
(17, 'Codeigniter Framework', 'Private', '700000', 0, NULL, NULL),
(18, 'YII Framework', 'Reguler', '450000', 0, NULL, NULL),
(19, 'YII Framework', 'Private', '700000', 0, NULL, NULL),
(20, 'Android Programming', 'Reguler', '450000', 0, NULL, NULL),
(21, 'Android Programming', 'Private', '700000', 0, NULL, NULL),
(22, 'UI/UX Design', 'Private', '600000', 0, NULL, NULL),
(23, 'Paket 3 Bulan ( Ms. Office + Design Grafis + Magang )', 'Private', '1500000', 0, NULL, NULL),
(24, 'Kotlin', 'Private', '1300000', 0, NULL, NULL),
(25, 'Digital Marketing', 'Private', '2000000', 0, NULL, '2023-08-21 20:07:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `loker`
--

CREATE TABLE `loker` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `tgl_tayang` date NOT NULL,
  `foto` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `loker`
--

INSERT INTO `loker` (`id`, `judul`, `deskripsi`, `tgl_tayang`, `foto`, `created_at`, `updated_at`) VALUES
(1, 'Selamat kepada Tim Peserta Didik SMA Unggul Sakti', 'asdadasda asdasda asdasda asd', '2023-08-28', 'http://localhost:8000/foto/1693219438.png', '2023-08-28 10:43:58', '2023-08-28 10:43:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mentor`
--

CREATE TABLE `mentor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_mentor` varchar(255) NOT NULL,
  `bidang` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `telpon` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `status` enum('aktif','tidak aktif') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `mentor`
--

INSERT INTO `mentor` (`id`, `nama_mentor`, `bidang`, `email`, `password`, `alamat`, `telpon`, `foto`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Elfina Voutama', 'Web Programmer', 'elfina.voutama@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Padang', '081364380076', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/614302kakk.jpg', 'tidak aktif', NULL, NULL),
(4, 'Sopi Sapriadi', 'PHP, VB', 'hack.devout01@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Raya Lubuk Begalung No 35, RT 01 RW 010, Gang Mesjid Nurul Huda', '082175466926', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/528790bgsop.jpg', 'tidak aktif', NULL, NULL),
(5, 'Nofrian Eka Putra', 'PHP', 'nofrianekaaputraa@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Jihad Kubu Dalam Gang 6 Suhada', '082391061056', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/828832rian.jpeg', 'tidak aktif', NULL, NULL),
(6, 'Ahmad Fajri', 'Web Programmer', 'ahmadfajri.fajri6@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Koto Gadang RT 002 Rw 004, Bungus Teluk Kabung', '081261885254', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/836719dafajri.jpg', 'tidak aktif', NULL, NULL),
(7, 'Ego Dafma Dasa', 'Web Programmer', 'egodasa@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Perumahan Fadila Mandiri Gang Bawang no 01 RT2 RW 12 Banuaran Nan XX', '089519649316', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/926035ego.jpg', 'tidak aktif', NULL, NULL),
(10, 'Rizki Kurniawan', 'Android Developer', 'rizkikurniawan1797@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Moh. Yunus No. 13 Kel. Lubuk Lintah, Kec. Kuranji, Kota Padang', '081299029393', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/420986rizki.jpg', 'tidak aktif', NULL, NULL),
(11, 'Julsapargi Nursam', 'Android Developer', 'egifcb@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Sumatera No. 1 Wisma Indah I', '082382127489', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/693821egi.jpeg', 'tidak aktif', NULL, NULL),
(12, 'Lutri Veflina', 'Web Programmer', 'utiveflina@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Komp. Villa Sentosa Blok L3/RT003/02 Kel. Tabing Banda Gadang Kec. Nanggalo', '085365559200', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/990868lutri.jpeg', 'tidak aktif', NULL, NULL),
(16, 'Putri Andriani Pratiwi', 'Web Programmer', 'putriandriani953@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Padang', '081372246422', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/274695putri.jpg', 'aktif', NULL, NULL),
(20, 'Egova Riva Gustino', 'Web Programmer', 'egovaflavia@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Padang', '082283669007', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/430674egova.jpg', 'tidak aktif', NULL, NULL),
(21, 'Gema Fajar Ramadhan', 'Web Programmer', 'gemafajar09@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Padang', '082122855458', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/604860gema.jpg', 'aktif', NULL, NULL),
(23, 'Restio Afrinza', 'Web Programmer', 'restioa@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Padang', '082240207017', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/440669tio.jpg', 'tidak aktif', NULL, NULL),
(25, 'Syahrul', 'Web Programmer', 'syahrul@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', '', '-', '', 'tidak aktif', NULL, NULL),
(27, 'Putra', 'Web Programmer', 'putraevans001@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', '', '08', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/300768051688300_1562319794-1.jpg', 'tidak aktif', NULL, NULL),
(28, 'Aditya Agusta', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Andalas', '085266353628', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/936667png-transparent-monkey-logo-human-behavior-desktop-monkey-mammal-animals-hand.png', 'tidak aktif', NULL, NULL),
(29, 'Fauzi', 'Web Programmer', 'fauzy.2@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'blabla', '08', '', 'tidak aktif', NULL, NULL),
(30, 'Agung Laksmana', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/203345pngegg (2).png', 'tidak aktif', NULL, NULL),
(31, 'RIRIN FEBRIYANI', 'Web Programmer', 'ririnfebriyani97@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'lubeg', '082387600183', '', 'tidak aktif', NULL, NULL),
(32, 'Fajri Karim', 'PHP', 'fajri@fajri.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Padang', '0821', '', 'tidak aktif', NULL, NULL),
(34, 'Bil Haqi', 'Web Programmer', 'bilhaqi123@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', '', '08898987676', '', 'tidak aktif', NULL, NULL),
(35, 'Danu', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', 'http://mediatamaweb.co.id/Mediatama/Android/mentor/894664087265500_1590562334-tiktok-5064078.jpg', 'tidak aktif', NULL, NULL),
(36, 'Ilham', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '', '-', '', 'tidak aktif', NULL, NULL),
(37, 'Fikri', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '', '-', '', 'tidak aktif', NULL, NULL),
(38, 'Daniel', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '', '-', '', 'tidak aktif', NULL, NULL),
(39, 'Wahyu Kurnia', 'Android Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '', '0', '', 'tidak aktif', NULL, NULL),
(40, 'Muhammad Topan', 'Teknik Komputer', 'topan@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Koto Tuo Pauh', '082363878350', '', 'tidak aktif', NULL, NULL),
(41, 'Eko', 'Design', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(42, 'Rades Saputri', 'Web Programing ', 'radessaputri@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Dr. Moh. Hatta no 13 koto luar, kec. Pauh, kota padang', '081279098072	', '', 'tidak aktif', NULL, NULL),
(44, 'Mufi Arwa', 'Web Programing ', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Benteng RT001/RW003 Kel. Cupak Tangah Kec. Pauh, Padang, Sumatera Barat.', '085263350384', '', 'tidak aktif', NULL, NULL),
(45, 'Hidayatul Fadhilah', 'Android Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Jalan irigasi no 29B Pauh Padang', '082268763883', '', 'tidak aktif', NULL, NULL),
(46, 'Dinda Meivianti Dwi Putri', 'Web Programing ', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Ampang Karang Ganting No 4 RT01 / RW 05', '082171293107', '', 'tidak aktif', NULL, NULL),
(47, 'Mutia Hulwah Nur Alif', 'Android Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl.Bandes Limau Manis,RT.01/RW.04,Pauh, Padang', '085363340522', '', 'tidak aktif', NULL, NULL),
(48, 'Muhammad Al Farizzi', 'Web Programing ', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '082283295530', '', 'tidak aktif', NULL, NULL),
(49, 'Rendhika Aditya', 'Android Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Limau Manis ', '082169774452', '', 'tidak aktif', NULL, NULL),
(50, 'Sulthani Aslam', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Komp. Pratama III Blok D/5, Lubuk Buaya', '085272579285', '', 'tidak aktif', NULL, NULL),
(52, 'M. irfan', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(53, 'Yoga', 'Laravel', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(54, 'Fariz', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'tidak aktif', NULL, NULL),
(55, 'Nurhaniah', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'tidak aktif', NULL, NULL),
(57, 'Silvia Ayu Santika', 'Android Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'tidak aktif', NULL, NULL),
(58, 'Amal', 'web programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(59, 'Fadil', 'Android Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(60, 'Pirdaus', 'web programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(61, 'Arif', 'web programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(62, 'Beni Fajri', 'Android Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'aktif', NULL, NULL),
(63, 'Fauzein Mulya Warman', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(66, 'Rizki Mahendra', 'web programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(67, 'Besty Nofaya', 'Ms.Office', 'nofayabesty@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jln pitameh garden', '083181716327', '', 'tidak aktif', NULL, NULL),
(68, 'Rhea', 'Ms.Office', 'rheahavilah1230@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Kp tanjung, Lubug Begalung', '082382487738', '', 'tidak aktif', NULL, NULL),
(69, 'Nurda Nengsih', 'Ms.Office', 'nurdanengsih03@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'By pass', '083181771033', '', 'tidak aktif', NULL, NULL),
(70, 'Firman', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'tidak aktif', NULL, NULL),
(71, 'Aidil', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(72, 'Satria', 'Web Programmer', '0', '827ccb0eea8a706c4c34a16891f84e7b', '0', '0', '', 'tidak aktif', NULL, NULL),
(73, 'Ferdi', 'Design', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(74, 'Aziz', 'Ms.Office', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'aktif', NULL, NULL),
(75, 'Dewi', 'Web Prorammer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'kebab dara pasar baru,kec pauh padang', '082124495025', '', 'tidak aktif', NULL, NULL),
(76, 'Akbar', 'Web Prorammer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Padang', '082285679322', '', 'tidak aktif', NULL, NULL),
(77, 'Dian ', 'Web Prorammer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Pasaman', '082386011904', '', 'tidak aktif', NULL, NULL),
(78, 'Trisa ', 'Web Prorammer', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'kec.pauh,padang', '082391304480', '', 'tidak aktif', NULL, NULL),
(79, 'Yerri', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '', '-', '', 'aktif', NULL, NULL),
(80, 'Hanif Aulia Sabri', 'PHP,GO,Flotter', 'hanifauliasabriii@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Pauh,Padang', '082290342356', '', 'tidak aktif', NULL, NULL),
(81, 'Ahmad imam', 'Microsoft office', 'ahmadimamtnt@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jalan Cendrawasih,Air Tawar Barat,Padang Utara,Kota Padang Sumatra Barat', '085365443438', '', 'tidak aktif', NULL, NULL),
(82, 'Aulia Yasmin Zulhendrik', 'Microsoft office', 'auliayasminzulhendrik@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Gg.Chaniago 11 no.7,Nanggalo', '085834709432', '', 'tidak aktif', NULL, NULL),
(83, 'Riyan Saputra', 'PHP', 'riyan@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Villaku Indah III, Kec. Kuranji, Kota Padang', '082382961935', '', 'aktif', NULL, NULL),
(84, 'Suci Khairatuz zahra', 'Microsoft office', 'sucikhairatuzz@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Pilakut Kp.Jambak', '085831507542', '', 'tidak aktif', NULL, NULL),
(85, 'Anisa Fadilah', 'Microsoft office', 'fadilahanisa59@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Marapalam', '085263243715', '', 'tidak aktif', NULL, NULL),
(86, 'Debi Indah Syakira', 'Microsoft office', 'debiindah712@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Marapalam', '082284391926', '', 'tidak aktif', NULL, NULL),
(87, 'Dinda Tryandhary', 'Microsoft office', 'dindatryandhary10@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl.Air camar no19', '083801954606', '', 'tidak aktif', NULL, NULL),
(88, 'M. TONI', 'WEB PROGRAMER', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'aktif', NULL, NULL),
(89, 'Tri Mawarwati', 'Web Programing', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '-', '', 'tidak aktif', NULL, NULL),
(91, 'Heru Sasgia Ahmadi', 'WEB PROGRAMER', '0', '827ccb0eea8a706c4c34a16891f84e7b', 'padang', '0', '', 'tidak aktif', NULL, NULL),
(92, 'Yulia Ranti', 'microsoft Office', 'rantiyulia1997@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'solok', '082383628736', '', 'tidak aktif', NULL, NULL),
(93, 'Bagastio Putra Joandri', 'WEB PROGRAMER', 'bagastioputrapsm2006@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'limau manis', '081261655335', '', 'aktif', NULL, NULL),
(94, 'Rahma', 'Administrasi Pekantoran', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'aktif', NULL, NULL),
(96, 'Yogie ', 'Web Programmer', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'aktif', NULL, NULL),
(97, 'Fajar', 'Web Programing', '-', '827ccb0eea8a706c4c34a16891f84e7b', '', '0', '', 'aktif', NULL, NULL),
(100, 'Aditiya Ahmad Nugraha', 'Android', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'aktif', NULL, NULL),
(101, 'Thamara ', 'Microsoft Office', 'thamaradinaas@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Simp By Pass RT 003 RW 010, Kel. Lubuk Begalung Nan XX, Kec. Lubuk Begalung, Kota Padang, Sumatera Barat', '089503019892', '', 'aktif', NULL, NULL),
(102, 'Ferri Achmad Effindri, M.Kom ', 'Digital Marketing', '-', '827ccb0eea8a706c4c34a16891f84e7b', 'Tanjuang Saba', '082170214495', '', 'aktif', NULL, NULL),
(103, 'Daffa', 'Design Grafis', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'aktif', NULL, NULL),
(104, 'Rian Firmansyah', 'PHP', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'aktif', NULL, NULL),
(105, 'Muhammad Luthfi Rasyid', 'Design Grafis', 'luthfirasyid8602gmaill.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Kampung Baru Berok', '0895320286309', '', 'aktif', NULL, NULL),
(106, 'Zaki', 'Microsoft Office', '-', '827ccb0eea8a706c4c34a16891f84e7b', '', '083113070025', '', 'aktif', NULL, NULL),
(107, 'Ghazy Muhari Norvrial', 'Microsoft Office', 'ghazynovrial@gmail.com ', '827ccb0eea8a706c4c34a16891f84e7b', 'Jl. Agam III, No. 253 Perumnas, Siteba', '081363788103', '', 'aktif', NULL, NULL),
(108, 'Abil', 'Design Grafis', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'tidak aktif', NULL, NULL),
(109, 'syarif', 'Administrasi Pekantoran', '-', '827ccb0eea8a706c4c34a16891f84e7b', '-', '0', '', 'tidak aktif', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_07_12_063555_create_penggunams_table', 1),
(6, '2023_07_12_063810_create_kelasms_table', 1),
(7, '2023_07_12_063825_create_daftarkelasms_table', 1),
(8, '2023_07_12_064107_create_bookingms_table', 1),
(9, '2023_07_12_064256_create_mentorms_table', 1),
(10, '2023_07_12_064451_create_bannerms_table', 1),
(11, '2023_07_27_175018_add_fcm_token_column_to_users_table', 1),
(12, '2023_08_23_093307_create_absens_table', 2),
(13, '2023_08_28_163350_create_lokers_table', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_pengguna` varchar(255) NOT NULL,
  `no_telpon` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `tgl_daftar` varchar(255) NOT NULL,
  `status_akun` enum('aktif','tidak aktif') NOT NULL,
  `referal` varchar(255) DEFAULT NULL,
  `info` varchar(225) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `fcm_token` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pengguna`
--

INSERT INTO `pengguna` (`id`, `nama_pengguna`, `no_telpon`, `alamat`, `email`, `password`, `foto`, `tgl_daftar`, `status_akun`, `referal`, `info`, `remember_token`, `fcm_token`, `created_at`, `updated_at`) VALUES
(1, 'aziz', '089532424780', 'padang', 'aziz@gmail.com', '$2y$10$BvHNKVwZIARp5A.LVnpCteoL/LB65zyi1QvKzapflYbA1YWGB3ACa', 'http://localhost:8000/image/user.png', '2023-08-22', 'aktif', NULL, 'Instagram', NULL, NULL, '2023-08-21 20:52:33', '2023-11-08 06:38:01'),
(2, 'gema fajar', '082122855458', 'jalan raya lubuk minturun rt 05', 'gemafajarramadhan09@gmail.com', '$2y$10$BvHNKVwZIARp5A.LVnpCteoL/LB65zyi1QvKzapflYbA1YWGB3ACa', 'http://localhost:8000/image/user.png', '2023-08-28', 'aktif', NULL, 'Instagram', NULL, NULL, '2023-08-28 09:16:14', '2023-08-28 09:16:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Penggunam', 2, 'auth_token', '4537b6e9ae3a1a07fb6abb092f45fa9522cf378240db2785304321f90c43d33c', '[\"*\"]', NULL, NULL, '2023-09-08 17:15:40', '2023-09-08 17:15:40'),
(2, 'App\\Models\\Penggunam', 2, 'auth_token', '392ac7470b9f392953f8f63098ea6b8f6fb1ed33fa510bdee2c78ada95c6f809', '[\"*\"]', NULL, NULL, '2023-09-09 01:27:42', '2023-09-09 01:27:42'),
(3, 'App\\Models\\Penggunam', 2, 'auth_token', 'e63cbe0a1fb9862f0b9ac695426b9470d7bf4bb950961b52a4e1f93773730da7', '[\"*\"]', NULL, NULL, '2023-09-09 01:27:56', '2023-09-09 01:27:56'),
(4, 'App\\Models\\Penggunam', 2, 'auth_token', '300249be8406d898309e721436936db59e73e545f08c8e0369cf99c0a0ebb913', '[\"*\"]', NULL, NULL, '2023-09-09 01:30:19', '2023-09-09 01:30:19'),
(5, 'App\\Models\\Penggunam', 2, 'auth_token', 'a7942407aecfd513b338ec8a58d149b258cb5fd38b8feb83b1fb39bd3967c060', '[\"*\"]', NULL, NULL, '2023-09-09 02:44:30', '2023-09-09 02:44:30'),
(6, 'App\\Models\\Penggunam', 2, 'auth_token', 'a52223d00cba81450e3737d8a397bca906fadf21f248deb95253317b4c5ce893', '[\"*\"]', NULL, NULL, '2023-09-09 03:08:20', '2023-09-09 03:08:20'),
(7, 'App\\Models\\Penggunam', 2, 'auth_token', 'f29473fb872eca164b61e7d02f4c36d7236f02b1aad5b10fe2d965f0b88272b6', '[\"*\"]', NULL, NULL, '2023-09-09 03:08:45', '2023-09-09 03:08:45'),
(8, 'App\\Models\\Penggunam', 2, 'auth_token', '37b7c387a26628716e9db3d2c169163b873b673c043db8f017197241ddc3af34', '[\"*\"]', NULL, NULL, '2023-09-09 03:09:34', '2023-09-09 03:09:34'),
(9, 'App\\Models\\Penggunam', 2, 'auth_token', '18ddef9db18e03782e2af43ef6cf3951e5a0c348d9031451c019349967a92d39', '[\"*\"]', NULL, NULL, '2023-09-09 03:36:42', '2023-09-09 03:36:42'),
(10, 'App\\Models\\Penggunam', 2, 'auth_token', '319c7211a16cb6425566c918f52be5d700d071f0857033fec5810449365483ee', '[\"*\"]', NULL, NULL, '2023-09-09 03:41:50', '2023-09-09 03:41:50'),
(11, 'App\\Models\\Penggunam', 2, 'auth_token', '81aee5070054e136af38f9099368e855ad58b3f9c82fe7d30cbb6dde85d16588', '[\"*\"]', NULL, NULL, '2023-09-09 10:03:47', '2023-09-09 10:03:47'),
(12, 'App\\Models\\Penggunam', 2, 'auth_token', 'a0f3536e5262d2aa10ae13df986f4003698b3c9eb0544b52d741c1b52cfece3d', '[\"*\"]', NULL, NULL, '2023-09-09 12:34:07', '2023-09-09 12:34:07'),
(13, 'App\\Models\\Penggunam', 2, 'auth_token', '418caf79fb697620241deaf5b33d7f170eb06472e46a83c3b290af308af795e7', '[\"*\"]', NULL, NULL, '2023-09-09 12:34:33', '2023-09-09 12:34:33'),
(14, 'App\\Models\\Penggunam', 1, 'auth_token', '72dda18f591591cccf1f2cd49bbba9d4e5079a1bb645152406ca89106d107164', '[\"*\"]', NULL, NULL, '2023-11-07 03:47:33', '2023-11-07 03:47:33'),
(15, 'App\\Models\\Penggunam', 1, 'auth_token', 'fe046c389997e7712bc05920d6dc56969baaf1b8e36d0e9f738c18ac934fb12c', '[\"*\"]', NULL, NULL, '2023-11-07 03:47:46', '2023-11-07 03:47:46'),
(16, 'App\\Models\\Penggunam', 1, 'auth_token', '411f648d265ed6563399a3736f74d1690897d95934dd58d42fd4823e2d79e0c8', '[\"*\"]', NULL, NULL, '2023-11-07 03:47:53', '2023-11-07 03:47:53'),
(17, 'App\\Models\\Penggunam', 1, 'auth_token', 'd0ea68e7f7ca83ad265a2ced303ff346547b07ee703570b8bfab0c79c749b61f', '[\"*\"]', '2023-11-07 08:38:26', NULL, '2023-11-07 04:14:13', '2023-11-07 08:38:26'),
(18, 'App\\Models\\Penggunam', 1, 'auth_token', 'ebc43ae4f7a5dae5c9e02347d0cf61184e6c7dadb4ad7e37ec4e22f4088baf73', '[\"*\"]', '2023-11-13 08:47:54', NULL, '2023-11-07 05:47:49', '2023-11-13 08:47:54'),
(19, 'App\\Models\\Penggunam', 1, 'auth_token', '47e873a6a244e8c285f96e9f86dfd77d9cd10171d27ca13d43a9eb1fe49d89df', '[\"*\"]', '2023-11-13 08:48:15', NULL, '2023-11-08 06:38:03', '2023-11-13 08:48:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `device_token` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `device_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, '$2y$10$fZV.s/m6TB7npwnkVaT0KubYmFYMEUXhVQuZUzcx77iJXCChqQSzC', 'kRsE6zJhEn93z8VrqADvyBppmzb2i2gpc85jqJMWadBAVq4tcoD5D2NI7n2D', NULL, '2023-08-11 01:34:56', '2023-11-13 06:21:45');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absen`
--
ALTER TABLE `absen`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `daftarkelas`
--
ALTER TABLE `daftarkelas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `loker`
--
ALTER TABLE `loker`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mentor`
--
ALTER TABLE `mentor`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absen`
--
ALTER TABLE `absen`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `banner`
--
ALTER TABLE `banner`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `daftarkelas`
--
ALTER TABLE `daftarkelas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `loker`
--
ALTER TABLE `loker`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `mentor`
--
ALTER TABLE `mentor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
