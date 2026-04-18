package com.kos.backend_api;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kos.backend_api.models.TransaksiSewa;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransaksiSewaRepository extends JpaRepository<TransaksiSewa, Integer> {
    Optional<TransaksiSewa> findFirstByKamarIdKamarOrderByTanggalTransaksiDesc(Integer kamarIdKamar);
    List<TransaksiSewa> findByKamarCabangIdCabang(Integer idCabang);
    List<TransaksiSewa> findByPenyewaIdUser(Integer idPenyewa);
}