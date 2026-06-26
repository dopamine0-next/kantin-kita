package com.example.demo.service;

import com.example.demo.dto.request.CreateLocationRequest;
import com.example.demo.dto.request.UpdateLocationRequest;
import com.example.demo.dto.response.LocationResponse;
import com.example.demo.entity.Location;
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
public class AdminLocationService {

    private final LocationRepository repository;

    public List<LocationResponse> findAll() {
        return repository.findAll().stream()
                .map(LocationResponse::from)
                .toList();
    }

    public LocationResponse findById(String id) {
        return repository.findById(id)
                .map(LocationResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found"));
    }

    @Transactional
    public LocationResponse create(CreateLocationRequest request) {
        Location location = Location.builder()
                .name(request.getName())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build();
        return LocationResponse.from(repository.save(location));
    }

    @Transactional
    public LocationResponse update(String id, UpdateLocationRequest request) {
        Location location = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found"));
        if (request.getName() != null) location.setName(request.getName());
        if (request.getAddress() != null) location.setAddress(request.getAddress());
        if (request.getLatitude() != null) location.setLatitude(request.getLatitude());
        if (request.getLongitude() != null) location.setLongitude(request.getLongitude());
        return LocationResponse.from(repository.save(location));
    }

    @Transactional
    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found");
        }
        repository.deleteById(id);
    }
}
