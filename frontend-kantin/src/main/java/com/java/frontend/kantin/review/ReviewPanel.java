package com.java.frontend.kantin.review;

import javax.swing.*;
import java.awt.*;

public class ReviewPanel extends JPanel {

    public ReviewPanel() {
        setLayout(new BorderLayout());
        var label = new JLabel("Reviews", SwingConstants.CENTER);
        label.setFont(label.getFont().deriveFont(Font.BOLD, 24f));
        add(label, BorderLayout.CENTER);
    }
}
