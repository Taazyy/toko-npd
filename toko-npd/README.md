# NPD Club Merch

Toko merchandise NPD Club. Situs statis tanpa backend, bisa dihosting gratis di GitHub Pages.

## Isi folder

```
toko-npd/
├── index.html        Halaman utama (hero, katalog, keranjang, info pemesanan)
├── css/
│   └── style.css     Semua tampilan: warna, font, tata letak
├── js/
│   ├── data.js       Produk, harga, ongkir, dan data pembayaran (file yang paling sering diedit)
│   └── app.js        Logika: filter, keranjang, ringkasan pesanan
└── assets/
    └── logo.png      Logo NPD Club (PNG transparan, hitam)
```

## Yang perlu diganti sebelum dibuka untuk umum

Buka `js/data.js`:

- Bagian `PAY`: nomor rekening, nomor e-wallet, dan teks QRIS. Isi sekarang masih contoh.
- Bagian `PRODUCTS`: nama, deskripsi, dan `harga` setiap produk (harga ditulis angka biasa, tanpa titik).
- Bagian `NPD`: `ongkir` (ongkos kirim flat) dan `gratis` (batas belanja gratis ongkir).

Buka `index.html`:

- Cari "Info pemesanan" untuk mengganti batas bayar, estimasi kirim, dan aturan tukar ukuran.
- Nomor WhatsApp admin belum dicantumkan. Tambahkan di bagian itu.

## Menambah produk

Salin satu baris produk di `PRODUCTS`, lalu ganti `id` (harus unik), `nama`, `desc`, dan `harga`. Bentuk gambar produk dipilih lewat `shape`: `tee`, `hoodie`, `cap`, `tote`, `sticker`, `key`, atau `lanyard`. Warna produk diatur `g` (warna bahan) dan `gs` (warna garis). Set `white: true` jika logo di produk itu harus berwarna putih.

## Menjalankan di komputer

```
python -m http.server 8000
```

Lalu buka http://localhost:8000.

## Update situs live

Setelah mengedit file, upload ulang ke repo GitHub (Add file, Upload files, Commit changes). GitHub Pages memperbarui situs dalam 1 sampai 2 menit. Tekan Ctrl+F5 saat membuka situs supaya browser memuat versi terbaru.
