package com.java.frontend.kantin.dashboard;

import com.java.frontend.kantin.api.ApiClient;
import com.java.frontend.kantin.api.VendorApi;
import com.java.frontend.kantin.auth.SessionContext;
import com.java.frontend.kantin.components.StatCard;
import com.java.frontend.kantin.model.VendorAnalyticsSummaryResponse;

import javax.swing.*;
import java.awt.*;

public class DashboardPanel extends JPanel {

    private final VendorApi vendorApi;
    private JPanel cardsPanel;
    private JLabel loadingLabel;

    public DashboardPanel(ApiClient apiClient) {
        this.vendorApi = new VendorApi(apiClient);
        initComponents();
        loadData();
    }

    private void initComponents() {
        setLayout(new BorderLayout());
        setBackground(Color.WHITE);

        // Header
        var header = new JLabel("Dashboard");
        header.setFont(header.getFont().deriveFont(Font.BOLD, 22f));
        header.setBorder(BorderFactory.createEmptyBorder(20, 25, 10, 25));
        add(header, BorderLayout.NORTH);

        // Cards area
        cardsPanel = new JPanel(new GridLayout(2, 3, 15, 15));
        cardsPanel.setBackground(Color.WHITE);
        cardsPanel.setBorder(BorderFactory.createEmptyBorder(10, 25, 25, 25));

        loadingLabel = new JLabel("Memuat data...", SwingConstants.CENTER);
        loadingLabel.setFont(loadingLabel.getFont().deriveFont(16f));
        loadingLabel.setForeground(Color.GRAY);

        add(loadingLabel, BorderLayout.CENTER);
    }

    private void loadData() {
        String restaurantId = SessionContext.getFirstRestaurantId();
        if (restaurantId == null) {
            loadingLabel.setText("Tidak ada restaurant ditemukan");
            return;
        }

        SwingWorker<Void, Void> worker = new SwingWorker<>() {
            private VendorAnalyticsSummaryResponse data;

            @Override
            protected Void doInBackground() {
                var resp = vendorApi.getAnalyticsSummary(restaurantId);
                if (resp.isSuccess()) {
                    data = resp.getData();
                }
                return null;
            }

            @Override
            protected void done() {
                if (data != null) {
                    loadingLabel.setVisible(false);
                    renderCards(data);
                } else {
                    loadingLabel.setText("Gagal memuat data dashboard");
                }
            }
        };
        worker.execute();
    }

    private void renderCards(VendorAnalyticsSummaryResponse data) {
        cardsPanel.add(new StatCard("📦", "Orders Hari Ini", String.valueOf(data.getTodayOrders()), new Color(0x34, 0x9b, 0xeb)));
        cardsPanel.add(new StatCard("💰", "Revenue Hari Ini", formatRupiah(data.getTodayRevenue()), new Color(0x2e, 0xcc, 0x71)));
        cardsPanel.add(new StatCard("⏳", "Pending Orders", String.valueOf(data.getPendingOrders()), new Color(0xf3, 0x9c, 0x12)));
        cardsPanel.add(new StatCard("👨‍🍳", "Diproses", String.valueOf(data.getProcessingOrders()), new Color(0xe7, 0x4c, 0x3c)));
        cardsPanel.add(new StatCard("⭐", "Rating Rata-rata", String.format("%.1f", data.getAverageRating()), new Color(0x9b, 0x59, 0xb6)));

        add(cardsPanel, BorderLayout.CENTER);
        revalidate();
        repaint();
    }

    private String formatRupiah(Double value) {
        if (value == null) return "Rp 0";
        return "Rp " + String.format("%,.0f", value).replace(',', '.');
    }
}
