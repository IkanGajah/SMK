package com.kos.backend_api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kos.backend_api.models.Kamar;
import com.kos.backend_api.models.Penyewa;
import com.kos.backend_api.models.TransaksiSewa;
import com.kos.backend_api.models.WebResponse;
import com.kos.backend_api.models.enums.StatusKamar;

@RestController
@RequestMapping("/api/transaksi")
public class TransaksiController {

    @Autowired
    private TransaksiSewaRepository transaksiRepository;

    @Autowired
    private KamarRepository kamarRepository;

    @Autowired
    private PenyewaRepository penyewaRepository;

    @PostMapping("/check-in")
    public WebResponse<TransaksiSewa> checkIn(@RequestBody TransaksiSewa request) {
        Kamar kamar = kamarRepository.findById(request.getKamar().getIdKamar())
                .orElseThrow(() -> new RuntimeException("Kamar tidak ditemukan"));

        if (!StatusKamar.TERSEDIA.equals(kamar.getStatusKetersediaan())) {
            throw new RuntimeException("Kamar sedang tidak tersedia!");
        }

        Penyewa penyewa = request.getPenyewa();
        if (penyewa.getIdUser() == 0) {
            penyewa = penyewaRepository.save(penyewa);
            request.setPenyewa(penyewa); 
        } else {
            penyewaRepository.findById(penyewa.getIdUser())
                .orElseThrow(() -> new RuntimeException("Data penyewa tidak ditemukan"));
        }
    
        kamar.setStatusKetersediaan(StatusKamar.PENUH);
        kamarRepository.save(kamar);

        TransaksiSewa baru = transaksiRepository.save(request);

        return new WebResponse<>(201, "Check-in berhasil! Status kamar telah diperbarui.", baru);
    }

    @PostMapping("/check-out/{idTransaksi}")
    public WebResponse<String> checkOut(@PathVariable Integer idTransaksi) {
        TransaksiSewa transaksi = transaksiRepository.findById(idTransaksi)
                .orElseThrow(() -> new RuntimeException("Data transaksi tidak ditemukan"));

        Kamar kamar = transaksi.getKamar();

        if (StatusKamar.TERSEDIA.equals(kamar.getStatusKetersediaan())) {
            throw new RuntimeException("Kamar ini sudah berstatus Tersedia dan tidak sedang disewa.");
        }

        kamar.setStatusKetersediaan(StatusKamar.TERSEDIA);
        kamarRepository.save(kamar);

        return new WebResponse<>(200, "Check-out berhasil! Kamar telah kembali Tersedia.", "OK");
    }

    @GetMapping
    public WebResponse<List<TransaksiSewa>> getAll() {
        return new WebResponse<>(200, "Daftar transaksi berhasil diambil", transaksiRepository.findAll());
    }
}