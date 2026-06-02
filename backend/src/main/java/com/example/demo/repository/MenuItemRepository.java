package com.example.demo.repository;

import com.example.demo.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, String> {

    List<MenuItem> findByNameContainingIgnoreCase(String name);

    List<MenuItem> findByRestaurantId(String restaurantId);
}
