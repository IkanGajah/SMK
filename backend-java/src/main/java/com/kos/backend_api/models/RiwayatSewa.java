package com.kos.backend_api.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "riwayat_sewa")
public class RiwayatSewa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRiwayat;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private Penyewa penyewa;

    @ManyToOne
    @JoinColumn(name = "id_kamar")
    private Kamar kamar;

    private LocalDate tanggalMasuk;
    private LocalDate tanggalKeluar;

    public RiwayatSewa() {}

    public RiwayatSewa(Penyewa penyewa, Kamar kamar, LocalDate tanggalMasuk, LocalDate tanggalKeluar) {
        this.penyewa = penyewa;
        this.kamar = kamar;
        this.tanggalMasuk = tanggalMasuk;
        this.tanggalKeluar = tanggalKeluar;
    }

    public int getIdRiwayat() { return idRiwayat; }
    public void setIdRiwayat(int idRiwayat) { this.idRiwayat = idRiwayat; }

    public Penyewa getPenyewa() { return penyewa; }
    public void setPenyewa(Penyewa penyewa) { this.penyewa = penyewa; }

    public Kamar getKamar() { return kamar; }
    public void setKamar(Kamar kamar) { this.kamar = kamar; }

    public LocalDate getTanggalMasuk() { return tanggalMasuk; }
    public void setTanggalMasuk(LocalDate tanggalMasuk) { this.tanggalMasuk = tanggalMasuk; }

    public LocalDate getTanggalKeluar() { return tanggalKeluar; }
    public void setTanggalKeluar(LocalDate tanggalKeluar) { this.tanggalKeluar = tanggalKeluar; }
}
