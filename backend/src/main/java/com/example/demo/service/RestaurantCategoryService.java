package com.example.demo.service;

import com.example.demo.dto.response.RestaurantCategoryResponse;
import com.example.demo.repository.RestaurantCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RestaurantCategoryService {

    private final RestaurantCategoryRepository restaurantCategoryRepository;

    public List<RestaurantCategoryResponse> getCategories() {
        return restaurantCategoryRepository.findAll()
                .stream()
                .map(RestaurantCategoryResponse::from)
                .toList();
    }
}
