# API PT Daya Rekadigital Indonesia

Ini adalah API untuk sistem manajemen pelanggan dan pesanan menggunakan Express.js dan MySQL. API ini mencakup fitur untuk mengelola data pelanggan, produk, dan pesanan.

## Daftar Isi

1. [Prasyarat](#prasyarat)
2. [Instalasi](#instalasi)
3. [Migrasi dan Seeder](#migrasi-dan-seeder)
4. [Menjalankan API](#menjalankan-api)
5. [Dokumentasi API](#dokumentasi-api)
6. [Contributing](#contributing)
7. [Lisensi](#lisensi)

## Prasyarat

- Node.js (versi 20.x atau lebih baru)
- MySQL (versi 15.1 atau lebih baru)

## Instalasi

1. **Clone repositori**

    ```bash
    git clone https://github.com/AndikaRisky31/api_test_PT_DRI.git
    cd api_test_PT_DRI
    ```

2. **Instal dependensi**

    ```bash
    npm install
    ```

## Migrasi dan Seeder

1. **Jalankan migrasi**

    Untuk membuat tabel di database, jalankan perintah berikut:

    ```bash
    npm run migrate
    ```

    Pastikan Anda telah mengonfigurasi koneksi database di file `db/connection.js`.

2. **Seed data**

    Untuk menambahkan data dummy ke database, jalankan perintah berikut:

    ```bash
    npm run seed
    ```

## Menjalankan API

1. **Jalankan server**

    Untuk memulai server API, jalankan perintah berikut:

    ```bash
    npm start
    ```

    Server akan berjalan di `http://localhost:3000` secara default.

## Dokumentasi API

### Endpoint: Menambahkan Data Customer Baru

- **URL:** `/customers`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "name": "Customer Name",
      "level": "warga",
      "favorite_menu": "Menu Name"
    }
    ```
- **Response:**
    ```json
    {
      "id": 1,
      "name": "Customer Name",
      "level": "warga",
      "favorite_menu": "Menu Name",
      "is_delete": false
    }
    ```
- **Description:** Menambahkan data customer baru ke dalam database.

### Endpoint: Melihat Detail Data Customer

- **URL:** `/customers/:id`
- **Method:** `GET`
- **Response:**
    ```json
    {
      "customer": {
        "id": 1,
        "name": "Customer Name",
        "level": "warga",
        "favorite_menu": "Menu Name",
        "is_delete": false
      },
      "orders": [
        {
          "id": 1,
          "name": "Product Name",
          "quantity": 2,
          "price": 50000,
          "total_amount": 100000
        }
      ],
      "totalTransaction": 100000
    }
    ```
- **Description:** Mengambil detail data customer beserta semua produk yang pernah dipesan oleh customer tersebut dan total transaksi.

### Endpoint: Menambah dan Mengurangi Kuantitas Produk yang Telah Dipesan pada Detail Customer

- **URL:** `/customers/:id/orders`
- **Method:** `PUT`
- **Request Body:**
    ```json
    {
      "product_id": 1,
      "quantity": 3
    }
    ```
- **Response:**
    ```json
    {
      "message": "Order updated successfully."
    }
    ```
- **Description:** Menambah atau mengurangi kuantitas produk yang telah dipesan untuk customer.

### Endpoint: Menghapus Data Customer dari Database

- **URL:** `/customers/:id`
- **Method:** `DELETE`
- **Response:**
    ```json
    {
      "message": "Customer deleted successfully."
    }
    ```
- **Description:** Menghapus data customer dari database dengan soft delete.

### Endpoint: Membuat Transaksi Baru

- **URL:** `/orders`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "customer_id": 1,
      "product_id": 1,
      "quantity": 2
    }
    ```
- **Response:**
    ```json
    {
      "message": "Order created successfully."
    }
    ```
- **Description:** Membuat transaksi baru dengan memasukkan produk, kuantitas produk, dan customer yang memesan.

### Endpoint: Mencari Customer

- **URL:** `/customers/search`
- **Method:** `GET`
- **Query Parameters:**
    - `name`: (opsional) Nama customer
    - `level`: (opsional) Level customer
    - `page`: (opsional) Nomor halaman untuk pagination (default: 1)
    - `limit`: (opsional) Jumlah data per halaman (default: 10)
    - `sortBy`: (opsional) Kolom yang digunakan untuk sorting (default: 'name')
    - `order`: (opsional) Urutan sorting (default: 'asc')
- **Response:**
    ```json
    {
      "page": 1,
      "total_pages": 2,
      "customers": [
        {
          "id": 1,
          "name": "Customer Name",
          "level": "warga",
          "favorite_menu": "Menu Name",
          "total_transaction": 100000
        }
      ]
    }
    ```
- **Description:** Mencari customer berdasarkan nama dan level dengan dukungan pagination dan sorting.

## Contributing

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori dan buat pull request dengan perubahan Anda. Ikuti panduan konvensi kode dan pastikan untuk menambahkan pengujian jika diperlukan.

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.