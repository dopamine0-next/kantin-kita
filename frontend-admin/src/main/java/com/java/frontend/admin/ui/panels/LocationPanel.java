package com.java.frontend.admin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java.frontend.admin.model.AdminLocation;
import com.java.frontend.admin.service.LocationService;
import com.java.frontend.admin.ui.components.FormDialog;
import org.openstreetmap.gui.jmapviewer.Coordinate;
import org.openstreetmap.gui.jmapviewer.JMapViewer;
import org.openstreetmap.gui.jmapviewer.Layer;
import org.openstreetmap.gui.jmapviewer.MapMarkerDot;

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
    private JMapViewer map;

    public LocationPanel() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        map = new JMapViewer();
        map.setPreferredSize(new Dimension(0, 300));
        map.setMinimumSize(new Dimension(0, 200));

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

        JPanel topPanel = new JPanel(new BorderLayout());
        topPanel.add(errorLabel, BorderLayout.NORTH);
        topPanel.add(map, BorderLayout.CENTER);

        JScrollPane tableScroll = new JScrollPane(table);

        JSplitPane split = new JSplitPane(JSplitPane.VERTICAL_SPLIT, topPanel, tableScroll);
        split.setResizeWeight(0.35);
        split.setDividerSize(5);
        add(split, BorderLayout.CENTER);

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
                        updateMapMarkers();
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

    private void updateMapMarkers() {
        map.removeAllMapMarkers();
        double latSum = 0, lonSum = 0;
        int count = 0;
        Layer layer = new Layer("Lokasi");

        for (AdminLocation l : data) {
            if (l.getLatitude() != null && l.getLongitude() != null) {
                MapMarkerDot marker = new MapMarkerDot(layer, l.getName(),
                        new Coordinate(l.getLatitude(), l.getLongitude()));
                map.addMapMarker(marker);
                latSum += l.getLatitude();
                lonSum += l.getLongitude();
                count++;
            }
        }

        if (count > 0) {
            Coordinate center = new Coordinate(latSum / count, lonSum / count);
            int w = map.getWidth() > 0 ? map.getWidth() : 600;
            int h = map.getHeight() > 0 ? map.getHeight() : 300;
            map.setDisplayPosition(new Point(w / 2, h / 2), center, 14);
        }
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
