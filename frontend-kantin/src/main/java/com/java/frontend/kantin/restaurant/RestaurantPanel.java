package com.java.frontend.kantin.restaurant;

import javax.swing.*;
import java.awt.*;

public class RestaurantPanel extends JPanel {

    public RestaurantPanel() {
        setLayout(new BorderLayout());
        var label = new JLabel("Restaurant Management", SwingConstants.CENTER);
        label.setFont(label.getFont().deriveFont(Font.BOLD, 24f));
        add(label, BorderLayout.CENTER);
    }
}
