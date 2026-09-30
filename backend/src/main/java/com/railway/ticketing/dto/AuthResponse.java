package com.railway.ticketing.dto;

public record AuthResponse(String token, String email, String role) {}
