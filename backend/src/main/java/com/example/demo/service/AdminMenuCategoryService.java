package com.example.demo.service;

import com.example.demo.dto.request.CreateMenuCategoryRequest;
import com.example.demo.dto.request.UpdateMenuCategoryRequest;
import com.example.demo.dto.response.MenuCategoryResponse;
import com.example.demo.entity.MenuCategory;
import com.example.demo.repository.MenuCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminMenuCategoryService {

    private final MenuCategoryRepository repository;

    public List<MenuCategoryResponse> findAll() {
        return repository.findAll().stream()
                .map(MenuCategoryResponse::from)
                .toList();
    }

    public MenuCategoryResponse findById(String id) {
        return repository.findById(id)
                .map(MenuCategoryResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu category not found"));
    }

    @Transactional
    public MenuCategoryResponse create(CreateMenuCategoryRequest request) {
        MenuCategory category = MenuCategory.builder()
                .name(request.getName())
                .priority(request.getPriority())
                .build();
        return MenuCategoryResponse.from(repository.save(category));
    }

    @Transactional
    public MenuCategoryResponse update(String id, UpdateMenuCategoryRequest request) {
        MenuCategory category = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu category not found"));
        category.setName(request.getName());
        if (request.getPriority() != null) {
            category.setPriority(request.getPriority());
        }
        return MenuCategoryResponse.from(repository.save(category));
    }

    @Transactional
    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu category not found");
        }
        repository.deleteById(id);
    }
}
