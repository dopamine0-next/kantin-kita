package com.java.frontend.kantin;

import com.java.frontend.kantin.api.ApiClient;
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
    private final ApiClient apiClient;
    private final PanelManager panelManager;

    public MainFrame(TokenManager tokenManager, ApiClient apiClient) {
        this.tokenManager = tokenManager;
        this.apiClient = apiClient;
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
        panelManager.addPanel("dashboard", new DashboardPanel(apiClient));
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
                    new ApiClient(Config.BASE_URL, tokenManager),
                    tokenManager);
            loginFrame.setVisible(true);
        });
    }
}
