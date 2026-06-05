package com.example.demo.repository;

import com.example.demo.entity.MenuItemReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuItemReviewRepository extends JpaRepository<MenuItemReview, String> {

    List<MenuItemReview> findByMenuItemIdOrderByCreatedAtDesc(String menuItemId);

    List<MenuItemReview> findByOrderId(String orderId);

    boolean existsByOrderIdAndMenuItemIdAndUserId(String orderId, String menuItemId, String userId);
}
