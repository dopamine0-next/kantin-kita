package com.kantin.frontend.ui.panel;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kantin.frontend.client.ApiClient;
import com.kantin.frontend.model.VendorOrderResponse;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class OrderPanel extends JPanel {

    private final ObjectMapper mapper = ApiClient.getMapper();
    private final String vendorId;
    private final String restaurantId;
    private final JTable table = new JTable();
    private final DefaultTableModel tableModel;
    private final JComboBox<String> statusFilter = new JComboBox<>(
            new String[]{"All", "PENDING", "PROCESSING", "READY", "COMPLETED", "CANCELLED"});

    public OrderPanel(String vendorId, String restaurantId) {
        this.vendorId = vendorId;
        this.restaurantId = restaurantId;
        setLayout(new BorderLayout());
        setBorder(new EmptyBorder(10, 10, 10, 10));

        tableModel = new DefaultTableModel(new String[]{"Order #", "Status", "Payment", "Total", "Customer", "Time"}, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        table.setModel(tableModel);
        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting() && table.getSelectedRow() >= 0) showDetail(getOrderAt(table.getSelectedRow()));
        });

        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        JButton refreshBtn = new JButton("Refresh");
        JButton detailBtn = new JButton("Detail");
        JButton processBtn = new JButton("Process → Ready");
        JButton readyBtn = new JButton("Ready → Completed");

        refreshBtn.addActionListener(e -> loadData());
        detailBtn.addActionListener(e -> {
            if (table.getSelectedRow() >= 0) showDetail(getOrderAt(table.getSelectedRow()));
            else JOptionPane.showMessageDialog(this, "Pilih order dulu");
        });
        processBtn.addActionListener(e -> updateStatus("READY"));
        readyBtn.addActionListener(e -> updateStatus("COMPLETED"));
        statusFilter.addActionListener(e -> loadData());

        topPanel.add(new JLabel("Filter:"));
        topPanel.add(statusFilter);
        topPanel.add(refreshBtn);
        topPanel.add(detailBtn);
        topPanel.add(processBtn);
        topPanel.add(readyBtn);

        add(topPanel, BorderLayout.NORTH);
        add(new JScrollPane(table), BorderLayout.CENTER);

        loadData();
    }

    private List<VendorOrderResponse> orderList;

    private void loadData() {
        try {
            String filter = statusFilter.getSelectedItem().toString();
            String path = "/vendor/restaurants/" + restaurantId + "/orders";
            if (!filter.equals("All")) path += "?status=" + filter;
            String json = ApiClient.get(path);
            orderList = mapper.readValue(json, new TypeReference<List<VendorOrderResponse>>() {});
            tableModel.setRowCount(0);
            for (VendorOrderResponse o : orderList) {
                tableModel.addRow(new Object[]{
                        o.orderNumber, o.status, o.paymentStatus,
                        "Rp" + String.format("%,.0f", o.totalAmount),
                        o.customer != null ? o.customer.name : "-",
                        o.createdAt != null ? o.createdAt.substring(0, 16).replace("T", " ") : "-"
                });
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal load: " + e.getMessage());
        }
    }

    private VendorOrderResponse getOrderAt(int row) {
        return orderList != null && row >= 0 && row < orderList.size() ? orderList.get(row) : null;
    }

    private void showDetail(VendorOrderResponse order) {
        StringBuilder sb = new StringBuilder();
        sb.append("Order: ").append(order.orderNumber).append("\n");
        sb.append("Status: ").append(order.status).append("\n");
        sb.append("Payment: ").append(order.paymentStatus).append("\n");
        sb.append("Mode: ").append(order.mode).append("\n");
        sb.append("Customer: ").append(order.customer != null ? order.customer.name : "-").append("\n");
        sb.append("NIM: ").append(order.customer != null ? order.customer.nim : "-").append("\n");
        sb.append("─────────────────\n");
        if (order.items != null) {
            for (var item : order.items) {
                sb.append(item.quantity).append("x ").append(item.name)
                        .append(" @ Rp").append(String.format("%,.0f", item.price)).append("\n");
                if (item.note != null && !item.note.isBlank())
                    sb.append("   Note: ").append(item.note).append("\n");
                if (item.variantName != null && !item.variantName.isBlank())
                    sb.append("   Variant: ").append(item.variantName).append("\n");
                if (item.addons != null) {
                    for (var a : item.addons) {
                        sb.append("   + ").append(a.name).append(" Rp").append(String.format("%,.0f", a.price)).append("\n");
                    }
                }
            }
        }
        sb.append("─────────────────\n");
        sb.append("Subtotal: Rp").append(String.format("%,.0f", order.subtotal)).append("\n");
        if (order.discountAmount != null && order.discountAmount > 0)
            sb.append("Discount: -Rp").append(String.format("%,.0f", order.discountAmount)).append("\n");
        sb.append("Total: Rp").append(String.format("%,.0f", order.totalAmount));

        JTextArea ta = new JTextArea(sb.toString());
        ta.setEditable(false);
        ta.setFont(new Font("Monospaced", Font.PLAIN, 12));

        JOptionPane.showMessageDialog(this, new JScrollPane(ta), "Order Detail", JOptionPane.INFORMATION_MESSAGE);
    }

    private void updateStatus(String newStatus) {
        int row = table.getSelectedRow();
        if (row < 0) { JOptionPane.showMessageDialog(this, "Pilih order dulu"); return; }
        try {
            ApiClient.patch("/vendor/orders/" + getOrderAt(row).id + "/status",
                    new StatusBody(newStatus));
            loadData();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal: " + e.getMessage());
        }
    }

    private record StatusBody(String status) {}
}
