package com.example.demo.service;

import com.example.demo.dto.request.UpdateHoursRequest;
import com.example.demo.dto.request.UpdateRestaurantRequest;
import com.example.demo.dto.response.VendorRestaurantResponse;
import com.example.demo.entity.Restaurant;
import com.example.demo.entity.RestaurantCategory;
import com.example.demo.repository.RestaurantCategoryRepository;
import com.example.demo.repository.RestaurantRepository;
import com.example.demo.repository.RestaurantReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VendorRestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantReviewRepository restaurantReviewRepository;
    private final RestaurantCategoryRepository restaurantCategoryRepository;

    private VendorRestaurantResponse toResponse(Restaurant restaurant) {
        Double rating = restaurantReviewRepository.averageRatingByRestaurantId(restaurant.getId());
        Integer count = restaurantReviewRepository.countByRestaurantId(restaurant.getId());
        return VendorRestaurantResponse.from(restaurant, rating, count);
    }

    public VendorRestaurantResponse getRestaurant(String vendorId, String restaurantId) {
        Restaurant restaurant = findOwnedRestaurant(vendorId, restaurantId);
        return toResponse(restaurant);
    }

    @Transactional
    public VendorRestaurantResponse updateRestaurant(String vendorId, String restaurantId, UpdateRestaurantRequest request) {
        Restaurant restaurant = findOwnedRestaurant(vendorId, restaurantId);

        if (request.getName() != null) restaurant.setName(request.getName());
        if (request.getRestaurantCategoryId() != null) {
            RestaurantCategory cat = restaurantCategoryRepository.findById(request.getRestaurantCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Restaurant category not found"));
            restaurant.setRestaurantCategory(cat);
        }
        if (request.getImageUrl() != null) restaurant.setImageUrl(request.getImageUrl());
        if (request.getBannerImageUrl() != null) restaurant.setBannerImageUrl(request.getBannerImageUrl());
        if (request.getAddress() != null) restaurant.setAddress(request.getAddress());

        restaurant = restaurantRepository.save(restaurant);
        return toResponse(restaurant);
    }

    @Transactional
    public VendorRestaurantResponse toggleStatus(String vendorId, String restaurantId) {
        Restaurant restaurant = findOwnedRestaurant(vendorId, restaurantId);
        restaurant.setIsOpen(!restaurant.getIsOpen());
        restaurant = restaurantRepository.save(restaurant);
        return toResponse(restaurant);
    }

    @Transactional
    public VendorRestaurantResponse updateHours(String vendorId, String restaurantId, UpdateHoursRequest request) {
        Restaurant restaurant = findOwnedRestaurant(vendorId, restaurantId);
        restaurant.setOperationalHours(request.getOperationalHours());
        restaurant = restaurantRepository.save(restaurant);
        return toResponse(restaurant);
    }

    public Restaurant findOwnedRestaurant(String vendorId, String restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));

        if (restaurant.getVendor() == null || !restaurant.getVendor().getId().equals(vendorId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not own this restaurant");
        }

        return restaurant;
    }
}
