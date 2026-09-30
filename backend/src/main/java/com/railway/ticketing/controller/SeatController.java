package com.railway.ticketing.controller;

import com.railway.ticketing.service.SeatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trains")
public class SeatController {
    private final SeatService service;

    public SeatController(SeatService service) {
        this.service = service;
    }

    @GetMapping("/{trainId}/seats")
    public List<SeatService.SeatAvailability> seats(
            @PathVariable Long trainId,
            @RequestParam String travelDate) {
        return service.availability(trainId, travelDate);
    }
}
