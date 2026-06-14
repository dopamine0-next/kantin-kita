package com.java.frontend.kantin.ui.panels;

import com.java.frontend.kantin.model.VendorAnalyticsSummary;
import com.java.frontend.kantin.service.AnalyticsService;
import com.java.frontend.kantin.ui.components.StatsCard;

import javax.swing.*;
import java.awt.*;
import java.text.DecimalFormat;
import java.util.function.Supplier;

public class DashboardPanel extends JPanel {

    private final Supplier<String> restaurantIdSupplier;
    private final DecimalFormat fmt = new DecimalFormat("#,###");
    private StatsCard todayOrdersCard;
    private StatsCard todayRevenueCard;
    private StatsCard pendingCard;
    private StatsCard processingCard;
    private StatsCard ratingCard;

    public DashboardPanel(Supplier<String> restaurantIdSupplier) {
        this.restaurantIdSupplier = restaurantIdSupplier;
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        add(createSummaryPanel(), BorderLayout.NORTH);

        refresh();
    }

    public void refresh() {
        loadData();
    }

    private JPanel createSummaryPanel() {
        JPanel panel = new JPanel(new GridLayout(1, 5, 10, 0));
        panel.setOpaque(false);

        todayOrdersCard = new StatsCard("📋", "0", "Pesanan Hari Ini", new Color(72, 133, 237));
        todayRevenueCard = new StatsCard("💰", "Rp 0", "Pendapatan Hari Ini", new Color(92, 184, 92));
        pendingCard = new StatsCard("⏳", "0", "Menunggu", new Color(240, 173, 78));
        processingCard = new StatsCard("🔧", "0", "Diproses", new Color(91, 192, 222));
        ratingCard = new StatsCard("⭐", "0", "Rating", new Color(217, 83, 79));

        panel.add(todayOrdersCard);
        panel.add(todayRevenueCard);
        panel.add(pendingCard);
        panel.add(processingCard);
        panel.add(ratingCard);

        return panel;
    }

    private void loadData() {
        String rid = restaurantIdSupplier.get();
        if (rid == null) return;

        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    VendorAnalyticsSummary s = AnalyticsService.getSummary(rid);
                    SwingUtilities.invokeLater(() -> {
                        todayOrdersCard.setText(String.valueOf(s.getTodayOrders()));
                        todayRevenueCard.setText("Rp " + fmt.format(
                                s.getTodayRevenue() != null ? s.getTodayRevenue().longValue() : 0));
                        pendingCard.setText(String.valueOf(s.getPendingOrders()));
                        processingCard.setText(String.valueOf(s.getProcessingOrders()));
                        ratingCard.setText(s.getAverageRating() != null
                                ? String.format("%.1f", s.getAverageRating()) : "0");
                    });
                } catch (Exception ignored) {}
                return null;
            }
        }.execute();
    }
}
