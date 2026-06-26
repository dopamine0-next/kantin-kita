package com.example.demo.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.io.FileSystemResource;

import java.io.IOException;
import java.util.Properties;

public class DotenvEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        var resource = new FileSystemResource(".env");

        if (!resource.exists()) {
            return;
        }

        Properties props = new Properties();

        try (var reader = new java.io.BufferedReader(new java.io.InputStreamReader(resource.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.strip();

                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }

                int eq = line.indexOf('=');
                if (eq == -1) {
                    continue;
                }

                String key = line.substring(0, eq).strip();
                String value = line.substring(eq + 1).strip();

                if (key.isEmpty()) {
                    continue;
                }

                props.setProperty(key, value);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to load .env file", e);
        }

        environment.getPropertySources().addFirst(new PropertiesPropertySource("dotenv", props));
    }
}
