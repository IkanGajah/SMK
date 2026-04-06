package com.kos.backend_api.models;
import java.time.LocalDateTime;

public class TransaksiSewa {
    private String idTransaksi;
    private Penyewa penyewa;
    private CabangKos cabang;
    private double nominal;
    private LocalDateTime tanggal;
    private StatusBayar status;

    public TransaksiSewa(String idTransaksi, Penyewa penyewa, CabangKos cabang, double nominal) {
        this.idTransaksi = idTransaksi;
        this.penyewa = penyewa;
        this.cabang = cabang;
        this.nominal = nominal;
        this.tanggal = LocalDateTime.now();
        this.status = StatusBayar.PENDING;
        
        cabang.tambahTransaksi(this);
    }

    public void prosesPembayaran() {
        this.status = StatusBayar.LUNAS;
        System.out.println("Pembayaran Rp" + this.nominal + " oleh " + this.penyewa.getNama() + " berhasil (LUNAS).");
    }

    public StatusBayar getStatus() { return this.status; }
    public double getNominal() { return this.nominal; }
}