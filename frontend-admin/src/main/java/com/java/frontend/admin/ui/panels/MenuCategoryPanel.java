package com.java.frontend.admin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java.frontend.admin.model.AdminMenuCategory;
import com.java.frontend.admin.service.MenuCategoryService;
import com.java.frontend.admin.ui.components.FormDialog;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class MenuCategoryPanel extends JPanel {

    private final DefaultTableModel tableModel;
    private final JTable table;
    private List<AdminMenuCategory> data;
    private final Gson gson = new Gson();
    private JLabel errorLabel;
    private JPanel tableContainer;

    public MenuCategoryPanel() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        String[] cols = {"ID", "Nama", "Prioritas"};
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
                    data = MenuCategoryService.findAll();
                    SwingUtilities.invokeLater(() -> {
                        tableModel.setRowCount(0);
                        for (AdminMenuCategory c : data) {
                            tableModel.addRow(new Object[]{
                                    c.getId(),
                                    c.getName(),
                                    c.getPriority() != null ? c.getPriority() : "-"
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
            JOptionPane.showMessageDialog(this, "Pilih kategori menu dulu");
            return -1;
        }
        return row;
    }

    private AdminMenuCategory selectedCategory() {
        int row = selectedRow();
        return row >= 0 && data != null && row < data.size() ? data.get(row) : null;
    }

    private void tambah() {
        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Prioritas", FormDialog.FieldType.TEXT, "0")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Tambah Kategori Menu", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(0));
            if (!vals.get(1).isBlank()) obj.addProperty("priority", Integer.parseInt(vals.get(1)));

            callCreate(gson.toJson(obj));
        }
    }

    private void edit() {
        AdminMenuCategory c = selectedCategory();
        if (c == null) return;

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("ID", FormDialog.FieldType.READ_ONLY, c.getId()),
                new FormDialog.FieldDef("Nama", FormDialog.FieldType.TEXT, c.getName()),
                new FormDialog.FieldDef("Prioritas", FormDialog.FieldType.TEXT,
                        c.getPriority() != null ? String.valueOf(c.getPriority()) : "0")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this), "Edit Kategori Menu", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("name", vals.get(1));
            if (!vals.get(2).isBlank()) obj.addProperty("priority", Integer.parseInt(vals.get(2)));

            callUpdate(c.getId(), gson.toJson(obj));
        }
    }

    private void callCreate(String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    MenuCategoryService.create(json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(MenuCategoryPanel.this, "Gagal: " + error);
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
                    MenuCategoryService.update(id, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(MenuCategoryPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

    private void hapus() {
        AdminMenuCategory c = selectedCategory();
        if (c == null) return;

        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus " + c.getName() + "?", "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    MenuCategoryService.delete(c.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(MenuCategoryPanel.this, "Gagal: " + error);
                } else {
                    loadData();
                }
            }
        }.execute();
    }

}
