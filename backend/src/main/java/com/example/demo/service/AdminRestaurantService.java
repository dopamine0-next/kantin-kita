package com.example.demo.service;

import com.example.demo.dto.request.AdminUpdateRestaurantRequest;
import com.example.demo.dto.request.CreateRestaurantRequest;
import com.example.demo.dto.response.AdminRestaurantResponse;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminRestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantCategoryRepository restaurantCategoryRepository;
    private final VendorRepository vendorRepository;
    private final LocationRepository locationRepository;
    private final MenuItemRepository menuItemRepository;
    private final RestaurantReviewRepository restaurantReviewRepository;

    public List<AdminRestaurantResponse> findAll(String q, String locationId, String categoryId, String vendorId, Boolean isOpen) {
        return restaurantRepository.findAll().stream()
                .filter(r -> q == null || q.isBlank() || r.getName().toLowerCase().contains(q.toLowerCase()))
                .filter(r -> locationId == null || (r.getLocation() != null && r.getLocation().getId().equals(locationId)))
                .filter(r -> categoryId == null || (r.getRestaurantCategory() != null && r.getRestaurantCategory().getId().equals(categoryId)))
                .filter(r -> vendorId == null || (r.getVendor() != null && r.getVendor().getId().equals(vendorId)))
                .filter(r -> isOpen == null || r.getIsOpen().equals(isOpen))
                .map(this::toResponse)
                .toList();
    }

    public AdminRestaurantResponse findById(String id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));
        return toResponse(restaurant);
    }

    @Transactional
    public AdminRestaurantResponse create(CreateRestaurantRequest request) {
        RestaurantCategory category = restaurantCategoryRepository.findById(request.getRestaurantCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Restaurant category not found"));
        Vendor vendor = vendorRepository.findById(request.getVendorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vendor not found"));
        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location not found"));

        Restaurant restaurant = Restaurant.builder()
                .name(request.getName())
                .restaurantCategory(category)
                .vendor(vendor)
                .location(location)
                .isOpen(request.getIsOpen())
                .imageUrl(request.getImageUrl())
                .bannerImageUrl(request.getBannerImageUrl())
                .address(request.getAddress())
                .operationalHours(request.getOperationalHours())
                .cheapestPrice(request.getCheapestPrice())
                .build();

        return toResponse(restaurantRepository.save(restaurant));
    }

    @Transactional
    public AdminRestaurantResponse update(String id, AdminUpdateRestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));

        if (request.getName() != null) restaurant.setName(request.getName());
        if (request.getRestaurantCategoryId() != null) {
            RestaurantCategory cat = restaurantCategoryRepository.findById(request.getRestaurantCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Restaurant category not found"));
            restaurant.setRestaurantCategory(cat);
        }
        if (request.getVendorId() != null) {
            Vendor vendor = vendorRepository.findById(request.getVendorId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vendor not found"));
            restaurant.setVendor(vendor);
        }
        if (request.getLocationId() != null) {
            Location location = locationRepository.findById(request.getLocationId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location not found"));
            restaurant.setLocation(location);
        }
        if (request.getIsOpen() != null) restaurant.setIsOpen(request.getIsOpen());
        if (request.getImageUrl() != null) restaurant.setImageUrl(request.getImageUrl());
        if (request.getBannerImageUrl() != null) restaurant.setBannerImageUrl(request.getBannerImageUrl());
        if (request.getAddress() != null) restaurant.setAddress(request.getAddress());
        if (request.getOperationalHours() != null) restaurant.setOperationalHours(request.getOperationalHours());
        if (request.getCheapestPrice() != null) restaurant.setCheapestPrice(request.getCheapestPrice());

        return toResponse(restaurantRepository.save(restaurant));
    }

    @Transactional
    public void delete(String id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));

        if (!menuItemRepository.findByRestaurantId(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot delete restaurant with existing menu items");
        }

        restaurantRepository.delete(restaurant);
    }

    private AdminRestaurantResponse toResponse(Restaurant restaurant) {
        Double rating = restaurantReviewRepository.averageRatingByRestaurantId(restaurant.getId());
        Integer count = restaurantReviewRepository.countByRestaurantId(restaurant.getId());
        return AdminRestaurantResponse.from(restaurant, rating, count);
    }
}
