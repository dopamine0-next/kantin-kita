package com.java.frontend.kantin.ui.panels;

import com.java.frontend.kantin.model.VendorOrder;
import com.java.frontend.kantin.service.OrderService;
import com.java.frontend.kantin.ui.components.FormDialog;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.function.Supplier;

public class PesananPanel extends JPanel {

    private final Supplier<String> restaurantIdSupplier;
    private final DefaultTableModel tableModel;
    private final JTable table;
    private List<VendorOrder> data;
    private final DecimalFormat fmt = new DecimalFormat("#,###");
    private final JLabel errorLabel = new JLabel("", SwingConstants.CENTER);

    public PesananPanel(Supplier<String> restaurantIdSupplier) {
        this.restaurantIdSupplier = restaurantIdSupplier;
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        String[] cols = {"ID", "Pelanggan", "Status", "Status Bayar", "Total", "Waktu"};
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
        JButton detailBtn = new JButton("Detail");
        JButton prosesBtn = new JButton("Proses");
        JButton siapBtn = new JButton("Siap");
        JButton selesaiBtn = new JButton("Selesai");
        JButton refreshBtn = new JButton("Segarkan");

        detailBtn.addActionListener(e -> detail());
        prosesBtn.addActionListener(e -> updateStatus("PROCESSING"));
        siapBtn.addActionListener(e -> updateStatus("READY"));
        selesaiBtn.addActionListener(e -> updateStatus("COMPLETED"));
        refreshBtn.addActionListener(e -> refresh());

        btnPanel.add(detailBtn);
        btnPanel.add(prosesBtn);
        btnPanel.add(siapBtn);
        btnPanel.add(selesaiBtn);
        btnPanel.add(refreshBtn);
        add(btnPanel, BorderLayout.SOUTH);

        refresh();
    }

    public void refresh() {
        loadData();
    }

    private void loadData() {
        String rid = restaurantIdSupplier.get();
        if (rid == null) return;

        SwingUtilities.invokeLater(() -> errorLabel.setVisible(false));
        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    data = OrderService.listOrders(rid, null, null, null);
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        if (data != null) {
                            for (VendorOrder o : data) {
                                if ("COMPLETED".equals(o.getStatus()) || "CANCELLED".equals(o.getStatus())) {
                                    continue;
                                }
                                String statusIndo = switch (o.getStatus()) {
                                    case "PENDING" -> "Menunggu";
                                    case "PROCESSING" -> "Diproses";
                                    case "READY" -> "Siap";
                                    case "COMPLETED" -> "Selesai";
                                    case "CANCELLED" -> "Dibatalkan";
                                    default -> o.getStatus();
                                };
                                String pay = o.getPaymentStatus();
                                String bayarIndo = pay != null ? switch (pay) {
                                    case "PAID" -> "Lunas";
                                    case "UNPAID" -> "Belum Bayar";
                                    case "EXPIRED" -> "Kadaluarsa";
                                    case "FAILED" -> "Gagal";
                                    default -> pay;
                                } : "-";
                                tableModel.addRow(new Object[]{
                                        o.getId(),
                                        o.getCustomer() != null ? o.getCustomer().getName() : "-",
                                        statusIndo,
                                        bayarIndo,
                                        o.getTotalAmount() != null
                                                ? "Rp " + fmt.format(o.getTotalAmount().longValue()) : "Rp 0",
                                        formatWIB(o.getCreatedAt())
                                });
                            }
                        }
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

    private int selectedRow() {
        int row = table.getSelectedRow();
        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Pilih pesanan dulu");
            return -1;
        }
        return row;
    }

    private VendorOrder selectedOrder() {
        int row = selectedRow();
        return row >= 0 && data != null && row < data.size() ? data.get(row) : null;
    }

    private void detail() {
        VendorOrder o = selectedOrder();
        if (o == null) return;

        StringBuilder sb = new StringBuilder();
        sb.append("ID Pesanan: ").append(o.getId()).append("\n");
        sb.append("Pelanggan: ").append(o.getCustomer() != null ? o.getCustomer().getName() : "-")
                .append(" (").append(o.getCustomer() != null ? o.getCustomer().getNim() : "-").append(")\n");
        sb.append("Status: ").append(o.getStatus()).append("\n");
        sb.append("Status Bayar: ").append(o.getPaymentStatus()).append("\n");
        sb.append("Subtotal: Rp ").append(o.getSubtotal() != null
                ? fmt.format(o.getSubtotal().longValue()) : "0").append("\n");
        if (o.getDiscountAmount() != null && o.getDiscountAmount() > 0) {
            sb.append("Diskon: Rp ").append(fmt.format(o.getDiscountAmount().longValue())).append("\n");
        }
        sb.append("Total: Rp ").append(o.getTotalAmount() != null
                ? fmt.format(o.getTotalAmount().longValue()) : "0").append("\n");
        sb.append("Waktu: ").append(formatWIB(o.getCreatedAt())).append("\n\n");
        sb.append("--- Item ---\n");
        if (o.getItems() != null) {
            for (var item : o.getItems()) {
                sb.append("- ").append(item.getName())
                        .append(" x").append(item.getQuantity() != null ? item.getQuantity() : 0)
                        .append(" @Rp ").append(item.getPrice() != null
                                ? fmt.format(item.getPrice().longValue()) : "0");
                if (item.getVariantName() != null && !item.getVariantName().isBlank()) {
                    sb.append(" (").append(item.getVariantName()).append(")");
                }
                if (item.getNote() != null && !item.getNote().isBlank()) {
                    sb.append("\n  Catatan: ").append(item.getNote());
                }
                sb.append("\n");
            }
        }

        JTextArea ta = new JTextArea(sb.toString());
        ta.setEditable(false);
        ta.setFont(new Font("Monospaced", Font.PLAIN, 12));
        JScrollPane sp = new JScrollPane(ta);
        sp.setPreferredSize(new Dimension(450, 350));
        JOptionPane.showMessageDialog(this, sp, "Detail Pesanan", JOptionPane.PLAIN_MESSAGE);
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

    private void updateStatus(String newStatus) {
        VendorOrder o = selectedOrder();
        if (o == null) return;

        String confirmMsg = switch (newStatus) {
            case "PROCESSING" -> "Proses pesanan ini?";
            case "READY" -> "Tandai pesanan siap?";
            case "COMPLETED" -> "Selesaikan pesanan?";
            default -> "Update status?";
        };

        int confirm = JOptionPane.showConfirmDialog(this, confirmMsg, "Konfirmasi",
                JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    OrderService.updateStatus(o.getId(), newStatus);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(PesananPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }
}
