package com.java.frontend.admin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java.frontend.admin.model.AdminVoucher;
import com.java.frontend.admin.service.VoucherService;
import com.java.frontend.admin.ui.components.FormDialog;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.text.DecimalFormat;
import java.util.List;

public class VoucherPanel extends JPanel {

    private final DecimalFormat fmt = new DecimalFormat("#,###");
    private final DefaultTableModel tableModel;
    private final JTable table;
    private List<AdminVoucher> data;
    private final Gson gson = new Gson();
    private JLabel errorLabel;
    private JPanel tableContainer;
    private JButton toggleBtn;

    public VoucherPanel() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        String[] cols = {"ID", "Kode", "Nilai", "Min Belanja", "Maks Diskon", "Status"};
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
            if (!e.getValueIsAdjusting()) updateToggleButton();
        });

        loadData();
    }

    private void updateToggleButton() {
        AdminVoucher v = getSelectedVoucher();
        if (v != null) {
            toggleBtn.setText(v.getIsActive() != null && v.getIsActive() ? "Nonaktifkan" : "Aktifkan");
            toggleBtn.setEnabled(true);
        } else {
            toggleBtn.setEnabled(false);
        }
    }

    private void loadData() {
        SwingUtilities.invokeLater(() -> errorLabel.setVisible(false));
        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    data = VoucherService.findAll();
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        for (AdminVoucher v : data) {
                            tableModel.addRow(new Object[]{
                                    v.getId(),
                                    v.getCode(),
                                    "Rp " + fmt.format(v.getValue() != null ? v.getValue().longValue() : 0),
                                    v.getMinSpend() != null ? "Rp " + fmt.format(v.getMinSpend().longValue()) : "-",
                                    v.getMaxDiscount() != null ? "Rp " + fmt.format(v.getMaxDiscount().longValue()) : "-",
                                    v.getIsActive() != null && v.getIsActive() ? "Aktif" : "Nonaktif"
                            });
                        }
                        tableContainer.revalidate();
                        tableContainer.repaint();
                        updateToggleButton();
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
            JOptionPane.showMessageDialog(this, "Pilih voucher dulu");
            return -1;
        }
        return row;
    }

    private AdminVoucher getSelectedVoucher() {
        int row = table.getSelectedRow();
        return row >= 0 && data != null && row < data.size() ? data.get(row) : null;
    }

    private void tambah() {
        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Kode", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Nilai", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Deskripsi", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Min Belanja", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Maks Diskon", FormDialog.FieldType.TEXT, "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Tambah Voucher", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("code", vals.get(0));
            obj.addProperty("value", Double.parseDouble(vals.get(1)));
            if (!vals.get(2).isBlank()) obj.addProperty("description", vals.get(2));
            if (!vals.get(3).isBlank()) obj.addProperty("minSpend", Double.parseDouble(vals.get(3)));
            if (!vals.get(4).isBlank()) obj.addProperty("maxDiscount", Double.parseDouble(vals.get(4)));

            callCreate(gson.toJson(obj));
        }
    }

    private void edit() {
        AdminVoucher v = getSelectedVoucher();
        if (v == null) return;

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("ID", FormDialog.FieldType.READ_ONLY, v.getId()),
                new FormDialog.FieldDef("Kode", FormDialog.FieldType.TEXT, v.getCode()),
                new FormDialog.FieldDef("Nilai", FormDialog.FieldType.TEXT,
                        v.getValue() != null ? String.valueOf(v.getValue().longValue()) : ""),
                new FormDialog.FieldDef("Deskripsi", FormDialog.FieldType.TEXT,
                        v.getDescription() != null ? v.getDescription() : ""),
                new FormDialog.FieldDef("Min Belanja", FormDialog.FieldType.TEXT,
                        v.getMinSpend() != null ? String.valueOf(v.getMinSpend().longValue()) : ""),
                new FormDialog.FieldDef("Maks Diskon", FormDialog.FieldType.TEXT,
                        v.getMaxDiscount() != null ? String.valueOf(v.getMaxDiscount().longValue()) : "")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Edit Voucher", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("code", vals.get(1));
            obj.addProperty("value", Double.parseDouble(vals.get(2)));
            if (!vals.get(3).isBlank()) obj.addProperty("description", vals.get(3));
            if (!vals.get(4).isBlank()) obj.addProperty("minSpend", Double.parseDouble(vals.get(4)));
            if (!vals.get(5).isBlank()) obj.addProperty("maxDiscount", Double.parseDouble(vals.get(5)));

            callUpdate(v.getId(), gson.toJson(obj));
        }
    }

    private void toggle() {
        AdminVoucher v = getSelectedVoucher();
        if (v == null) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    VoucherService.toggleActive(v.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(VoucherPanel.this, "Gagal: " + error);
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
                    VoucherService.create(json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(VoucherPanel.this, "Gagal: " + error);
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
                    VoucherService.update(id, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(VoucherPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void hapus() {
        AdminVoucher v = getSelectedVoucher();
        if (v == null) return;

        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus " + v.getCode() + "?", "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    VoucherService.delete(v.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(VoucherPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

}
