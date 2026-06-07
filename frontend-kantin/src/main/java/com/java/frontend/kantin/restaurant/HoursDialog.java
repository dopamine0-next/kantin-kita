package com.java.frontend.kantin.restaurant;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;

public class HoursDialog extends JDialog {

    private final JTextField hoursField;
    private final JButton saveButton;
    private final JLabel statusLabel;
    private boolean approved = false;

    public HoursDialog(Window owner, String currentHours) {
        super(owner, "Edit Jam Operasional", ModalityType.APPLICATION_MODAL);
        setSize(400, 200);
        setLocationRelativeTo(owner);
        setResizable(false);

        var panel = new JPanel(new GridBagLayout());
        panel.setBorder(new EmptyBorder(20, 20, 20, 20));
        panel.setBackground(Color.WHITE);
        var gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 0, 5, 0);

        gbc.gridx = 0;
        gbc.gridy = 0;
        panel.add(new JLabel("Jam Operasional (contoh: 08:00 - 16:00)"), gbc);

        gbc.gridy = 1;
        hoursField = new JTextField(currentHours != null && !currentHours.equals("null") ? currentHours : "");
        hoursField.setPreferredSize(new Dimension(300, 35));
        panel.add(hoursField, gbc);

        gbc.gridy = 2;
        statusLabel = new JLabel(" ");
        statusLabel.setForeground(Color.GRAY);
        panel.add(statusLabel, gbc);

        gbc.gridy = 3;
        saveButton = new JButton("Simpan");
        saveButton.setPreferredSize(new Dimension(150, 35));
        saveButton.addActionListener(e -> {
            if (!hoursField.getText().trim().isEmpty()) {
                approved = true;
                dispose();
            }
        });
        panel.add(saveButton, gbc);

        add(panel);
    }

    public boolean isApproved() {
        return approved;
    }

    public String getHours() {
        return hoursField.getText().trim();
    }

    public void setLoading(boolean loading) {
        saveButton.setEnabled(!loading);
        saveButton.setText(loading ? "Menyimpan..." : "Simpan");
        hoursField.setEnabled(!loading);
    }
}
