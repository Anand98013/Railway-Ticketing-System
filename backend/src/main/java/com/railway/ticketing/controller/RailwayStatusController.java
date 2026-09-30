package com.railway.ticketing.controller;

import com.railway.ticketing.service.RailwayStatusService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/status")
public class RailwayStatusController {
    private final RailwayStatusService service;

    public RailwayStatusController(RailwayStatusService service) {
        this.service = service;
    }

    @GetMapping("/{trainNumber}")
    public Map<String, Object> status(@PathVariable String trainNumber) {
        return service.getStatus(trainNumber);
    }
}
