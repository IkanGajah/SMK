package com.kos.backend_api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "penyewa")
public class Penyewa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String namaLengkap;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String noHp;

    public Penyewa() {
    }

    public Penyewa(String namaLengkap, String email, String password, String noHp) {
        this.namaLengkap = namaLengkap;
        this.email = email;
        this.password = password;
        this.noHp = noHp;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNamaLengkap() {
        return namaLengkap;
    }

    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNoHp() {
        return noHp;
    }

    public void setNoHp(String noHp) {
        this.noHp = noHp;
    }
}