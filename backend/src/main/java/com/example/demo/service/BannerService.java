package com.example.demo.service;

import com.example.demo.dto.response.BannerResponse;
import com.example.demo.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    public List<BannerResponse> getBanners(String locationId) {
        var banners = (locationId != null)
                ? bannerRepository.findByIsActiveTrueAndLocationId(locationId)
                : bannerRepository.findByIsActiveTrue();

        return banners.stream()
                .map(BannerResponse::from)
                .toList();
    }
}
