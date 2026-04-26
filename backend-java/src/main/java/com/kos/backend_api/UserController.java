package com.kos.backend_api;

import com.kos.backend_api.models.AdminCabang;
import com.kos.backend_api.models.CabangKos;
import com.kos.backend_api.models.WebResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private AdminCabangRepository adminCabangRepository;

    @Autowired
    private CabangKosRepository cabangKosRepository;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('OWNER')")
    public WebResponse<List<AdminCabang>> getAllAdmin() {
        return new WebResponse<>(200, "Daftar admin berhasil diambil", adminCabangRepository.findAll());
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('OWNER')")
    public WebResponse<AdminCabang> createAdmin(@RequestBody AdminCabang request) {
        if (request.getCabang() == null || request.getCabang().getIdCabang() == 0) {
            throw new RuntimeException("Cabang Kos harus diisi");
        }

        CabangKos cabang = cabangKosRepository.findById(request.getCabang().getIdCabang())
                .orElseThrow(() -> new RuntimeException("Cabang Kos tidak ditemukan"));

        request.setCabang(cabang);
        request.setPassword(encoder.encode(request.getPassword()));

        AdminCabang savedAdmin = adminCabangRepository.save(request);
        return new WebResponse<>(201, "Admin Cabang berhasil dibuat", savedAdmin);
    }
}
