package com.java.frontend.kantin.auth;

import com.java.frontend.kantin.model.VendorProfile;

public class SessionContext {

    private static VendorProfile currentVendor;

    private SessionContext() {
    }

    public static VendorProfile getCurrentVendor() {
        return currentVendor;
    }

    public static void setCurrentVendor(VendorProfile vendor) {
        currentVendor = vendor;
    }

    public static void clear() {
        currentVendor = null;
    }

    public static String getFirstRestaurantId() {
        if (currentVendor != null
                && currentVendor.getRestaurants() != null
                && !currentVendor.getRestaurants().isEmpty()) {
            return currentVendor.getRestaurants().get(0).getId();
        }
        return null;
    }
}
