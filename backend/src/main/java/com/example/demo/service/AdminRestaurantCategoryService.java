package com.example.demo.service;

import com.example.demo.dto.request.CreateCategoryRequest;
import com.example.demo.dto.request.UpdateCategoryRequest;
import com.example.demo.dto.response.RestaurantCategoryResponse;
import com.example.demo.entity.RestaurantCategory;
import com.example.demo.repository.RestaurantCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminRestaurantCategoryService {

    private final RestaurantCategoryRepository repository;

    public List<RestaurantCategoryResponse> findAll() {
        return repository.findAll().stream()
                .map(RestaurantCategoryResponse::from)
                .toList();
    }

    public RestaurantCategoryResponse findById(String id) {
        return repository.findById(id)
                .map(RestaurantCategoryResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant category not found"));
    }

    @Transactional
    public RestaurantCategoryResponse create(CreateCategoryRequest request) {
        RestaurantCategory category = RestaurantCategory.builder()
                .name(request.getName())
                .build();
        return RestaurantCategoryResponse.from(repository.save(category));
    }

    @Transactional
    public RestaurantCategoryResponse update(String id, UpdateCategoryRequest request) {
        RestaurantCategory category = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant category not found"));
        category.setName(request.getName());
        return RestaurantCategoryResponse.from(repository.save(category));
    }

    @Transactional
    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant category not found");
        }
        repository.deleteById(id);
    }
}
