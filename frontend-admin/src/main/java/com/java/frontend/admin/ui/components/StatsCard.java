package com.java.frontend.admin.ui.components;

import javax.swing.*;
import java.awt.*;

public class StatsCard extends JPanel {

    private final JLabel valueLabel;

    public StatsCard(String emoji, String value, String label, Color bgColor) {
        setLayout(new BorderLayout());
        setBackground(bgColor);
        setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        JLabel emojiLabel = new JLabel(emoji);
        emojiLabel.setFont(new Font("Segoe UI", Font.PLAIN, 28));
        add(emojiLabel, BorderLayout.WEST);

        JPanel textPanel = new JPanel(new GridLayout(2, 1));
        textPanel.setOpaque(false);

        valueLabel = new JLabel(value);
        valueLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
        valueLabel.setForeground(Color.WHITE);
        textPanel.add(valueLabel);

        JLabel nameLabel = new JLabel(label);
        nameLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        nameLabel.setForeground(new Color(255, 255, 255, 200));
        textPanel.add(nameLabel);

        add(textPanel, BorderLayout.CENTER);
    }

    public void setText(String text) {
        valueLabel.setText(text);
    }
}
