package com.example.demo.service;

import com.example.demo.dto.response.MenuCategoryResponse;
import com.example.demo.repository.MenuCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuCategoryService {

    private final MenuCategoryRepository menuCategoryRepository;

    public List<MenuCategoryResponse> getCategories() {
        return menuCategoryRepository.findAllByOrderByPriorityAsc().stream()
                .map(MenuCategoryResponse::from)
                .toList();
    }
}
