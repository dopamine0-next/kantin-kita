package com.java.frontend.kantin.menu;

import javax.swing.*;
import java.awt.*;

public class MenuPanel extends JPanel {

    public MenuPanel() {
        setLayout(new BorderLayout());
        var label = new JLabel("Menu Management", SwingConstants.CENTER);
        label.setFont(label.getFont().deriveFont(Font.BOLD, 24f));
        add(label, BorderLayout.CENTER);
    }
}
