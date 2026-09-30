package com.railway.ticketing.repository;

import com.railway.ticketing.model.Booking;
import com.railway.ticketing.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdOrderByBookedAtDesc(Long userId);
    boolean existsByTrainIdAndSeatIdAndTravelDateAndStatus(
            Long trainId, Long seatId, String travelDate, BookingStatus status);
    Optional<Booking> findByPnr(String pnr);
}
