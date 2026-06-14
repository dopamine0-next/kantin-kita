package com.java.frontend.admin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminBanner;
import com.java.frontend.admin.model.ComboItem;
import com.java.frontend.admin.service.BannerService;
import com.java.frontend.admin.ui.components.FormDialog;

import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class BannerPanel extends JPanel {

    private final DefaultTableModel tableModel;
    private final JTable table;
    private List<AdminBanner> data;
    private final Gson gson = new Gson();
    private JLabel errorLabel;
    private JLabel previewLabel;
    private JPanel previewPanel;
    private JButton toggleBtn;
    private static final int PREVIEW_WIDTH = 640;
    private static final int PREVIEW_HEIGHT = 360;

    public BannerPanel() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        String[] cols = {"ID", "Judul", "Gambar", "Lokasi", "Status"};
        tableModel = new DefaultTableModel(cols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        table = new JTable(tableModel);
        table.setFillsViewportHeight(true);
        table.setRowHeight(28);

        errorLabel = new JLabel("", SwingConstants.CENTER);
        errorLabel.setForeground(new Color(217, 83, 79));
        errorLabel.setVisible(false);

        JScrollPane tableScroll = new JScrollPane(table);

        previewLabel = new JLabel("Pilih banner untuk melihat preview", SwingConstants.CENTER);
        previewLabel.setPreferredSize(new Dimension(PREVIEW_WIDTH, PREVIEW_HEIGHT));
        previewLabel.setMinimumSize(new Dimension(200, 113));
        previewLabel.setOpaque(true);
        previewLabel.setBackground(new Color(200, 200, 200));
        previewLabel.setForeground(Color.DARK_GRAY);
        previewLabel.setFont(previewLabel.getFont().deriveFont(Font.BOLD, 14));

        previewPanel = new JPanel(new BorderLayout());
        previewPanel.setBorder(BorderFactory.createTitledBorder("Preview Banner (16:9)"));
        previewPanel.add(previewLabel, BorderLayout.CENTER);

        JSplitPane split = new JSplitPane(JSplitPane.VERTICAL_SPLIT, tableScroll, previewPanel);
        split.setResizeWeight(0.6);
        split.setDividerSize(5);
        add(split, BorderLayout.CENTER);

        JPanel topPanel = new JPanel(new BorderLayout());
        topPanel.add(errorLabel, BorderLayout.NORTH);
        add(topPanel, BorderLayout.NORTH);

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 5));
        JButton tambahBtn = new JButton("Tambah");
        JButton editBtn = new JButton("Edit");
        toggleBtn = new JButton("Nonaktifkan");
        toggleBtn.setEnabled(false);
        JButton hapusBtn = new JButton("Hapus");
        JButton refreshBtn = new JButton("Segarkan");

        tambahBtn.addActionListener(e -> tambah());
        editBtn.addActionListener(e -> edit());
        toggleBtn.addActionListener(e -> toggle());
        hapusBtn.addActionListener(e -> hapus());
        refreshBtn.addActionListener(e -> loadData());

        btnPanel.add(tambahBtn);
        btnPanel.add(editBtn);
        btnPanel.add(toggleBtn);
        btnPanel.add(hapusBtn);
        btnPanel.add(refreshBtn);
        add(btnPanel, BorderLayout.SOUTH);

        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) {
                updateToggleButton();
                showPreview();
            }
        });

        loadData();
    }

    private void updateToggleButton() {
        AdminBanner b = getSelectedBanner();
        if (b != null) {
            toggleBtn.setText(b.getIsActive() != null && b.getIsActive() ? "Nonaktifkan" : "Aktifkan");
            toggleBtn.setEnabled(true);
        } else {
            toggleBtn.setEnabled(false);
        }
    }

    private void showPreview() {
        AdminBanner b = getSelectedBanner();
        if (b == null || b.getImageUrl() == null || b.getImageUrl().isBlank()) {
            previewLabel.setIcon(null);
            previewLabel.setText("Pilih banner untuk melihat preview");
            return;
        }

        previewLabel.setText("Memuat...");
        previewLabel.setIcon(null);

        new SwingWorker<ImageIcon, Void>() {
            private String errMsg;
            @Override
            protected ImageIcon doInBackground() {
                try {
                    BufferedImage img = ImageIO.read(new URL(b.getImageUrl()));
                    if (img == null) throw new Exception("Gagal membaca gambar");
                    int w = PREVIEW_WIDTH;
                    int h = w * 9 / 16;
                    return new ImageIcon(img.getScaledInstance(w, h, Image.SCALE_SMOOTH));
                } catch (Exception ex) {
                    errMsg = ex.getMessage();
                    return null;
                }
            }
            @Override
            protected void done() {
                ImageIcon icon;
                try {
                    icon = get();
                } catch (Exception ex) {
                    icon = null;
                    errMsg = ex.getMessage();
                }
                if (icon != null) {
                    previewLabel.setIcon(icon);
                    previewLabel.setText("");
                } else {
                    previewLabel.setIcon(null);
                    previewLabel.setText("Gagal memuat gambar" + (errMsg != null ? ": " + errMsg : ""));
                }
            }
        }.execute();
    }

    private void loadData() {
        SwingUtilities.invokeLater(() -> errorLabel.setVisible(false));
        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    data = BannerService.findAll();
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        for (AdminBanner b : data) {
                            tableModel.addRow(new Object[]{
                                    b.getId(),
                                    b.getTitle() != null ? b.getTitle() : "-",
                                    b.getImageUrl() != null ? b.getImageUrl() : "-",
                                    b.getLocation() != null ? b.getLocation().getName() : "-",
                                    b.getIsActive() != null && b.getIsActive() ? "Aktif" : "Nonaktif"
                            });
                        }
                        tableContainerRevalidate();
                        updateToggleButton();
                        showPreview();
                    });
                } catch (Exception ex) {
                    SwingUtilities.invokeLater(() -> {
                        errorLabel.setText("Gagal memuat data: " + ex.getMessage());
                        errorLabel.setVisible(true);
                        tableContainerRevalidate();
                    });
                }
                return null;
            }
        }.execute();
    }

    private void tableContainerRevalidate() {
        revalidate();
        repaint();
    }

    private int selectedRow() {
        int row = table.getSelectedRow();
        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Pilih banner dulu");
            return -1;
        }
        return row;
    }

    private AdminBanner getSelectedBanner() {
        int row = table.getSelectedRow();
        return row >= 0 && data != null && row < data.size() ? data.get(row) : null;
    }

    private List<ComboItem> fetchLocations() {
        try {
            String json = ApiClient.get("/admin/locations");
            JsonArray arr = gson.fromJson(json, JsonArray.class);
            List<ComboItem> items = new ArrayList<>();
            for (int i = 0; i < arr.size(); i++) {
                JsonObject obj = arr.get(i).getAsJsonObject();
                items.add(new ComboItem(
                        obj.get("id").getAsString(),
                        obj.get("name").getAsString()));
            }
            return items;
        } catch (Exception e) {
            return List.of();
        }
    }

    private void tambah() {
        List<ComboItem> locations = fetchLocations();

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("URL Gambar", FormDialog.FieldType.IMAGE_UPLOAD, "https://"),
                new FormDialog.FieldDef("Judul", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Link URL", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Lokasi", FormDialog.FieldType.COMBOBOX, "", locations)
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Tambah Banner", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("imageUrl", vals.get(0));
            if (!vals.get(1).isBlank()) obj.addProperty("title", vals.get(1));
            if (!vals.get(2).isBlank()) obj.addProperty("linkUrl", vals.get(2));
            if (!vals.get(3).isBlank()) obj.addProperty("locationId", vals.get(3));

            callCreate(gson.toJson(obj));
        }
    }

    private void edit() {
        AdminBanner b = getSelectedBanner();
        if (b == null) return;

        List<ComboItem> locations = fetchLocations();

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("ID", FormDialog.FieldType.READ_ONLY, b.getId()),
                new FormDialog.FieldDef("URL Gambar", FormDialog.FieldType.IMAGE_UPLOAD,
                        b.getImageUrl() != null ? b.getImageUrl() : ""),
                new FormDialog.FieldDef("Judul", FormDialog.FieldType.TEXT,
                        b.getTitle() != null ? b.getTitle() : ""),
                new FormDialog.FieldDef("Link URL", FormDialog.FieldType.TEXT,
                        b.getLinkUrl() != null ? b.getLinkUrl() : ""),
                new FormDialog.FieldDef("Lokasi", FormDialog.FieldType.COMBOBOX,
                        b.getLocation() != null ? b.getLocation().getId() : "", locations)
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Edit Banner", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("imageUrl", vals.get(1));
            if (!vals.get(2).isBlank()) obj.addProperty("title", vals.get(2));
            if (!vals.get(3).isBlank()) obj.addProperty("linkUrl", vals.get(3));
            if (!vals.get(4).isBlank()) obj.addProperty("locationId", vals.get(4));

            callUpdate(b.getId(), gson.toJson(obj));
        }
    }

    private void toggle() {
        AdminBanner b = getSelectedBanner();
        if (b == null) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    BannerService.toggleActive(b.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(BannerPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void callCreate(String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    BannerService.create(json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(BannerPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void callUpdate(String id, String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    BannerService.update(id, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(BannerPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void hapus() {
        AdminBanner b = getSelectedBanner();
        if (b == null) return;

        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus banner " + (b.getTitle() != null ? b.getTitle() : "") + "?",
                "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    BannerService.delete(b.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(BannerPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

}
