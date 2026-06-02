package com.example.demo.service;

import com.example.demo.dto.response.MenuItemResponse;
import com.example.demo.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    public List<MenuItemResponse> searchMenu(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }

        return menuItemRepository.findByNameContainingIgnoreCase(query.trim()).stream()
                .map(MenuItemResponse::from)
                .toList();
    }
}
