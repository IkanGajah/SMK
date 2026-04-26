package com.kos.backend_api;

import com.kos.backend_api.models.CabangKos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CabangKosRepository extends JpaRepository<CabangKos, Integer> {
    List<CabangKos> findByStatusNot(String status);
}
