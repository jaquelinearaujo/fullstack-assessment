package com.jleite.backend.catalog.service;

import com.jleite.backend.catalog.dto.AuthRequest;
import com.jleite.backend.catalog.dto.AuthResponse;
import com.jleite.backend.catalog.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse authenticate(AuthRequest request);
}
