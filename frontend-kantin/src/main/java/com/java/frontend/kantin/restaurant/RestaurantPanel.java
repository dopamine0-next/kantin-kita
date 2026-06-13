package com.java.frontend.kantin.restaurant;

import com.java.frontend.kantin.api.ApiClient;
import com.java.frontend.kantin.api.VendorApi;
import com.java.frontend.kantin.auth.SessionContext;
import com.java.frontend.kantin.model.VendorRestaurantResponse;
import com.java.frontend.kantin.model.request.UpdateRestaurantRequest;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;

public class RestaurantPanel extends JPanel {

    private final VendorApi vendorApi;
    private String restaurantId;

    private JTextField nameField;
    private JTextField cuisineField;
    private JTextArea addressArea;
    private JLabel imagePreview;
    private JLabel bannerPreview;
    private JToggleButton statusToggle;
    private JLabel statusLabel;
    private JLabel hoursLabel;
    private JButton saveButton;

    private VendorRestaurantResponse currentData;

    public RestaurantPanel(ApiClient apiClient) {
        this.vendorApi = new VendorApi(apiClient);
        initComponents();
        loadData();
    }

    private void initComponents() {
        setLayout(new BorderLayout());
        setBackground(Color.WHITE);

        var header = new JLabel("Manage Restaurant");
        header.setFont(header.getFont().deriveFont(Font.BOLD, 22f));
        header.setBorder(new EmptyBorder(20, 25, 10, 25));
        add(header, BorderLayout.NORTH);

        var formPanel = new JPanel(new GridBagLayout());
        formPanel.setBackground(Color.WHITE);
        formPanel.setBorder(new EmptyBorder(10, 25, 25, 25));
        var gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(6, 8, 6, 8);

        // Left column — image previews
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridheight = 6;
        gbc.anchor = GridBagConstraints.NORTH;

        var imgPanel = new JPanel(new BorderLayout());
        imgPanel.setBackground(Color.WHITE);
        imgPanel.setPreferredSize(new Dimension(200, 200));
        imgPanel.setBorder(BorderFactory.createLineBorder(new Color(0xe0, 0xe0, 0xe0)));

        imagePreview = new JLabel("No Image", SwingConstants.CENTER);
        imagePreview.setPreferredSize(new Dimension(200, 150));
        imagePreview.setForeground(Color.GRAY);
        imgPanel.add(imagePreview, BorderLayout.CENTER);

        JButton imgBtn = new JButton("Ganti Gambar");
        imgBtn.addActionListener(e -> chooseImage());
        imgPanel.add(imgBtn, BorderLayout.SOUTH);

        formPanel.add(imgPanel, gbc);

        // Right column — fields
        gbc.gridheight = 1;
        gbc.gridx = 1;
        gbc.anchor = GridBagConstraints.WEST;

        gbc.gridy = 0;
        formPanel.add(new JLabel("Nama Restaurant"), gbc);
        gbc.gridy = 1;
        nameField = new JTextField(25);
        nameField.setPreferredSize(new Dimension(300, 35));
        formPanel.add(nameField, gbc);

        gbc.gridy = 2;
        formPanel.add(new JLabel("Kategori Masakan"), gbc);
        gbc.gridy = 3;
        cuisineField = new JTextField(25);
        cuisineField.setPreferredSize(new Dimension(300, 35));
        formPanel.add(cuisineField, gbc);

        gbc.gridy = 4;
        formPanel.add(new JLabel("Alamat"), gbc);
        gbc.gridy = 5;
        addressArea = new JTextArea(3, 25);
        addressArea.setLineWrap(true);
        addressArea.setWrapStyleWord(true);
        var addressScroll = new JScrollPane(addressArea);
        addressScroll.setPreferredSize(new Dimension(300, 60));
        formPanel.add(addressScroll, gbc);

        // Status row
        gbc.gridy = 6;
        formPanel.add(new JLabel("Status"), gbc);
        gbc.gridy = 9;
        var statusRow = new JPanel(new FlowLayout(FlowLayout.LEFT, 10, 0));
        statusRow.setBackground(Color.WHITE);
        statusToggle = new JToggleButton();
        statusLabel = new JLabel();
        statusRow.add(statusToggle);
        statusRow.add(statusLabel);
        statusToggle.addActionListener(e -> toggleStatus());
        formPanel.add(statusRow, gbc);

        // Hours row
        gbc.gridy = 10;
        formPanel.add(new JLabel("Jam Operasional"), gbc);
        gbc.gridy = 11;
        var hoursRow = new JPanel(new FlowLayout(FlowLayout.LEFT, 10, 0));
        hoursRow.setBackground(Color.WHITE);
        hoursLabel = new JLabel();
        JButton hoursBtn = new JButton("Edit Jam");
        hoursBtn.addActionListener(e -> editHours());
        hoursRow.add(hoursLabel);
        hoursRow.add(hoursBtn);
        formPanel.add(hoursRow, gbc);

        // Save button
        gbc.gridy = 12;
        gbc.gridwidth = 2;
        gbc.anchor = GridBagConstraints.CENTER;
        saveButton = new JButton("💾  Simpan");
        saveButton.setPreferredSize(new Dimension(200, 40));
        saveButton.addActionListener(e -> saveRestaurant());
        formPanel.add(saveButton, gbc);

        add(formPanel, BorderLayout.CENTER);
    }

    private void loadData() {
        restaurantId = SessionContext.getFirstRestaurantId();
        if (restaurantId == null) return;

        SwingWorker<Void, Void> worker = new SwingWorker<>() {
            private VendorRestaurantResponse data;

            @Override
            protected Void doInBackground() {
                var resp = vendorApi.getRestaurant(restaurantId);
                if (resp.isSuccess()) data = resp.getData();
                return null;
            }

            @Override
            protected void done() {
                if (data != null) {
                    currentData = data;
                    populateForm(data);
                }
            }
        };
        worker.execute();
    }

    private void populateForm(VendorRestaurantResponse data) {
        nameField.setText(data.getName());
        cuisineField.setText(data.getRestaurantCategory() != null ? data.getRestaurantCategory().getName() : "");
        addressArea.setText(data.getAddress());
        if (data.getImageUrl() != null && !data.getImageUrl().isBlank()) {
            imagePreview.setText(data.getImageUrl());
        }
        updateStatusDisplay(data.getIsOpen());
        hoursLabel.setText(data.getOperationalHours() != null ? data.getOperationalHours() : "Belum diatur");
    }

    private void updateStatusDisplay(Boolean isOpen) {
        if (Boolean.TRUE.equals(isOpen)) {
            statusToggle.setSelected(true);
            statusToggle.setText("Buka");
            statusToggle.setBackground(new Color(0x2e, 0xcc, 0x71));
            statusLabel.setText("🟢 Buka");
        } else {
            statusToggle.setSelected(false);
            statusToggle.setText("Tutup");
            statusToggle.setBackground(new Color(0xe7, 0x4c, 0x3c));
            statusLabel.setText("🔴 Tutup");
        }
    }

    private void toggleStatus() {
        statusToggle.setEnabled(false);
        SwingWorker<Void, Void> worker = new SwingWorker<>() {
            private VendorRestaurantResponse result;

            @Override
            protected Void doInBackground() {
                var resp = vendorApi.toggleStatus(restaurantId);
                if (resp.isSuccess()) result = resp.getData();
                return null;
            }

            @Override
            protected void done() {
                if (result != null) {
                    currentData = result;
                    updateStatusDisplay(result.getIsOpen());
                } else {
                    statusToggle.setSelected(currentData.getIsOpen());
                }
                statusToggle.setEnabled(true);
            }
        };
        worker.execute();
    }

    private void editHours() {
        var dialog = new HoursDialog(SwingUtilities.getWindowAncestor(this), hoursLabel.getText());
        dialog.setVisible(true);
        if (dialog.isApproved()) {
            String newHours = dialog.getHours();
            dialog.setLoading(true);
            SwingWorker<Void, Void> worker = new SwingWorker<>() {
                private boolean ok;

                @Override
                protected Void doInBackground() {
                    var resp = vendorApi.updateHours(restaurantId, newHours);
                    ok = resp.isSuccess();
                    return null;
                }

                @Override
                protected void done() {
                    dialog.setLoading(false);
                    if (ok) {
                        hoursLabel.setText(newHours);
                        dialog.dispose();
                    } else {
                        JOptionPane.showMessageDialog(RestaurantPanel.this, "Gagal menyimpan jam operasional");
                    }
                }
            };
            worker.execute();
        }
    }

    private void chooseImage() {
        JFileChooser chooser = new JFileChooser();
        chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
        int result = chooser.showOpenDialog(this);
        if (result == JFileChooser.APPROVE_OPTION) {
            var file = chooser.getSelectedFile();
            imagePreview.setText(file.getAbsolutePath());
            imagePreview.setIcon(new ImageIcon(
                    new ImageIcon(file.getAbsolutePath())
                            .getImage().getScaledInstance(200, 150, Image.SCALE_SMOOTH)
            ));
        }
    }

    private void saveRestaurant() {
        saveButton.setEnabled(false);
        saveButton.setText("Menyimpan...");

        var req = new UpdateRestaurantRequest();
        req.setName(nameField.getText().trim());
        // req.setRestaurantCategoryId(...) — requires category picker, skipped for now
        req.setAddress(addressArea.getText().trim());

        SwingWorker<Void, Void> worker = new SwingWorker<>() {
            private boolean ok;

            @Override
            protected Void doInBackground() {
                var resp = vendorApi.updateRestaurant(restaurantId, req);
                ok = resp.isSuccess();
                return null;
            }

            @Override
            protected void done() {
                saveButton.setEnabled(true);
                saveButton.setText("💾  Simpan");
                if (ok) {
                    JOptionPane.showMessageDialog(RestaurantPanel.this, "Restaurant berhasil disimpan!");
                } else {
                    JOptionPane.showMessageDialog(RestaurantPanel.this, "Gagal menyimpan restaurant");
                }
            }
        };
        worker.execute();
    }
}
