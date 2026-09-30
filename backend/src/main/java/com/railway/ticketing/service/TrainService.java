package com.railway.ticketing.service;

import com.railway.ticketing.model.Train;
import com.railway.ticketing.repository.TrainRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainService {
    private final TrainRepository repository;

    public TrainService(TrainRepository repository) {
        this.repository = repository;
    }

    @Cacheable(value = "allTrains")
    public List<Train> getAll() {
        return repository.findAll();
    }

    @Cacheable(value = "trainById", key = "#id")
    public Train getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Train not found"));
    }

    @Cacheable(value = "trainSearch", key = "#source.toLowerCase() + ':' + #destination.toLowerCase()")
    public List<Train> search(String source, String destination) {
        String normalizedSource = source == null ? "" : source.trim();
        String normalizedDestination = destination == null ? "" : destination.trim();
        if (normalizedSource.isBlank() || normalizedDestination.isBlank()) {
            return List.of();
        }
        return repository.findBySourceIgnoreCaseAndDestinationIgnoreCase(
                normalizedSource, normalizedDestination);
    }
}
