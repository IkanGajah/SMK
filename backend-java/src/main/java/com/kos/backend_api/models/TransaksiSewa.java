package com.kos.backend_api.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transaksi_sewa")
public class TransaksiSewa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_penyewa")
    private Penyewa penyewa;

    @ManyToOne
    @JoinColumn(name = "id_kamar")
    private Kamar kamar;

    private LocalDate tanggalMulaiSewa;
    private Integer durasiBulan; 
    private int nominalSewa; 
    private String statusPembayaran; 

    public TransaksiSewa() {}

    public TransaksiSewa(Penyewa penyewa, Kamar kamar, LocalDate tanggalMulaiSewa, int durasiBulan, int nominalSewa, String statusPembayaran) {
        this.penyewa = penyewa;
        this.kamar = kamar;
        this.tanggalMulaiSewa = tanggalMulaiSewa;
        this.durasiBulan = durasiBulan;
        this.nominalSewa = nominalSewa;
        this.statusPembayaran = statusPembayaran;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Penyewa getPenyewa() {
        return penyewa;
    }

    public void setPenyewa(Penyewa penyewa) {
        this.penyewa = penyewa;
    }

    public Kamar getKamar() {
        return kamar;
    }

    public void setKamar(Kamar kamar) {
        this.kamar = kamar;
    }

    public LocalDate getTanggalMulaiSewa() {
        return tanggalMulaiSewa;
    }

    public void setTanggalMulaiSewa(LocalDate tanggalMulaiSewa) {
        this.tanggalMulaiSewa = tanggalMulaiSewa;
    }

    public Integer getDurasiBulan() {
        return durasiBulan;
    }

    public void setDurasiBulan(Integer durasiBulan) {
        this.durasiBulan = durasiBulan;
    }

    public int getNominalSewa() {
        return nominalSewa;
    }

    public void setNominalSewa(int nominalSewa) {
        this.nominalSewa = nominalSewa;
    }

    public String getStatusPembayaran() {
        return statusPembayaran;
    }

    public void setStatusPembayaran(String statusPembayaran) {
        this.statusPembayaran = statusPembayaran;
    }
}