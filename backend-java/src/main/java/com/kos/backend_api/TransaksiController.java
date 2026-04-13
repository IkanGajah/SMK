package com.kos.backend_api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kos.backend_api.models.Kamar;
import com.kos.backend_api.models.TransaksiSewa;
import com.kos.backend_api.models.WebResponse;

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
        //Cari data Kamar berdasarkan ID yang dikirim
        Kamar kamar = kamarRepository.findById(request.getKamar().getId())
                .orElseThrow(() -> new RuntimeException("Kamar tidak ditemukan"));

        //Cek apakah kamar tersedia
        if (!kamar.getStatus().equals("Tersedia")) {
            throw new RuntimeException("Kamar sedang tidak tersedia!");
        }

        //Update status Kamar menjadi "Penuh"
        kamar.setStatus("Penuh");
        kamarRepository.save(kamar);

        //Simpan Transaksi
        TransaksiSewa baru = transaksiRepository.save(request);

        return new WebResponse<>(201, "Check-in berhasil! Status kamar telah diperbarui.", baru);
    }

    @GetMapping
    public WebResponse<List<TransaksiSewa>> getAll() {
        return new WebResponse<>(200, "Daftar transaksi berhasil diambil", transaksiRepository.findAll());
    }
}