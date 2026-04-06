package com.kos.backend_api.models;

public class User {
    protected String idUser;
    protected String username;
    private String password; // Encapsulated
    protected String nama;
    protected String noTelepon;
    protected boolean isLoggedIn;

    public User(String idUser, String username, String password, String nama, String noTelepon) {
        this.idUser = idUser;
        this.username = username;
        this.password = password;
        this.nama = nama;
        this.noTelepon = noTelepon;
        this.isLoggedIn = false;
    }

    public boolean login(String inputUsername, String inputPassword) {
        if (this.username.equals(inputUsername) && this.password.equals(inputPassword)) {
            this.isLoggedIn = true;
            System.out.println("[" + this.nama + "] Login berhasil.");
            return true;
        }
        System.out.println("Login gagal. Username atau password salah.");
        return false;
    }

    public void logout() {
        this.isLoggedIn = false;
        System.out.println("[" + this.nama + "] Logout berhasil.");
    }
    
    public String getNama() { return this.nama; }
}