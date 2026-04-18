package com.kos.backend_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "penyewa")
public class Penyewa extends User {

    private String noKtp;

    public Penyewa() {}

    public Penyewa(String password, String nama, String noTelepon, String email, String noKtp) {
        super(password, nama, noTelepon, email);
        this.noKtp = noKtp;
    }

    public String getNoKtp() { return noKtp; }
    public void setNoKtp(String noKtp) { this.noKtp = noKtp; }
}