import java.time.LocalDateTime;

public class Pengeluaran {
    private String idPengeluaran;
    private String kategori;
    private double nominal;
    private String deskripsi;
    private LocalDateTime tanggal;

    public Pengeluaran(String idPengeluaran, String kategori, double nominal, String deskripsi) {
        this.idPengeluaran = idPengeluaran;
        this.kategori = kategori;
        this.nominal = nominal;
        this.deskripsi = deskripsi;
        this.tanggal = LocalDateTime.now();
    }

    public double getNominal() { return this.nominal; }
    public String getKategori() { return this.kategori; }
}
