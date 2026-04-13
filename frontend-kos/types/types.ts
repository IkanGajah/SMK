export interface Kamar {
  id: number;
  nomorKamar: string;
  fasilitas: string;
  harga: number;
  status: string;
  namaPenyewa?: string; 
  tempoBayar?: string;
}
