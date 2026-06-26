package com.example.demo.service;

import com.example.demo.dto.request.CreateRestaurantReviewRequest;
import com.example.demo.dto.response.RestaurantReviewResponse;
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
public class RestaurantReviewService {

    private final RestaurantReviewRepository restaurantReviewRepository;
    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    public RestaurantReviewResponse createReview(String userId, CreateRestaurantReviewRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your order");
        }

        if (order.getStatus() != OrderStatus.COMPLETED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can only review completed orders");
        }

        if (restaurantReviewRepository.existsByOrderIdAndUserId(order.getId(), userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already reviewed this restaurant for this order");
        }

        User user = userRepository.getReferenceById(userId);
        Restaurant restaurant = order.getRestaurant();

        RestaurantReview review = RestaurantReview.builder()
                .user(user)
                .order(order)
                .restaurant(restaurant)
                .rating(request.getRating())
                .build();

        review = restaurantReviewRepository.save(review);

        return RestaurantReviewResponse.from(review);
    }

    @Transactional(readOnly = true)
    public List<RestaurantReviewResponse> getRestaurantReviews(String restaurantId) {
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found");
        }

        return restaurantReviewRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId)
                .stream()
                .map(RestaurantReviewResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<RestaurantReviewResponse> getOrderReviews(String orderId) {
        return restaurantReviewRepository.findByOrderId(orderId)
                .stream()
                .map(RestaurantReviewResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public boolean hasReviewed(String orderId, String userId) {
        return restaurantReviewRepository.existsByOrderIdAndUserId(orderId, userId);
    }
}
