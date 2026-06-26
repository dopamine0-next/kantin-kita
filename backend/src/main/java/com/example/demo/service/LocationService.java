package com.example.demo.service;

import com.example.demo.dto.response.LocationResponse;
import com.example.demo.entity.Location;
import com.example.demo.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public LocationResponse findNearestLocation(double latitude, double longitude) {
        List<Location> locations = locationRepository.findAll();

        if (locations.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No locations available");
        }

        Location nearest = null;
        double minDistance = Double.MAX_VALUE;

        for (Location loc : locations) {
            if (loc.getLatitude() == null || loc.getLongitude() == null) continue;

            double distance = haversine(latitude, longitude, loc.getLatitude(), loc.getLongitude());
            if (distance < minDistance) {
                minDistance = distance;
                nearest = loc;
            }
        }

        if (nearest == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No locations with coordinates found");
        }

        return LocationResponse.from(nearest);
    }

    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final double R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
