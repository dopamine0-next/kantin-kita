package com.java.frontend.kantin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java.frontend.kantin.model.VendorRestaurant;
import com.java.frontend.kantin.service.RestaurantService;
import com.java.frontend.kantin.ui.components.FormDialog;
import com.java.frontend.kantin.ui.components.ImageUploadField;

import javax.swing.*;
import java.awt.*;
import java.util.List;
import java.util.function.Supplier;

public class ProfilKedaiPanel extends JPanel {

    private final Supplier<String> restaurantIdSupplier;
    private final Gson gson = new Gson();
    private JLabel nameLabel;
    private JLabel categoryLabel;
    private JLabel statusLabel;
    private JLabel addressLabel;
    private JLabel hoursLabel;
    private JLabel ratingLabel;
    private JLabel imageLabel;
    private VendorRestaurant data;
    private final JLabel errorLabel = new JLabel("", SwingConstants.CENTER);

    public ProfilKedaiPanel(Supplier<String> restaurantIdSupplier) {
        this.restaurantIdSupplier = restaurantIdSupplier;
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        errorLabel.setForeground(new Color(217, 83, 79));
        errorLabel.setVisible(false);
        add(errorLabel, BorderLayout.NORTH);

        JPanel centerPanel = new JPanel(new GridBagLayout());
        centerPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        gbc.gridx = 0; gbc.gridy = 0;
        centerPanel.add(new JLabel("Nama Kedai:"), gbc);
        gbc.gridx = 1;
        nameLabel = new JLabel("-");
        centerPanel.add(nameLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 1;
        centerPanel.add(new JLabel("Kategori:"), gbc);
        gbc.gridx = 1;
        categoryLabel = new JLabel("-");
        centerPanel.add(categoryLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 2;
        centerPanel.add(new JLabel("Status:"), gbc);
        gbc.gridx = 1;
        statusLabel = new JLabel("-");
        centerPanel.add(statusLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 3;
        centerPanel.add(new JLabel("Alamat:"), gbc);
        gbc.gridx = 1;
        addressLabel = new JLabel("-");
        centerPanel.add(addressLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 4;
        centerPanel.add(new JLabel("Jam Operasional:"), gbc);
        gbc.gridx = 1;
        hoursLabel = new JLabel("-");
        centerPanel.add(hoursLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 5;
        centerPanel.add(new JLabel("Rating:"), gbc);
        gbc.gridx = 1;
        ratingLabel = new JLabel("-");
        centerPanel.add(ratingLabel, gbc);

        gbc.gridx = 0; gbc.gridy = 6;
        centerPanel.add(new JLabel("Gambar:"), gbc);
        gbc.gridx = 1;
        imageLabel = new JLabel();
        imageLabel.setPreferredSize(new Dimension(100, 100));
        imageLabel.setBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY));
        centerPanel.add(imageLabel, gbc);

        add(centerPanel, BorderLayout.CENTER);

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 5));
        JButton editBtn = new JButton("Edit Profil");
        JButton toggleBtn = new JButton("Buka/Tutup");
        JButton hoursBtn = new JButton("Atur Jam");
        JButton refreshBtn = new JButton("Segarkan");

        editBtn.addActionListener(e -> edit());
        toggleBtn.addActionListener(e -> toggleStatus());
        hoursBtn.addActionListener(e -> editHours());
        refreshBtn.addActionListener(e -> refresh());

        btnPanel.add(editBtn);
        btnPanel.add(toggleBtn);
        btnPanel.add(hoursBtn);
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
                    data = RestaurantService.getRestaurant(rid);
                    SwingUtilities.invokeLater(() -> updateDisplay());
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

    private void updateDisplay() {
        if (data == null) return;
        nameLabel.setText(data.getName());
        categoryLabel.setText(data.getRestaurantCategory() != null
                ? data.getRestaurantCategory().getName() : "-");
        statusLabel.setText(Boolean.TRUE.equals(data.getIsOpen()) ? "Buka" : "Tutup");
        addressLabel.setText(data.getAddress() != null ? data.getAddress() : "-");
        hoursLabel.setText(data.getOperationalHours() != null ? data.getOperationalHours() : "-");
        ratingLabel.setText(data.getRating() != null
                ? String.format("%.1f (%d ulasan)", data.getRating(), data.getRatingCount() != null ? data.getRatingCount() : 0)
                : "Belum ada rating");
    }

    private void edit() {
        if (data == null) return;
        String rid = restaurantIdSupplier.get();
        if (rid == null) return;

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("ID", FormDialog.FieldType.READ_ONLY, data.getId()),
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, data.getName()),
                new FormDialog.FieldDef("Alamat", FormDialog.FieldType.TEXT,
                        data.getAddress() != null ? data.getAddress() : ""),
                new FormDialog.FieldDef("Gambar", FormDialog.FieldType.IMAGE_UPLOAD,
                        data.getImageUrl() != null ? data.getImageUrl() : ""),
                new FormDialog.FieldDef("Banner", FormDialog.FieldType.IMAGE_UPLOAD,
                        data.getBannerImageUrl() != null ? data.getBannerImageUrl() : "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this),
                "Edit Profil Kedai", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(1));
            obj.addProperty("address", vals.get(2));
            obj.addProperty("imageUrl", vals.get(3));
            obj.addProperty("bannerImageUrl", vals.get(4));

            new SwingWorker<Void, Void>() {
                private String error;
                @Override
                protected Void doInBackground() {
                    try {
                        data = RestaurantService.updateRestaurant(rid, gson.toJson(obj));
                    } catch (Exception ex) {
                        error = ex.getMessage();
                    }
                    return null;
                }
                @Override
                protected void done() {
                    if (error != null) {
                        JOptionPane.showMessageDialog(ProfilKedaiPanel.this,
                                "Gagal: " + error);
                    } else {
                        updateDisplay();
                    }
                }
            }.execute();
        }
    }

    private void toggleStatus() {
        String rid = restaurantIdSupplier.get();
        if (rid == null) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    data = RestaurantService.toggleStatus(rid);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(ProfilKedaiPanel.this,
                            "Gagal: " + error);
                } else {
                    updateDisplay();
                }
            }
        }.execute();
    }

    private void editHours() {
        if (data == null) return;
        String rid = restaurantIdSupplier.get();
        if (rid == null) return;

        String currentHours = data.getOperationalHours() != null ? data.getOperationalHours() : "08:00 - 17:00";
        String[] parts = currentHours.split(" - ");
        String defaultOpen = parts.length > 0 ? parts[0].trim() : "08:00";
        String defaultClose = parts.length > 1 ? parts[1].trim() : "17:00";

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Jam Buka", FormDialog.FieldType.TIME, defaultOpen),
                new FormDialog.FieldDef("Jam Tutup", FormDialog.FieldType.TIME, defaultClose)
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this),
                "Atur Jam Operasional", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            String hours = vals.get(0) + " - " + vals.get(1);

            new SwingWorker<Void, Void>() {
                private String error;
                @Override
                protected Void doInBackground() {
                    try {
                        data = RestaurantService.updateHours(rid, hours);
                    } catch (Exception ex) {
                        error = ex.getMessage();
                    }
                    return null;
                }
                @Override
                protected void done() {
                    if (error != null) {
                        JOptionPane.showMessageDialog(ProfilKedaiPanel.this,
                                "Gagal: " + error);
                    } else {
                        updateDisplay();
                    }
                }
            }.execute();
        }
    }
}
