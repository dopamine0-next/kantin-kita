package com.java.frontend.admin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java.frontend.admin.model.AdminVendor;
import com.java.frontend.admin.service.VendorService;
import com.java.frontend.admin.ui.components.FormDialog;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;
import java.util.stream.Collectors;

public class VendorPanel extends JPanel {

    private final DefaultTableModel tableModel;
    private final JTable table;
    private final JTextField searchField;
    private List<AdminVendor> data;
    private final Gson gson = new Gson();
    private JLabel errorLabel;
    private JPanel tableContainer;

    public VendorPanel() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        JPanel topBar = new JPanel(new BorderLayout(10, 0));
        searchField = new JTextField();
        searchField.putClientProperty("JTextField.placeholderText", "Cari vendor...");
        JButton searchBtn = new JButton("Cari");
        searchBtn.addActionListener(e -> loadData());
        JPanel searchPanel = new JPanel(new BorderLayout(5, 0));
        searchPanel.add(searchField, BorderLayout.CENTER);
        searchPanel.add(searchBtn, BorderLayout.EAST);
        topBar.add(searchPanel, BorderLayout.CENTER);
        add(topBar, BorderLayout.NORTH);

        String[] cols = {"ID", "Nama", "Email", "Telepon", "Restoran", "Dibuat"};
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
                    data = VendorService.findAll(searchField.getText().trim());
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        for (AdminVendor v : data) {
                            String restaurants = v.getRestaurants() != null
                                    ? v.getRestaurants().stream()
                                    .map(r -> r.getName())
                                    .collect(Collectors.joining(", "))
                                    : "-";
                            tableModel.addRow(new Object[]{
                                    v.getId(),
                                    v.getName(),
                                    v.getEmail(),
                                    v.getPhone() != null ? v.getPhone() : "-",
                                    restaurants,
                                    v.getCreatedAt() != null ? v.getCreatedAt() : "-"
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
            JOptionPane.showMessageDialog(this, "Pilih vendor dulu");
            return -1;
        }
        return row;
    }

    private AdminVendor selectedVendor() {
        int row = selectedRow();
        return row >= 0 && data != null && row < data.size() ? data.get(row) : null;
    }

    private void tambah() {
        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Email", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Password", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Telepon", FormDialog.FieldType.TEXT, "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Tambah Vendor", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(0));
            obj.addProperty("email", vals.get(1));
            obj.addProperty("password", vals.get(2));
            obj.addProperty("phone", vals.get(3));

            callCreate(gson.toJson(obj));
        }
    }

    private void edit() {
        AdminVendor v = selectedVendor();
        if (v == null) return;

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("ID", FormDialog.FieldType.READ_ONLY, v.getId()),
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, v.getName()),
                new FormDialog.FieldDef("Email", FormDialog.FieldType.TEXT, v.getEmail()),
                new FormDialog.FieldDef("Telepon", FormDialog.FieldType.TEXT, v.getPhone() != null ? v.getPhone() : ""),
                new FormDialog.FieldDef("Password", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Avatar URL", FormDialog.FieldType.IMAGE_UPLOAD,
                        v.getAvatarUrl() != null ? v.getAvatarUrl() : "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Edit Vendor", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(1));
            obj.addProperty("email", vals.get(2));
            obj.addProperty("phone", vals.get(3));
            if (!vals.get(4).isBlank()) obj.addProperty("password", vals.get(4));
            if (!vals.get(5).isBlank()) obj.addProperty("avatarUrl", vals.get(5));

            callUpdate(v.getId(), gson.toJson(obj));
        }
    }

    private void callCreate(String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    VendorService.create(json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(VendorPanel.this, "Gagal: " + error);
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
                    VendorService.update(id, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(VendorPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void hapus() {
        AdminVendor v = selectedVendor();
        if (v == null) return;

        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus " + v.getName() + "?", "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    VendorService.delete(v.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(VendorPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

}
