package com.java.frontend.admin;

import com.formdev.flatlaf.FlatLightLaf;
import com.java.frontend.admin.ui.LoginFrame;

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
