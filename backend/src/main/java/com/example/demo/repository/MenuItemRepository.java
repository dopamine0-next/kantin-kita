package com.example.demo.repository;

import com.example.demo.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, String> {

    List<MenuItem> findByNameContainingIgnoreCase(String name);

    List<MenuItem> findByRestaurantId(String restaurantId);

    List<MenuItem> findByOriginalPriceIsNotNull();

    List<MenuItem> findByOriginalPriceIsNotNullAndRestaurant_Location_Id(String locationId);

    @Query("SELECT m FROM MenuItem m JOIN FETCH m.restaurant r WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(r.name) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(m.category) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<MenuItem> searchByKeyword(@Param("q") String query);
}
