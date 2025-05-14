package com.jleite.springbootbackend.catalog.service.impl;

import com.jleite.springbootbackend.catalog.dto.AuthRequest;
import com.jleite.springbootbackend.catalog.dto.AuthResponse;
import com.jleite.springbootbackend.catalog.dto.RegisterRequest;
import com.jleite.springbootbackend.catalog.model.User;
import com.jleite.springbootbackend.catalog.repository.UserRepository;
import com.jleite.springbootbackend.catalog.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            return AuthResponse.failure("Username is already taken");
        }

        if (userRepository.existsByEmail(request.email())) {
            return AuthResponse.failure("Email is already in use");
        }

        User user = new User(
                request.username(),
                request.email(),
                passwordEncoder.encode(request.password())
        );

        userRepository.save(user);

        return AuthResponse.success(user.getUsername(), user.getEmail());
    }


    public AuthResponse authenticate(AuthRequest request) {
        return userRepository.findByUsername(request.username())
                .filter(user -> passwordEncoder.matches(request.password(), user.getPassword()))
                .map(user -> AuthResponse.success(user.getUsername(), user.getEmail()))
                .orElse(AuthResponse.failure("Invalid username or password"));
    }
}
