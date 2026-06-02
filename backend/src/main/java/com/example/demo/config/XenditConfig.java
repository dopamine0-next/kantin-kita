package com.example.demo.config;

import com.xendit.Xendit;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class XenditConfig {

    @Value("${xendit.api-key}")
    private String apiKey;

    @PostConstruct
    public void init() {
        if (apiKey != null && !apiKey.isBlank()) {
            Xendit.Opt.setApiKey(apiKey);
        }
    }
}
