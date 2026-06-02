package com.example.demo.repository;

import com.example.demo.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, UUID> {

    List<Restaurant> findByLocationId(Integer locationId);

    List<Restaurant> findByNameContainingIgnoreCase(String name);

    List<Restaurant> findByLocationIdAndNameContainingIgnoreCase(Integer locationId, String name);
}
