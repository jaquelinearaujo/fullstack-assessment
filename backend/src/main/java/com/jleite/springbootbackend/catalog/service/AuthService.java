package com.jleite.springbootbackend.catalog.service;

import com.jleite.springbootbackend.catalog.dto.AuthRequest;
import com.jleite.springbootbackend.catalog.dto.AuthResponse;
import com.jleite.springbootbackend.catalog.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse authenticate(AuthRequest request);
}
