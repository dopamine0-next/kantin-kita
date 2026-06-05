package com.kantin.frontend.ui.panel;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kantin.frontend.client.ApiClient;
import com.kantin.frontend.model.VendorRestaurantResponse;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;

public class RestaurantPanel extends JPanel {

    private final ObjectMapper mapper = ApiClient.getMapper();
    private final String vendorId;
    private final String restaurantId;
    private VendorRestaurantResponse resto;

    private final JLabel nameLabel = new JLabel();
    private final JLabel cuisineLabel = new JLabel();
    private final JLabel addressLabel = new JLabel();
    private final JLabel hoursLabel = new JLabel();
    private final JLabel statusLabel = new JLabel();
    private final JLabel ratingLabel = new JLabel();
    private final JButton toggleButton = new JButton();
    private final JTextField nameField = new JTextField(20);
    private final JTextField cuisineField = new JTextField(15);
    private final JTextField addressField = new JTextField(25);
    private final JTextField hoursField = new JTextField(15);

    public RestaurantPanel(String vendorId, String restaurantId) {
        this.vendorId = vendorId;
        this.restaurantId = restaurantId;
        setLayout(new BorderLayout());
        setBorder(new EmptyBorder(10, 10, 10, 10));
        loadData();
    }

    private void loadData() {
        try {
            String json = ApiClient.get("/vendor/restaurants/" + restaurantId);
            resto = mapper.readValue(json, VendorRestaurantResponse.class);
            refreshUI();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal load: " + e.getMessage());
        }
    }

    private void refreshUI() {
        removeAll();

        JPanel infoPanel = new JPanel(new GridBagLayout());
        infoPanel.setBorder(BorderFactory.createTitledBorder("Restaurant Info"));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.anchor = GridBagConstraints.WEST;

        gbc.gridx = 0; gbc.gridy = 0;
        infoPanel.add(new JLabel("Name:"), gbc);
        gbc.gridx = 1;
        nameLabel.setText(resto.name);
        infoPanel.add(nameLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 1;
        infoPanel.add(new JLabel("Cuisine:"), gbc);
        gbc.gridx = 1;
        cuisineLabel.setText(resto.cuisine);
        infoPanel.add(cuisineLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 2;
        infoPanel.add(new JLabel("Address:"), gbc);
        gbc.gridx = 1;
        addressLabel.setText(resto.address);
        infoPanel.add(addressLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 3;
        infoPanel.add(new JLabel("Hours:"), gbc);
        gbc.gridx = 1;
        hoursLabel.setText(resto.operationalHours);
        infoPanel.add(hoursLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 4;
        infoPanel.add(new JLabel("Status:"), gbc);
        gbc.gridx = 1;
        statusLabel.setText(resto.isOpen ? "OPEN" : "CLOSED");
        statusLabel.setForeground(resto.isOpen ? Color.GREEN.darker() : Color.RED);
        infoPanel.add(statusLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 5;
        infoPanel.add(new JLabel("Rating:"), gbc);
        gbc.gridx = 1;
        ratingLabel.setText(resto.rating != null ? String.format("%.1f", resto.rating) : "-");
        infoPanel.add(ratingLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 6; gbc.gridwidth = 2;
        toggleButton.setText(resto.isOpen ? "Close Restaurant" : "Open Restaurant");
        toggleButton.addActionListener(e -> toggleStatus());
        infoPanel.add(toggleButton, gbc);

        JPanel editPanel = new JPanel(new GridBagLayout());
        editPanel.setBorder(BorderFactory.createTitledBorder("Edit Restaurant"));
        GridBagConstraints egbc = new GridBagConstraints();
        egbc.insets = new Insets(5, 5, 5, 5);
        egbc.anchor = GridBagConstraints.WEST;

        egbc.gridx = 0; egbc.gridy = 0;
        editPanel.add(new JLabel("Name:"), egbc);
        egbc.gridx = 1;
        nameField.setText(resto.name);
        editPanel.add(nameField, egbc);

        egbc.gridx = 0; egbc.gridy = 1;
        editPanel.add(new JLabel("Cuisine:"), egbc);
        egbc.gridx = 1;
        cuisineField.setText(resto.cuisine);
        editPanel.add(cuisineField, egbc);

        egbc.gridx = 0; egbc.gridy = 2;
        editPanel.add(new JLabel("Address:"), egbc);
        egbc.gridx = 1;
        addressField.setText(resto.address);
        editPanel.add(addressField, egbc);

        egbc.gridx = 0; egbc.gridy = 3;
        editPanel.add(new JLabel("Hours:"), egbc);
        egbc.gridx = 1;
        hoursField.setText(resto.operationalHours);
        editPanel.add(hoursField, egbc);

        egbc.gridx = 0; egbc.gridy = 4; egbc.gridwidth = 2;
        JButton saveButton = new JButton("Save Changes");
        saveButton.addActionListener(e -> saveChanges());
        editPanel.add(saveButton, egbc);

        JPanel mainPanel = new JPanel(new GridLayout(1, 2, 10, 0));
        mainPanel.add(infoPanel);
        mainPanel.add(editPanel);

        add(mainPanel, BorderLayout.CENTER);
        revalidate();
        repaint();
    }

    private void toggleStatus() {
        try {
            String json = ApiClient.patch("/vendor/restaurants/" + restaurantId + "/status", null);
            resto = mapper.readValue(json, VendorRestaurantResponse.class);
            refreshUI();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal: " + e.getMessage());
        }
    }

    private void saveChanges() {
        try {
            String json = ApiClient.put("/vendor/restaurants/" + restaurantId,
                    new UpdateBody(nameField.getText(), cuisineField.getText(),
                            addressField.getText(), null, null));
            resto = mapper.readValue(json, VendorRestaurantResponse.class);
            refreshUI();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal: " + e.getMessage());
        }
    }

    private record UpdateBody(String name, String cuisine, String address, String imageUrl, String promoText) {}
}
