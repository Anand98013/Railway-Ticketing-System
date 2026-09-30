package com.railway.ticketing.config;

import com.railway.ticketing.model.*;
import com.railway.ticketing.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seed(TrainRepository trains, SeatRepository seats) {
        return args -> {
            createTrainIfMissing(trains, seats, "12001", "Rajdhani Express",
                    "New Delhi", "Mumbai Central", "16:55", "08:35", "Rajdhani");
            createTrainIfMissing(trains, seats, "12951", "Mumbai Rajdhani",
                    "Mumbai Central", "New Delhi", "17:00", "08:35", "Rajdhani");
            createTrainIfMissing(trains, seats, "12301", "Howrah Rajdhani",
                    "New Delhi", "Howrah", "17:00", "10:00", "Rajdhani");
            createTrainIfMissing(trains, seats, "12622", "Tamil Nadu Express",
                    "New Delhi", "Chennai Central", "21:05", "05:50", "Superfast");
        };
    }

    private void createTrainIfMissing(TrainRepository trains, SeatRepository seats,
                                       String number, String name, String source, String destination,
                                       String departure, String arrival, String type) {
        Train train = trains.findByTrainNumber(number).orElseGet(() -> trains.save(Train.builder()
                .trainNumber(number)
                .trainName(name)
                .source(source)
                .destination(destination)
                .departureTime(departure)
                .arrivalTime(arrival)
                .totalSeats(40)
                .trainType(type)
                .build()));

        if (seats.findByTrainIdOrderBySeatNumber(train.getId()).isEmpty()) {
            createSeats(seats, train);
        }
    }

    private void createSeats(SeatRepository seats, Train train) {
        String[] classes = {"1A", "2A", "3A", "SL"};
        int seatNo = 1;
        for (String seatClass : classes) {
            for (int i = 0; i < 10; i++) {
                seats.save(Seat.builder()
                        .train(train)
                        .seatNumber(String.valueOf(seatNo++))
                        .coach(seatClass.equals("SL") ? "S1" : seatClass.equals("1A") ? "H1" : "A1")
                        .seatClass(seatClass)
                        .build());
            }
        }
    }
}
