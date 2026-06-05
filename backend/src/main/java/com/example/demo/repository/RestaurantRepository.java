package com.example.demo.repository;

import com.example.demo.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, String> {

    List<Restaurant> findByLocationId(String locationId);

    List<Restaurant> findByNameContainingIgnoreCase(String name);

    List<Restaurant> findByLocationIdAndNameContainingIgnoreCase(String locationId, String name);

    List<Restaurant> findByVendorId(String vendorId);
}
