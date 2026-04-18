package com.kos.backend_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "owner")
public class Owner extends User {

    public Owner() {}

    public Owner(String password, String nama, String noTelepon, String email) {
        super(password, nama, noTelepon, email);
    }
}