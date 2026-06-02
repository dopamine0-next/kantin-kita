package com.example.demo.service;

import com.example.demo.dto.response.FAQResponse;
import com.example.demo.repository.FAQRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FAQService {

    private final FAQRepository faqRepository;

    public List<FAQResponse> getFAQs() {
        return faqRepository.findAll().stream()
                .map(FAQResponse::from)
                .toList();
    }
}
