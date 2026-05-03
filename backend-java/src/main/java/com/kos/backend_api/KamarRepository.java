package com.kos.backend_api; 

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kos.backend_api.models.enums.StatusKamar;
import com.kos.backend_api.models.Kamar;
import org.springframework.stereotype.Repository;

@Repository
public interface KamarRepository extends JpaRepository<Kamar, Integer> {
    List<Kamar> findByStatusKetersediaanNot(StatusKamar status);
    List<Kamar> findByCabangIdCabangAndStatusKetersediaanNot(int idCabang, StatusKamar status);
}