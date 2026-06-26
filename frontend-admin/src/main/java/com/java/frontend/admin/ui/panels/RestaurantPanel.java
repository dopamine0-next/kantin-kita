package com.java.frontend.admin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.java.frontend.admin.config.ApiClient;
import com.java.frontend.admin.model.AdminRestaurant;
import com.java.frontend.admin.model.ComboItem;
import com.java.frontend.admin.service.RestaurantService;
import com.java.frontend.admin.ui.components.FormDialog;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.lang.reflect.Type;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

public class RestaurantPanel extends JPanel {

    private final DecimalFormat fmt = new DecimalFormat("#,###");
    private final DefaultTableModel tableModel;
    private final JTable table;
    private final JTextField searchField;
    private List<AdminRestaurant> data;
    private final Gson gson = new Gson();
    private JLabel errorLabel;
    private JPanel tableContainer;

    public RestaurantPanel() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        JPanel topBar = new JPanel(new BorderLayout(10, 0));
        searchField = new JTextField();
        searchField.putClientProperty("JTextField.placeholderText", "Cari restoran...");
        JButton searchBtn = new JButton("Cari");
        searchBtn.addActionListener(e -> loadData());
        JPanel searchPanel = new JPanel(new BorderLayout(5, 0));
        searchPanel.add(searchField, BorderLayout.CENTER);
        searchPanel.add(searchBtn, BorderLayout.EAST);
        topBar.add(searchPanel, BorderLayout.CENTER);
        add(topBar, BorderLayout.NORTH);

        String[] cols = {"ID", "Nama", "Kategori", "Vendor", "Jam", "Harga", "Rating", "Status"};
        tableModel = new DefaultTableModel(cols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        table = new JTable(tableModel);
        table.setFillsViewportHeight(true);
        table.setRowHeight(28);

        errorLabel = new JLabel("", SwingConstants.CENTER);
        errorLabel.setForeground(new Color(217, 83, 79));
        errorLabel.setVisible(false);

        tableContainer = new JPanel(new BorderLayout());
        tableContainer.add(errorLabel, BorderLayout.NORTH);
        tableContainer.add(new JScrollPane(table), BorderLayout.CENTER);
        add(tableContainer, BorderLayout.CENTER);

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 5));
        JButton tambahBtn = new JButton("Tambah");
        JButton editBtn = new JButton("Edit");
        JButton hapusBtn = new JButton("Hapus");
        JButton refreshBtn = new JButton("Segarkan");

        tambahBtn.addActionListener(e -> tambah());
        editBtn.addActionListener(e -> edit());
        hapusBtn.addActionListener(e -> hapus());
        refreshBtn.addActionListener(e -> loadData());

        btnPanel.add(tambahBtn);
        btnPanel.add(editBtn);
        btnPanel.add(hapusBtn);
        btnPanel.add(refreshBtn);
        add(btnPanel, BorderLayout.SOUTH);

        loadData();
    }

    private void loadData() {
        SwingUtilities.invokeLater(() -> errorLabel.setVisible(false));
        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    data = RestaurantService.findAll(searchField.getText().trim(), null, null, null, null);
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        for (AdminRestaurant r : data) {
                            tableModel.addRow(new Object[]{
                                    r.getId(),
                                    r.getName(),
                                    r.getCategory() != null ? r.getCategory().getName() : "-",
                                    r.getVendor() != null ? r.getVendor().getName() : "-",
                                    r.getOperationalHours() != null ? r.getOperationalHours() : "-",
                                    "Rp " + fmt.format(r.getCheapestPrice() != null ? r.getCheapestPrice().longValue() : 0),
                                    r.getRating() != null ? String.format("%.1f", r.getRating()) : "-",
                                    r.getIsOpen() != null && r.getIsOpen() ? "Buka" : "Tutup"
                            });
                        }
                        tableContainer.revalidate();
                        tableContainer.repaint();
                    });
                } catch (Exception ex) {
                    SwingUtilities.invokeLater(() -> {
                        errorLabel.setText("Gagal memuat data: " + ex.getMessage());
                        errorLabel.setVisible(true);
                        tableContainer.revalidate();
                    });
                }
                return null;
            }
        }.execute();
    }

    private int selectedRow() {
        int row = table.getSelectedRow();
        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Pilih restoran dulu");
            return -1;
        }
        return row;
    }

    private AdminRestaurant selectedRestaurant() {
        int row = selectedRow();
        return row >= 0 && data != null && row < data.size() ? data.get(row) : null;
    }

    private List<ComboItem> fetchRefData(String path) {
        try {
            String json = ApiClient.get(path);
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

    private List<ComboItem> fetchVendors() {
        try {
            String json = ApiClient.get("/admin/vendors");
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
        List<ComboItem> categories = fetchRefData("/admin/restaurant-categories");
        List<ComboItem> vendors = fetchVendors();
        List<ComboItem> locations = fetchRefData("/admin/locations");

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Vendor", FormDialog.FieldType.COMBOBOX, "", vendors),
                new FormDialog.FieldDef("Kategori", FormDialog.FieldType.COMBOBOX, "", categories),
                new FormDialog.FieldDef("Lokasi", FormDialog.FieldType.COMBOBOX, "", locations),
                new FormDialog.FieldDef("Jam Buka", FormDialog.FieldType.TIME, "08:00"),
                new FormDialog.FieldDef("Jam Tutup", FormDialog.FieldType.TIME, "17:00"),
                new FormDialog.FieldDef("Harga Termurah", FormDialog.FieldType.TEXT, "5000"),
                new FormDialog.FieldDef("URL Gambar", FormDialog.FieldType.IMAGE_UPLOAD, "https://"),
                new FormDialog.FieldDef("Banner URL", FormDialog.FieldType.IMAGE_UPLOAD, ""),
                new FormDialog.FieldDef("Alamat", FormDialog.FieldType.TEXT, "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Tambah Restoran", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(0));
            obj.addProperty("vendorId", vals.get(1));
            obj.addProperty("restaurantCategoryId", vals.get(2));
            obj.addProperty("locationId", vals.get(3));
            obj.addProperty("operationalHours", vals.get(4) + " - " + vals.get(5));
            obj.addProperty("cheapestPrice", Double.parseDouble(vals.get(6)));
            obj.addProperty("imageUrl", vals.get(7));
            if (!vals.get(8).isBlank()) obj.addProperty("bannerImageUrl", vals.get(8));
            obj.addProperty("address", vals.get(9));
            obj.addProperty("isOpen", true);

            callCreate(gson.toJson(obj));
        }
    }

    private void edit() {
        AdminRestaurant r = selectedRestaurant();
        if (r == null) return;

        List<ComboItem> categories = fetchRefData("/admin/restaurant-categories");
        List<ComboItem> vendors = fetchVendors();
        List<ComboItem> locations = fetchRefData("/admin/locations");

        String hours = r.getOperationalHours() != null ? r.getOperationalHours() : "08:00 - 17:00";
        String[] parts = hours.split("\\s*-\\s*");
        String openTime = parts.length > 0 ? parts[0].trim() : "08:00";
        String closeTime = parts.length > 1 ? parts[1].trim() : "17:00";

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("ID", FormDialog.FieldType.READ_ONLY, r.getId()),
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, r.getName()),
                new FormDialog.FieldDef("Vendor", FormDialog.FieldType.COMBOBOX,
                        r.getVendor() != null ? r.getVendor().getId() : "", vendors),
                new FormDialog.FieldDef("Kategori", FormDialog.FieldType.COMBOBOX,
                        r.getCategory() != null ? r.getCategory().getId() : "", categories),
                new FormDialog.FieldDef("Lokasi", FormDialog.FieldType.COMBOBOX,
                        r.getLocation() != null ? r.getLocation().getId() : "", locations),
                new FormDialog.FieldDef("Jam Buka", FormDialog.FieldType.TIME, openTime),
                new FormDialog.FieldDef("Jam Tutup", FormDialog.FieldType.TIME, closeTime),
                new FormDialog.FieldDef("Harga Termurah", FormDialog.FieldType.TEXT,
                        r.getCheapestPrice() != null ? String.valueOf(r.getCheapestPrice().longValue()) : ""),
                new FormDialog.FieldDef("URL Gambar", FormDialog.FieldType.IMAGE_UPLOAD,
                        r.getImageUrl() != null ? r.getImageUrl() : ""),
                new FormDialog.FieldDef("Banner URL", FormDialog.FieldType.IMAGE_UPLOAD,
                        r.getBannerImageUrl() != null ? r.getBannerImageUrl() : ""),
                new FormDialog.FieldDef("Alamat", FormDialog.FieldType.TEXT,
                        r.getAddress() != null ? r.getAddress() : "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Edit Restoran", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(1));
            obj.addProperty("vendorId", vals.get(2));
            obj.addProperty("restaurantCategoryId", vals.get(3));
            obj.addProperty("locationId", vals.get(4));
            obj.addProperty("operationalHours", vals.get(5) + " - " + vals.get(6));
            obj.addProperty("cheapestPrice", Double.parseDouble(vals.get(7)));
            obj.addProperty("imageUrl", vals.get(8));
            if (!vals.get(9).isBlank()) obj.addProperty("bannerImageUrl", vals.get(9));
            obj.addProperty("address", vals.get(10));

            callUpdate(r.getId(), gson.toJson(obj));
        }
    }

    private void callCreate(String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    RestaurantService.create(json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(RestaurantPanel.this, "Gagal: " + error);
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
                    RestaurantService.update(id, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(RestaurantPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void hapus() {
        AdminRestaurant r = selectedRestaurant();
        if (r == null) return;

        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus " + r.getName() + "?", "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    RestaurantService.delete(r.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(RestaurantPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }


}
