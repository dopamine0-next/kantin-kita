package com.java.frontend.kantin.components;

import com.java.frontend.kantin.auth.SessionContext;

import javax.swing.*;
import java.awt.*;

public class PanelManager extends JPanel {

    private final CardLayout layout;

    public PanelManager() {
        this.layout = new CardLayout();
        setLayout(layout);
    }

    public void addPanel(String name, JPanel panel) {
        add(panel, name);
    }

    public void showPanel(String name) {
        layout.show(this, name);
    }
}
