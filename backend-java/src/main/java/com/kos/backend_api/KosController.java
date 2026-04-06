package com.kos.backend_api; 

import java.util.List; 
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin; // <-- Ini akan otomatis ter-import kalau kamu pakai VS Code
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // <-- Ini surat izin khusus buat Next.js
@RestController
public class KosController {

    @GetMapping("/api/kamar")
    public List<Map<String, Object>> getDaftarKamar() {
        return List.of(
            Map.of(
                "id", 1, 
                "nama_kos", "Kos Putra Fasilkom", 
                "tipe", "Putra",
                "harga", 600000, 
                "status", "Tersedia"
            ),
            Map.of(
                "id", 2, 
                "nama_kos", "Kos Putri Melati", 
                "tipe", "Putri",
                "harga", 750000, 
                "status", "Penuh"
            )
        );
    }
}