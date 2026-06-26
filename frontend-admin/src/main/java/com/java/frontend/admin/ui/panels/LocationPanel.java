package com.java.frontend.admin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java.frontend.admin.model.AdminLocation;
import com.java.frontend.admin.service.LocationService;
import com.java.frontend.admin.ui.components.FormDialog;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class LocationPanel extends JPanel {

    private final DefaultTableModel tableModel;
    private final JTable table;
    private List<AdminLocation> data;
    private final Gson gson = new Gson();
    private JLabel errorLabel;
    private JPanel tableContainer;

    public LocationPanel() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        String[] cols = {"ID", "Nama", "Alamat", "Latitude", "Longitude"};
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
                    data = LocationService.findAll();
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        for (AdminLocation l : data) {
                            tableModel.addRow(new Object[]{
                                    l.getId(),
                                    l.getName(),
                                    l.getAddress() != null ? l.getAddress() : "-",
                                    l.getLatitude() != null ? String.valueOf(l.getLatitude()) : "-",
                                    l.getLongitude() != null ? String.valueOf(l.getLongitude()) : "-"
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
            JOptionPane.showMessageDialog(this, "Pilih lokasi dulu");
            return -1;
        }
        return row;
    }

    private AdminLocation selectedLocation() {
        int row = selectedRow();
        return row >= 0 && data != null && row < data.size() ? data.get(row) : null;
    }

    private void tambah() {
        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Alamat", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Latitude", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Longitude", FormDialog.FieldType.TEXT, "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Tambah Lokasi", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(0));
            obj.addProperty("address", vals.get(1));
            if (!vals.get(2).isBlank()) obj.addProperty("latitude", Double.parseDouble(vals.get(2)));
            if (!vals.get(3).isBlank()) obj.addProperty("longitude", Double.parseDouble(vals.get(3)));

            callCreate(gson.toJson(obj));
        }
    }

    private void edit() {
        AdminLocation l = selectedLocation();
        if (l == null) return;

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("ID", FormDialog.FieldType.READ_ONLY, l.getId()),
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, l.getName()),
                new FormDialog.FieldDef("Alamat", FormDialog.FieldType.TEXT, l.getAddress() != null ? l.getAddress() : ""),
                new FormDialog.FieldDef("Latitude", FormDialog.FieldType.TEXT,
                        l.getLatitude() != null ? String.valueOf(l.getLatitude()) : ""),
                new FormDialog.FieldDef("Longitude", FormDialog.FieldType.TEXT,
                        l.getLongitude() != null ? String.valueOf(l.getLongitude()) : "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Edit Lokasi", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(1));
            obj.addProperty("address", vals.get(2));
            if (!vals.get(3).isBlank()) obj.addProperty("latitude", Double.parseDouble(vals.get(3)));
            if (!vals.get(4).isBlank()) obj.addProperty("longitude", Double.parseDouble(vals.get(4)));

            callUpdate(l.getId(), gson.toJson(obj));
        }
    }

    private void callCreate(String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    LocationService.create(json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(LocationPanel.this, "Gagal: " + error);
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
                    LocationService.update(id, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(LocationPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void hapus() {
        AdminLocation l = selectedLocation();
        if (l == null) return;

        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus " + l.getName() + "?", "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    LocationService.delete(l.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(LocationPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

}
