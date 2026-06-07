package com.java.frontend.kantin.order;

import javax.swing.*;
import java.awt.*;

public class OrderPanel extends JPanel {

    public OrderPanel() {
        setLayout(new BorderLayout());
        var label = new JLabel("Order Management", SwingConstants.CENTER);
        label.setFont(label.getFont().deriveFont(Font.BOLD, 24f));
        add(label, BorderLayout.CENTER);
    }
}
