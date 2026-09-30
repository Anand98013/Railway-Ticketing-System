package com.railway.ticketing.service;

import com.railway.ticketing.dto.*;
import com.railway.ticketing.model.*;
import com.railway.ticketing.repository.*;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {
    private final BookingRepository bookings;
    private final TrainRepository trains;
    private final SeatRepository seats;
    private final UserRepository users;

    public BookingService(BookingRepository bookings,
                           TrainRepository trains,
                           SeatRepository seats,
                           UserRepository users) {
        this.bookings = bookings;
        this.trains = trains;
        this.seats = seats;
        this.users = users;
    }

    @Transactional
    @CacheEvict(value = {"trainById", "allTrains"}, allEntries = true)
    public BookingResponse book(String email, BookingRequest request) {
        User user = users.findByEmail(email).orElseThrow();
        Train train = trains.findById(request.trainId())
                .orElseThrow(() -> new IllegalArgumentException("Train not found"));
        Seat seat = seats.findByIdForUpdate(request.seatId())
                .orElseThrow(() -> new IllegalArgumentException("Seat not found"));

        validateTravelDate(request.travelDate());

        if (!seat.getTrain().getId().equals(train.getId())) {
            throw new IllegalArgumentException("Seat does not belong to selected train");
        }

        if (bookings.existsByTrainIdAndSeatIdAndTravelDateAndStatus(
                train.getId(), seat.getId(), request.travelDate(), BookingStatus.CONFIRMED)) {
            throw new IllegalStateException("Seat already booked for this date");
        }

        double amount = calculateFare(seat.getSeatClass());

        Booking booking = bookings.save(Booking.builder()
                .pnr(generatePnr())
                .user(user)
                .train(train)
                .seat(seat)
                .passengerName(request.passengerName())
                .passengerAge(request.passengerAge())
                .travelDate(request.travelDate())
                .amount(amount)
                .status(BookingStatus.CONFIRMED)
                .bookedAt(LocalDateTime.now())
                .build());

        return BookingResponse.from(booking);
    }

    public List<BookingResponse> myBookings(String email) {
        User user = users.findByEmail(email).orElseThrow();
        return bookings.findByUserIdOrderByBookedAtDesc(user.getId())
                .stream().map(BookingResponse::from).toList();
    }

    @Transactional
    public void cancel(String email, Long id) {
        User user = users.findByEmail(email).orElseThrow();
        Booking booking = bookings.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You cannot cancel this booking");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) return;
        booking.setStatus(BookingStatus.CANCELLED);
        bookings.save(booking);
    }

    public BookingResponse findByPnr(String pnr) {
        String normalizedPnr = pnr == null ? "" : pnr.trim().toUpperCase();

        if (normalizedPnr.isBlank()) {
            throw new IllegalArgumentException("PNR is required");
        }

        return bookings.findByPnr(normalizedPnr)
                .map(BookingResponse::from)
                .orElseThrow(() -> new IllegalArgumentException("PNR not found"));
    }

    private void validateTravelDate(String travelDate) {
        try {
            LocalDate date = LocalDate.parse(travelDate);
            if (date.isBefore(LocalDate.now())) {
                throw new IllegalArgumentException("Travel date cannot be in the past");
            }
        } catch (java.time.format.DateTimeParseException ex) {
            throw new IllegalArgumentException("Travel date must be in YYYY-MM-DD format");
        }
    }

    private String generatePnr() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 10).toUpperCase();
    }

    private double calculateFare(String seatClass) {
        return switch (seatClass.toUpperCase()) {
            case "1A" -> 2500;
            case "2A" -> 1600;
            case "3A" -> 1100;
            case "SL" -> 650;
            default -> 500;
        };
    }
}
