package com.railway.ticketing.dto;

public record ProfileRequest(
        String fullName,
        String phone,
        String address,
        String city,
        String state
) {}
