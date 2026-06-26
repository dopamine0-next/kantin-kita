package com.java.frontend.kantin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java.frontend.kantin.model.ComboItem;
import com.java.frontend.kantin.model.VendorMenuItem;
import com.java.frontend.kantin.service.MenuItemService;
import com.java.frontend.kantin.service.RestaurantService;
import com.java.frontend.kantin.ui.components.FormDialog;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.text.DecimalFormat;
import java.util.List;
import java.util.function.Supplier;

public class MenuItemPanel extends JPanel {

    private final Supplier<String> restaurantIdSupplier;
    private final DefaultTableModel tableModel;
    private final JTable table;
    private List<VendorMenuItem> data;
    private final Gson gson = new Gson();
    private final DecimalFormat fmt = new DecimalFormat("#,###");
    private final JLabel errorLabel = new JLabel("", SwingConstants.CENTER);
    private List<ComboItem> menuCategories;

    public MenuItemPanel(Supplier<String> restaurantIdSupplier) {
        this.restaurantIdSupplier = restaurantIdSupplier;
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        String[] cols = {"ID", "Nama", "Kategori", "Harga", "Diskon", "Populer"};
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
        JButton tambahBtn = new JButton("Tambah");
        JButton editBtn = new JButton("Edit");
        JButton hapusBtn = new JButton("Hapus");
        JButton popularBtn = new JButton("Toggle Populer");
        JButton refreshBtn = new JButton("Segarkan");

        tambahBtn.addActionListener(e -> tambah());
        editBtn.addActionListener(e -> edit());
        hapusBtn.addActionListener(e -> hapus());
        popularBtn.addActionListener(e -> togglePopular());
        refreshBtn.addActionListener(e -> refresh());

        btnPanel.add(tambahBtn);
        btnPanel.add(editBtn);
        btnPanel.add(hapusBtn);
        btnPanel.add(popularBtn);
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
                    menuCategories = RestaurantService.getMenuCategories();
                    data = MenuItemService.listMenus(rid);
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        if (data != null) {
                            for (VendorMenuItem m : data) {
                                boolean hasDiscount = m.getPrice() != null && m.getOriginalPrice() != null
                                        && m.getOriginalPrice() > m.getPrice();
                                tableModel.addRow(new Object[]{
                                        m.getId(),
                                        m.getName(),
                                        m.getCategory(),
                                        "Rp " + fmt.format(m.getPrice().longValue()),
                                        hasDiscount ? "Rp " + fmt.format(m.getOriginalPrice().longValue() - m.getPrice().longValue()) : "-",
                                        Boolean.TRUE.equals(m.getIsPopular()) ? "Ya" : "Tidak"
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
            JOptionPane.showMessageDialog(this, "Pilih menu dulu");
            return -1;
        }
        return row;
    }

    private VendorMenuItem selectedMenu() {
        int row = selectedRow();
        return row >= 0 && data != null && row < data.size() ? data.get(row) : null;
    }

    private void tambah() {
        String rid = restaurantIdSupplier.get();
        if (rid == null) return;

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Deskripsi", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Harga", FormDialog.FieldType.TEXT, "0"),
                new FormDialog.FieldDef("Harga Asli", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Gambar", FormDialog.FieldType.IMAGE_UPLOAD, ""),
                new FormDialog.FieldDef("Kategori", FormDialog.FieldType.COMBOBOX, "",
                        menuCategories != null ? menuCategories : List.of())
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this),
                "Tambah Menu", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(0));
            obj.addProperty("description", vals.get(1));
            obj.addProperty("price", Double.parseDouble(vals.get(2).isBlank() ? "0" : vals.get(2)));
            if (!vals.get(3).isBlank()) obj.addProperty("originalPrice", Double.parseDouble(vals.get(3)));
            if (!vals.get(4).isBlank()) obj.addProperty("imageUrl", vals.get(4));
            obj.addProperty("categoryId", vals.get(5));

            callCreate(rid, gson.toJson(obj));
        }
    }

    private void edit() {
        VendorMenuItem m = selectedMenu();
        if (m == null) return;

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("ID", FormDialog.FieldType.READ_ONLY, m.getId()),
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, m.getName()),
                new FormDialog.FieldDef("Deskripsi", FormDialog.FieldType.TEXT,
                        m.getDescription() != null ? m.getDescription() : ""),
                new FormDialog.FieldDef("Harga", FormDialog.FieldType.TEXT,
                        String.valueOf(m.getPrice().longValue())),
                new FormDialog.FieldDef("Harga Asli", FormDialog.FieldType.TEXT,
                        m.getOriginalPrice() != null ? String.valueOf(m.getOriginalPrice().longValue()) : ""),
                new FormDialog.FieldDef("Gambar", FormDialog.FieldType.IMAGE_UPLOAD,
                        m.getImageUrl() != null ? m.getImageUrl() : ""),
                new FormDialog.FieldDef("Kategori", FormDialog.FieldType.COMBOBOX,
                        m.getCategoryId(), menuCategories != null ? menuCategories : List.of())
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this),
                "Edit Menu", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(1));
            obj.addProperty("description", vals.get(2));
            obj.addProperty("price", Double.parseDouble(vals.get(3).isBlank() ? "0" : vals.get(3)));
            if (!vals.get(4).isBlank()) obj.addProperty("originalPrice", Double.parseDouble(vals.get(4)));
            if (!vals.get(5).isBlank()) obj.addProperty("imageUrl", vals.get(5));
            obj.addProperty("categoryId", vals.get(6));

            callUpdate(m.getId(), gson.toJson(obj));
        }
    }

    private void togglePopular() {
        VendorMenuItem m = selectedMenu();
        if (m == null) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    MenuItemService.togglePopular(m.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(MenuItemPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void callCreate(String restaurantId, String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    MenuItemService.create(restaurantId, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(MenuItemPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void callUpdate(String menuId, String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    MenuItemService.update(menuId, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(MenuItemPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void hapus() {
        VendorMenuItem m = selectedMenu();
        if (m == null) return;

        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus " + m.getName() + "?", "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    MenuItemService.delete(m.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(MenuItemPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }
}
