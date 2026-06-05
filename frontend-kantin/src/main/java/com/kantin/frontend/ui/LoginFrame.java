package com.kantin.frontend.ui;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kantin.frontend.client.ApiClient;
import com.kantin.frontend.config.ApiConfig;
import com.kantin.frontend.model.VendorLoginResponse;

import javax.swing.*;
import java.awt.*;

public class LoginFrame extends JFrame {

    private final JTextField emailField = new JTextField(20);
    private final JPasswordField passwordField = new JPasswordField(20);
    private final JButton loginButton = new JButton("Login");
    private final ObjectMapper mapper = ApiClient.getMapper();

    public LoginFrame() {
        setTitle("Kantin Kita - Vendor Login");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 250);
        setLocationRelativeTo(null);

        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 5, 5, 5);

        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        JLabel titleLabel = new JLabel("Login Vendor", SwingConstants.CENTER);
        titleLabel.setFont(titleLabel.getFont().deriveFont(Font.BOLD, 18));
        panel.add(titleLabel, gbc);

        gbc.gridwidth = 1;
        gbc.gridx = 0; gbc.gridy = 1;
        panel.add(new JLabel("Email:"), gbc);
        gbc.gridx = 1;
        panel.add(emailField, gbc);

        gbc.gridx = 0; gbc.gridy = 2;
        panel.add(new JLabel("Password:"), gbc);
        gbc.gridx = 1;
        panel.add(passwordField, gbc);

        gbc.gridx = 0; gbc.gridy = 3; gbc.gridwidth = 2;
        panel.add(loginButton, gbc);

        loginButton.addActionListener(e -> login());

        getRootPane().setDefaultButton(loginButton);
        add(panel);
        setVisible(true);
    }

    private void login() {
        String email = emailField.getText().trim();
        String password = new String(passwordField.getPassword());

        if (email.isEmpty() || password.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Email dan password harus diisi");
            return;
        }

        loginButton.setEnabled(false);
        loginButton.setText("Logging in...");

        SwingWorker<Void, Void> worker = new SwingWorker<>() {
            private String error;

            @Override
            protected Void doInBackground() {
                try {
                    String json = ApiClient.post("/vendor/auth/login",
                            new LoginBody(email, password));
                    VendorLoginResponse response = mapper.readValue(json, VendorLoginResponse.class);
                    ApiConfig.setToken(response.token);
                } catch (Exception e) {
                    error = e.getMessage();
                }
                return null;
            }

            @Override
            protected void done() {
                loginButton.setEnabled(true);
                loginButton.setText("Login");
                if (error != null) {
                    JOptionPane.showMessageDialog(LoginFrame.this,
                            "Login gagal: " + extractMessage(error));
                } else {
                    dispose();
                    new MainFrame();
                }
            }
        };
        worker.execute();
    }

    private String extractMessage(String error) {
        if (error.contains("401") || error.contains("403")) return "Email atau password salah";
        if (error.contains("Connection refused")) return "Backend tidak tersambung";
        return error;
    }

    private record LoginBody(String email, String password) {}
}
