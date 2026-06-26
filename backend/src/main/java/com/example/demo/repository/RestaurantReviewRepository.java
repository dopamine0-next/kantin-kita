package com.example.demo.repository;

import com.example.demo.entity.RestaurantReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantReviewRepository extends JpaRepository<RestaurantReview, String> {

    List<RestaurantReview> findByRestaurantIdOrderByCreatedAtDesc(String restaurantId);

    List<RestaurantReview> findByOrderId(String orderId);

    Optional<RestaurantReview> findByOrderIdAndUserId(String orderId, String userId);

    boolean existsByOrderIdAndUserId(String orderId, String userId);

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM RestaurantReview r WHERE r.restaurant.id = :restaurantId")
    Double averageRatingByRestaurantId(@Param("restaurantId") String restaurantId);

    @Query("SELECT COUNT(r) FROM RestaurantReview r WHERE r.restaurant.id = :restaurantId")
    Integer countByRestaurantId(@Param("restaurantId") String restaurantId);

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM RestaurantReview r")
    Double averageRatingAll();
}
