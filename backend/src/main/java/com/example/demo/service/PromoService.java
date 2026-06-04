package com.example.demo.service;

import com.example.demo.dto.response.PromoResponse;
import com.example.demo.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PromoService {

    private final MenuItemRepository menuItemRepository;

    public List<PromoResponse> getPromos() {
        return menuItemRepository.findByOriginalPriceIsNotNull().stream()
                .map(PromoResponse::from)
                .toList();
    }
}