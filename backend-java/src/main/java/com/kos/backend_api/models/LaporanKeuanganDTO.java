package com.kos.backend_api.models;

public class LaporanKeuanganDTO {
    private int bulan;
    private int tahun;
    private Integer totalPemasukan;
    private Integer totalPengeluaran;
    private Integer labaBersih;

    public LaporanKeuanganDTO(int bulan, int tahun, Integer totalPemasukan, Integer totalPengeluaran) {
        this.bulan = bulan;
        this.tahun = tahun;
        this.totalPemasukan = totalPemasukan != null ? totalPemasukan : 0;
        this.totalPengeluaran = totalPengeluaran != null ? totalPengeluaran : 0;
        this.labaBersih = this.totalPemasukan - this.totalPengeluaran;
    }

    public int getBulan() { return bulan; }
    public void setBulan(int bulan) { this.bulan = bulan; }

    public int getTahun() { return tahun; }
    public void setTahun(int tahun) { this.tahun = tahun; }

    public Integer getTotalPemasukan() { return totalPemasukan; }
    public void setTotalPemasukan(Integer totalPemasukan) { this.totalPemasukan = totalPemasukan; }

    public Integer getTotalPengeluaran() { return totalPengeluaran; }
    public void setTotalPengeluaran(Integer totalPengeluaran) { this.totalPengeluaran = totalPengeluaran; }

    public Integer getLabaBersih() { return labaBersih; }
    public void setLabaBersih(Integer labaBersih) { this.labaBersih = labaBersih; }
}
