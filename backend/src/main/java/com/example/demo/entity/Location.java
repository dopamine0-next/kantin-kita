package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {

    @Id
    @GeneratedValue(generator = "nanoId")
    @GenericGenerator(name = "nanoId", strategy = "com.example.demo.config.NanoIdGenerator")
    @Column(length = 10)
    private String id;

    @Column(nullable = false)
    private String name;

    private String address;

    private Double latitude;

    private Double longitude;
}
