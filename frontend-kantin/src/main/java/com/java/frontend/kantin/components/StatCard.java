package com.java.frontend.kantin.components;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;

public class StatCard extends JPanel {

    public StatCard(String icon, String label, String value, Color accent) {
        setLayout(new BorderLayout());
        setBackground(Color.WHITE);
        setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(0xe0, 0xe0, 0xe0), 1),
                new EmptyBorder(15, 18, 15, 18)
        ));
        setPreferredSize(new Dimension(180, 110));

        var leftBorder = new JPanel();
        leftBorder.setPreferredSize(new Dimension(5, 0));
        leftBorder.setBackground(accent);
        add(leftBorder, BorderLayout.WEST);

        var content = new JPanel(new GridBagLayout());
        content.setBackground(Color.WHITE);
        var gbc = new GridBagConstraints();
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.anchor = GridBagConstraints.WEST;
        gbc.insets = new Insets(0, 10, 0, 0);

        var iconLabel = new JLabel(icon);
        iconLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 28));
        content.add(iconLabel, gbc);

        gbc.gridy = 1;
        var valLabel = new JLabel(value);
        valLabel.setFont(valLabel.getFont().deriveFont(Font.BOLD, 26f));
        valLabel.setForeground(new Color(0x2c, 0x3e, 0x50));
        content.add(valLabel, gbc);

        gbc.gridy = 2;
        gbc.insets = new Insets(2, 10, 0, 0);
        var descLabel = new JLabel(label);
        descLabel.setForeground(new Color(0x7f, 0x8c, 0x8d));
        descLabel.setFont(descLabel.getFont().deriveFont(Font.PLAIN, 12f));
        content.add(descLabel, gbc);

        add(content, BorderLayout.CENTER);
    }
}
