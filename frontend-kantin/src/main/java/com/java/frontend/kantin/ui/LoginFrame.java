package com.java.frontend.kantin.ui;

import com.java.frontend.kantin.model.VendorLoginResponse;
import com.java.frontend.kantin.service.AuthService;

import javax.swing.*;
import java.awt.*;

public class LoginFrame extends JFrame {

    private JTextField emailField;
    private JPasswordField passwordField;

    public LoginFrame() {
        setTitle("Login Vendor — Kantin Kita");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 300);
        setLocationRelativeTo(null);
        setResizable(false);

        initUI();
    }

    private void initUI() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(30, 40, 30, 40));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(6, 0, 6, 0);

        JLabel title = new JLabel("Kantin Kita Vendor");
        title.setFont(new Font("Segoe UI", Font.BOLD, 20));
        title.setHorizontalAlignment(SwingConstants.CENTER);
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        panel.add(title, gbc);

        gbc.gridwidth = 1;
        gbc.gridy = 1;
        panel.add(new JLabel("Email"), gbc);

        gbc.gridy = 2;
        emailField = new JTextField(20);
        panel.add(emailField, gbc);

        gbc.gridy = 3;
        panel.add(new JLabel("Password"), gbc);

        gbc.gridy = 4;
        passwordField = new JPasswordField(20);
        panel.add(passwordField, gbc);

        gbc.gridy = 5;
        gbc.gridwidth = 2;
        JButton loginBtn = new JButton("Masuk");
        loginBtn.addActionListener(e -> doLogin());
        panel.add(loginBtn, gbc);

        add(panel);
        getRootPane().setDefaultButton(loginBtn);
    }

    private void doLogin() {
        String email = emailField.getText().trim();
        String password = new String(passwordField.getPassword());

        if (email.isEmpty() || password.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Email dan password harus diisi");
            return;
        }

        SwingWorker<Void, Void> worker = new SwingWorker<>() {
            @Override
            protected Void doInBackground() {
                try {
                    VendorLoginResponse resp = AuthService.login(email, password);
                    SwingUtilities.invokeLater(() -> {
                        new MainFrame(resp.getVendor().getName(),
                                resp.getVendor().getRestaurants()).setVisible(true);
                        dispose();
                    });
                } catch (Exception ex) {
                    SwingUtilities.invokeLater(() ->
                            JOptionPane.showMessageDialog(LoginFrame.this,
                                    "Gagal masuk: " + ex.getMessage(),
                                    "Error", JOptionPane.ERROR_MESSAGE));
                }
                return null;
            }
        };
        worker.execute();
    }
}
