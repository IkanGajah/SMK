package com.kos.backend_api.models;
import java.util.ArrayList;
import java.util.List;

public class CabangKos {
    private String idCabang;
    private String namaCabang;
    private String alamat;
    private List<Kamar> daftarKamar;
    // private List<Pengeluaran> daftarPengeluaran;
    private List<TransaksiSewa> daftarTransaksi;

    public CabangKos(String idCabang, String namaCabang, String alamat) {
        this.idCabang = idCabang;
        this.namaCabang = namaCabang;
        this.alamat = alamat;
        this.daftarKamar = new ArrayList<>();
        // this.daftarPengeluaran = new ArrayList<>();
        this.daftarTransaksi = new ArrayList<>();
    }

    public void tambahKamar(Kamar kamar) { this.daftarKamar.add(kamar); }
    // public void tambahPengeluaran(Pengeluaran p) { this.daftarPengeluaran.add(p); }
    public void tambahTransaksi(TransaksiSewa t) { this.daftarTransaksi.add(t); }

    public String getNamaCabang() { return this.namaCabang; }

    public double totalPemasukan() {
        double total = 0;
        for (TransaksiSewa t : daftarTransaksi) {
            if (t.getStatus() == StatusBayar.LUNAS) {
                total += t.getNominal();
            }
        }
        return total;
    }

    // public double totalPengeluaran() {
    //     double total = 0;
    //     for (Pengeluaran p : daftarPengeluaran) {
    //         total += p.getNominal();
    //     }
    //     return total;
    // }
}