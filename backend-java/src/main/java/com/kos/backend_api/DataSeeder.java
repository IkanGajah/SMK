package com.kos.backend_api;

import com.kos.backend_api.models.Owner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        // Cek jika belum ada Owner sama sekali
        if (ownerRepository.count() == 0) {
            Owner firstOwner = new Owner(
                encoder.encode("password123"),
                "Owner Utama",
                "081234567890",
                "owner@kos.com"
            );
            
            ownerRepository.save(firstOwner);
            System.out.println("=========================================");
            System.out.println("SYSTEM: Data Seeder dijalankan.");
            System.out.println("Akun Owner default telah dibuat.");
            System.out.println("Email    : owner@kos.com");
            System.out.println("Password : password123");
            System.out.println("=========================================");
        }
    }
}
