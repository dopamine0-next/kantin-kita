package com.example.demo.service;

import com.example.demo.dto.response.MarqueeNodeResponse;
import com.example.demo.repository.MarqueeNodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarqueeNodeService {

    private final MarqueeNodeRepository marqueeNodeRepository;

    public List<MarqueeNodeResponse> getMarqueeNodes() {
        return marqueeNodeRepository.findByIsActiveTrue().stream()
                .map(MarqueeNodeResponse::from)
                .toList();
    }
}
