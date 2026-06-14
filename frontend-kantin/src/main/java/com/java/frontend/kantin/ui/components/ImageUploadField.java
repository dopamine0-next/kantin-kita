package com.java.frontend.kantin.ui.components;

import com.java.frontend.kantin.service.UploadService;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;

public class ImageUploadField extends JPanel {

    private final JLabel previewLabel;
    private final JButton uploadBtn;
    private final JButton chooseBtn;
    private Path selectedPath;
    private String uploadedUrl;

    public ImageUploadField(String initialUrl) {
        setLayout(new FlowLayout(FlowLayout.LEFT, 8, 0));

        this.uploadedUrl = initialUrl;

        previewLabel = new JLabel();
        previewLabel.setPreferredSize(new Dimension(60, 60));
        previewLabel.setBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY));
        previewLabel.setHorizontalAlignment(SwingConstants.CENTER);
        previewLabel.setFont(previewLabel.getFont().deriveFont(9f));

        chooseBtn = new JButton("Pilih");
        chooseBtn.addActionListener(e -> chooseFile());

        uploadBtn = new JButton("Upload");
        uploadBtn.addActionListener(e -> doUpload());

        add(previewLabel);
        add(chooseBtn);
        add(uploadBtn);

        loadPreview(initialUrl);
    }

    public String getUrl() {
        return uploadedUrl != null ? uploadedUrl : "";
    }

    private void chooseFile() {
        JFileChooser fc = new JFileChooser();
        fc.setFileFilter(new javax.swing.filechooser.FileNameExtensionFilter(
                "Gambar (jpg, png, webp)", "jpg", "jpeg", "png", "webp"));
        if (fc.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) {
            selectedPath = fc.getSelectedFile().toPath();
            try {
                BufferedImage img = ImageIO.read(fc.getSelectedFile());
                if (img != null) {
                    previewLabel.setIcon(new ImageIcon(
                            img.getScaledInstance(60, 60, Image.SCALE_SMOOTH)));
                    previewLabel.setText("");
                }
            } catch (IOException e) {
                previewLabel.setIcon(null);
                previewLabel.setText("error");
            }
        }
    }

    private void doUpload() {
        if (selectedPath == null) {
            JOptionPane.showMessageDialog(this, "Pilih file gambar terlebih dahulu.");
            return;
        }
        uploadBtn.setEnabled(false);
        uploadBtn.setText("Upload...");
        chooseBtn.setEnabled(false);
        new SwingWorker<String, Void>() {
            @Override
            protected String doInBackground() {
                return UploadService.upload(selectedPath);
            }
            @Override
            protected void done() {
                try {
                    String url = get();
                    uploadedUrl = url;
                    loadPreview(url);
                } catch (Exception e) {
                    JOptionPane.showMessageDialog(ImageUploadField.this,
                            "Upload gagal: " + e.getMessage());
                } finally {
                    uploadBtn.setText("Upload");
                    uploadBtn.setEnabled(true);
                    chooseBtn.setEnabled(true);
                }
            }
        }.execute();
    }

    private void loadPreview(String url) {
        if (url == null || url.isBlank()) {
            previewLabel.setIcon(null);
            previewLabel.setText("preview");
            return;
        }
        new SwingWorker<Void, Void>() {
            private ImageIcon icon;
            @Override
            protected Void doInBackground() {
                try {
                    BufferedImage img = ImageIO.read(new URL(url));
                    if (img != null) {
                        icon = new ImageIcon(
                                img.getScaledInstance(60, 60, Image.SCALE_SMOOTH));
                    }
                } catch (Exception ignored) {}
                return null;
            }
            @Override
            protected void done() {
                if (icon != null) {
                    previewLabel.setIcon(icon);
                    previewLabel.setText("");
                }
            }
        }.execute();
    }
}
