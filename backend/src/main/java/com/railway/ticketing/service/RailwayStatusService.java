package com.railway.ticketing.service;

import com.railway.ticketing.model.Train;
import com.railway.ticketing.repository.TrainRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RailwayStatusService {

    private final TrainRepository trains;

    public RailwayStatusService(TrainRepository trains) {
        this.trains = trains;
    }

    @Cacheable(value = "railwayStatus", key = "#trainNumber == null ? '' : #trainNumber.trim()")
    public Map<String, Object> getStatus(String trainNumber) {
        String normalizedTrainNumber = trainNumber == null ? "" : trainNumber.trim();

        if (normalizedTrainNumber.isBlank()) {
            throw new IllegalArgumentException("Train number is required");
        }

        Train train = trains.findByTrainNumber(normalizedTrainNumber)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Train with number " + normalizedTrainNumber + " is not found"));

        return Map.ofEntries(
                Map.entry("trainNumber", train.getTrainNumber()),
                Map.entry("trainName", train.getTrainName()),
                Map.entry("source", train.getSource()),
                Map.entry("destination", train.getDestination()),
                Map.entry("departureTime", train.getDepartureTime()),
                Map.entry("arrivalTime", train.getArrivalTime()),
                Map.entry("status", "ON TIME"),
                Map.entry("currentStation", "New Delhi"),
                Map.entry("delayMinutes", 0),
                Map.entry("nextStation", "Kanpur Central"),
                Map.entry("platform", "4"),
                Map.entry("updatedAt", System.currentTimeMillis())
        );
    }
}
