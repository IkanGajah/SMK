package com.kos.backend_api;

import com.kos.backend_api.models.Kamar;
import com.kos.backend_api.models.TransaksiSewa;
import com.kos.backend_api.models.enums.StatusBayar;
import com.kos.backend_api.models.enums.StatusKamar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
public class BillingScheduler {

    @Autowired
    private KamarRepository kamarRepository;

    @Autowired
    private TransaksiSewaRepository transaksiRepository;

    // Jalan setiap hari pada jam 00:00
    @Scheduled(cron = "0 0 0 * * *")
    public void generateTagihanOtomatis() {
        System.out.println("=== Menjalankan proses pengecekan tagihan otomatis ===");
        
        // 1. Ambil semua kamar yang berstatus PENUH
        List<Kamar> kamarPenuh = kamarRepository.findByStatusKetersediaanNot(StatusKamar.NONAKTIF).stream()
                .filter(k -> StatusKamar.PENUH.equals(k.getStatusKetersediaan()))
                .toList();

        LocalDate sekarang = LocalDate.now();
        LocalDate hPlus7 = sekarang.plusDays(7);

        for (Kamar kamar : kamarPenuh) {
            // 2. Cari transaksi terakhir kamar ini
            Optional<TransaksiSewa> transaksiTerakhirOpt = transaksiRepository.findFirstByKamarIdKamarOrderByTanggalTransaksiDesc(kamar.getIdKamar());
            
            if (transaksiTerakhirOpt.isPresent()) {
                TransaksiSewa terakhir = transaksiTerakhirOpt.get();
                LocalDate jatuhTempo = terakhir.getJatuhTempo();

                // 3. Cek apakah jatuh temponya adalah tepat 7 hari lagi
                if (jatuhTempo != null && jatuhTempo.isEqual(hPlus7)) {
                    // MOCK NOTIFIKASI (FR-024)
                    System.out.println("NOTIFIKASI: Tagihan untuk penyewa " + terakhir.getPenyewa().getNama() + 
                                       " di kamar " + kamar.getNomorKamar() + " jatuh tempo pada " + jatuhTempo + ".");

                    // GENERATE TAGIHAN BARU BULAN DEPAN (FR-023)
                    TransaksiSewa tagihanBaru = new TransaksiSewa();
                    tagihanBaru.setKamar(kamar);
                    tagihanBaru.setPenyewa(terakhir.getPenyewa());
                    tagihanBaru.setNominal(kamar.getHargaSewa());
                    tagihanBaru.setMetodePembayaran(null); // belum milih metode
                    tagihanBaru.setStatusBayar(StatusBayar.PENDING);
                    tagihanBaru.setTanggalTransaksi(sekarang);
                    // Jatuh tempo bulan berikutnya (dari jatuh tempo saat ini)
                    tagihanBaru.setJatuhTempo(jatuhTempo.plusMonths(1));

                    transaksiRepository.save(tagihanBaru);
                    System.out.println("SYSTEM: Tagihan baru otomatis terbuat untuk kamar " + kamar.getNomorKamar() + ".");
                }
            }
        }
        System.out.println("=== Selesai pengecekan tagihan otomatis ===");
    }
}
