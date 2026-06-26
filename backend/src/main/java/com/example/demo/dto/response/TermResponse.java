package com.example.demo.dto.response;

import com.example.demo.entity.Term;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TermResponse {

    private String id;
    private String content;

    public static TermResponse from(Term term) {
        return TermResponse.builder()
                .id(term.getId())
                .content(term.getContent())
                .build();
    }
}
