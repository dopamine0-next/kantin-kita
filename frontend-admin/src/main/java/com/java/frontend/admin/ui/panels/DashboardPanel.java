package com.java.frontend.admin.ui.panels;

import com.java.frontend.admin.model.AdminDashboardSummary;
import com.java.frontend.admin.model.AdminRestaurantRanking;
import com.java.frontend.admin.service.DashboardService;
import com.java.frontend.admin.ui.components.StatsCard;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.text.DecimalFormat;
import java.util.List;

public class DashboardPanel extends JPanel {

    private final DecimalFormat fmt = new DecimalFormat("#,###");
    private JTable rankingTable;
    private DefaultTableModel tableModel;

    public DashboardPanel() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        add(createSummaryPanel(), BorderLayout.NORTH);
        add(createRankingSection(), BorderLayout.CENTER);

        loadData();
    }

    private JPanel createSummaryPanel() {
        JPanel panel = new JPanel(new GridLayout(1, 5, 10, 0));
        panel.setOpaque(false);

        panel.add(new StatsCard("🍽️", "0", "Restoran", new Color(72, 133, 237)));
        panel.add(new StatsCard("👤", "0", "Vendor", new Color(92, 184, 92)));
        panel.add(new StatsCard("👥", "0", "Pengguna", new Color(91, 192, 222)));
        panel.add(new StatsCard("📋", "0", "Pesanan Hari Ini", new Color(240, 173, 78)));
        panel.add(new StatsCard("💰", "Rp 0", "Pendapatan Hari Ini", new Color(217, 83, 79)));

        return panel;
    }

    private JPanel createRankingSection() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBorder(BorderFactory.createTitledBorder("Restoran Teratas"));

        String[] cols = {"Peringkat", "Restoran", "Pesanan", "Pendapatan", "Rating"};
        tableModel = new DefaultTableModel(cols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        rankingTable = new JTable(tableModel);
        rankingTable.setFillsViewportHeight(true);
        rankingTable.setRowHeight(28);

        panel.add(new JScrollPane(rankingTable), BorderLayout.CENTER);
        return panel;
    }

    private void loadData() {
        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    AdminDashboardSummary s = DashboardService.getSummary();
                    List<AdminRestaurantRanking> rankings = DashboardService.getRankings("revenue", 10);

                    SwingUtilities.invokeLater(() -> {
                        JPanel summaryPanel = (JPanel) getComponent(0);
                        Component[] cards = summaryPanel.getComponents();
                        ((StatsCard) cards[0]).setText(String.valueOf(s.getTotalRestaurants()));
                        ((StatsCard) cards[1]).setText(String.valueOf(s.getTotalVendors()));
                        ((StatsCard) cards[2]).setText(String.valueOf(s.getTotalUsers()));
                        ((StatsCard) cards[3]).setText(String.valueOf(s.getTodayOrders()));
                        ((StatsCard) cards[4]).setText("Rp " + fmt.format((long) s.getTodayRevenue()));

                        tableModel.setRowCount(0);
                        int rank = 1;
                        for (AdminRestaurantRanking r : rankings) {
                            tableModel.addRow(new Object[]{
                                    rank++,
                                    r.getRestaurantName(),
                                    r.getOrderCount(),
                                    "Rp " + fmt.format((long) r.getRevenue()),
                                    String.format("%.1f", r.getRating())
                            });
                        }
                    });
                } catch (Exception ignored) {}
                return null;
            }
        }.execute();
    }
}
