package com.railway.ticketing.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seats",
       uniqueConstraints = @UniqueConstraint(name = "uk_train_seat", columnNames = {"train_id", "seatNumber"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "train_id")
    private Train train;

    @Column(nullable = false)
    private String seatNumber;

    @Column(nullable = false)
    private String coach;

    @Column(nullable = false)
    private String seatClass;
}
