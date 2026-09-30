package com.railway.ticketing.service;

import com.railway.ticketing.model.*;
import com.railway.ticketing.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class SeatService {
    private final SeatRepository seats;
    private final BookingRepository bookings;

    public SeatService(SeatRepository seats, BookingRepository bookings) {
        this.seats = seats;
        this.bookings = bookings;
    }

    public List<SeatAvailability> availability(Long trainId, String travelDate) {
        validateTravelDate(travelDate);
        return seats.findByTrainIdOrderBySeatNumber(trainId)
                .stream()
                .map(s -> new SeatAvailability(
                        s.getId(),
                        s.getSeatNumber(),
                        s.getCoach(),
                        s.getSeatClass(),
                        !bookings.existsByTrainIdAndSeatIdAndTravelDateAndStatus(
                                trainId, s.getId(), travelDate, BookingStatus.CONFIRMED)))
                .toList();
    }

    private void validateTravelDate(String travelDate) {
        try {
            LocalDate date = LocalDate.parse(travelDate);
            if (date.isBefore(LocalDate.now())) {
                throw new IllegalArgumentException("Travel date cannot be in the past");
            }
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("Travel date must be in YYYY-MM-DD format");
        }
    }

    public record SeatAvailability(
            Long id, String seatNumber, String coach, String seatClass, boolean available) {}
}
