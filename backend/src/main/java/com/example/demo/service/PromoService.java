package com.example.demo.service;

import com.example.demo.dto.response.PromoResponse;
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
public class PromoService {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemReviewRepository menuItemReviewRepository;

    public List<PromoResponse> getPromos() {
        List<MenuItem> items = menuItemRepository.findByOriginalPriceIsNotNull();
        return mapWithRatings(items);
    }

    public List<PromoResponse> getPromos(String locationId) {
        if (locationId == null) {
            return getPromos();
        }
        List<MenuItem> items = menuItemRepository.findByOriginalPriceIsNotNullAndRestaurant_Location_Id(locationId);
        return mapWithRatings(items);
    }

    private List<PromoResponse> mapWithRatings(List<MenuItem> items) {
        if (items.isEmpty()) return List.of();
        List<Object[]> grouped = menuItemReviewRepository.findAverageRatingByMenuItemGrouped();
        Map<String, Object[]> ratingMap = grouped.stream()
                .collect(Collectors.toMap(row -> (String) row[0], row -> row));
        return items.stream()
                .map(item -> {
                    Object[] rating = ratingMap.get(item.getId());
                    Double avg = rating != null ? (Double) rating[1] : null;
                    Integer count = rating != null ? ((Long) rating[2]).intValue() : 0;
                    return PromoResponse.from(item, avg, count);
                })
                .toList();
    }
}