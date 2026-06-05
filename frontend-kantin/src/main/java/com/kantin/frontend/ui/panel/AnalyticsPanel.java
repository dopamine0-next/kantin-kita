package com.kantin.frontend.ui.panel;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kantin.frontend.client.ApiClient;
import com.kantin.frontend.model.VendorAnalyticsSummaryResponse;
import com.kantin.frontend.model.VendorOrderTrendResponse;
import com.kantin.frontend.model.VendorRevenueResponse;
import com.kantin.frontend.model.VendorTopItemResponse;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.time.LocalDate;
import java.util.List;

public class AnalyticsPanel extends JPanel {

    private final ObjectMapper mapper = ApiClient.getMapper();
    private final String vendorId;
    private final String restaurantId;

    public AnalyticsPanel(String vendorId, String restaurantId) {
        this.vendorId = vendorId;
        this.restaurantId = restaurantId;
        setLayout(new BorderLayout());
        setBorder(new EmptyBorder(10, 10, 10, 10));
        initUI();
    }

    private void initUI() {
        JTabbedPane tabs = new JTabbedPane();
        tabs.addTab("Summary", buildSummaryPanel());
        tabs.addTab("Revenue", buildRevenuePanel());
        tabs.addTab("Top Items", buildTopItemsPanel());
        tabs.addTab("Trends", buildTrendsPanel());
        add(tabs, BorderLayout.CENTER);
    }

    private JPanel buildSummaryPanel() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(new EmptyBorder(20, 20, 20, 20));

        JLabel todayOrders = new JLabel("...");
        JLabel todayRevenue = new JLabel("...");
        JLabel pendingOrders = new JLabel("...");
        JLabel processingOrders = new JLabel("...");
        JLabel avgRating = new JLabel("...");

        todayOrders.setFont(todayOrders.getFont().deriveFont(Font.BOLD, 24));
        todayRevenue.setFont(todayRevenue.getFont().deriveFont(Font.BOLD, 24));
        pendingOrders.setFont(pendingOrders.getFont().deriveFont(Font.BOLD, 24));
        processingOrders.setFont(processingOrders.getFont().deriveFont(Font.BOLD, 24));
        avgRating.setFont(avgRating.getFont().deriveFont(Font.BOLD, 24));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 20, 10, 20);
        gbc.gridx = 0; gbc.gridy = 0;
        panel.add(new JLabel("Today Orders"), gbc);
        gbc.gridx = 1; panel.add(todayOrders, gbc);
        gbc.gridx = 0; gbc.gridy = 1;
        panel.add(new JLabel("Today Revenue"), gbc);
        gbc.gridx = 1; panel.add(todayRevenue, gbc);
        gbc.gridx = 0; gbc.gridy = 2;
        panel.add(new JLabel("Pending"), gbc);
        gbc.gridx = 1; panel.add(pendingOrders, gbc);
        gbc.gridx = 0; gbc.gridy = 3;
        panel.add(new JLabel("Processing"), gbc);
        gbc.gridx = 1; panel.add(processingOrders, gbc);
        gbc.gridx = 0; gbc.gridy = 4;
        panel.add(new JLabel("Avg Rating"), gbc);
        gbc.gridx = 1; panel.add(avgRating, gbc);

        JButton refreshBtn = new JButton("Refresh");
        gbc.gridx = 0; gbc.gridy = 5; gbc.gridwidth = 2;
        panel.add(refreshBtn, gbc);

        refreshBtn.addActionListener(e -> {
            try {
                String json = ApiClient.get("/vendor/restaurants/" + restaurantId + "/analytics/summary");
                var s = mapper.readValue(json, VendorAnalyticsSummaryResponse.class);
                todayOrders.setText(String.valueOf(s.todayOrders));
                todayRevenue.setText("Rp" + String.format("%,.0f", s.todayRevenue != null ? s.todayRevenue : 0));
                pendingOrders.setText(String.valueOf(s.pendingOrders));
                processingOrders.setText(String.valueOf(s.processingOrders));
                avgRating.setText(String.format("%.1f", s.averageRating != null ? s.averageRating : 0));
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Gagal: " + ex.getMessage());
            }
        });
        refreshBtn.doClick();

        return panel;
    }

    private JPanel buildRevenuePanel() {
        JPanel panel = new JPanel(new BorderLayout());
        DefaultTableModel model = new DefaultTableModel(new String[]{"Date", "Revenue", "Orders"}, 0);
        JTable table = new JTable(model);
        JButton refreshBtn = new JButton("Refresh");
        JLabel totalLabel = new JLabel("Total: -");

        refreshBtn.addActionListener(e -> {
            try {
                LocalDate to = LocalDate.now();
                LocalDate from = to.minusDays(30);
                String json = ApiClient.get("/vendor/restaurants/" + restaurantId
                        + "/analytics/revenue?dateFrom=" + from + "&dateTo=" + to);
                var r = mapper.readValue(json, VendorRevenueResponse.class);
                model.setRowCount(0);
                if (r.breakdown != null) {
                    for (var b : r.breakdown) {
                        model.addRow(new Object[]{b.date, "Rp" + String.format("%,.0f", b.revenue), b.orderCount});
                    }
                }
                totalLabel.setText("Total: Rp" + String.format("%,.0f", r.totalRevenue != null ? r.totalRevenue : 0)
                        + " (" + (r.totalOrders != null ? r.totalOrders : 0) + " orders)");
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Gagal: " + ex.getMessage());
            }
        });

        JPanel top = new JPanel(new FlowLayout());
        top.add(refreshBtn);
        top.add(totalLabel);
        panel.add(top, BorderLayout.NORTH);
        panel.add(new JScrollPane(table), BorderLayout.CENTER);

        return panel;
    }

    private JPanel buildTopItemsPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        DefaultTableModel model = new DefaultTableModel(new String[]{"Item", "Qty Sold", "Revenue"}, 0);
        JTable table = new JTable(model);
        JButton refreshBtn = new JButton("Refresh");

        refreshBtn.addActionListener(e -> {
            try {
                LocalDate to = LocalDate.now();
                LocalDate from = to.minusDays(30);
                String json = ApiClient.get("/vendor/restaurants/" + restaurantId
                        + "/analytics/top-items?dateFrom=" + from + "&dateTo=" + to);
                List<VendorTopItemResponse> items = mapper.readValue(json,
                        new TypeReference<List<VendorTopItemResponse>>() {});
                model.setRowCount(0);
                for (var item : items) {
                    model.addRow(new Object[]{
                            item.name,
                            item.totalQuantity,
                            "Rp" + String.format("%,.0f", item.totalRevenue != null ? item.totalRevenue : 0)
                    });
                }
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Gagal: " + ex.getMessage());
            }
        });

        panel.add(refreshBtn, BorderLayout.NORTH);
        panel.add(new JScrollPane(table), BorderLayout.CENTER);

        return panel;
    }

    private JPanel buildTrendsPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        DefaultTableModel model = new DefaultTableModel(new String[]{"Date", "Orders", "Revenue"}, 0);
        JTable table = new JTable(model);
        JButton refreshBtn = new JButton("Refresh");

        refreshBtn.addActionListener(e -> {
            try {
                LocalDate to = LocalDate.now();
                LocalDate from = to.minusDays(30);
                String json = ApiClient.get("/vendor/restaurants/" + restaurantId
                        + "/analytics/orders?dateFrom=" + from + "&dateTo=" + to);
                List<VendorOrderTrendResponse> trends = mapper.readValue(json,
                        new TypeReference<List<VendorOrderTrendResponse>>() {});
                model.setRowCount(0);
                for (var t : trends) {
                    model.addRow(new Object[]{
                            t.date, t.orderCount,
                            "Rp" + String.format("%,.0f", t.totalRevenue != null ? t.totalRevenue : 0)
                    });
                }
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Gagal: " + ex.getMessage());
            }
        });

        panel.add(refreshBtn, BorderLayout.NORTH);
        panel.add(new JScrollPane(table), BorderLayout.CENTER);

        return panel;
    }
}
