package com.example.demo.repository;

import com.example.demo.entity.Order;
import com.example.demo.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Order> findByUserIdAndStatusOrderByCreatedAtDesc(String userId, OrderStatus status);

    List<Order> findByRestaurantIdOrderByCreatedAtDesc(String restaurantId);

    List<Order> findByRestaurantIdAndStatusOrderByCreatedAtDesc(String restaurantId, OrderStatus status);

    @Query("SELECT o FROM Order o WHERE o.restaurant.id = :restaurantId " +
           "AND o.createdAt BETWEEN :dateFrom AND :dateTo ORDER BY o.createdAt DESC")
    List<Order> findByRestaurantIdAndDateRange(
            @Param("restaurantId") String restaurantId,
            @Param("dateFrom") LocalDateTime dateFrom,
            @Param("dateTo") LocalDateTime dateTo);

    @Query("SELECT o FROM Order o WHERE o.restaurant.id = :restaurantId " +
           "AND o.status = :status AND o.createdAt BETWEEN :dateFrom AND :dateTo ORDER BY o.createdAt DESC")
    List<Order> findByRestaurantIdAndStatusAndDateRange(
            @Param("restaurantId") String restaurantId,
            @Param("status") OrderStatus status,
            @Param("dateFrom") LocalDateTime dateFrom,
            @Param("dateTo") LocalDateTime dateTo);
}
