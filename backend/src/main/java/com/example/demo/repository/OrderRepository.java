package com.example.demo.repository;

import com.example.demo.entity.Order;
import com.example.demo.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Order> findByUserIdAndStatusOrderByCreatedAtDesc(String userId, OrderStatus status);

    List<Order> findByRestaurantIdOrderByCreatedAtDesc(String restaurantId);
}
