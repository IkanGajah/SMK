package com.kos.backend_api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kos.backend_api.models.Penyewa;
import com.kos.backend_api.models.WebResponse;

@RestController
@RequestMapping("/api/penyewa")
public class PenyewaController {

    @Autowired
    private PenyewaRepository penyewaRepository;

    // Ambil semua daftar penyewa
    @GetMapping
    public WebResponse<List<Penyewa>> getAll() {
        List<Penyewa> data = penyewaRepository.findAll();
        return new WebResponse<>(200, "Daftar penyewa berhasil diambil", data);
    }

    // Daftarkan penyewa baru
    @PostMapping
    public WebResponse<Penyewa> create(@RequestBody Penyewa request) {
        Penyewa baru = penyewaRepository.save(request);
        return new WebResponse<>(201, "Penyewa berhasil didaftarkan", baru);
    }
}