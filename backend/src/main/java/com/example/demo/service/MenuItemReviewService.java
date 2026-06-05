package com.example.demo.service;

import com.example.demo.dto.request.CreateMenuItemReviewRequest;
import com.example.demo.dto.response.MenuItemReviewResponse;
import com.example.demo.entity.*;
import com.example.demo.entity.enums.OrderStatus;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MenuItemReviewService {

    private final MenuItemReviewRepository menuItemReviewRepository;
    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    public MenuItemReviewResponse createReview(String userId, CreateMenuItemReviewRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your order");
        }

        if (order.getStatus() != OrderStatus.COMPLETED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can only review completed orders");
        }

        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu item not found"));

        boolean itemInOrder = order.getItems().stream()
                .anyMatch(oi -> oi.getMenuItem() != null && oi.getMenuItem().getId().equals(menuItem.getId()));

        if (!itemInOrder) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Menu item not in this order");
        }

        if (menuItemReviewRepository.existsByOrderIdAndMenuItemIdAndUserId(
                order.getId(), menuItem.getId(), userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already reviewed this item for this order");
        }

        User user = userRepository.getReferenceById(userId);

        MenuItemReview review = MenuItemReview.builder()
                .user(user)
                .order(order)
                .menuItem(menuItem)
                .rating(request.getRating())
                .build();

        review = menuItemReviewRepository.save(review);

        updateMenuItemRating(menuItem);

        return MenuItemReviewResponse.from(review);
    }

    @Transactional(readOnly = true)
    public List<MenuItemReviewResponse> getMenuItemReviews(String menuItemId) {
        if (!menuItemRepository.existsById(menuItemId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu item not found");
        }

        return menuItemReviewRepository.findByMenuItemIdOrderByCreatedAtDesc(menuItemId)
                .stream()
                .map(MenuItemReviewResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MenuItemReviewResponse> getOrderReviews(String orderId) {
        return menuItemReviewRepository.findByOrderId(orderId)
                .stream()
                .map(MenuItemReviewResponse::from)
                .toList();
    }

    private void updateMenuItemRating(MenuItem menuItem) {
        List<MenuItemReview> reviews = menuItemReviewRepository.findByMenuItemIdOrderByCreatedAtDesc(
                menuItem.getId());

        if (reviews.isEmpty()) return;

        double avg = reviews.stream()
                .mapToInt(MenuItemReview::getRating)
                .average()
                .orElse(0);

        menuItem.setRating(Math.round(avg * 10.0) / 10.0);
        menuItem.setRatingCount(reviews.size());
        menuItemRepository.save(menuItem);
    }
}
