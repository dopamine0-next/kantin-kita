package com.example.demo.service;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.RegisterRequest;
import com.example.demo.dto.response.LoginResponse;
import com.example.demo.dto.response.UserProfileResponse;
import com.example.demo.entity.Location;
import com.example.demo.entity.User;
import com.example.demo.entity.enums.Role;
import com.example.demo.repository.LocationRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByNim(request.getNim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "NIM already registered");
        }

        Location location = null;
        if (request.getLocationId() != null) {
            location = locationRepository.findById(request.getLocationId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location not found"));
        }

        User user = User.builder()
                .name(request.getName())
                .nim(request.getNim())
                .password(passwordEncoder.encode(request.getPassword()))
                .semester(request.getSemester())
                .location(location)
                .role(Role.USER)
                .build();

        user = userRepository.save(user);

        String token = jwtService.generateToken(user.getId().toString());
        return LoginResponse.builder()
                .token(token)
                .user(UserProfileResponse.from(user))
                .build();
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByNim(request.getNim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid NIM or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid NIM or password");
        }

        String token = jwtService.generateToken(user.getId().toString());
        return LoginResponse.builder()
                .token(token)
                .user(UserProfileResponse.from(user))
                .build();
    }

    public UserProfileResponse getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return UserProfileResponse.from(user);
    }
}
