package com.java.frontend.kantin;

import com.formdev.flatlaf.FlatLightLaf;
import com.java.frontend.kantin.api.ApiClient;
import com.java.frontend.kantin.auth.LoginFrame;
import com.java.frontend.kantin.util.TokenManager;

import javax.swing.*;

public class FrontendKantin {

    public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(new FlatLightLaf());
            UIManager.put("Button.arc", 10);
            UIManager.put("TextComponent.arc", 8);
        } catch (Exception e) {
            e.printStackTrace();
        }

        TokenManager tokenManager = new TokenManager();
        ApiClient apiClient = new ApiClient(Config.BASE_URL, tokenManager);

        if (tokenManager.hasToken()) {
            // TODO: verify token still valid, then go to MainFrame
        }

        SwingUtilities.invokeLater(() -> {
            LoginFrame loginFrame = new LoginFrame(apiClient, tokenManager);
            loginFrame.setVisible(true);
        });
    }
}
