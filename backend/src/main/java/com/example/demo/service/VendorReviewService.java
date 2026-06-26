package com.example.demo.service;

import com.example.demo.dto.response.RestaurantReviewResponse;
import com.example.demo.entity.RestaurantReview;
import com.example.demo.repository.RestaurantReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VendorReviewService {

    private final VendorRestaurantService vendorRestaurantService;
    private final RestaurantReviewRepository restaurantReviewRepository;

    public List<RestaurantReviewResponse> getReviews(String vendorId, String restaurantId) {
        vendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId);

        return restaurantReviewRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId).stream()
                .map(RestaurantReviewResponse::from)
                .toList();
    }
}
