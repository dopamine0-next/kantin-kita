package com.java.frontend.kantin;

import com.formdev.flatlaf.FlatLightLaf;
import com.java.frontend.kantin.ui.LoginFrame;

import javax.swing.*;

public class Main {

    public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(new FlatLightLaf());
        } catch (Exception e) {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            } catch (Exception ignored) {}
        }

        SwingUtilities.invokeLater(() -> new LoginFrame().setVisible(true));
    }
}
