package com.example.demo.service;

import com.example.demo.dto.response.TermResponse;
import com.example.demo.repository.TermRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class TermService {

    private final TermRepository termRepository;

    public TermResponse getTerms() {
        return termRepository.findAll().stream()
                .findFirst()
                .map(TermResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Terms not found"));
    }
}
