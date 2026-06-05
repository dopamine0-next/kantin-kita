package com.kantin.frontend.ui.panel;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kantin.frontend.client.ApiClient;
import com.kantin.frontend.model.RestaurantReviewResponse;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class ReviewPanel extends JPanel {

    private final ObjectMapper mapper = ApiClient.getMapper();
    private final String vendorId;
    private final String restaurantId;
    private final JTable table = new JTable();
    private final DefaultTableModel tableModel;

    public ReviewPanel(String vendorId, String restaurantId) {
        this.vendorId = vendorId;
        this.restaurantId = restaurantId;
        setLayout(new BorderLayout());
        setBorder(new EmptyBorder(10, 10, 10, 10));

        tableModel = new DefaultTableModel(new String[]{"User", "Rating", "Date"}, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        table.setModel(tableModel);

        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        JButton refreshBtn = new JButton("Refresh");
        refreshBtn.addActionListener(e -> loadData());
        topPanel.add(refreshBtn);

        add(topPanel, BorderLayout.NORTH);
        add(new JScrollPane(table), BorderLayout.CENTER);

        loadData();
    }

    private void loadData() {
        try {
            String json = ApiClient.get("/vendor/restaurants/" + restaurantId + "/reviews");
            List<RestaurantReviewResponse> reviews = mapper.readValue(json,
                    new TypeReference<List<RestaurantReviewResponse>>() {});
            tableModel.setRowCount(0);
            for (var r : reviews) {
                tableModel.addRow(new Object[]{
                        r.userName, r.rating != null ? r.rating + "/5" : "-",
                        r.createdAt != null ? r.createdAt.substring(0, 10) : "-"
                });
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal load: " + e.getMessage());
        }
    }
}
