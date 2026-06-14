package com.java.frontend.kantin.ui.panels;

import com.java.frontend.kantin.model.VendorReview;
import com.java.frontend.kantin.service.ReviewService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.function.Supplier;

public class UlasanPanel extends JPanel {

    private final Supplier<String> restaurantIdSupplier;
    private final DefaultTableModel tableModel;
    private final JTable table;
    private final JLabel errorLabel = new JLabel("", SwingConstants.CENTER);
    private final JLabel avgLabel = new JLabel("Rating Rata-rata: -", SwingConstants.CENTER);

    public UlasanPanel(Supplier<String> restaurantIdSupplier) {
        this.restaurantIdSupplier = restaurantIdSupplier;
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        avgLabel.setFont(new Font("Segoe UI", Font.BOLD, 16));
        avgLabel.setForeground(new Color(240, 173, 78));
        add(avgLabel, BorderLayout.NORTH);

        String[] cols = {"ID", "Pengguna", "Rating", "Tanggal"};
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

        SwingUtilities.invokeLater(() -> errorLabel.setVisible(false));
        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    List<VendorReview> reviews = ReviewService.getReviews(rid);
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        double sum = 0;
                        if (reviews != null) {
                            for (VendorReview r : reviews) {
                                sum += r.getRating();
                                tableModel.addRow(new Object[]{
                                        r.getId(),
                                        r.getUserName(),
                                        r.getRating() + "/5",
                                        formatWIB(r.getCreatedAt())
                                });
                            }
                        }
                        if (!reviews.isEmpty()) {
                            double avg = sum / reviews.size();
                            avgLabel.setText(String.format("Rating Rata-rata: %.1f / 5 (dari %d ulasan)",
                                    avg, reviews.size()));
                        } else {
                            avgLabel.setText("Belum ada ulasan");
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
}
