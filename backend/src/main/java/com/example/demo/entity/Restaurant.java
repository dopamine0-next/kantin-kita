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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_category_id")
    private RestaurantCategory restaurantCategory;

    @Column(nullable = false)
    private Boolean isOpen;

    @Column(nullable = false)
    private String imageUrl;

    private String bannerImageUrl;

    private String address;

    private String operationalHours;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    private Double cheapestPrice;

    @OneToMany(mappedBy = "restaurant")
    @Builder.Default
    private List<MenuItem> menus = new ArrayList<>();
}
