package com.java.frontend.kantin.ui.panels;

import com.java.frontend.kantin.model.VendorOrder;
import com.java.frontend.kantin.service.OrderService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.function.Supplier;

public class RiwayatPesananPanel extends JPanel {

    private final Supplier<String> restaurantIdSupplier;
    private final DefaultTableModel tableModel;
    private final JTable table;
    private List<VendorOrder> data;
    private final DecimalFormat fmt = new DecimalFormat("#,###");
    private final JLabel errorLabel = new JLabel("", SwingConstants.CENTER);
    private final JLabel totalLabel = new JLabel("Total Pendapatan: Rp 0");
    private JTextField dateFromField;
    private JTextField dateToField;

    public RiwayatPesananPanel(Supplier<String> restaurantIdSupplier) {
        this.restaurantIdSupplier = restaurantIdSupplier;
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        JPanel filterPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 5));
        filterPanel.add(new JLabel("Dari:"));
        dateFromField = new JTextField(12);
        dateFromField.setText(LocalDate.now().minusDays(7).toString());
        filterPanel.add(dateFromField);
        filterPanel.add(new JLabel("Sampai:"));
        dateToField = new JTextField(12);
        dateToField.setText(LocalDate.now().toString());
        filterPanel.add(dateToField);
        JButton filterBtn = new JButton("Filter");
        filterBtn.addActionListener(e -> loadData());
        filterPanel.add(filterBtn);

        totalLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
        totalLabel.setForeground(new Color(92, 184, 92));
        filterPanel.add(totalLabel);

        add(filterPanel, BorderLayout.NORTH);

        String[] cols = {"ID", "Pelanggan", "Status", "Total", "Tanggal"};
        tableModel = new DefaultTableModel(cols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        table = new JTable(tableModel);
        table.setFillsViewportHeight(true);
        table.setRowHeight(28);

        errorLabel.setForeground(new Color(217, 83, 79));
        errorLabel.setVisible(false);

        JPanel tableContainer = new JPanel(new BorderLayout());
        tableContainer.add(errorLabel, BorderLayout.NORTH);
        tableContainer.add(new JScrollPane(table), BorderLayout.CENTER);
        add(tableContainer, BorderLayout.CENTER);

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 5));
        JButton refreshBtn = new JButton("Segarkan");
        refreshBtn.addActionListener(e -> refresh());
        btnPanel.add(refreshBtn);
        add(btnPanel, BorderLayout.SOUTH);

        refresh();
    }

    public void refresh() {
        loadData();
    }

    private String formatWIB(String iso) {
        if (iso == null || iso.isBlank()) return "-";
        try {
            LocalDateTime dt = LocalDateTime.parse(iso);
            ZonedDateTime wib = dt.atZone(ZoneId.of("UTC"))
                    .withZoneSameInstant(ZoneId.of("Asia/Jakarta"));
            return wib.format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm")) + " WIB";
        } catch (Exception e) {
            return iso;
        }
    }

    private void loadData() {
        String rid = restaurantIdSupplier.get();
        if (rid == null) return;

        String dateFrom = dateFromField.getText().trim();
        String dateTo = dateToField.getText().trim();

        SwingUtilities.invokeLater(() -> errorLabel.setVisible(false));
        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    data = OrderService.listOrders(rid, null, dateFrom, dateTo);
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        double totalRevenue = 0;
                        if (data != null) {
                            for (VendorOrder o : data) {
                                if ("COMPLETED".equals(o.getStatus())) {
                                    totalRevenue += o.getTotalAmount() != null ? o.getTotalAmount() : 0;
                                }
                                String statusIndo = switch (o.getStatus()) {
                                    case "PENDING" -> "Menunggu";
                                    case "PROCESSING" -> "Diproses";
                                    case "READY" -> "Siap";
                                    case "COMPLETED" -> "Selesai";
                                    case "CANCELLED" -> "Dibatalkan";
                                    default -> o.getStatus();
                                };
                                tableModel.addRow(new Object[]{
                                        o.getId(),
                                        o.getCustomer() != null ? o.getCustomer().getName() : "-",
                                        statusIndo,
                                        o.getTotalAmount() != null
                                                ? "Rp " + fmt.format(o.getTotalAmount().longValue()) : "Rp 0",
                                        formatWIB(o.getCreatedAt())
                                });
                            }
                        }
                        totalLabel.setText("Total Pendapatan: Rp " + fmt.format((long) totalRevenue));
                    });
                } catch (Exception ex) {
                    SwingUtilities.invokeLater(() -> {
                        errorLabel.setText("Gagal memuat data: " + ex.getMessage());
                        errorLabel.setVisible(true);
                    });
                }
                return null;
            }
        }.execute();
    }
}
