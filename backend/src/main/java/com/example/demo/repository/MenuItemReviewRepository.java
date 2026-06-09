package com.example.demo.repository;

import com.example.demo.entity.MenuItemReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemReviewRepository extends JpaRepository<MenuItemReview, String> {

    List<MenuItemReview> findByMenuItemIdOrderByCreatedAtDesc(String menuItemId);

    List<MenuItemReview> findByOrderId(String orderId);

    boolean existsByOrderIdAndMenuItemIdAndUserId(String orderId, String menuItemId, String userId);

    @Query("SELECT AVG(r.rating) FROM MenuItemReview r WHERE r.menuItem.id = :menuItemId")
    Double averageRatingByMenuItemId(@Param("menuItemId") String menuItemId);

    @Query("SELECT COUNT(r) FROM MenuItemReview r WHERE r.menuItem.id = :menuItemId")
    Integer countByMenuItemId(@Param("menuItemId") String menuItemId);

    @Query("SELECT r.menuItem.id, AVG(r.rating), COUNT(r) FROM MenuItemReview r GROUP BY r.menuItem.id")
    List<Object[]> findAverageRatingByMenuItemGrouped();
}
