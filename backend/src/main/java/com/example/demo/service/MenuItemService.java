package com.example.demo.service;

import com.example.demo.dto.response.MenuItemResponse;
import com.example.demo.entity.MenuItem;
import com.example.demo.repository.MenuItemRepository;
import com.example.demo.repository.MenuItemReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemReviewRepository menuItemReviewRepository;

    public List<MenuItemResponse> searchMenu(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }

        List<MenuItem> items = menuItemRepository.searchByKeyword(query.trim());
        if (items.isEmpty()) return List.of();

        List<Object[]> grouped = menuItemReviewRepository.findAverageRatingByMenuItemGrouped();
        Map<String, Object[]> ratingMap = grouped.stream()
                .collect(Collectors.toMap(row -> (String) row[0], row -> row));

        return items.stream()
                .map(item -> {
                    Object[] rating = ratingMap.get(item.getId());
                    Double avg = rating != null ? (Double) rating[1] : null;
                    Integer count = rating != null ? ((Long) rating[2]).intValue() : null;
                    return MenuItemResponse.from(item, avg, count);
                })
                .toList();
    }
}
