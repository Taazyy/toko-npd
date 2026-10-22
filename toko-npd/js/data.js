/* Data toko NPD Club Merch.
   Edit file ini untuk mengganti produk, harga, ongkir, dan data pembayaran.
   Setelah diedit, simpan lalu upload ulang ke GitHub. */

var SIZES = ["S", "M", "L", "XL", "XXL"];
var PRODUCTS = [
  { id: "kaos-hitam", nama: "Kaos Reguler Hitam", kat: "Pakaian", desc: "Cotton combed 30s, sablon plastisol, potongan reguler.", harga: 89000, sizes: SIZES, shape: "tee", g: "#151516", gs: "#3a3a3e", white: true, lx: "50%", ly: "47%", lw: "38%" },
  { id: "kaos-putih", nama: "Kaos Reguler Putih", kat: "Pakaian", desc: "Cotton combed 30s, sablon plastisol, potongan reguler.", harga: 89000, sizes: SIZES, shape: "tee", g: "#fafaf8", gs: "#a4a49f", white: false, lx: "50%", ly: "47%", lw: "38%" },
  { id: "hoodie", nama: "Hoodie Zipper Hitam", kat: "Pakaian", desc: "Fleece 280 gsm, resleting penuh, dua saku samping.", harga: 249000, sizes: SIZES, shape: "hoodie", g: "#151516", gs: "#3a3a3e", white: true, lx: "37%", ly: "46%", lw: "22%" },
  { id: "topi", nama: "Topi Baseball", kat: "Aksesori", desc: "Bordir logo di depan, tali belakang bisa diatur.", harga: 69000, sizes: null, shape: "cap", g: "#5c5f66", gs: "#3b3d42", white: true, lx: "50%", ly: "40%", lw: "30%" },
  { id: "tote", nama: "Tote Bag Kanvas", kat: "Aksesori", desc: "Kanvas 12 oz, 38 x 40 cm, sablon satu warna.", harga: 59000, sizes: null, shape: "tote", g: "#e4dcc9", gs: "#b0a68e", white: false, lx: "50%", ly: "60%", lw: "50%" },
  { id: "stiker", nama: "Paket Stiker", kat: "Aksesori", desc: "Isi 5 stiker vinyl anti air, lebar 10 cm.", harga: 25000, sizes: null, shape: "sticker", g: "#fafaf8", gs: "#a4a49f", white: false, lx: "50%", ly: "50%", lw: "60%", rot: "-5deg" },
  { id: "gantungan", nama: "Gantungan Kunci", kat: "Aksesori", desc: "Akrilik 3 mm, cetak dua sisi, panjang 6 cm.", harga: 20000, sizes: null, shape: "key", g: "#f4f4f2", gs: "#9d9da0", white: false, lx: "56%", ly: "55%", lw: "56%" },
  { id: "lanyard", nama: "Lanyard", kat: "Aksesori", desc: "Tali 2 cm, cetak sublim dua sisi, dengan pengait.", harga: 25000, sizes: null, shape: "lanyard", g: "#1d3fe0", gs: "#12288f", white: true, lx: "50%", ly: "44%", lw: "62%", rot: "90deg" }
];

/* Data pembayaran di bawah ini contoh. Ganti dengan rekening, nomor, dan QRIS asli. */
var PAY = {
  transfer: { label: "Transfer bank", html: '<strong>Transfer ke rekening</strong><span class="num">0000 0000 0000</span><span class="muted">Bank (isi nama bank) a.n. (isi nama pemilik). Contoh, ganti dengan rekening asli.</span>' },
  qris: { label: "QRIS", html: '<strong>Scan QRIS</strong><div class="qris-slot">Tempel gambar QRIS NPD Club di sini</div><span class="muted">Nominal sesuai total pesanan.</span>' },
  ewallet: { label: "E-wallet", html: '<strong>Kirim ke e-wallet</strong><span class="num">08xx xxxx xxxx</span><span class="muted">DANA, GoPay, atau OVO a.n. (isi nama pemilik). Contoh, ganti dengan nomor asli.</span>' },
  cod: { label: "Bayar tunai saat ambil", html: '<strong>Bayar tunai</strong><span class="muted">Bayar langsung saat mengambil pesanan. Jadwal dan tempat ambil dikonfirmasi admin.</span>' }
};

var NPD = {
  sizes: SIZES,
  products: PRODUCTS,
  ongkir: 15000,
  gratis: 250000,
  pay: PAY
};
