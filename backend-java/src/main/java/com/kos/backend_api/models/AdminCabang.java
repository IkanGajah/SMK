package com.kos.backend_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin_cabang")
public class AdminCabang extends User {

    @ManyToOne
    @JoinColumn(name = "id_cabang")
    private CabangKos cabang;

    public AdminCabang() {}

    public AdminCabang(String username, String password, String nama, String noTelepon, String email, CabangKos cabang) {
        super(username, password, nama, noTelepon, email);
        this.cabang = cabang;
    }

    public CabangKos getCabang() { return cabang; }
    public void setCabang(CabangKos cabang) { this.cabang = cabang; }
}