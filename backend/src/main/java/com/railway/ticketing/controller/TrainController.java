package com.railway.ticketing.controller;

import com.railway.ticketing.model.Train;
import com.railway.ticketing.service.TrainService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trains")
public class TrainController {
    private final TrainService service;

    public TrainController(TrainService service) {
        this.service = service;
    }

    @GetMapping
    public List<Train> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Train byId(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/search")
    public List<Train> search(@RequestParam String source,
                              @RequestParam String destination,
                              @RequestParam(required = false) String date) {
        return service.search(source, destination);
    }
}
