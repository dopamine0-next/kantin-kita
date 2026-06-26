package com.java.frontend.kantin.ui;

import com.java.frontend.kantin.model.VendorLoginResponse;
import com.java.frontend.kantin.service.AuthService;
import com.java.frontend.kantin.ui.panels.*;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class MainFrame extends JFrame {

    private final CardLayout cardLayout;
    private final JPanel contentPanel;
    private JLabel restaurantLabel;
    private String currentRestaurantId;
    private String currentRestaurantName;

    private final DashboardPanel dashboardPanel;
    private final MenuItemPanel menuItemPanel;
    private final KustomisasiPanel kustomisasiPanel;
    private final PesananPanel pesananPanel;
    private final RiwayatPesananPanel riwayatPesananPanel;
    private final UlasanPanel ulasanPanel;
    private final ProfilKedaiPanel profilKedaiPanel;

    public MainFrame(String vendorName, List<VendorLoginResponse.VendorRestaurantItem> restaurants) {
        setTitle("Kantin Kita — " + vendorName);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1200, 750);
        setLocationRelativeTo(null);

        cardLayout = new CardLayout();
        contentPanel = new JPanel(cardLayout);

        dashboardPanel = new DashboardPanel(this::getCurrentRestaurantId);
        menuItemPanel = new MenuItemPanel(this::getCurrentRestaurantId);
        kustomisasiPanel = new KustomisasiPanel(this::getCurrentRestaurantId);
        pesananPanel = new PesananPanel(this::getCurrentRestaurantId);
        riwayatPesananPanel = new RiwayatPesananPanel(this::getCurrentRestaurantId);
        ulasanPanel = new UlasanPanel(this::getCurrentRestaurantId);
        profilKedaiPanel = new ProfilKedaiPanel(this::getCurrentRestaurantId);

        contentPanel.add(dashboardPanel, "dashboard");
        contentPanel.add(menuItemPanel, "menuItem");
        contentPanel.add(kustomisasiPanel, "kustomisasi");
        contentPanel.add(pesananPanel, "pesanan");
        contentPanel.add(riwayatPesananPanel, "riwayatPesanan");
        contentPanel.add(ulasanPanel, "ulasan");
        contentPanel.add(profilKedaiPanel, "profilKedai");

        if (!restaurants.isEmpty()) {
            var r = restaurants.get(0);
            currentRestaurantId = r.getId();
            currentRestaurantName = r.getName();
        }

        JPanel sidebar = createSidebar(vendorName, restaurants);
        add(sidebar, BorderLayout.WEST);
        add(contentPanel, BorderLayout.CENTER);
    }

    public String getCurrentRestaurantId() {
        return currentRestaurantId;
    }

    private void switchRestaurant(String id, String name) {
        currentRestaurantId = id;
        currentRestaurantName = name;
        restaurantLabel.setText("Kedai: " + name);
        refreshAllPanels();
    }

    private void refreshAllPanels() {
        dashboardPanel.refresh();
        menuItemPanel.refresh();
        kustomisasiPanel.refresh();
        pesananPanel.refresh();
        riwayatPesananPanel.refresh();
        ulasanPanel.refresh();
        profilKedaiPanel.refresh();
    }

    private JPanel createSidebar(String vendorName, List<VendorLoginResponse.VendorRestaurantItem> restaurants) {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setPreferredSize(new Dimension(200, 0));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 5, 10, 5));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(2, 0, 2, 0);
        gbc.gridx = 0;

        JLabel title = new JLabel(vendorName);
        title.setFont(new Font("Segoe UI", Font.BOLD, 14));
        gbc.gridy = 0;
        panel.add(title, gbc);

        restaurantLabel = new JLabel(currentRestaurantName != null ? "Kedai: " + currentRestaurantName : "Kedai: -");
        restaurantLabel.setFont(new Font("Segoe UI", Font.ITALIC, 1));
        gbc.gridy = 1;
        panel.add(restaurantLabel, gbc);

        if (restaurants.size() > 1) {
            JComboBox<VendorLoginResponse.VendorRestaurantItem> restaurantCombo = new JComboBox<>();
            for (var r : restaurants) {
                restaurantCombo.addItem(r);
            }
            restaurantCombo.addActionListener(e -> {
                var selected = (VendorLoginResponse.VendorRestaurantItem) restaurantCombo.getSelectedItem();
                if (selected != null) {
                    switchRestaurant(selected.getId(), selected.getName());
                }
            });
            gbc.gridy = 2;
            panel.add(restaurantCombo, gbc);
        }

        String[][] navItems = {
                {"Dashboard", "dashboard"},
                {"Menu", "menuItem"},
                {"Kustomisasi", "kustomisasi"},
                {"Pesanan Masuk", "pesanan"},
                {"Riwayat Pesanan", "riwayatPesanan"},
                {"Ulasan", "ulasan"},
                {"Profil Kedai", "profilKedai"}
        };

        int startY = restaurants.size() > 1 ? 3 : 2;
        for (int i = 0; i < navItems.length; i++) {
            String label = navItems[i][0];
            String id = navItems[i][1];
            JButton btn = new JButton(label);
            btn.setHorizontalAlignment(SwingConstants.LEFT);
            btn.addActionListener(e -> cardLayout.show(contentPanel, id));
            gbc.gridy = startY + i;
            panel.add(btn, gbc);
        }

        gbc.gridy = startY + navItems.length;
        gbc.weighty = 1.0;
        gbc.anchor = GridBagConstraints.SOUTH;
        JButton logoutBtn = new JButton("Keluar");
        logoutBtn.addActionListener(e -> logout());
        panel.add(logoutBtn, gbc);

        return panel;
    }

    private void logout() {
        AuthService.logout();
        dispose();
        new LoginFrame().setVisible(true);
    }
}
