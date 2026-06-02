package com.example.demo.controller;

import com.example.demo.dto.response.MarqueeNodeResponse;
import com.example.demo.service.MarqueeNodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/marquee")
@RequiredArgsConstructor
public class MarqueeNodeController {

    private final MarqueeNodeService marqueeNodeService;

    @GetMapping
    public ResponseEntity<List<MarqueeNodeResponse>> getMarquee() {
        return ResponseEntity.ok(marqueeNodeService.getMarqueeNodes());
    }
}
