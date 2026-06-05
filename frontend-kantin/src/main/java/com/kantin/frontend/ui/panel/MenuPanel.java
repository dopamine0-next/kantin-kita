package com.kantin.frontend.ui.panel;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kantin.frontend.client.ApiClient;
import com.kantin.frontend.model.MenuItemResponse;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class MenuPanel extends JPanel {

    private final ObjectMapper mapper = ApiClient.getMapper();
    private final String vendorId;
    private final String restaurantId;
    private final JTable table = new JTable();
    private final DefaultTableModel tableModel;

    public MenuPanel(String vendorId, String restaurantId) {
        this.vendorId = vendorId;
        this.restaurantId = restaurantId;
        setLayout(new BorderLayout());
        setBorder(new EmptyBorder(10, 10, 10, 10));

        tableModel = new DefaultTableModel(new String[]{"Name", "Price", "Category", "Popular", "Prep Time"}, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        table.setModel(tableModel);

        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        JButton refreshBtn = new JButton("Refresh");
        JButton addBtn = new JButton("Add Menu");
        JButton editBtn = new JButton("Edit");
        JButton deleteBtn = new JButton("Delete");
        JButton popularBtn = new JButton("Toggle Popular");

        refreshBtn.addActionListener(e -> loadData());
        addBtn.addActionListener(e -> showMenuForm(null));
        editBtn.addActionListener(e -> {
            int row = table.getSelectedRow();
            if (row >= 0) showMenuForm(getMenuAt(row));
            else JOptionPane.showMessageDialog(this, "Pilih menu dulu");
        });
        deleteBtn.addActionListener(e -> deleteMenu());
        popularBtn.addActionListener(e -> togglePopular());

        topPanel.add(refreshBtn);
        topPanel.add(addBtn);
        topPanel.add(editBtn);
        topPanel.add(deleteBtn);
        topPanel.add(popularBtn);

        add(topPanel, BorderLayout.NORTH);
        add(new JScrollPane(table), BorderLayout.CENTER);

        loadData();
    }

    private List<MenuItemResponse> menuList;

    private void loadData() {
        try {
            String json = ApiClient.get("/vendor/restaurants/" + restaurantId + "/menus");
            menuList = mapper.readValue(json, new TypeReference<List<MenuItemResponse>>() {});
            tableModel.setRowCount(0);
            for (MenuItemResponse m : menuList) {
                tableModel.addRow(new Object[]{
                        m.name, m.price != null ? "Rp" + String.format("%,.0f", m.price) : "-",
                        m.category, m.isPopular != null && m.isPopular ? "Yes" : "No", m.prepTime
                });
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal load menu: " + e.getMessage());
        }
    }

    private MenuItemResponse getMenuAt(int row) {
        return menuList != null && row >= 0 && row < menuList.size() ? menuList.get(row) : null;
    }

    private void showMenuForm(MenuItemResponse existing) {
        JTextField nameField = new JTextField(existing != null ? existing.name : "", 20);
        JTextField priceField = new JTextField(existing != null ? String.valueOf(existing.price.intValue()) : "", 10);
        JTextField categoryField = new JTextField(existing != null ? existing.category : "", 15);
        JTextField prepField = new JTextField(existing != null ? existing.prepTime : "", 10);

        JPanel form = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.gridx = 0; gbc.gridy = 0; form.add(new JLabel("Name:"), gbc);
        gbc.gridx = 1; form.add(nameField, gbc);
        gbc.gridx = 0; gbc.gridy = 1; form.add(new JLabel("Price:"), gbc);
        gbc.gridx = 1; form.add(priceField, gbc);
        gbc.gridx = 0; gbc.gridy = 2; form.add(new JLabel("Category:"), gbc);
        gbc.gridx = 1; form.add(categoryField, gbc);
        gbc.gridx = 0; gbc.gridy = 3; form.add(new JLabel("Prep Time:"), gbc);
        gbc.gridx = 1; form.add(prepField, gbc);

        int result = JOptionPane.showConfirmDialog(this, form,
                existing != null ? "Edit Menu" : "Add Menu", JOptionPane.OK_CANCEL_OPTION);
        if (result != JOptionPane.OK_OPTION) return;

        try {
            double price = Double.parseDouble(priceField.getText().trim());
            if (existing != null) {
                ApiClient.put("/vendor/menus/" + existing.id, new MenuFormBody(
                        nameField.getText(), null, price, null, categoryField.getText(), prepField.getText(), null, null, null));
            } else {
                ApiClient.post("/vendor/restaurants/" + restaurantId + "/menus", new MenuFormBody(
                        nameField.getText(), null, price, null, categoryField.getText(), prepField.getText(), null, null, null));
            }
            loadData();
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Harga harus angka");
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Gagal: " + ex.getMessage());
        }
    }

    private void deleteMenu() {
        int row = table.getSelectedRow();
        if (row < 0) { JOptionPane.showMessageDialog(this, "Pilih menu dulu"); return; }
        MenuItemResponse m = getMenuAt(row);
        int confirm = JOptionPane.showConfirmDialog(this, "Hapus " + m.name + "?");
        if (confirm != JOptionPane.OK_OPTION) return;
        try {
            ApiClient.delete("/vendor/menus/" + m.id);
            loadData();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal: " + e.getMessage());
        }
    }

    private void togglePopular() {
        int row = table.getSelectedRow();
        if (row < 0) { JOptionPane.showMessageDialog(this, "Pilih menu dulu"); return; }
        try {
            ApiClient.patch("/vendor/menus/" + getMenuAt(row).id + "/popular", null);
            loadData();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Gagal: " + e.getMessage());
        }
    }

    private record MenuFormBody(String name, String description, Double price, String imageUrl,
                                String category, String prepTime, Double originalPrice,
                                String badgeText, String badgeVariant) {}
}
