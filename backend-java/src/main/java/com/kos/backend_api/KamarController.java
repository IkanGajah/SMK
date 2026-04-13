package com.kos.backend_api; 

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/kamar")
public class KamarController {

    @Autowired
    private KamarRepository kamarRepository;
    @Autowired
    private TransaksiSewaRepository transaksiSewaRepository;

    // READ/GET: Ambil semua kamar yang tidak "Nonaktif"
    @GetMapping
    public WebResponse<java.util.List<Kamar>> getAll() {
        java.util.List<Kamar> data = kamarRepository.findByStatusNot("Nonaktif");
        return new WebResponse<>(200, "Berhasil mengambil data kamar", data);
    }
    // READ/GET: Ambil kamar berdasarkan ID
    @GetMapping("/{id}")
    public WebResponse<KamarDetailDTO> getById(@PathVariable("id") Integer id) {
        Kamar kamar = kamarRepository.findById(id).orElse(null);
        if (kamar == null) {
            return new WebResponse<>(404, "Kamar tidak ditemukan", null);
        }

        KamarDetailDTO dto = new KamarDetailDTO();
        dto.setId(kamar.getId());
        dto.setNomorKamar(kamar.getNomorKamar());
        dto.setFasilitas(kamar.getFasilitas());
        dto.setHarga(kamar.getHarga());
        dto.setStatus(kamar.getStatus());

        if ("Penuh".equalsIgnoreCase(kamar.getStatus())) {
            var transaksiOpt = transaksiSewaRepository.findFirstByKamarIdOrderByTanggalMulaiSewaDesc(id);
            
            if (transaksiOpt.isPresent()) {
                var transaksi = transaksiOpt.get();
                dto.setNamaPenyewa(transaksi.getPenyewa().getNamaLengkap());
                
                // logika hitung jatuh tempo: tanggalMulaiSewa + durasiBulan
                if (transaksi.getTanggalMulaiSewa() != null && transaksi.getDurasiBulan() != null) {
                    // Menggunakan LocalDate untuk menambah bulan secara otomatis
                    LocalDate mulai = transaksi.getTanggalMulaiSewa(); 
                    Integer durasi = transaksi.getDurasiBulan();
                    LocalDate jatuhTempo = mulai.plusMonths(durasi);
                    
                    // Set ke DTO dalam format String
                    dto.setTempoBayar(jatuhTempo.toString());
                }
            }
        }

        return new WebResponse<>(200, "Detail kamar berhasil diambil", dto);
    }

    // CREATE/POST
    @PostMapping
    public WebResponse<Kamar> create(@RequestBody Kamar request) {
        Kamar data = kamarRepository.save(request);
        return new WebResponse<>(201, "Kamar berhasil ditambahkan", data);
    }

    // UPDATE/PUT
    @PutMapping("/{id}")
    public WebResponse<Kamar> update(@PathVariable Integer id, @RequestBody Kamar request) {
        return kamarRepository.findById(id).map(kamar -> {
            kamar.setNomorKamar(request.getNomorKamar());
            kamar.setFasilitas(request.getFasilitas());
            kamar.setHarga(request.getHarga());
            kamar.setStatus(request.getStatus());
            kamarRepository.save(kamar);
            return new WebResponse<>(200, "Data berhasil diupdate", kamar);
        }).orElseThrow(() -> new RuntimeException("Kamar tidak ditemukan"));
    }

    // DELETE 
    @DeleteMapping("/{id}")
    public WebResponse<String> delete(@PathVariable Integer id) {
        return kamarRepository.findById(id).map(kamar -> {
            kamar.setStatus("Nonaktif");
            kamarRepository.save(kamar);
            return new WebResponse<>(200, "Kamar berhasil dinonaktifkan", "OK");
        }).orElseThrow(() -> new RuntimeException("Kamar tidak ditemukan"));
    }
}