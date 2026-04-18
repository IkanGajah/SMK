package com.kos.backend_api.security;

import com.kos.backend_api.UserRepository;
import com.kos.backend_api.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            // Coba cari berdasarkan email jika username tidak ditemukan
            user = userRepository.findByEmail(username);
            if (user == null) {
                throw new UsernameNotFoundException("User Not Found with username/email: " + username);
            }
        }
        return user;
    }
}
