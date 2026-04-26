package com.kos.backend_api;

import com.kos.backend_api.models.PengeluaranOperasional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PengeluaranOperasionalRepository extends JpaRepository<PengeluaranOperasional, Integer> {
    List<PengeluaranOperasional> findByCabangIdCabang(Integer idCabang);

    @Query("SELECT COALESCE(SUM(p.nominal), 0) FROM PengeluaranOperasional p WHERE p.cabang.idCabang = :cabangId AND MONTH(p.tanggal) = :bulan AND YEAR(p.tanggal) = :tahun")
    Integer sumPengeluaranByCabangBulanTahun(@Param("cabangId") int cabangId, @Param("bulan") int bulan, @Param("tahun") int tahun);

    @Query("SELECT COALESCE(SUM(p.nominal), 0) FROM PengeluaranOperasional p WHERE MONTH(p.tanggal) = :bulan AND YEAR(p.tanggal) = :tahun")
    Integer sumTotalPengeluaranBulanTahun(@Param("bulan") int bulan, @Param("tahun") int tahun);
}
