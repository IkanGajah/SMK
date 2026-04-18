package com.kos.backend_api.models;

import com.kos.backend_api.models.enums.FasilitasKamar;
import com.kos.backend_api.models.enums.StatusKamar;
import jakarta.persistence.*;

@Entity
@Table(name = "kamar")
public class Kamar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idKamar;

    @ManyToOne
    @JoinColumn(name = "id_cabang")
    private CabangKos cabang;

    private String nomorKamar; 
    
    @Enumerated(EnumType.STRING)
    private FasilitasKamar fasilitas;
    
    private int hargaSewa;
    
    @Enumerated(EnumType.STRING)
    private StatusKamar statusKetersediaan; 

    public Kamar() {}

    public Kamar(CabangKos cabang, String nomorKamar, FasilitasKamar fasilitas, int hargaSewa, StatusKamar statusKetersediaan) {
        this.cabang = cabang;
        this.nomorKamar = nomorKamar;
        this.fasilitas = fasilitas;
        this.hargaSewa = hargaSewa;
        this.statusKetersediaan = statusKetersediaan;
    }

    public int getIdKamar() { return idKamar; }
    public void setIdKamar(int idKamar) { this.idKamar = idKamar; }

    public CabangKos getCabang() { return cabang; }
    public void setCabang(CabangKos cabang) { this.cabang = cabang; }

    public String getNomorKamar() { return nomorKamar; }
    public void setNomorKamar(String nomorKamar) { this.nomorKamar = nomorKamar; }

    public FasilitasKamar getFasilitas() { return fasilitas; }
    public void setFasilitas(FasilitasKamar fasilitas) { this.fasilitas = fasilitas; }

    public int getHargaSewa() { return hargaSewa; }
    public void setHargaSewa(int hargaSewa) { this.hargaSewa = hargaSewa; }

    public StatusKamar getStatusKetersediaan() { return statusKetersediaan; }
    public void setStatusKetersediaan(StatusKamar statusKetersediaan) { this.statusKetersediaan = statusKetersediaan; }
}