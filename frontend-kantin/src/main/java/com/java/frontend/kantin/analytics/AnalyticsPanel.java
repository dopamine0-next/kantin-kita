package com.java.frontend.kantin.analytics;

import javax.swing.*;
import java.awt.*;

public class AnalyticsPanel extends JPanel {

    public AnalyticsPanel() {
        setLayout(new BorderLayout());
        var label = new JLabel("Analytics", SwingConstants.CENTER);
        label.setFont(label.getFont().deriveFont(Font.BOLD, 24f));
        add(label, BorderLayout.CENTER);
    }
}
