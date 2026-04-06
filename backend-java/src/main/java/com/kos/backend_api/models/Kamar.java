package com.kos.backend_api.models;

public class Kamar {
    private int id;
    private String namaKos;
    private String tipe;
    private int harga;
    private String status;

    public Kamar(int id, String namaKos, String tipe, int harga, String status) {
        this.id = id;
        this.namaKos = namaKos;
        this.tipe = tipe;
        this.harga = harga;
        this.status = status;
    }

    public int getId() { return id; }
    public String getNamaKos() { return namaKos; }
    public String getTipe() { return tipe; }
    public int getHarga() { return harga; }
    public String getStatus() { return status; }
}
