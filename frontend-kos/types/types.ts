export interface Cabang {
  id?: number;
  idCabang: number;
  namaCabang: string;
  alamat: string;
  jumlahKamar: number;
  foto?: string;
}

export interface Kamar {
  id?: number;
  idKamar?: number;
  nomorKamar: string;
  fasilitas: string;
  harga?: number;
  hargaSewa?: number;
  status?: string;
  statusKetersediaan?: string;
  cabang?: Cabang;
  foto?: string;
  namaPenyewa?: string; 
  tempoBayar?: string;
}
