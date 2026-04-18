package com.kos.backend_api;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kos.backend_api.models.Kamar;
import com.kos.backend_api.models.KamarDetailDTO;
import com.kos.backend_api.models.WebResponse;
import com.kos.backend_api.models.enums.StatusKamar;
import com.kos.backend_api.models.enums.FasilitasKamar;

@RestController
@RequestMapping("/api/kamar")
public class KamarController {

    @Autowired
    private KamarRepository kamarRepository;

    @Autowired
    private TransaksiSewaRepository transaksiSewaRepository;

    @Autowired
    private RiwayatSewaRepository riwayatSewaRepository;

    @GetMapping
    public WebResponse<List<Kamar>> getAll() {
        List<Kamar> data = kamarRepository.findByStatusKetersediaanNot(StatusKamar.NONAKTIF);
        return new WebResponse<>(200, "Berhasil mengambil data kamar", data);
    }

    @GetMapping("/{id}")
    public WebResponse<KamarDetailDTO> getById(@PathVariable("id") Integer id) {
        Kamar kamar = kamarRepository.findById(id).orElse(null);
        if (kamar == null) {
            return new WebResponse<>(404, "Kamar tidak ditemukan", null);
        }

        KamarDetailDTO dto = new KamarDetailDTO();
        dto.setId(kamar.getIdKamar());
        dto.setNomorKamar(kamar.getNomorKamar());
        dto.setFasilitas(kamar.getFasilitas() != null ? kamar.getFasilitas().name() : null);
        dto.setHarga(kamar.getHargaSewa());
        dto.setStatus(kamar.getStatusKetersediaan() != null ? kamar.getStatusKetersediaan().name() : null);

        if (StatusKamar.PENUH.equals(kamar.getStatusKetersediaan())) {
            var transaksiOpt = transaksiSewaRepository.findFirstByKamarIdKamarOrderByTanggalTransaksiDesc(id);
            if (transaksiOpt.isPresent()) {
                var transaksi = transaksiOpt.get();
                dto.setNamaPenyewa(transaksi.getPenyewa().getNama());
                dto.setTempoBayar(transaksi.getTanggalTransaksi().plusMonths(1).toString()); // Default 1 month
            }
        }

        return new WebResponse<>(200, "Detail kamar berhasil diambil", dto);
    }

    @PostMapping
    public WebResponse<Kamar> create(@RequestBody Kamar request) {
        Kamar data = kamarRepository.save(request);
        return new WebResponse<>(201, "Kamar berhasil ditambahkan", data);
    }

    @PutMapping("/{id}")
    public WebResponse<Kamar> update(@PathVariable Integer id, @RequestBody Kamar request) {
        return kamarRepository.findById(id).map(kamar -> {
            kamar.setNomorKamar(request.getNomorKamar());
            kamar.setFasilitas(request.getFasilitas());
            kamar.setHargaSewa(request.getHargaSewa());
            kamar.setStatusKetersediaan(request.getStatusKetersediaan());
            kamarRepository.save(kamar);
            return new WebResponse<>(200, "Data berhasil diupdate", kamar);
        }).orElseThrow(() -> new RuntimeException("Kamar tidak ditemukan"));
    }

    @DeleteMapping("/{id}")
    public WebResponse<String> delete(@PathVariable Integer id) {
        return kamarRepository.findById(id).map(kamar -> {
            kamar.setStatusKetersediaan(StatusKamar.NONAKTIF);
            kamarRepository.save(kamar);
            return new WebResponse<>(200, "Kamar berhasil dinonaktifkan", "OK");
        }).orElseThrow(() -> new RuntimeException("Kamar tidak ditemukan"));
    }
}