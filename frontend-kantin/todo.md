# Frontend Vendor (Java Swing) — Todo List

## Tech Stack
- Java 21
- `java.net.http.HttpClient`
- Jackson (JSON parsing)
- FlatLaf (LookAndFeel)
- JFreeChart (grafik analytics)

## Tahap 1 — Project Foundation ✅
- [x] 1. Update `pom.xml` — tambah dependency Jackson, FlatLaf, JFreeChart
- [x] 2. Buat package structure (`api`, `auth`, `dashboard`, `restaurant`, `menu`, `order`, `review`, `analytics`, `util`, `model`)
- [x] 3. Buat `ApiClient` — wrapper `java.net.http.HttpClient` untuk GET/POST/PUT/PATCH/DELETE, inject Bearer token
- [x] 4. Buat `TokenManager` — simpan/load JWT token ke file config
- [x] 5. Buat model DTOs: request (LoginRequest, UpdateRestaurantRequest, CreateMenuItemRequest, etc.) + response (LoginResponse, VendorProfile, MenuItemResponse, VendorOrderResponse, AnalyticsSummary, etc.)
- [x] 6. Buat `Config` — constants (BASE_URL, endpoint paths)

## Tahap 2 — Login Screen ✅
- [x] 7. `LoginFrame` — form email + password, tombol login
- [x] 8. `AuthApi` — call `POST /api/v1/vendor/auth/login`, parse response, simpan token
- [x] 9. FlatLaf setup di `main()`, tampilkan LoginFrame
- [x] 10. Validasi input, error handling, loading indicator (SwingWorker)

## Tahap 3 — Main Navigation
- [ ] 11. `MainFrame` — layout sidebar (JPanel) + content area (CardLayout)
- [ ] 12. Sidebar buttons: Dashboard, Restaurant, Menu, Orders, Reviews, Analytics, Logout
- [ ] 13. `PanelManager` — helper navigasi antar panel
- [ ] 14. Header bar — nama vendor + avatar

## Tahap 4 — Dashboard
- [ ] 15. `DashboardPanel` — cards: Today Orders, Today Revenue, Pending, Processing, Avg Rating
- [ ] 16. Call `GET .../analytics/summary`, render data
- [ ] 17. Quick action buttons

## Tahap 5 — Restaurant Management
- [ ] 18. `RestaurantPanel` — form edit restaurant (name, cuisine, address, promo)
- [ ] 19. Toggle isOpen (on/off button)
- [ ] 20. Operational hours editor
- [ ] 21. Image upload (file dialog)

## Tahap 6 — Menu Management
- [ ] 22. `MenuPanel` — JTable menu items
- [ ] 23. `MenuFormDialog` — add/edit menu item
- [ ] 24. Delete + Toggle popular actions
- [ ] 25. `CustomizationPanel` — customization list per menu item
- [ ] 26. `CustomizationFormDialog` — add/edit customization
- [ ] 27. `OptionFormDialog` — add/edit option (label, price)

## Tahap 7 — Order Management
- [ ] 28. `OrderPanel` — JTable orders, filter status + date range
- [ ] 29. `OrderDetailDialog` — detail: customer info, items, total
- [ ] 30. Status update buttons
- [ ] 31. Auto-refresh interval

## Tahap 8 — Reviews
- [ ] 32. `ReviewPanel` — JTable dengan rating stars
- [ ] 33. Sort/filter by rating

## Tahap 9 — Analytics
- [ ] 34. `AnalyticsPanel` — date range filter
- [ ] 35. Revenue chart (JFreeChart)
- [ ] 36. Top items table
- [ ] 37. Order trends chart

## Tahap 10 — Polish
- [ ] 38. Global error dialog
- [ ] 39. Loading spinner / progress bar
- [ ] 40. Responsive layout adjustments
- [ ] 41. Window icon & title
