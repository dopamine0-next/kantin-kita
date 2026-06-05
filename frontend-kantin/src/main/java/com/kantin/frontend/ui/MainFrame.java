package com.kantin.frontend.ui;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kantin.frontend.client.ApiClient;
import com.kantin.frontend.config.ApiConfig;
import com.kantin.frontend.model.VendorLoginResponse;
import com.kantin.frontend.ui.panel.*;

import javax.swing.*;
import java.awt.*;

public class MainFrame extends JFrame {

    private final ObjectMapper mapper = ApiClient.getMapper();
    private String vendorId;
    private String firstRestaurantId;

    public MainFrame() {
        setTitle("Kantin Kita - Vendor Dashboard");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1000, 700);
        setLocationRelativeTo(null);

        initData();

        JTabbedPane tabs = new JTabbedPane();
        tabs.addTab("Restaurant", new RestaurantPanel(vendorId, firstRestaurantId));
        tabs.addTab("Menu", new MenuPanel(vendorId, firstRestaurantId));
        tabs.addTab("Orders", new OrderPanel(vendorId, firstRestaurantId));
        tabs.addTab("Reviews", new ReviewPanel(vendorId, firstRestaurantId));
        tabs.addTab("Analytics", new AnalyticsPanel(vendorId, firstRestaurantId));

        add(tabs);
        setVisible(true);
    }

    private void initData() {
        try {
            String json = ApiClient.get("/vendor/auth/me");
            var profile = mapper.readValue(json, VendorLoginResponse.VendorProfile.class);
            vendorId = profile.id;
            if (profile.restaurants != null && !profile.restaurants.isEmpty()) {
                firstRestaurantId = profile.restaurants.get(0).id;
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal load profil: " + e.getMessage());
        }
    }
}
