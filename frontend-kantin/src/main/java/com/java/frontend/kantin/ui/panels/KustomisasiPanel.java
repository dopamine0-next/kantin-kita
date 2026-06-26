package com.java.frontend.kantin.ui.panels;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.java.frontend.kantin.model.VendorMenuItem;
import com.java.frontend.kantin.service.CustomizationService;
import com.java.frontend.kantin.service.MenuItemService;
import com.java.frontend.kantin.ui.components.FormDialog;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;
import java.util.function.Supplier;

public class KustomisasiPanel extends JPanel {

    private final Supplier<String> restaurantIdSupplier;
    private final DefaultTableModel menuTableModel;
    private final JTable menuTable;
    private final DefaultTableModel optTableModel;
    private final JTable optTable;
    private List<VendorMenuItem> menus;
    private final Gson gson = new Gson();
    private final JLabel errorLabel = new JLabel("", SwingConstants.CENTER);

    public KustomisasiPanel(Supplier<String> restaurantIdSupplier) {
        this.restaurantIdSupplier = restaurantIdSupplier;
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        errorLabel.setForeground(new Color(217, 83, 79));
        errorLabel.setVisible(false);

        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);

        String[] menuCols = {"ID", "Menu", "Kustomisasi"};
        menuTableModel = new DefaultTableModel(menuCols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        menuTable = new JTable(menuTableModel);
        menuTable.setRowHeight(28);
        menuTable.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) loadOptions();
        });

        JPanel leftPanel = new JPanel(new BorderLayout());
        leftPanel.setBorder(BorderFactory.createTitledBorder("Menu"));
        leftPanel.add(new JScrollPane(menuTable), BorderLayout.CENTER);

        JPanel leftBtnPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 5));
        JButton refreshBtn = new JButton("Segarkan");
        refreshBtn.addActionListener(e -> refresh());
        leftBtnPanel.add(refreshBtn);
        leftPanel.add(leftBtnPanel, BorderLayout.SOUTH);

        String[] optCols = {"ID", "Judul", "Tipe", "Wajib", "Opsi"};
        optTableModel = new DefaultTableModel(optCols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        optTable = new JTable(optTableModel);
        optTable.setRowHeight(28);

        JPanel rightPanel = new JPanel(new BorderLayout());
        rightPanel.setBorder(BorderFactory.createTitledBorder("Kustomisasi"));
        rightPanel.add(new JScrollPane(optTable), BorderLayout.CENTER);

        JPanel rightBtnPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 5));
        JButton tambahBtn = new JButton("Tambah");
        JButton editBtn = new JButton("Edit");
        JButton hapusBtn = new JButton("Hapus");
        JButton tambahOptBtn = new JButton("+ Opsi");
        JButton editOptBtn = new JButton("Edit Opsi");
        JButton hapusOptBtn = new JButton("Hapus Opsi");

        tambahBtn.addActionListener(e -> tambahKustomisasi());
        editBtn.addActionListener(e -> editKustomisasi());
        hapusBtn.addActionListener(e -> hapusKustomisasi());
        tambahOptBtn.addActionListener(e -> tambahOpsi());
        editOptBtn.addActionListener(e -> editOpsi());
        hapusOptBtn.addActionListener(e -> hapusOpsi());

        rightBtnPanel.add(tambahBtn);
        rightBtnPanel.add(editBtn);
        rightBtnPanel.add(hapusBtn);
        rightBtnPanel.add(tambahOptBtn);
        rightBtnPanel.add(editOptBtn);
        rightBtnPanel.add(hapusOptBtn);
        rightPanel.add(rightBtnPanel, BorderLayout.SOUTH);

        rightPanel.add(errorLabel, BorderLayout.NORTH);

        splitPane.setLeftComponent(leftPanel);
        splitPane.setRightComponent(rightPanel);
        splitPane.setDividerLocation(400);
        add(splitPane, BorderLayout.CENTER);

        refresh();
    }

    public void refresh() {
        loadMenus();
    }

    private void loadMenus() {
        String rid = restaurantIdSupplier.get();
        if (rid == null) return;

        new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() {
                try {
                    menus = MenuItemService.listMenus(rid);
                    SwingUtilities.invokeLater(() -> {
                        menuTableModel.setRowCount(0);
                        if (menus != null) {
                            for (VendorMenuItem m : menus) {
                                int count = m.getCustomizations() != null ? m.getCustomizations().size() : 0;
                                menuTableModel.addRow(new Object[]{
                                        m.getId(), m.getName(), count + " kustomisasi"
                                });
                            }
                        }
                    });
                } catch (Exception ignored) {}
                return null;
            }
        }.execute();
    }

    private VendorMenuItem selectedMenu() {
        int row = menuTable.getSelectedRow();
        if (row < 0 || menus == null || row >= menus.size()) return null;
        return menus.get(row);
    }

    private void loadOptions() {
        VendorMenuItem m = selectedMenu();
        optTableModel.setRowCount(0);
        if (m == null || m.getCustomizations() == null) return;

        for (var cust : m.getCustomizations()) {
            int optCount = cust.getOptions() != null ? cust.getOptions().size() : 0;
            optTableModel.addRow(new Object[]{
                    cust.getId(),
                    cust.getTitle(),
                    cust.getType(),
                    Boolean.TRUE.equals(cust.getIsRequired()) ? "Ya" : "Tidak",
                    optCount + " opsi"
            });
        }
    }

    private void tambahKustomisasi() {
        VendorMenuItem m = selectedMenu();
        if (m == null) {
            JOptionPane.showMessageDialog(this, "Pilih menu dulu");
            return;
        }

        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Judul", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Tipe", FormDialog.FieldType.TEXT, "CHOICE"),
                new FormDialog.FieldDef("Wajib", FormDialog.FieldType.TEXT, "false")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this),
                "Tambah Kustomisasi", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("title", vals.get(0));
            obj.addProperty("type", vals.get(1).isBlank() ? "CHOICE" : vals.get(1));
            obj.addProperty("isRequired", Boolean.parseBoolean(vals.get(2)));

            callCreateCust(m.getId(), gson.toJson(obj));
        }
    }

    private void editKustomisasi() {
        int row = optTable.getSelectedRow();
        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Pilih kustomisasi dulu");
            return;
        }

        VendorMenuItem m = selectedMenu();
        if (m == null || m.getCustomizations() == null || row >= m.getCustomizations().size()) return;

        var cust = m.getCustomizations().get(row);
        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Judul", FormDialog.FieldType.TEXT, cust.getTitle()),
                new FormDialog.FieldDef("Tipe", FormDialog.FieldType.TEXT, cust.getType()),
                new FormDialog.FieldDef("Wajib", FormDialog.FieldType.TEXT,
                        String.valueOf(cust.getIsRequired()))
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this),
                "Edit Kustomisasi", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("title", vals.get(0));
            obj.addProperty("type", vals.get(1));
            obj.addProperty("isRequired", Boolean.parseBoolean(vals.get(2)));

            new SwingWorker<Void, Void>() {
                private String error;
                @Override
                protected Void doInBackground() {
                    try {
                        CustomizationService.updateCustomization(cust.getId(), gson.toJson(obj));
                    } catch (Exception ex) {
                        error = ex.getMessage();
                    }
                    return null;
                }
                @Override
                protected void done() {
                    if (error != null) {
                        JOptionPane.showMessageDialog(KustomisasiPanel.this, "Gagal: " + error);
                    } else {
                        refresh();
                    }
                }
            }.execute();
        }
    }

    private void hapusKustomisasi() {
        int row = optTable.getSelectedRow();
        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Pilih kustomisasi dulu");
            return;
        }

        VendorMenuItem m = selectedMenu();
        if (m == null || m.getCustomizations() == null || row >= m.getCustomizations().size()) return;

        var cust = m.getCustomizations().get(row);
        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus kustomisasi \"" + cust.getTitle() + "\"?",
                "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    CustomizationService.deleteCustomization(cust.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(KustomisasiPanel.this, "Gagal: " + error);
                } else {
                    refresh();
                }
            }
        }.execute();
    }

    private void tambahOpsi() {
        int row = optTable.getSelectedRow();
        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Pilih kustomisasi dulu");
            return;
        }

        VendorMenuItem m = selectedMenu();
        if (m == null || m.getCustomizations() == null || row >= m.getCustomizations().size()) return;

        var cust = m.getCustomizations().get(row);
        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Label", FormDialog.FieldType.TEXT, ""),
                new FormDialog.FieldDef("Harga Tambahan", FormDialog.FieldType.TEXT, "0")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this),
                "Tambah Opsi", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("label", vals.get(0));
            if (!vals.get(1).isBlank()) obj.addProperty("price", Double.parseDouble(vals.get(1)));

            new SwingWorker<Void, Void>() {
                private String error;
                @Override
                protected Void doInBackground() {
                    try {
                        CustomizationService.createOption(cust.getId(), gson.toJson(obj));
                    } catch (Exception ex) {
                        error = ex.getMessage();
                    }
                    return null;
                }
                @Override
                protected void done() {
                    if (error != null) {
                        JOptionPane.showMessageDialog(KustomisasiPanel.this, "Gagal: " + error);
                    } else {
                        refresh();
                    }
                }
            }.execute();
        }
    }

    private void editOpsi() {
        int row = optTable.getSelectedRow();
        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Pilih kustomisasi dulu");
            return;
        }

        VendorMenuItem m = selectedMenu();
        if (m == null || m.getCustomizations() == null || row >= m.getCustomizations().size()) return;

        var cust = m.getCustomizations().get(row);
        var optList = cust.getOptions();
        if (optList == null || optList.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Tidak ada opsi");
            return;
        }

        String[] optNames = optList.stream().map(o -> o.getLabel() + " (+Rp" +
                (o.getPrice() != null ? o.getPrice().longValue() : 0) + ")")
                .toArray(String[]::new);
        String chosen = (String) JOptionPane.showInputDialog(this,
                "Pilih opsi yang akan diedit:", "Edit Opsi",
                JOptionPane.PLAIN_MESSAGE, null, optNames, optNames[0]);
        if (chosen == null) return;

        int optIdx = java.util.Arrays.asList(optNames).indexOf(chosen);
        if (optIdx < 0) return;

        var opt = optList.get(optIdx);
        List<FormDialog.FieldDef> fields = List.of(
                new FormDialog.FieldDef("Label", FormDialog.FieldType.TEXT, opt.getLabel()),
                new FormDialog.FieldDef("Harga Tambahan", FormDialog.FieldType.TEXT,
                        opt.getPrice() != null ? String.valueOf(opt.getPrice().longValue()) : "0")
        );

        FormDialog dlg = new FormDialog((JFrame) SwingUtilities.getWindowAncestor(this),
                "Edit Opsi", fields);
        dlg.setVisible(true);

        if (dlg.isConfirmed()) {
            List<String> vals = dlg.getValues();
            JsonObject obj = new JsonObject();
            obj.addProperty("label", vals.get(0));
            if (!vals.get(1).isBlank()) obj.addProperty("price", Double.parseDouble(vals.get(1)));

            new SwingWorker<Void, Void>() {
                private String error;
                @Override
                protected Void doInBackground() {
                    try {
                        CustomizationService.updateOption(opt.getId(), gson.toJson(obj));
                    } catch (Exception ex) {
                        error = ex.getMessage();
                    }
                    return null;
                }
                @Override
                protected void done() {
                    if (error != null) {
                        JOptionPane.showMessageDialog(KustomisasiPanel.this, "Gagal: " + error);
                    } else {
                        refresh();
                    }
                }
            }.execute();
        }
    }

    private void hapusOpsi() {
        int row = optTable.getSelectedRow();
        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Pilih kustomisasi dulu");
            return;
        }

        VendorMenuItem m = selectedMenu();
        if (m == null || m.getCustomizations() == null || row >= m.getCustomizations().size()) return;

        var cust = m.getCustomizations().get(row);
        var optList = cust.getOptions();
        if (optList == null || optList.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Tidak ada opsi");
            return;
        }

        String[] optNames = optList.stream().map(o -> o.getLabel()).toArray(String[]::new);
        String chosen = (String) JOptionPane.showInputDialog(this,
                "Pilih opsi yang akan dihapus:", "Hapus Opsi",
                JOptionPane.PLAIN_MESSAGE, null, optNames, optNames[0]);
        if (chosen == null) return;

        int optIdx = java.util.Arrays.asList(optNames).indexOf(chosen);
        if (optIdx < 0) return;

        var opt = optList.get(optIdx);
        int confirm = JOptionPane.showConfirmDialog(this,
                "Yakin hapus opsi \"" + opt.getLabel() + "\"?",
                "Konfirmasi", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) return;

        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    CustomizationService.deleteOption(opt.getId());
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(KustomisasiPanel.this, "Gagal: " + error);
                } else {
                    refresh();
                }
            }
        }.execute();
    }

    private void callCreateCust(String menuId, String json) {
        new SwingWorker<Void, Void>() {
            private String error;
            @Override
            protected Void doInBackground() {
                try {
                    CustomizationService.createCustomization(menuId, json);
                } catch (Exception ex) {
                    error = ex.getMessage();
                }
                return null;
            }
            @Override
            protected void done() {
                if (error != null) {
                    JOptionPane.showMessageDialog(KustomisasiPanel.this, "Gagal: " + error);
                } else {
                    refresh();
                }
            }
        }.execute();
    }
}
