package com.java.frontend.admin.ui.components;

import com.java.frontend.admin.model.ComboItem;

import javax.swing.*;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class FormDialog extends JDialog {

    public enum FieldType { TEXT, READ_ONLY, COMBOBOX, TIME, IMAGE_UPLOAD }

    public static class FieldDef {
        public final String label;
        public final FieldType type;
        public final Object defaultValue;
        public final List<ComboItem> options;

        public FieldDef(String label, FieldType type, Object defaultValue) {
            this(label, type, defaultValue, List.of());
        }

        public FieldDef(String label, FieldType type, Object defaultValue, List<ComboItem> options) {
            this.label = label;
            this.type = type;
            this.defaultValue = defaultValue;
            this.options = options;
        }
    }

    private final List<JComponent> fields = new ArrayList<>();
    private final List<FieldType> types = new ArrayList<>();
    private boolean confirmed = false;

    public FormDialog(JFrame parent, String title, List<FieldDef> fieldDefs) {
        super(parent, title, true);
        setSize(500, 120 + fieldDefs.size() * 45);
        setLocationRelativeTo(parent);

        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(4, 4, 4, 4);

        for (int i = 0; i < fieldDefs.size(); i++) {
            FieldDef def = fieldDefs.get(i);

            gbc.gridx = 0;
            gbc.gridy = i;
            gbc.weightx = 0;
            panel.add(new JLabel(def.label), gbc);

            gbc.gridx = 1;
            gbc.weightx = 1;

            switch (def.type) {
                case IMAGE_UPLOAD -> {
                    ImageUploadField iuf = new ImageUploadField(
                            def.defaultValue != null ? def.defaultValue.toString() : "");
                    fields.add(iuf);
                    panel.add(iuf, gbc);
                    types.add(FieldType.IMAGE_UPLOAD);
                }
                case READ_ONLY -> {
                    JTextField tf = new JTextField(def.defaultValue != null ? def.defaultValue.toString() : "");
                    tf.setEditable(false);
                    tf.setBackground(new Color(240, 240, 240));
                    fields.add(tf);
                    panel.add(tf, gbc);
                    types.add(FieldType.READ_ONLY);
                }
                case COMBOBOX -> {
                    JComboBox<ComboItem> cb = new JComboBox<>();
                    for (ComboItem item : def.options) {
                        cb.addItem(item);
                    }
                    if (def.defaultValue instanceof String defaultId) {
                        for (int j = 0; j < cb.getItemCount(); j++) {
                            if (cb.getItemAt(j).getId().equals(defaultId)) {
                                cb.setSelectedIndex(j);
                                break;
                            }
                        }
                    }
                    fields.add(cb);
                    panel.add(cb, gbc);
                    types.add(FieldType.COMBOBOX);
                }
                case TIME -> {
                    Calendar cal = Calendar.getInstance();
                    if (def.defaultValue instanceof String timeStr && !timeStr.isBlank()) {
                        String[] parts = timeStr.split(":");
                        if (parts.length == 2) {
                            cal.set(Calendar.HOUR_OF_DAY, Integer.parseInt(parts[0]));
                            cal.set(Calendar.MINUTE, Integer.parseInt(parts[1]));
                        }
                    } else {
                        cal.set(Calendar.HOUR_OF_DAY, 8);
                        cal.set(Calendar.MINUTE, 0);
                    }
                    SpinnerDateModel model = new SpinnerDateModel(cal.getTime(), null, null, Calendar.MINUTE);
                    JSpinner spinner = new JSpinner(model);
                    JSpinner.DateEditor editor = new JSpinner.DateEditor(spinner, "HH:mm");
                    spinner.setEditor(editor);
                    fields.add(spinner);
                    panel.add(spinner, gbc);
                    types.add(FieldType.TIME);
                }
                default -> {
                    JTextField tf = new JTextField(def.defaultValue != null ? def.defaultValue.toString() : "");
                    fields.add(tf);
                    panel.add(tf, gbc);
                    types.add(FieldType.TEXT);
                }
            }
        }

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        JButton saveBtn = new JButton("Simpan");
        JButton cancelBtn = new JButton("Batal");

        saveBtn.addActionListener(e -> {
            confirmed = true;
            dispose();
        });
        cancelBtn.addActionListener(e -> dispose());

        btnPanel.add(saveBtn);
        btnPanel.add(cancelBtn);

        GridBagConstraints btnGbc = new GridBagConstraints();
        btnGbc.gridx = 0;
        btnGbc.gridy = fieldDefs.size();
        btnGbc.gridwidth = 2;
        btnGbc.insets = new Insets(8, 0, 0, 0);
        panel.add(btnPanel, btnGbc);

        add(panel);
        getRootPane().setDefaultButton(saveBtn);
    }

    public boolean isConfirmed() { return confirmed; }

    public List<String> getValues() {
        List<String> vals = new ArrayList<>();
        for (int i = 0; i < fields.size(); i++) {
            JComponent c = fields.get(i);
            FieldType t = types.get(i);
            if (t == FieldType.COMBOBOX) {
                JComboBox<ComboItem> cb = (JComboBox<ComboItem>) c;
                ComboItem selected = (ComboItem) cb.getSelectedItem();
                vals.add(selected != null ? selected.getId() : "");
            } else if (t == FieldType.TIME) {
                JSpinner sp = (JSpinner) c;
                SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                vals.add(sdf.format((Date) sp.getValue()));
            } else if (t == FieldType.IMAGE_UPLOAD) {
                vals.add(((ImageUploadField) c).getUrl());
            } else if (c instanceof JTextField tf) {
                vals.add(tf.getText());
            }
        }
        return vals;
    }
}
