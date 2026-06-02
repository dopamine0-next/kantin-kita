package com.example.demo.dto.response;

import com.example.demo.entity.FAQ;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FAQResponse {

    private Long id;
    private String question;
    private String answer;

    public static FAQResponse from(FAQ faq) {
        return FAQResponse.builder()
                .id(faq.getId())
                .question(faq.getQuestion())
                .answer(faq.getAnswer())
                .build();
    }
}
