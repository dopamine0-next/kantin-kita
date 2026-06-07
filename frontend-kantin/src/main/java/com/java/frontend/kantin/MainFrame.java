package com.java.frontend.kantin;

import com.java.frontend.kantin.auth.SessionContext;
import com.java.frontend.kantin.util.TokenManager;

import javax.swing.*;
import java.awt.*;

public class MainFrame extends JFrame {

    public MainFrame(TokenManager tokenManager) {
        initComponents();
    }

    private void initComponents() {
        setTitle("Kantin Kita — Vendor: " + SessionContext.getCurrentVendor().getName());
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1000, 700);
        setLocationRelativeTo(null);
        setMinimumSize(new Dimension(800, 600));

        var mainPanel = new JPanel(new BorderLayout());
        var welcomeLabel = new JLabel("Selamat datang, " + SessionContext.getCurrentVendor().getName(), SwingConstants.CENTER);
        welcomeLabel.setFont(welcomeLabel.getFont().deriveFont(Font.BOLD, 24f));
        mainPanel.add(welcomeLabel, BorderLayout.CENTER);

        add(mainPanel);
    }
}
