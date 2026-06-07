package com.java.frontend.kantin;

import com.java.frontend.kantin.auth.SessionContext;
import com.java.frontend.kantin.components.PanelManager;
import com.java.frontend.kantin.components.Sidebar;
import com.java.frontend.kantin.dashboard.DashboardPanel;
import com.java.frontend.kantin.restaurant.RestaurantPanel;
import com.java.frontend.kantin.menu.MenuPanel;
import com.java.frontend.kantin.order.OrderPanel;
import com.java.frontend.kantin.review.ReviewPanel;
import com.java.frontend.kantin.analytics.AnalyticsPanel;
import com.java.frontend.kantin.util.TokenManager;

import javax.swing.*;
import java.awt.*;

public class MainFrame extends JFrame {

    private final TokenManager tokenManager;
    private final PanelManager panelManager;

    public MainFrame(TokenManager tokenManager) {
        this.tokenManager = tokenManager;
        this.panelManager = new PanelManager();
        initComponents();
    }

    private void initComponents() {
        setTitle("Kantin Kita — " + SessionContext.getCurrentVendor().getName());
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1100, 750);
        setLocationRelativeTo(null);
        setMinimumSize(new Dimension(900, 600));

        var sidebar = new Sidebar(panelManager, this::doLogout);
        panelManager.addPanel("dashboard", new DashboardPanel());
        panelManager.addPanel("restaurant", new RestaurantPanel());
        panelManager.addPanel("menu", new MenuPanel());
        panelManager.addPanel("orders", new OrderPanel());
        panelManager.addPanel("reviews", new ReviewPanel());
        panelManager.addPanel("analytics", new AnalyticsPanel());

        panelManager.showPanel("dashboard");

        add(sidebar, BorderLayout.WEST);
        add(panelManager, BorderLayout.CENTER);
        sidebar.setActiveButton(0);
    }

    private void doLogout() {
        int confirm = JOptionPane.showConfirmDialog(
                this, "Yakin ingin logout?", "Logout", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        tokenManager.clear();
        SessionContext.clear();
        dispose();

        SwingUtilities.invokeLater(() -> {
            var loginFrame = new com.java.frontend.kantin.auth.LoginFrame(
                    new com.java.frontend.kantin.api.ApiClient(Config.BASE_URL, tokenManager),
                    tokenManager);
            loginFrame.setVisible(true);
        });
    }
}
