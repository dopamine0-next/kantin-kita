package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant {

    @Id
    @GeneratedValue(generator = "nanoId")
    @GenericGenerator(name = "nanoId", strategy = "com.example.demo.config.NanoIdGenerator")
    @Column(length = 10)
    private String id;

    @Column(nullable = false)
    private String name;

    private String cuisine;

    private Double rating;

    @Column(name = "rating_count")
    private Integer ratingCount;

    private String reviewsCount;

    private String walkTime;

    private String distance;

    @Column(nullable = false)
    private Boolean isOpen;

    private String promoText;

    @Column(nullable = false)
    private String imageUrl;

    private String bannerImageUrl;

    private String address;

    private String operationalHours;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    private Double cheapestPrice;

    private Boolean isInstant;

    @ElementCollection
    @CollectionTable(name = "restaurant_promos", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "promo")
    @Builder.Default
    private List<String> promos = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant")
    @Builder.Default
    private List<MenuItem> menus = new ArrayList<>();
}
