package com.example.demo.service;

import com.example.demo.dto.request.CreateBannerRequest;
import com.example.demo.dto.request.UpdateBannerRequest;
import com.example.demo.dto.response.AdminBannerResponse;
import com.example.demo.entity.Banner;
import com.example.demo.entity.Location;
import com.example.demo.repository.BannerRepository;
import com.example.demo.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminBannerService {

    private final BannerRepository bannerRepository;
    private final LocationRepository locationRepository;

    public List<AdminBannerResponse> findAll() {
        return bannerRepository.findAll().stream()
                .map(AdminBannerResponse::from)
                .toList();
    }

    public AdminBannerResponse findById(String id) {
        return bannerRepository.findById(id)
                .map(AdminBannerResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Banner not found"));
    }

    @Transactional
    public AdminBannerResponse create(CreateBannerRequest request) {
        Location location = null;
        if (request.getLocationId() != null) {
            location = locationRepository.findById(request.getLocationId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location not found"));
        }

        Banner banner = Banner.builder()
                .imageUrl(request.getImageUrl())
                .title(request.getTitle())
                .linkUrl(request.getLinkUrl())
                .isActive(true)
                .location(location)
                .build();

        return AdminBannerResponse.from(bannerRepository.save(banner));
    }

    @Transactional
    public AdminBannerResponse update(String id, UpdateBannerRequest request) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Banner not found"));

        if (request.getImageUrl() != null) banner.setImageUrl(request.getImageUrl());
        if (request.getTitle() != null) banner.setTitle(request.getTitle());
        if (request.getLinkUrl() != null) banner.setLinkUrl(request.getLinkUrl());
        if (request.getLocationId() != null) {
            Location location = locationRepository.findById(request.getLocationId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location not found"));
            banner.setLocation(location);
        }

        return AdminBannerResponse.from(bannerRepository.save(banner));
    }

    @Transactional
    public void delete(String id) {
        if (!bannerRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Banner not found");
        }
        bannerRepository.deleteById(id);
    }

    @Transactional
    public AdminBannerResponse toggleActive(String id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Banner not found"));
        banner.setIsActive(!banner.getIsActive());
        return AdminBannerResponse.from(bannerRepository.save(banner));
    }
}
