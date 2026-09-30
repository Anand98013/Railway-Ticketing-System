package com.railway.ticketing.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trains", indexes = {
    @Index(name = "idx_train_number", columnList = "trainNumber"),
    @Index(name = "idx_source_destination", columnList = "source,destination")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String trainNumber;

    @Column(nullable = false)
    private String trainName;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private String departureTime;

    @Column(nullable = false)
    private String arrivalTime;

    @Column(nullable = false)
    private Integer totalSeats;

    private String trainType;
}
