package com.kos.backend_api;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kos.backend_api.models.Penyewa;

public interface PenyewaRepository extends JpaRepository<Penyewa, Integer> {
}