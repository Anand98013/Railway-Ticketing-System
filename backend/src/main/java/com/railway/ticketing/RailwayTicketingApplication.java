package com.railway.ticketing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class RailwayTicketingApplication {
    public static void main(String[] args) {
        SpringApplication.run(RailwayTicketingApplication.class, args);
    }
}
