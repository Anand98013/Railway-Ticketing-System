package com.railway.ticketing.controller;

import com.railway.ticketing.dto.*;
import com.railway.ticketing.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BookingResponse> book(
            Authentication auth,
            @Valid @RequestBody BookingRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.book(auth.getName(), request));
    }

    @GetMapping("/my")
    public List<BookingResponse> my(Authentication auth) {
        return service.myBookings(auth.getName());
    }

    @GetMapping("/pnr/{pnr}")
    public BookingResponse pnr(@PathVariable String pnr) {
        return service.findByPnr(pnr);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(Authentication auth, @PathVariable Long id) {
        service.cancel(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
