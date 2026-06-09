package com.example.demo.service;

import com.example.demo.dto.response.MenuItemResponse;
import com.example.demo.dto.response.RestaurantDetailResponse;
import com.example.demo.dto.response.RestaurantResponse;
import com.example.demo.entity.Restaurant;
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
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantReviewRepository restaurantReviewRepository;

    public List<RestaurantResponse> getRestaurants(String locationId, String search) {
        List<Restaurant> restaurants;

        if (locationId != null && search != null) {
            restaurants = restaurantRepository.findByLocationIdAndNameContainingIgnoreCase(locationId, search);
        } else if (locationId != null) {
            restaurants = restaurantRepository.findByLocationId(locationId);
        } else if (search != null) {
            restaurants = restaurantRepository.findByNameContainingIgnoreCase(search);
        } else {
            restaurants = restaurantRepository.findAll();
        }

        return restaurants.stream()
                .map(r -> {
                    Double rating = restaurantReviewRepository.averageRatingByRestaurantId(r.getId());
                    Integer count = restaurantReviewRepository.countByRestaurantId(r.getId());
                    return RestaurantResponse.from(r, rating, count);
                })
                .toList();
    }

    public RestaurantDetailResponse getRestaurantDetail(String id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));

        List<MenuItemResponse> menuResponses = restaurant.getMenus().stream()
                .map(MenuItemResponse::from)
                .toList();

        Double rating = restaurantReviewRepository.averageRatingByRestaurantId(id);
        Integer count = restaurantReviewRepository.countByRestaurantId(id);

        return RestaurantDetailResponse.from(restaurant, menuResponses, rating, count);
    }
}
