package com.jleite.springbootbackend.catalog.dto;

public record AuthResponse (
        String username,
        String email,
        String message,
        boolean success
) {
    public static AuthResponse success(String username, String email) {
        return new AuthResponse(username, email, "Authentication successful", true);
    }

    public static AuthResponse failure(String message) {
        return new AuthResponse(null, null, message, false);
    }
}
