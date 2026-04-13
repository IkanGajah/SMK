package com.kos.backend_api;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kos.backend_api.models.TransaksiSewa;

public interface TransaksiSewaRepository extends JpaRepository<TransaksiSewa, Integer> {
    // mencari 1 transaksi terbaru berdasarkan kamar ID, diurutkan dari tanggal sewa paling baru
    Optional<TransaksiSewa> findFirstByKamarIdOrderByTanggalMulaiSewaDesc(Integer kamarId);
}