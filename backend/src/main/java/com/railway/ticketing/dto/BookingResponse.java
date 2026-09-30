package com.railway.ticketing.dto;

import com.railway.ticketing.model.Booking;
import java.time.LocalDateTime;

public record BookingResponse(
        Long id,
        String pnr,
        String trainNumber,
        String trainName,
        String source,
        String destination,
        String seatNumber,
        String coach,
        String passengerName,
        Integer passengerAge,
        String travelDate,
        Double amount,
        String status,
        LocalDateTime bookedAt
) {
    public static BookingResponse from(Booking b) {
        return new BookingResponse(
                b.getId(), b.getPnr(),
                b.getTrain().getTrainNumber(), b.getTrain().getTrainName(),
                b.getTrain().getSource(), b.getTrain().getDestination(),
                b.getSeat().getSeatNumber(), b.getSeat().getCoach(),
                b.getPassengerName(), b.getPassengerAge(), b.getTravelDate(),
                b.getAmount(), b.getStatus().name(), b.getBookedAt()
        );
    }
}
