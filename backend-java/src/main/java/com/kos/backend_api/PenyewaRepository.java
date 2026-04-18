package com.kos.backend_api;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kos.backend_api.models.Penyewa;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PenyewaRepository extends JpaRepository<Penyewa, Integer> {
    
    @Query("SELECT DISTINCT t.penyewa FROM TransaksiSewa t WHERE t.kamar.cabang.idCabang = :idCabang")
    List<Penyewa> findPenyewaByCabangId(@Param("idCabang") Integer idCabang);
}