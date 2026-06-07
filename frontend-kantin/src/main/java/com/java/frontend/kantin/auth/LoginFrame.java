package com.java.frontend.kantin.auth;

import com.java.frontend.kantin.MainFrame;
import com.java.frontend.kantin.api.ApiClient;
import com.java.frontend.kantin.api.ApiResponse;
import com.java.frontend.kantin.model.LoginResponse;
import com.java.frontend.kantin.util.TokenManager;

import javax.swing.*;
import java.awt.*;

public class LoginFrame extends JFrame {

    private final ApiClient apiClient;
    private final TokenManager tokenManager;
    private final AuthApi authApi;

    private JTextField emailField;
    private JPasswordField passwordField;
    private JButton loginButton;
    private JLabel statusLabel;

    public LoginFrame(ApiClient apiClient, TokenManager tokenManager) {
        this.apiClient = apiClient;
        this.tokenManager = tokenManager;
        this.authApi = new AuthApi(apiClient);

        initComponents();
    }

    private void initComponents() {
        setTitle("Kantin Kita — Login Vendor");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 320);
        setLocationRelativeTo(null);
        setResizable(false);

        var panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(30, 40, 30, 40));
        var gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(6, 0, 6, 0);

        // Title
        var titleLabel = new JLabel("Login Vendor Kantin");
        titleLabel.setFont(titleLabel.getFont().deriveFont(Font.BOLD, 20f));
        titleLabel.setHorizontalAlignment(SwingConstants.CENTER);
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        panel.add(titleLabel, gbc);

        // Email
        gbc.gridy = 1;
        gbc.gridwidth = 1;
        panel.add(new JLabel("Email"), gbc);

        emailField = new JTextField(20);
        emailField.setPreferredSize(new Dimension(250, 35));
        gbc.gridx = 1;
        panel.add(emailField, gbc);

        // Password
        gbc.gridx = 0;
        gbc.gridy = 2;
        panel.add(new JLabel("Password"), gbc);

        passwordField = new JPasswordField(20);
        passwordField.setPreferredSize(new Dimension(250, 35));
        gbc.gridx = 1;
        panel.add(passwordField, gbc);

        // Status label (error messages)
        statusLabel = new JLabel(" ");
        statusLabel.setForeground(Color.RED);
        statusLabel.setHorizontalAlignment(SwingConstants.CENTER);
        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        panel.add(statusLabel, gbc);

        // Login button
        loginButton = new JButton("Login");
        loginButton.setPreferredSize(new Dimension(250, 38));
        loginButton.addActionListener(e -> doLogin());
        gbc.gridy = 4;
        panel.add(loginButton, gbc);

        add(panel);

        // Enter key triggers login
        getRootPane().setDefaultButton(loginButton);
    }

    private void doLogin() {
        String email = emailField.getText().trim();
        String password = new String(passwordField.getPassword());

        if (email.isEmpty() || password.isEmpty()) {
            statusLabel.setText("Email dan password wajib diisi");
            return;
        }

        setLoading(true);
        statusLabel.setText(" ");

        SwingWorker<Void, Void> worker = new SwingWorker<>() {
            private ApiResponse<LoginResponse> response;

            @Override
            protected Void doInBackground() {
                response = authApi.login(email, password);
                return null;
            }

            @Override
            protected void done() {
                setLoading(false);
                if (response.isSuccess()) {
                    LoginResponse loginResp = response.getData();
                    tokenManager.setToken(loginResp.getToken());
                    tokenManager.setVendorId(loginResp.getVendor().getId());
                    tokenManager.save();

                    SessionContext.setCurrentVendor(loginResp.getVendor());

                    dispose();
                    var mainFrame = new MainFrame(tokenManager, apiClient);
                    mainFrame.setVisible(true);
                } else {
                    String msg = response.getErrorMessage();
                    if (response.getStatusCode() == 401) {
                        msg = "Email atau password salah";
                    } else if (msg == null || msg.isBlank()) {
                        msg = "Gagal terhubung ke server";
                    }
                    statusLabel.setText(msg);
                }
            }
        };
        worker.execute();
    }

    private void setLoading(boolean loading) {
        loginButton.setEnabled(!loading);
        loginButton.setText(loading ? "Loading..." : "Login");
        emailField.setEnabled(!loading);
        passwordField.setEnabled(!loading);
    }
}
