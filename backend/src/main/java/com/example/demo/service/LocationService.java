package com.example.demo.service;

import com.example.demo.dto.response.LocationResponse;
import com.example.demo.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    public List<LocationResponse> getLocations() {
        return locationRepository.findAll().stream()
                .map(LocationResponse::from)
                .toList();
    }
}
