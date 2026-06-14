package com.java.frontend.admin.ui;

import com.java.frontend.admin.service.AuthService;
import com.java.frontend.admin.ui.panels.DashboardPanel;
import com.java.frontend.admin.ui.panels.RestaurantPanel;
import com.java.frontend.admin.ui.panels.VendorPanel;
import com.java.frontend.admin.ui.panels.RestaurantCategoryPanel;
import com.java.frontend.admin.ui.panels.MenuCategoryPanel;
import com.java.frontend.admin.ui.panels.LocationPanel;
import com.java.frontend.admin.ui.panels.VoucherPanel;
import com.java.frontend.admin.ui.panels.BannerPanel;

import javax.swing.*;
import java.awt.*;

public class MainFrame extends JFrame {

    private final CardLayout cardLayout;
    private final JPanel contentPanel;

    public MainFrame(String adminName) {
        setTitle("Kantin Kita — Admin (" + adminName + ")");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1200, 750);
        setLocationRelativeTo(null);

        cardLayout = new CardLayout();
        contentPanel = new JPanel(cardLayout);

        contentPanel.add(new DashboardPanel(), "dashboard");
        contentPanel.add(new RestaurantPanel(), "restaurant");
        contentPanel.add(new VendorPanel(), "vendor");
        contentPanel.add(new RestaurantCategoryPanel(), "category");
        contentPanel.add(new MenuCategoryPanel(), "menuCategory");
        contentPanel.add(new LocationPanel(), "location");
        contentPanel.add(new VoucherPanel(), "voucher");
        contentPanel.add(new BannerPanel(), "banner");

        JPanel sidebar = createSidebar();
        add(sidebar, BorderLayout.WEST);
        add(contentPanel, BorderLayout.CENTER);
    }

    private JPanel createSidebar() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setPreferredSize(new Dimension(180, 0));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 5, 10, 5));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(2, 0, 2, 0);
        gbc.gridx = 0;

        String[] labels = {
                "Dashboard", "Restoran", "Vendor", "Kategori Restoran",
                "Kategori Menu", "Lokasi", "Voucher", "Banner"
        };
        String[] ids = {
                "dashboard", "restaurant", "vendor", "category",
                "menuCategory", "location", "voucher", "banner"
        };

        JLabel title = new JLabel("Navigasi");
        title.setFont(new Font("Segoe UI", Font.BOLD, 14));
        gbc.gridy = 0;
        panel.add(title, gbc);

        for (int i = 0; i < labels.length; i++) {
            String id = ids[i];
            JButton btn = new JButton(labels[i]);
            btn.setHorizontalAlignment(SwingConstants.LEFT);
            btn.addActionListener(e -> cardLayout.show(contentPanel, id));
            gbc.gridy = i + 1;
            panel.add(btn, gbc);
        }

        gbc.gridy = labels.length + 1;
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
