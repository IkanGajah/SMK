package com.kos.backend_api.models;

public class Penyewa extends User {
    private String noKtp;
    private Kamar kamarDisewa;

    public Penyewa(String idUser, String username, String password, String nama, String noTelepon, String noKtp) {
        super(idUser, username, password, nama, noTelepon);
        this.noKtp = noKtp;
    }

    public void setKamarDisewa(Kamar kamar) {
        this.kamarDisewa = kamar;
    }

    public void bayarTagihan(TransaksiSewa transaksi) {
        transaksi.prosesPembayaran();
    }
}