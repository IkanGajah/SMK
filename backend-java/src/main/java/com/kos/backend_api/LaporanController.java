package com.kos.backend_api;

import com.kos.backend_api.models.AdminCabang;
import com.kos.backend_api.models.LaporanKeuanganDTO;
import com.kos.backend_api.models.Owner;
import com.kos.backend_api.models.User;
import com.kos.backend_api.models.WebResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/laporan")
public class LaporanController {

    @Autowired
    private TransaksiSewaRepository transaksiRepository;

    @Autowired
    private PengeluaranOperasionalRepository pengeluaranRepository;

    @GetMapping("/keuangan")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public WebResponse<LaporanKeuanganDTO> getLaporanKeuangan(
            @RequestParam(required = false) Integer bulan,
            @RequestParam(required = false) Integer tahun,
            @RequestParam(required = false) Integer idCabang) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        if (bulan == null) bulan = LocalDate.now().getMonthValue();
        if (tahun == null) tahun = LocalDate.now().getYear();

        Integer totalPemasukan = 0;
        Integer totalPengeluaran = 0;

        if (user instanceof AdminCabang admin) {
            // Admin cuma bisa lihat cabang sendiri
            int targetCabangId = admin.getCabang().getIdCabang();
            totalPemasukan = transaksiRepository.sumPemasukanByCabangBulanTahun(targetCabangId, bulan, tahun);
            totalPengeluaran = pengeluaranRepository.sumPengeluaranByCabangBulanTahun(targetCabangId, bulan, tahun);
        } else if (user instanceof Owner) {
            if (idCabang != null) {
                // Owner lihat cabang tertentu
                totalPemasukan = transaksiRepository.sumPemasukanByCabangBulanTahun(idCabang, bulan, tahun);
                totalPengeluaran = pengeluaranRepository.sumPengeluaranByCabangBulanTahun(idCabang, bulan, tahun);
            } else {
                // Owner lihat semua cabang (gabungan)
                totalPemasukan = transaksiRepository.sumTotalPemasukanBulanTahun(bulan, tahun);
                totalPengeluaran = pengeluaranRepository.sumTotalPengeluaranBulanTahun(bulan, tahun);
            }
        } else {
            throw new AccessDeniedException("Akses Ditolak");
        }

        LaporanKeuanganDTO laporan = new LaporanKeuanganDTO(bulan, tahun, totalPemasukan, totalPengeluaran);
        return new WebResponse<>(200, "Laporan Keuangan Berhasil Diambil", laporan);
    }
}
