package com.example.demo.repository;

import com.example.demo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {

    @Query("SELECT oi.menuItem.id, oi.menuItem.name, oi.menuItem.imageUrl, " +
           "SUM(oi.quantity), SUM(oi.quantity * oi.price) " +
           "FROM OrderItem oi JOIN oi.order o " +
           "WHERE o.restaurant.id = :restaurantId " +
           "AND o.createdAt BETWEEN :dateFrom AND :dateTo " +
           "AND o.paymentStatus IN ('PAID', 'COMPLETED') " +
           "GROUP BY oi.menuItem.id, oi.menuItem.name, oi.menuItem.imageUrl " +
           "ORDER BY SUM(oi.quantity) DESC")
    List<Object[]> findTopItemsByRestaurantIdAndDateRange(
            @Param("restaurantId") String restaurantId,
            @Param("dateFrom") LocalDateTime dateFrom,
            @Param("dateTo") LocalDateTime dateTo);
}
