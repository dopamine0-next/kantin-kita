package com.java.frontend.kantin.components;

import com.java.frontend.kantin.auth.SessionContext;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Sidebar extends JPanel {

    private static final Color BG_COLOR = new Color(0x1e, 0x29, 0x3b);
    private static final Color ACTIVE_COLOR = new Color(0x34, 0x9b, 0xeb);
    private static final Color HOVER_COLOR = new Color(0x2c, 0x3e, 0x50);
    private static final Color TEXT_COLOR = Color.WHITE;
    private static final Color TEXT_MUTED = new Color(0xb0, 0xbe, 0xc5);
    private static final int SIDEBAR_WIDTH = 220;

    private final List<NavButton> buttons = new ArrayList<>();
    private final PanelManager panelManager;
    private final Runnable logoutAction;

    public Sidebar(PanelManager panelManager, Runnable logoutAction) {
        this.panelManager = panelManager;
        this.logoutAction = logoutAction;
        initComponents();
    }

    private void initComponents() {
        setPreferredSize(new Dimension(SIDEBAR_WIDTH, 0));
        setBackground(BG_COLOR);
        setLayout(new BorderLayout());

        // Header
        var headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBackground(BG_COLOR);
        headerPanel.setBorder(new EmptyBorder(20, 15, 15, 15));

        var avatarLabel = new JLabel("🏪");
        avatarLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 32));
        headerPanel.add(avatarLabel, BorderLayout.NORTH);

        var vendorName = SessionContext.getCurrentVendor().getName();
        var nameLabel = new JLabel(vendorName);
        nameLabel.setForeground(TEXT_COLOR);
        nameLabel.setFont(nameLabel.getFont().deriveFont(Font.BOLD, 14f));
        nameLabel.setBorder(new EmptyBorder(8, 0, 0, 0));
        headerPanel.add(nameLabel, BorderLayout.CENTER);

        add(headerPanel, BorderLayout.NORTH);

        // Navigation buttons
        var navPanel = new JPanel();
        navPanel.setBackground(BG_COLOR);
        navPanel.setLayout(new BoxLayout(navPanel, BoxLayout.Y_AXIS));
        navPanel.setBorder(new EmptyBorder(5, 8, 5, 8));

        addNavButton(navPanel, "Dashboard", 0);
        addNavButton(navPanel, "Restaurant", 1);
        addNavButton(navPanel, "Menu", 2);
        addNavButton(navPanel, "Orders", 3);
        addNavButton(navPanel, "Reviews", 4);
        addNavButton(navPanel, "Analytics", 5);

        add(navPanel, BorderLayout.CENTER);

        // Logout button at bottom
        var logoutPanel = new JPanel(new BorderLayout());
        logoutPanel.setBackground(BG_COLOR);
        logoutPanel.setBorder(new EmptyBorder(5, 8, 15, 8));

        var logoutBtn = createButton("🚪   Logout");
        logoutBtn.addActionListener(e -> logoutAction.run());
        logoutPanel.add(logoutBtn, BorderLayout.CENTER);

        add(logoutPanel, BorderLayout.SOUTH);
    }

    private void addNavButton(JPanel parent, String text, int index) {
        var btn = new NavButton(text);
        btn.addActionListener(e -> {
            setActiveButton(index);
            String panelName = switch (index) {
                case 0 -> "dashboard";
                case 1 -> "restaurant";
                case 2 -> "menu";
                case 3 -> "orders";
                case 4 -> "reviews";
                case 5 -> "analytics";
                default -> "dashboard";
            };
            panelManager.showPanel(panelName);
        });
        buttons.add(btn);
        parent.add(btn);
        parent.add(Box.createVerticalStrut(2));
    }

    public void setActiveButton(int index) {
        for (int i = 0; i < buttons.size(); i++) {
            buttons.get(i).setActive(i == index);
        }
    }

    private NavButton createButton(String text) {
        NavButton btn = new NavButton(text);
        return btn;
    }

    private static class NavButton extends JButton {

        private boolean active = false;

        NavButton(String text) {
            super(text);
            setHorizontalAlignment(SwingConstants.LEFT);
            setForeground(TEXT_MUTED);
            setBackground(BG_COLOR);
            setBorder(new EmptyBorder(10, 12, 10, 12));
            setFocusPainted(false);
            setBorderPainted(false);
            setContentAreaFilled(false);
            setOpaque(true);
            setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            setFont(getFont().deriveFont(Font.PLAIN, 13f));
        }

        void setActive(boolean active) {
            this.active = active;
            if (active) {
                setForeground(Color.WHITE);
                setBackground(ACTIVE_COLOR);
            } else {
                setForeground(TEXT_MUTED);
                setBackground(BG_COLOR);
            }
            repaint();
        }
    }
}
