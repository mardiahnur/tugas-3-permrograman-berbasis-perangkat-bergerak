<template>
  <ion-content :fullscreen="true">
    <div class="refresh-container">
      <ion-button @click="refreshData" expand="block" class="refresh-button">Refresh</ion-button>
    </div>

    <div v-if="isLoading" class="loading-state">
      <ion-spinner name="crescent"></ion-spinner>
      <p>Memuat data cryptocurrency...</p>
    </div>

    <div v-else-if="cryptoList.length > 0">
      <div v-for="item in cryptoList" :key="item.id" class="crypto-tile">
        
        <div class="tile-grid">
          
          <div class="grid-col rank-col">
            <span class="label">Rank</span>
            <span class="rank-number">{{ item.rank }}</span>
          </div>

          <div class="grid-col name-symbol-col">
            <span class="name">{{ item.name }}</span>
            <span class="symbol">{{ item.symbol }}</span>
          </div>

          <div class="grid-col price-col">
            <span class="label usd-label">USD</span>
            <span class="price-value">{{ parseFloat(item.price_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 }) }}</span>
          </div>

        </div>
      </div>
    </div>
    <div v-else class="error-state">
      <p>Gagal memuat data atau data kosong.</p>
      <ion-button @click="refreshData" size="small">Coba Lagi</ion-button>
    </div>
  </ion-content>
</template>

<script>
import { IonContent, IonButton, IonSpinner } from '@ionic/vue';
import axios from 'axios'; 

export default {
  // Pastikan komponen Ionic yang digunakan sudah diimpor
  components: {
    IonContent,
    IonButton,
    IonSpinner
  },
  data() {
    return {
      cryptoList: [], // List koin yang akan diisi dari API
      isLoading: false, // Status untuk menampilkan loading spinner
    };
  },
  mounted() {
    // Dipanggil saat komponen siap. Pertama kali ambil data.
    this.fetchCryptoData();
  },
  methods: {
    // FUNGSI PENGAMBILAN DATA API
    async fetchCryptoData() {
      // Hentikan jika sedang loading untuk menghindari panggilan ganda
      if (this.isLoading) return; 
      
      this.isLoading = true;
      try {
        const API_URL = 'https://api.coinlore.net/api/tickers/';
        const response = await axios.get(API_URL);
        
        // Data yang kita butuhkan ada di dalam key 'data'
        this.cryptoList = response.data.data; 
      } catch (error) {
        console.error("Gagal mengambil data API:", error);
        this.cryptoList = [];
        // Anda bisa tambahkan notifikasi error di sini
      } finally {
        this.isLoading = false;
      }
    },

    // FUNGSI REFRESH DATA (Dipanggil oleh Tombol Refresh)
    refreshData() {
      this.fetchCryptoData();
    }
  }
};
</script>

<style scoped>
/* ==================================== */
/* Tombol Refresh dan Status Loading */
/* (Tetap Sama) */
/* ==================================== */
.crypto-item {
    /* PENTING: Menambahkan margin di bawah untuk memisahkan setiap item, 
       sehingga terlihat seperti blok terpisah, bukan daftar tunggal. */
    margin-bottom: 12px; 
    
    /* Sudut membulat (border-radius) yang khas Android/MD */
    border-radius: 8px; 
    
    /* Pastikan background item berwarna putih (jika konten berwarna abu-abu) */
    background-color: white; 
    
    /* Tambahkan bayangan halus agar item terlihat 'mengambang' seperti kartu (Material Design) */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    
    /* Padding di dalam item harus dipertahankan untuk jarak konten */
    padding: 15px;
}
.refresh-container {
    padding: 15px 16px; /* Tambah sedkit padding vertikal agar tidak terlalu rapat */
    background: #f4f4f4; 
    
    /* Tambahkan styling ini untuk memposisikan tombol di tengah */
    display: flex; 
    justify-content: center; /* Pusatkan tombol secara horizontal */
}

.refresh-button {
    --background: #007bff;
    text-transform: none;
    font-weight: bold;
    height: 40px; 
    
    /* Tambahkan margin horizontal untuk memastikan ada jarak minimal dari tepi */
    margin: 0; 
}
.loading-state, .error-state {
    text-align: center;
    padding: 30px;
    color: #666;
}

/* ==================================== */
/* Style Tiga Kolom (Menggunakan CSS Grid) */
/* ==================================== */
.crypto-tile {
    background-color: #f5c3244a; 
    padding: 15px 16px; /* Padding lebih besar agar terlihat seperti kartu */
    border-bottom: 1px solid #ad8e60; 
}

/* Wadah Grid Utama untuk Tiga Kolom */
.tile-grid {
    display: grid;
    /* Tiga kolom: Rank (Kecil), Name/Symbol (Fleksibel), Price (Cukup) */
    grid-template-columns: 15% 45% 40%; /* Menentukan lebar setiap kolom */
    align-items: center; /* Pusatkan item secara vertikal */
}

/* Style Umum untuk Kolom */
.grid-col {
    display: flex;
    flex-direction: column; /* Menata teks di dalam kolom secara vertikal */
    justify-content: center;
}

/* Kiri: RANK (Kolom 1) */
.rank-col {
    text-align: left;
}
.label {
    font-size: 12px;
    color: #666;
    display: block; 
}
.rank-number {
    font-size: 20px;
    font-weight: bold;
}

/* Tengah: NAME & SYMBOL (Kolom 2) */
.name-symbol-col {
    text-align: left;
    margin-left: 10px; /* Jarak dari Rank */
}
.name {
    font-size: 14px;
    font-weight: normal;
}
.symbol {
    font-size: 20px; /* Besar dan Tebal */
    font-weight: bold;
}

/* Kanan: PRICE (Kolom 3) */
.price-col {
    text-align: right; /* Rata Kanan */
}
.usd-label {
    /* Pastikan label USD juga rata kanan */
    text-align: right;
}
.price-value {
    font-size: 20px; /* Besar dan Tebal */
    font-weight: bold;
}
</style>