package com.kos.backend_api;

import com.kos.backend_api.models.AdminCabang;
import com.kos.backend_api.models.CabangKos;
import com.kos.backend_api.models.Owner;
import com.kos.backend_api.models.PengeluaranOperasional;
import com.kos.backend_api.models.User;
import com.kos.backend_api.models.WebResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pengeluaran")
public class PengeluaranOperasionalController {

    @Autowired
    private PengeluaranOperasionalRepository pengeluaranRepository;

    @Autowired
    private CabangKosRepository cabangKosRepository;

    private void validateAdminCabangAccess(Integer cabangId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return;

        Object principal = auth.getPrincipal();
        if (principal instanceof AdminCabang admin) {
            if (admin.getCabang() == null || admin.getCabang().getIdCabang() != cabangId) {
                throw new AccessDeniedException("Akses Ditolak: Anda hanya berhak mengelola data di cabang Anda sendiri.");
            }
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public WebResponse<List<PengeluaranOperasional>> getAll() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        List<PengeluaranOperasional> data;
        if (user instanceof Owner) {
            data = pengeluaranRepository.findAll();
        } else if (user instanceof AdminCabang admin) {
            data = pengeluaranRepository.findByCabangIdCabang(admin.getCabang().getIdCabang());
        } else {
            throw new AccessDeniedException("Akses ditolak");
        }

        return new WebResponse<>(200, "Daftar pengeluaran operasional berhasil diambil", data);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public WebResponse<PengeluaranOperasional> create(@RequestBody PengeluaranOperasional request) {
        if (request.getCabang() == null || request.getCabang().getIdCabang() == 0) {
            throw new RuntimeException("Cabang Kos harus diisi");
        }

        validateAdminCabangAccess(request.getCabang().getIdCabang());

        CabangKos cabang = cabangKosRepository.findById(request.getCabang().getIdCabang())
                .orElseThrow(() -> new RuntimeException("Cabang tidak ditemukan"));
        
        request.setCabang(cabang);
        if (request.getTanggal() == null) {
            request.setTanggal(LocalDate.now());
        }

        PengeluaranOperasional saved = pengeluaranRepository.save(request);
        return new WebResponse<>(201, "Pengeluaran berhasil dicatat", saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public WebResponse<PengeluaranOperasional> update(@PathVariable int id, @RequestBody PengeluaranOperasional request) {
        return pengeluaranRepository.findById(id).map(p -> {
            validateAdminCabangAccess(p.getCabang().getIdCabang());
            
            p.setKategori(request.getKategori());
            p.setNominal(request.getNominal());
            p.setDeskripsi(request.getDeskripsi());
            if (request.getTanggal() != null) {
                p.setTanggal(request.getTanggal());
            }
            
            pengeluaranRepository.save(p);
            return new WebResponse<>(200, "Pengeluaran berhasil diupdate", p);
        }).orElseThrow(() -> new RuntimeException("Data pengeluaran tidak ditemukan"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public WebResponse<String> delete(@PathVariable int id) {
        PengeluaranOperasional p = pengeluaranRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data pengeluaran tidak ditemukan"));
        
        validateAdminCabangAccess(p.getCabang().getIdCabang());
        
        pengeluaranRepository.delete(p);
        return new WebResponse<>(200, "Pengeluaran berhasil dihapus", "OK");
    }
}
