package com.kos.backend_api.models;

import com.kos.backend_api.models.enums.KategoriPengeluaran;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pengeluaran_operasional")
public class PengeluaranOperasional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPengeluaran;

    @ManyToOne
    @JoinColumn(name = "id_cabang")
    private CabangKos cabang;

    @Enumerated(EnumType.STRING)
    private KategoriPengeluaran kategori;

    private int nominal;
    private LocalDate tanggal;
    private String deskripsi;

    public PengeluaranOperasional() {}

    public PengeluaranOperasional(CabangKos cabang, KategoriPengeluaran kategori, int nominal, LocalDate tanggal, String deskripsi) {
        this.cabang = cabang;
        this.kategori = kategori;
        this.nominal = nominal;
        this.tanggal = tanggal;
        this.deskripsi = deskripsi;
    }

    public int getIdPengeluaran() { return idPengeluaran; }
    public void setIdPengeluaran(int idPengeluaran) { this.idPengeluaran = idPengeluaran; }

    public CabangKos getCabang() { return cabang; }
    public void setCabang(CabangKos cabang) { this.cabang = cabang; }

    public KategoriPengeluaran getKategori() { return kategori; }
    public void setKategori(KategoriPengeluaran kategori) { this.kategori = kategori; }

    public int getNominal() { return nominal; }
    public void setNominal(int nominal) { this.nominal = nominal; }

    public LocalDate getTanggal() { return tanggal; }
    public void setTanggal(LocalDate tanggal) { this.tanggal = tanggal; }

    public String getDeskripsi() { return deskripsi; }
    public void setDeskripsi(String deskripsi) { this.deskripsi = deskripsi; }
}
