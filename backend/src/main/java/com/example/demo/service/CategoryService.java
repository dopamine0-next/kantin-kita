package com.example.demo.service;

import com.example.demo.dto.response.CategoryResponse;
import com.example.demo.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getCategories() {
        return categoryRepository.findAllByOrderByPriorityAsc().stream()
                .map(CategoryResponse::from)
                .toList();
    }
}
