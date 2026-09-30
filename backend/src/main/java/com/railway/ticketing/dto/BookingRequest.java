package com.railway.ticketing.dto;

import jakarta.validation.constraints.*;

public record BookingRequest(
        @NotNull Long trainId,
        @NotNull Long seatId,
        @NotBlank String passengerName,
        @NotNull @Min(1) @Max(120) Integer passengerAge,
        @NotBlank String travelDate
) {}
