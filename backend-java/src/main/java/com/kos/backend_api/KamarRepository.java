package com.kos.backend_api; 

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kos.backend_api.models.Kamar;

public interface KamarRepository extends JpaRepository<Kamar, Integer> {
    // Mencari semua kamar KECUALI yang statusnya tertentu
    List<Kamar> findByStatusNot(String status);
}