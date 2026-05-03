package com.kos.backend_api;

import com.kos.backend_api.models.CabangKos;
import com.kos.backend_api.models.WebResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cabang")
public class CabangKosController {

    @Autowired
    private CabangKosRepository cabangKosRepository;

    @GetMapping
    public WebResponse<List<CabangKos>> getAll() {
        List<CabangKos> data = cabangKosRepository.findByStatusNot("Nonaktif");
        return new WebResponse<>(200, "Daftar cabang kos berhasil diambil", data);
    }

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public WebResponse<CabangKos> create(@RequestBody CabangKos request) {
        request.setStatus("Aktif");
        CabangKos data = cabangKosRepository.save(request);
        return new WebResponse<>(201, "Cabang kos berhasil ditambahkan", data);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public WebResponse<CabangKos> update(@PathVariable int id, @RequestBody CabangKos request) {
        return cabangKosRepository.findById(id).map(cabang -> {
            cabang.setNamaCabang(request.getNamaCabang());
            cabang.setAlamat(request.getAlamat());
            cabang.setJumlahKamar(request.getJumlahKamar());
            if (request.getStatus() != null) {
                cabang.setStatus(request.getStatus());
            }
            cabangKosRepository.save(cabang);
            return new WebResponse<>(200, "Data cabang berhasil diupdate", cabang);
        }).orElseThrow(() -> new RuntimeException("Cabang tidak ditemukan"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public WebResponse<String> delete(@PathVariable int id) {
        return cabangKosRepository.findById(id).map(cabang -> {
            cabang.setStatus("Nonaktif");
            cabangKosRepository.save(cabang);
            return new WebResponse<>(200, "Cabang kos berhasil dinonaktifkan", "OK");
        }).orElseThrow(() -> new RuntimeException("Cabang tidak ditemukan"));
    }
}
