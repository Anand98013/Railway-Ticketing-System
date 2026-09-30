package com.railway.ticketing.repository;

import com.railway.ticketing.model.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TrainRepository extends JpaRepository<Train, Long> {
    Optional<Train> findByTrainNumber(String trainNumber);
    List<Train> findBySourceIgnoreCaseAndDestinationIgnoreCase(String source, String destination);
}
