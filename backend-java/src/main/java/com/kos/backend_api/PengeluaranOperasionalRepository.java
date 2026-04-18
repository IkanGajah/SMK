package com.kos.backend_api;

import com.kos.backend_api.models.PengeluaranOperasional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PengeluaranOperasionalRepository extends JpaRepository<PengeluaranOperasional, Integer> {
}
