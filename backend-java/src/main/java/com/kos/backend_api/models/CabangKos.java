package com.kos.backend_api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cabang_kos")
public class CabangKos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCabang;

    private String namaCabang;
    private String alamat;
    private int jumlahKamar;
    private String status = "Aktif"; // Aktif, Nonaktif

    public CabangKos() {}

    public CabangKos(String namaCabang, String alamat, int jumlahKamar) {
        this.namaCabang = namaCabang;
        this.alamat = alamat;
        this.jumlahKamar = jumlahKamar;
    }

    public int getIdCabang() { return idCabang; }
    public void setIdCabang(int idCabang) { this.idCabang = idCabang; }

    public String getNamaCabang() { return namaCabang; }
    public void setNamaCabang(String namaCabang) { this.namaCabang = namaCabang; }

    public String getAlamat() { return alamat; }
    public void setAlamat(String alamat) { this.alamat = alamat; }

    public int getJumlahKamar() { return jumlahKamar; }
    public void setJumlahKamar(int jumlahKamar) { this.jumlahKamar = jumlahKamar; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}