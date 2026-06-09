# Kantin Kita — Backend Comprehensive Reference

> **Project**: Aplikasi pemesanan makanan kantin internal kampus  
> **Base Path**: `backend/`  
> **Last Updated**: 2026-06-05

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Entity Model (Data Layer)](#4-entity-model-data-layer)
5. [Database Schema](#5-database-schema)
6. [Enums Reference](#6-enums-reference)
7. [API Endpoints — Customer](#7-api-endpoints--customer)
8. [API Endpoints — Vendor](#8-api-endpoints--vendor)
9. [Authentication & Security](#9-authentication--security)
10. [Order Lifecycle & State Machine](#10-order-lifecycle--state-machine)
11. [Payment Flow (Xendit)](#11-payment-flow-xendit)
12. [Voucher System](#12-voucher-system)
13. [Review System](#13-review-system)
14. [Vendor Analytics](#14-vendor-analytics)
15. [Data Seeder](#15-data-seeder)
16. [Full DTO Reference](#16-full-dto-reference)
17. [Configuration Reference](#17-configuration-reference)
18. [Known Anomalies & Issues](#18-known-anomalies--issues)

---

## 1. Project Overview

**Kantin Kita** adalah aplikasi backend untuk pemesanan makanan di kantin kampus. Sistem melayani dua peran utama:

- **Customer (USER)**: Mahasiswa yang memesan makanan
- **Vendor (VENDOR)**: Pemilik stan/kantin yang mengelola menu dan pesanan

### Business Rules Summary

- Customer mendaftar dengan NIM (unique), login dengan NIM + password
- Vendor login dengan email + password
- Setiap Restaurant dimiliki oleh 1 Vendor, berada di 1 Location
- Setiap MenuItem memiliki category, variants, dan customizations
- Order memiliki lifecycle: PENDING → PROCESSING → READY → COMPLETED / CANCELLED
- Review hanya bisa dibuat untuk order dengan status COMPLETED
- Voucher bersifat persentase dengan minSpend dan maxDiscount cap
- Pembayaran via Xendit dengan callback webhook

---

## 2. Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **Language** | Java 21 |
| **Framework** | Spring Boot 4.0.6 |
| **Database** | MySQL (prod), H2 (test) |
| **ORM** | Spring Data JPA + Hibernate (`ddl-auto=update`) |
| **Auth** | JWT (jjwt 0.12.6) + BCrypt |
| **Payment** | Xendit Java SDK 1.23.0 |
| **API Docs** | Springdoc OpenAPI 3.0.3 |
| **Build** | Maven (4.0.0) |
| **ID Generator** | jnanoid 2.0.0 (10-char NanoID) |
| **Seeding** | DataFaker 2.4.0 (locale: id_ID) |
| **Lombok** | v1.18+ |

### Key Dependencies (`pom.xml`)

```xml
spring-boot-starter-data-jpa
spring-boot-starter-web
spring-boot-starter-security
spring-boot-starter-validation
jjwt-api 0.12.6
jjwt-impl 0.12.6 (runtime)
jjwt-jackson 0.12.6 (runtime)
xendit-java-lib 1.23.0
jnanoid 2.0.0
datafaker 2.4.0
mysql-connector-j (runtime)
springdoc-openapi-starter-webmvc-ui 3.0.3
```

---

## 3. Project Structure

```
backend/
├── .env                          # Environment variables (git-ignored)
├── .env.example                  # Template for .env
├── pom.xml                       # Maven build file
├── BACKEND-PRD.md                # Product requirements doc
├── seed.sql                      # Raw SQL dump for seeding
│
├── src/main/java/com/example/demo/
│   ├── DemoApplication.java      # @SpringBootApplication entry point
│   │
│   ├── config/
│   │   ├── SecurityConfig.java           # Spring Security: JWT filter, CORS, role-based access
│   │   ├── JwtAuthFilter.java            # OncePerRequestFilter: extract Bearer token, validate, set context
│   │   ├── DotenvEnvironmentPostProcessor.java  # Load .env file into Spring Environment
│   │   ├── NanoIdGenerator.java          # Hibernate IdentifierGenerator (10-char NanoID)
│   │   ├── XenditConfig.java            # Init Xendit API key on PostConstruct
│   │   └── GlobalExceptionHandler.java   # @RestControllerAdvice: ResponseStatusException, Validation, 500
│   │
│   ├── controller/               # 21 controllers (see sections 7-8)
│   ├── dto/request/              # 18 request DTOs (see section 16)
│   ├── dto/response/             # 32 response DTOs (see section 16)
│   ├── entity/                   # 18 entities + 4 enums (see section 4)
│   ├── repository/               # 18 JPA repositories (see section 4-5)
│   ├── service/                  # 22 services (see sections 9-14)
│   └── seed/
│       └── DataSeeder.java       # CommandLineRunner (conditional: app.seed.enabled=true)
│
├── src/main/resources/
│   ├── application.properties    # Spring Boot config (36 lines)
│   └── META-INF/spring.factories # Registers DotenvEnvironmentPostProcessor
│
├── src/test/java/com/example/demo/
│   └── DemoApplicationTests.java # Context load test
│
├── manual/                       # Manual documentation (existing)
│   ├── BACKEND-MANUAL.md
│   └── diagrams/ & images/       # Existing Mermaid diagrams
│
├── target/                       # Build output (git-ignored)
└── uploads/                      # File upload directory
```

### Package Pattern

```
controller → service → repository → entity
                  ↓
               dto/request  ←  receives from client
               dto/response →  sent to client
```

---

## 4. Entity Model (Data Layer)

### 4.1 Entity Relationships Diagram

```
User ──┐                    ┌── OrderItem ── OrderAddon
       │                    │
       ├──< Order >── Restaurant ──< MenuItem ──< MenuCustomization ──< CustomizationOption
       │         │                  │
       │         └── RestaurantReview     └── MenuItemReview
       │
       └── MenuItemReview

Vendor ──< Restaurant >── Location

Location ──< User
         ──< Banner
         ──< Restaurant
```

### 4.2 Entity Details

#### `User` → `users`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| name | String | NOT NULL |
| nim | String | NOT NULL, UNIQUE |
| password | String | NOT NULL, BCrypt hash |
| semester | Integer | nullable |
| location | @ManyToOne → Location | nullable |

#### `Vendor` → `vendors`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| email | String | NOT NULL, UNIQUE |
| password | String | NOT NULL, BCrypt hash |
| name | String | NOT NULL |
| phone | String | nullable |
| avatarUrl | String | nullable |
| createdAt | LocalDateTime | NOT NULL, updatable=false, @PrePersist |
| restaurants | @OneToMany → Restaurant | mappedBy vendor |

#### `Restaurant` → `restaurants`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| name | String | NOT NULL |
| cuisine | String | nullable |
| rating | Double | nullable |
| ratingCount | Integer | nullable |
| isPopular | Boolean | nullable |
| originalPrice | Double | nullable (if set → item is "promo") |
| badgeText | String | nullable |
| badgeVariant | String | nullable |
| prepTime | String | nullable |
| variants | @ElementCollection → menu_item_variants | List<String> |
| customizations | @OneToMany → MenuCustomization | cascade ALL, orphanRemoval |
| restaurant | @ManyToOne → Restaurant | NOT NULL |

#### `MenuCustomization` → `menu_customizations`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| title | String | NOT NULL ("Level Pedas", "Topping") |
| type | CustomizationType (enum) | NOT NULL (CHOICE / MULTIPLE) |
| isRequired | Boolean | NOT NULL |
| options | @OneToMany → CustomizationOption | cascade ALL, orphanRemoval |
| menuItem | @ManyToOne → MenuItem | NOT NULL |

#### `CustomizationOption` → `customization_options`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| label | String | NOT NULL ("Level 1", "Telur") |
| price | Double | nullable |
| customization | @ManyToOne → MenuCustomization | NOT NULL |

#### `Order` → `orders`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| orderNumber | String | NOT NULL, format: "#0000" |
| status | OrderStatus (enum) | NOT NULL |
| paymentStatus | PaymentStatus (enum) | NOT NULL |
| paymentUrl | String | nullable |
| paymentExternalId | String | nullable (Xendit invoice ID) |
| mode | OrderMode (enum) | NOT NULL (DINE_IN / PICKUP) |
| subtotal | Double | NOT NULL |
| discountAmount | Double | nullable |
| appFee | Double | nullable (Rp 2.000) |
| totalAmount | Double | NOT NULL |
| voucherCode | String | nullable |
| createdAt | LocalDateTime | NOT NULL, @PrePersist |
| updatedAt | LocalDateTime | @PrePersist, @PreUpdate |
| items | @OneToMany → OrderItem | cascade ALL, orphanRemoval |
| user | @ManyToOne → User | NOT NULL |
| restaurant | @ManyToOne → Restaurant | NOT NULL |

#### `OrderItem` → `order_items`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| name | String | NOT NULL (snapshot of menu item name) |
| quantity | Integer | NOT NULL |
| price | Double | NOT NULL (unit price) |
| imageUrl | String | nullable |
| variantName | String | nullable |
| note | String | nullable |
| addons | @OneToMany → OrderAddon | cascade ALL, orphanRemoval |
| order | @ManyToOne → Order | NOT NULL |
| menuItem | @ManyToOne → MenuItem | nullable (soft reference) |

#### `OrderAddon` → `order_addons`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| name | String | NOT NULL |
| price | Double | nullable |
| orderItem | @ManyToOne → OrderItem | NOT NULL |

#### `RestaurantReview` → `restaurant_reviews`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| rating | Integer | NOT NULL (1-5) |
| createdAt | LocalDateTime | NOT NULL, @PrePersist |
| user | @ManyToOne → User | NOT NULL |
| order | @ManyToOne → Order | NOT NULL |
| restaurant | @ManyToOne → Restaurant | NOT NULL |

#### `MenuItemReview` → `menu_item_reviews`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| rating | Integer | NOT NULL (1-5) |
| createdAt | LocalDateTime | NOT NULL, @PrePersist |
| user | @ManyToOne → User | NOT NULL |
| order | @ManyToOne → Order | NOT NULL |
| menuItem | @ManyToOne → MenuItem | NOT NULL |

#### `Voucher` → `vouchers`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| code | String | NOT NULL, UNIQUE ("HEMAT20") |
| value | Double | NOT NULL (persentase, 0-100) |
| description | String | nullable |
| minSpend | Double | nullable |
| maxDiscount | Double | nullable (cap) |
| isActive | Boolean | NOT NULL |

#### `Location` → `locations`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| name | String | NOT NULL |
| address | String | nullable |
| latitude | Double | nullable |
| longitude | Double | nullable |

#### `Banner` → `banners`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| imageUrl | String | NOT NULL |
| title | String | nullable |
| linkUrl | String | nullable |
| isActive | Boolean | NOT NULL |
| location | @ManyToOne → Location | nullable |

#### `Category` → `categories`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| name | String | NOT NULL |
| priority | Integer | nullable |

#### `MarqueeNode` → `marquee_nodes`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| text | String | NOT NULL |
| isActive | Boolean | NOT NULL |

#### `FAQ` → `faqs`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| question | String | NOT NULL |
| answer | String (TEXT) | NOT NULL |

#### `Term` → `terms`
| Field | Type | Constraints |
|-------|------|-------------|
| id | String (10) | PK, NanoID |
| content | String (TEXT) | NOT NULL (markdown) |

---

## 5. Database Schema

### 5.1 Tables (from `seed.sql`)

```sql
locations, categories, marquee_nodes, faqs, terms, vouchers,
restaurants, restaurant_promos, menu_items, menu_item_variants,
menu_customizations, customization_options, banners,
users, vendors,
orders, order_items, order_addons,
restaurant_reviews, menu_item_reviews
```

### 5.2 Key Relationships

| FK Column | Source Table | Target Table |
|-----------|-------------|--------------|
| `location_id` | restaurants | locations |
| `vendor_id` | restaurants | vendors |
| `restaurant_id` | menu_items | restaurants |
| `menu_item_id` | menu_customizations | menu_items |
| `customization_id` | customization_options | menu_customizations |
| `user_id` | orders | users |
| `restaurant_id` | orders | restaurants |
| `order_id` | order_items | orders |
| `menu_item_id` | order_items | menu_items (nullable) |
| `order_item_id` | order_addons | order_items |
| `user_id` | restaurant_reviews | users |
| `order_id` | restaurant_reviews | orders |
| `restaurant_id` | restaurant_reviews | restaurants |
| `user_id` | menu_item_reviews | users |
| `order_id` | menu_item_reviews | orders |
| `menu_item_id` | menu_item_reviews | menu_items |

### 5.3 Element Collections (no separate entity)

- `restaurant_promos` → `restaurant.promos` (List<String>)
- `menu_item_variants` → `menuItem.variants` (List<String>)

### 5.4 DDL Behavior

`spring.jpa.hibernate.ddl-auto=update` → Hibernate auto-creates/updates tables.  
The `seed.sql` file serves as manual/fallback reference.

---

## 6. Enums Reference

### `OrderStatus`
```
PENDING     → Order baru dibuat, belum dibayar / menunggu pembayaran
PROCESSING  → Pembayaran sukses, vendor sedang menyiapkan
READY       → Pesanan siap diambil
COMPLETED   → Pesanan sudah diambil/diterima
CANCELLED   → Dibatalkan (karena EXPIRED/FAILED payment)
```

### `PaymentStatus`
```
UNPAID   → Belum dibayar
PAID     → Pembayaran berhasil
EXPIRED  → Waktu pembayaran habis
FAILED   → Pembayaran gagal
```

### `OrderMode`
```
DINE_IN  → Makan di tempat
PICKUP   → Dibawa pulang
```
Parsing: `fromString()` → uppercase + replace `-` with `_`

### `CustomizationType`
```
CHOICE   → Pilih salah satu (radio button)
MULTIPLE → Pilih banyak (checkbox)
```

---

## 7. API Endpoints — Customer

### 7.1 Auth

| Method | Path | Auth | Request Body | Response | Description |
|--------|------|------|-------------|----------|-------------|
| POST | `/api/v1/auth/register` | No | `RegisterRequest` | `LoginResponse` | Register with NIM (unique, 12-15 digits) |
| POST | `/api/v1/auth/login` | No | `LoginRequest` | `LoginResponse` | Login with NIM + password |
| GET | `/api/v1/auth/me` | USER | — | `UserProfileResponse` | Get current user profile |

### 7.2 Discovery & Settings

| Method | Path | Auth | Query Params | Response | Description |
|--------|------|------|-------------|----------|-------------|
| GET | `/api/v1/locations` | No | — | `List<LocationResponse>` | All locations |
| GET | `/api/v1/locations/nearest` | No | `lat`, `lng` | `LocationResponse` | Nearest location (Haversine) |
| GET | `/api/v1/categories` | No | — | `List<CategoryResponse>` | All categories sorted by priority |
| GET | `/api/v1/banners` | No | `locationId` (opt) | `List<BannerResponse>` | Active banners, optionally filtered |
| GET | `/api/v1/marquee` | No | — | `List<MarqueeNodeResponse>` | Active marquee texts |
| GET | `/api/v1/faqs` | No | — | `List<FAQResponse>` | All FAQs |
| GET | `/api/v1/terms` | No | — | `TermResponse` | Terms & conditions |

### 7.3 Restaurants & Menu

| Method | Path | Auth | Query Params | Response | Description |
|--------|------|------|-------------|----------|-------------|
| GET | `/api/v1/restaurants` | USER | `locationId`, `search` | `List<RestaurantResponse>` | Browse restaurants |
| GET | `/api/v1/restaurants/{id}` | USER | — | `RestaurantDetailResponse` | Restaurant detail with menus by category |
| GET | `/api/v1/menus/search` | No | `q` | `List<MenuItemResponse>` | Search menu by name/restaurant/category (JPQL) |
| GET | `/api/v1/promos` | No | `locationId` (opt) | `List<PromoResponse>` | Items with discount (originalPrice != null) |

### 7.4 Vouchers

| Method | Path | Auth | Request Body | Response | Description |
|--------|------|------|-------------|----------|-------------|
| GET | `/api/v1/vouchers` | USER | — | `List<VoucherResponse>` | Active vouchers |
| POST | `/api/v1/vouchers/validate` | USER | `ValidateVoucherRequest` | `ValidateVoucherResponse` | Validate code + calc discount |

### 7.5 Orders

| Method | Path | Auth | Request Body | Response | Description |
|--------|------|------|-------------|----------|-------------|
| POST | `/api/v1/orders` | USER | `CreateOrderRequest` | `CreateOrderResponse` | Create order + Xendit invoice |
| GET | `/api/v1/orders` | USER | — | `List<OrderResponse>` | User's order history |
| GET | `/api/v1/orders/{id}` | USER | — | `OrderResponse` | Order detail (ownership check) |
| GET | `/api/v1/orders/unreviewed` | USER | — | `List<OrderResponse>` | Completed orders not yet reviewed |

### 7.6 Payments

| Method | Path | Auth | Headers | Request Body | Response | Description |
|--------|------|------|---------|-------------|----------|-------------|
| POST | `/api/v1/payments/callback` | No | `x-callback-token` (not required) | `PaymentCallbackRequest` | `{"received": true}` | Xendit webhook |

### 7.7 Reviews

| Method | Path | Auth | Request Body | Response | Description |
|--------|------|------|-------------|----------|-------------|
| POST | `/api/v1/restaurant-reviews` | USER | `CreateRestaurantReviewRequest` | `RestaurantReviewResponse` | Review restaurant (once per order) |
| POST | `/api/v1/menu-item-reviews` | USER | `CreateMenuItemReviewRequest` | `MenuItemReviewResponse` | Review menu item (once per item per order) |
| GET | `/api/v1/restaurant-reviews/restaurant/{restaurantId}` | USER | — | `List<RestaurantReviewResponse>` | Reviews for a restaurant |
| GET | `/api/v1/restaurant-reviews/order/{orderId}` | USER | — | `List<RestaurantReviewResponse>` | Restaurant reviews for an order |
| GET | `/api/v1/restaurant-reviews/check` | USER | `orderId` | `{"reviewed": bool}` | Check if reviewed |
| GET | `/api/v1/menu-item-reviews/menu-item/{menuItemId}` | USER | — | `List<MenuItemReviewResponse>` | Reviews for a menu item |
| GET | `/api/v1/menu-item-reviews/order/{orderId}` | USER | — | `List<MenuItemReviewResponse>` | Menu item reviews for an order |

---

## 8. API Endpoints — Vendor

### 8.1 Auth

| Method | Path | Auth | Request Body | Response | Description |
|--------|------|------|-------------|----------|-------------|
| POST | `/api/v1/vendor/auth/login` | No | `VendorLoginRequest` | `VendorLoginResponse` | Login with email + password |
| GET | `/api/v1/vendor/auth/me` | VENDOR | — | `VendorProfileResponse` | Get vendor profile + restaurants |

### 8.2 Restaurant Management

| Method | Path | Auth | Request Body | Response | Description |
|--------|------|------|-------------|----------|-------------|
| GET | `/api/v1/vendor/restaurants/{id}` | VENDOR | — | `VendorRestaurantResponse` | View restaurant detail |
| PUT | `/api/v1/vendor/restaurants/{id}` | VENDOR | `UpdateRestaurantRequest` | `VendorRestaurantResponse` | Update restaurant info |
| PATCH | `/api/v1/vendor/restaurants/{id}/status` | VENDOR | — | `VendorRestaurantResponse` | Toggle isOpen |
| PUT | `/api/v1/vendor/restaurants/{id}/hours` | VENDOR | `UpdateHoursRequest` | `VendorRestaurantResponse` | Update operational hours |

### 8.3 Menu Management

| Method | Path | Auth | Request Body | Response | Description |
|--------|------|------|-------------|----------|-------------|
| GET | `/api/v1/vendor/restaurants/{id}/menus` | VENDOR | — | `List<MenuItemResponse>` | List all menus |
| POST | `/api/v1/vendor/restaurants/{id}/menus` | VENDOR | `CreateMenuItemRequest` | `MenuItemResponse` | Create menu item |
| PUT | `/api/v1/vendor/menus/{menuId}` | VENDOR | `UpdateMenuItemRequest` | `MenuItemResponse` | Update menu item |
| DELETE | `/api/v1/vendor/menus/{menuId}` | VENDOR | — | 204 | Delete menu item |
| PATCH | `/api/v1/vendor/menus/{menuId}/popular` | VENDOR | — | `MenuItemResponse` | Toggle isPopular |

### 8.4 Customization CRUD

| Method | Path | Auth | Request Body | Response | Description |
|--------|------|------|-------------|----------|-------------|
| POST | `/api/v1/vendor/menus/{menuId}/customizations` | VENDOR | `CreateCustomizationRequest` | `VendorCustomizationResponse` | Create customization |
| PUT | `/api/v1/vendor/customizations/{custId}` | VENDOR | `UpdateCustomizationRequest` | `VendorCustomizationResponse` | Update customization |
| DELETE | `/api/v1/vendor/customizations/{custId}` | VENDOR | — | 204 | Delete customization |
| POST | `/api/v1/vendor/customizations/{custId}/options` | VENDOR | `CreateCustomizationOptionRequest` | `VendorCustomizationOptionResponse` | Create option |
| PUT | `/api/v1/vendor/customization-options/{optId}` | VENDOR | `UpdateCustomizationOptionRequest` | `VendorCustomizationOptionResponse` | Update option |
| DELETE | `/api/v1/vendor/customization-options/{optId}` | VENDOR | — | 204 | Delete option |

### 8.5 Order Management

| Method | Path | Auth | Query Params | Request Body | Response | Description |
|--------|------|------|-------------|-------------|----------|-------------|
| GET | `/api/v1/vendor/restaurants/{id}/orders` | VENDOR | `status`, `dateFrom`, `dateTo` | — | `List<VendorOrderResponse>` | List orders with filters |
| GET | `/api/v1/vendor/orders/{orderId}` | VENDOR | — | — | `VendorOrderResponse` | Order detail |
| PATCH | `/api/v1/vendor/orders/{orderId}/status` | VENDOR | — | `UpdateOrderStatusRequest` | `VendorOrderResponse` | Update status (PROCESSING→READY→COMPLETED) |

### 8.6 Analytics

| Method | Path | Auth | Query Params | Response | Description |
|--------|------|------|-------------|----------|-------------|
| GET | `/api/v1/vendor/restaurants/{id}/analytics/summary` | VENDOR | — | `VendorAnalyticsSummaryResponse` | Today's orders/revenue, pending/processing counts, avg rating |
| GET | `/api/v1/vendor/restaurants/{id}/analytics/revenue` | VENDOR | `dateFrom`, `dateTo` | `VendorRevenueResponse` | Revenue breakdown by day (paid orders only) |
| GET | `/api/v1/vendor/restaurants/{id}/analytics/top-items` | VENDOR | `dateFrom`, `dateTo` | `List<VendorTopItemResponse>` | Top selling items |
| GET | `/api/v1/vendor/restaurants/{id}/analytics/orders` | VENDOR | `dateFrom`, `dateTo` | `List<VendorOrderTrendResponse>` | Order count + revenue trends by day |

### 8.7 Reviews

| Method | Path | Auth | Response | Description |
|--------|------|------|----------|-------------|
| GET | `/api/v1/vendor/restaurants/{restaurantId}/reviews` | VENDOR | `List<RestaurantReviewResponse>` | View reviews for owned restaurant |

---

## 9. Authentication & Security

### 9.1 Architecture

```
Request → JwtAuthFilter (OncePerRequestFilter)
           ├── Has "Authorization: Bearer <token>"?
           │   ├── Yes → validate token via JwtService
           │   │         ├── Valid → set SecurityContext (principal=userId, authority=ROLE_USER/ROLE_VENDOR)
           │   │         └── Invalid → 401 response, STOP
           │   └── No → continue chain (anonymous)
           │
           ↓
           SecurityConfig.filterChain
           ├── Public paths → permitAll
           ├── /api/v1/vendor/** → hasRole("VENDOR")
           └── Any other request → authenticated
```

### 9.2 Public Paths (no auth required)

Only authentication, payment callback, and infrastructure paths are public.
All other endpoints (restaurants, menus, promos, orders, reviews, vouchers, locations, categories, banners, marquee, FAQs, terms) require authentication.

```
POST /api/v1/auth/login
POST /api/v1/auth/register
GET  /error (Spring Boot default)
GET  /v3/api-docs/**
GET  /swagger-ui/**
GET  /swagger-ui.html
POST /api/v1/payments/callback
```

### 9.3 JWT Token Specs

- **Algorithm**: HMAC-SHA (via `Keys.hmacShaKeyFor`)
- **Secret**: `app.jwt.secret` from config (default: hardcoded fallback)
- **Expiry**: `app.jwt.expiration-ms` (default: 86400000 = 24 hours)
- **Claims**:
  - `sub` (subject) = userId
  - `role` = "USER" | "VENDOR"
  - `iat`, `exp`

### 9.4 Role System

| Role | Spring Security | Access |
|------|----------------|--------|
| USER | `ROLE_USER` | All customer endpoints (`/api/v1/orders/**`, reviews, etc.) |
| VENDOR | `ROLE_VENDOR` | All vendor endpoints (`/api/v1/vendor/**`) |

### 9.5 Ownership Checks (Vendor)

Every vendor operation calls `VendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId)` to verify vendor owns the restaurant. This is used by:
- `VendorRestaurantService`
- `VendorMenuService` (via menu → restaurant → vendor chain)
- `VendorOrderService` (via order → restaurant → vendor chain)
- `VendorAnalyticsService`
- `VendorReviewService`

### 9.6 Ownership Checks (Customer)

- `OrderService.getOrderDetail()` checks `order.getUser().getId().equals(userId)`

### 9.7 CORS

- All origins allowed (`*`)
- All methods allowed (GET, POST, PUT, PATCH, DELETE, OPTIONS)
- All headers allowed

---

## 10. Order Lifecycle & State Machine

### 10.1 State Diagram

```
                    ┌──────────────────────────────────────────────┐
                    │                                              │
                    ▼                                              │
 [*] → PENDING (UNPAID) ──Callback PAID──→ PROCESSING (PAID)      │
         │    │                              │                     │
         │    │                              ├─Vendor: READY──→ COMPLETED → [*]
         │    │                              │
         │    └──Callback EXPIRED──→ CANCELLED (EXPIRED) → [*]
         │
         └────Callback FAILED───→ CANCELLED (FAILED) → [*]
```

### 10.2 Transition Triggers

| From | To | Triggered By | Component |
|------|----|-------------|-----------|
| PENDING + UNPAID | PROCESSING + PAID | Xendit callback `PAID` | `PaymentService.handleCallback()` |
| PENDING + UNPAID | CANCELLED + EXPIRED | Xendit callback `EXPIRED` | `PaymentService.handleCallback()` |
| PENDING + UNPAID | CANCELLED + FAILED | Xendit callback `FAILED` | `PaymentService.handleCallback()` |
| PROCESSING | READY | Vendor PATCH status | `VendorOrderService.updateStatus()` |
| READY | COMPLETED | Vendor PATCH status | `VendorOrderService.updateStatus()` |

### 10.3 Valid Transitions (Vendor)

```java
// VendorOrderService.java:27-30
Map.of(
    OrderStatus.PROCESSING, OrderStatus.READY,
    OrderStatus.READY, OrderStatus.COMPLETED
);
```

Only PROCESSING→READY and READY→COMPLETED are allowed. All other transitions return 400.

### 10.4 ⚠️ Gaps in State Machine

| Missing Transition | Impact |
|-------------------|--------|
| PENDING → CANCELLED (by customer) | No cancel endpoint for customers |
| PENDING → CANCELLED (by vendor) | Vendor cannot reject orders |
| PROCESSING → CANCELLED (by vendor) | Cannot cancel if out of stock |
| PENDING + UNPAID (auto-expire) | No scheduler to expire unpaid orders |
| Any → PROCESSING (by vendor) | Only PaymentService sets PROCESSING; vendor cannot manually start processing |

---

## 11. Payment Flow (Xendit)

### 11.1 Create Order → Xendit Invoice

```
createOrder(request, userId)
  │
  ├── Validate restaurant exists
  ├── Build OrderItems from request (with addons)
  ├── Calculate subtotal
  ├── Apply voucher (if code provided):
  │     ├── Find active voucher by code
  │     ├── Check minSpend
  │     └── Calculate discount = subtotal * value% (capped at maxDiscount)
  ├── Calculate appFee = 2000 (if subtotal > 0)
  ├── Calculate totalAmount = subtotal - discount + appFee
  ├── Generate orderNumber (# + 4-digit random)
  ├── Build & save Order (status=PENDING, paymentStatus=UNPAID)
  ├── callXenditInvoice(order):
  │     ├── If no API key → return mock URL
  │     └── Else:
  │           ├── params: external_id=orderId, amount=totalAmount, description, redirect_urls
  │           ├── Invoice.create(params)
  │           ├── Save paymentExternalId = invoice.getId()
  │           └── Return invoice.getInvoiceUrl()
  └── Save paymentUrl → return CreateOrderResponse
```

### 11.2 Callback Handling

```java
PaymentCallbackRequest {
    id,                // Xendit invoice ID
    external_id,       // Order ID (our system)
    status,            // "PAID" | "EXPIRED" | "FAILED"
    amount, paid_amount, paid_at, payment_channel, payment_method, ...
}
```

| Callback Status | Action |
|----------------|--------|
| `PAID` | `paymentStatus=PAID`, `orderStatus=PROCESSING` |
| `EXPIRED` | `paymentStatus=EXPIRED`, `orderStatus=CANCELLED` |
| `FAILED` | `paymentStatus=FAILED`, `orderStatus=CANCELLED` |
| Other | Log warning, no action |

### 11.3 Callback Validation Flow

```
handleCallback(callback, xenditCallbackToken)
  │
  ├── [1] Token validation
  │     ├── xendit.callback-token configured?
  │     │   ├── No  → throw 500 (server misconfiguration)
  │     │   └── Yes → match with header x-callback-token?
  │     │               ├── No  → throw 401
  │     │               └── Yes → continue
  │
  ├── [2] Find order by external_id (order ID)
  │     └── Not found → throw 404
  │
  ├── [3] State guard (idempotency)
  │     └── paymentStatus != UNPAID OR status != PENDING?
  │           └── Yes → log + return 200 (already processed)
  │
  ├── [4] Save Xendit invoice ID to paymentExternalId
  │
  ├── [5] Amount verification (PAID only)
  │     └── |paid_amount - totalAmount| > 1000?
  │           └── Yes → log warning (amount mismatch)
  │
  ├── [6] Status mapping
  │     ├── "PAID"    → paymentStatus=PAID,   orderStatus=PROCESSING
  │     ├── "EXPIRED" → paymentStatus=EXPIRED, orderStatus=CANCELLED
  │     ├── "FAILED"  → paymentStatus=FAILED,  orderStatus=CANCELLED
  │     └── other     → log warning, no action
  │
  └── [7] Save order → return 200
```

### 11.4 ⚠️ Security

- `x-callback-token` header is **mandatory** (`required=true`)
- `xendit.callback-token` **must be configured** in `.env` — server throws 500 otherwise
- If token doesn't match → 401 Unauthorized

---

## 12. Voucher System

### 12.1 Voucher Entity

```java
Voucher {
    code: String (unique, e.g. "HEMAT20")
    value: Double (persentase diskon, e.g. 20 = 20%)
    minSpend: Double? (minimum subtotal)
    maxDiscount: Double? (maksimum diskon dalam rupiah)
    isActive: Boolean
}
```

### 12.2 Discount Calculation

```java
discount = subtotal * voucher.value / 100;
if (voucher.maxDiscount != null && discount > voucher.maxDiscount) {
    discount = voucher.maxDiscount;
}
```

### 12.3 Validation (reused in both places)

1. Voucher must be active (`isActive = true`)
2. If `minSpend` is set, subtotal must be >= minSpend
3. Discount capped at `maxDiscount` if set

### 12.4 ⚠️ Not Implemented

- No usage limit per user: voucher can be used unlimited times by same user
- No voucher expiry date field
- No usage count tracking

---

## 13. Review System

### 13.1 Restaurant Reviews

- One review per order per user (checked via `existsByOrderIdAndUserId`)
- Only for COMPLETED orders
- Updates `restaurant.rating` (average) and `restaurant.ratingCount`

### 13.2 Menu Item Reviews

- One review per menu item per order per user (checked via `existsByOrderIdAndMenuItemIdAndUserId`)
- Only for COMPLETED orders
- Validates menu item belongs to the order
- Updates `menuItem.rating` (average) and `menuItem.ratingCount`

### 13.3 Rating Calculation (both services)

```java
// Re-fetches ALL reviews each time
List<Review> reviews = repository.findAll();
double avg = reviews.stream().mapToInt(Review::getRating).average();
entity.setRating(round(avg * 10) / 10);
entity.setRatingCount(reviews.size());
```

This is O(n) per review. For scale, consider incremental updates.

---

## 14. Vendor Analytics

### 14.1 Summary (`GET /analytics/summary`)

```json
{
  "todayOrders": Integer,
  "todayRevenue": Double,    // only PAID paymentStatus
  "pendingOrders": Integer,  // all time PENDING status
  "processingOrders": Integer,
  "averageRating": Double
}
```

### 14.2 Revenue (`GET /analytics/revenue?dateFrom=&dateTo=`)

- Filters only `paymentStatus = PAID`
- Groups by day (LocalDate)
- Returns breakdown: `{date, revenue, orderCount}` + `totalRevenue`, `totalOrders`

### 14.3 Top Items (`GET /analytics/top-items?dateFrom=&dateTo=`)

```sql
-- OrderItemRepository.findTopItemsByRestaurantIdAndDateRange
SELECT mi.id, mi.name, mi.image_url, SUM(oi.quantity), SUM(oi.price * oi.quantity)
FROM order_items oi
JOIN menu_items mi ON oi.menu_item_id = mi.id
JOIN orders o ON oi.order_id = o.id
WHERE mi.restaurant_id = ? AND o.created_at BETWEEN ? AND ?
GROUP BY mi.id, mi.name, mi.image_url
ORDER BY SUM(oi.quantity) DESC
```

### 14.4 Order Trends (`GET /analytics/orders?dateFrom=&dateTo=`)

- Groups by day (all orders)
- Returns: `{date, orderCount, totalRevenue}`
- Revenue filtered to PAID only; orderCount includes all statuses

---

## 15. Data Seeder

### 15.1 Activation

Set `app.seed.enabled=true` in `.env` or `application.properties`.  
Seeder runs **only once** — if any location exists (`locationRepository.count() > 0`), it skips.

### 15.2 Seeded Data

| Data | Count |
|------|-------|
| Locations | 5 (Pusat, Teknik, Ekonomi, Kedokteran, FISIP) |
| Categories | 8 (Semua, Nasi, Mie, Ayam, Minuman, Camilan, Seafood, Manis) |
| MarqueeNodes | 5 (promotional texts) |
| FAQs | 4 |
| Terms | 1 (markdown) |
| Vouchers | 3 (HEMAT20, DISKON10, DINEIN30) |
| Vendors | 3 (Budi, Siti, Agus — all password: "password") |
| Restaurants | 6 (from 10 available names, cyclically assigned to 3 vendors) |
| Menu Items | 3-5 per restaurant (random from 36 food names) |
| Customizations | Random: Level Pedas (CHOICE) + optional Topping (MULTIPLE) |
| Banners | 6 (linked to locations) |
| Users | 12 (random NIM, all password: "password") |
| Orders | 8 (mix of COMPLETED, PROCESSING, READY, PENDING, CANCELLED) |
| Reviews | For COMPLETED orders |

### 15.3 Default Credentials

| Role | Identifier | Password |
|------|-----------|----------|
| Customer | Any NIM from seeded users | `password` |
| Vendor | `budi@kantin.id`, `siti@kantin.id`, `agus@kantin.id` | `password` |

---

## 16. Full DTO Reference

### 16.1 Request DTOs (18 files)

#### `RegisterRequest`
```java
name: String (NotBlank)
nim: String (NotBlank, @Pattern: 12-15 digits)
password: String (NotBlank)
semester: Integer (optional)
locationId: String (optional)
```

#### `LoginRequest`
```java
nim: String (NotBlank, @Pattern: 12-15 digits)
password: String (NotBlank)
```

#### `VendorLoginRequest`
```java
email: String (NotBlank)
password: String (NotBlank)
```

#### `CreateOrderRequest`
```java
restaurantId: String (NotNull)
items: List<CreateOrderItemRequest> (NotEmpty)
  ├── menuItemId: String (NotNull)
  ├── qty: Integer (NotNull)
  ├── variantName: String (optional)
  ├── note: String (optional)
  └── addons: List<CreateOrderAddonRequest> (optional)
        ├── name: String (NotNull)
        └── price: Double (optional)
mode: String (NotNull)  // "dine-in" or "pickup"
voucherCode: String (optional)
```

#### `CreateMenuItemRequest`
```java
name: String (NotBlank)
description: String
price: Double (NotNull)
imageUrl: String
category: String
prepTime: String
originalPrice: Double
badgeText: String
badgeVariant: String
variants: List<String>
```

#### `UpdateMenuItemRequest`
All fields optional (same structure as CreateMenuItemRequest)

#### `UpdateRestaurantRequest`
```java
name: String, cuisine: String, imageUrl: String,
bannerImageUrl: String, address: String
```
(All optional)

#### `UpdateHoursRequest`
```java
operationalHours: String (NotBlank)
```

#### `CreateCustomizationRequest`
```java
title: String (NotBlank)
type: String (NotNull)  // "CHOICE" | "MULTIPLE"
isRequired: Boolean (NotNull)
options: List<CreateCustomizationOptionRequest>
  ├── label: String (NotBlank)
  └── price: Double
```

#### `UpdateCustomizationRequest`
```java
title: String, type: String, isRequired: Boolean  (all optional)
```

#### `CreateCustomizationOptionRequest`
```java
label: String (NotBlank)
price: Double
```

#### `UpdateCustomizationOptionRequest`
```java
label: String, price: Double  (both optional)
```

#### `UpdateOrderStatusRequest`
```java
status: String (NotBlank)  // "READY", "COMPLETED"
```

#### `PaymentCallbackRequest`
```java
id: String
external_id: String  (maps to Order ID)
status: String  // "PAID" | "EXPIRED" | "FAILED"
amount: Number, paid_amount: Number, paid_at: String
payment_channel: String, payment_method: String
payer_email: String, description: String
```

#### `ValidateVoucherRequest`
```java
code: String (NotBlank)
subtotal: Double (Positive)
```

#### `CreateRestaurantReviewRequest`
```java
orderId: String (NotNull)
rating: Integer (Min=1, Max=5)
```

#### `CreateMenuItemReviewRequest`
```java
orderId: String (NotNull)
menuItemId: String (NotNull)
rating: Integer (Min=1, Max=5)
```

### 16.2 Response DTOs (32 files)

Key response structures:

#### `LoginResponse` / `UserProfileResponse`
```json
{
  "token": "eyJhbGci...",
  "user": {
    "id": "...", "name": "...", "nim": "...",
    "semester": 5, "location_name": "Kantin Pusat", "location_id": "..."
  }
}
```

#### `VendorLoginResponse` / `VendorProfileResponse`
```json
{
  "token": "eyJhbGci...",
  "vendor": {
    "id": "...", "email": "budi@kantin.id", "name": "Budi Santoso",
    "phone": "...", "avatar_url": "...",
    "restaurants": [ { "id": "...", "name": "Warung Bu Ani", ... } ]
  }
}
```

#### `CreateOrderResponse`
```json
{
  "order_id": "...", "order_number": "#1234",
  "payment_url": "https://checkout.xendit.co/...",
  "total_amount": 25000.0, "status": "pending"
}
```

#### `OrderResponse`
```json
{
  "id": "...", "restaurant_id": "...", "restaurant_name": "...",
  "restaurant_image": "...", "status": "completed",
  "total_amount": 25000.0, "mode": "dine-in",
  "order_number": "#1234", "payment_url": "...",
  "payment_status": "paid", "discount_amount": 5000.0,
  "app_fee": 2000.0, "created_at": "...", "updated_at": "...",
  "items": [
    {
      "id": "...", "name": "Nasi Goreng", "quantity": 1, "price": 15000.0,
      "image_url": "...", "variant_name": "Level 2", "note": "...",
      "addons": [ { "name": "Telur", "price": 3000.0 } ]
    }
  ]
}
```

#### `VendorOrderResponse`
Same as `OrderResponse` but adds `customer: { id, name, nim }` and uses uppercase status names.

#### `RestaurantDetailResponse`
```json
{
  "id": "...", "name": "...", "cuisine": "...",
  "rating": 4.5, "rating_count": 250, "reviews_count": 250,
  "is_open": true,
  "image_url": "...", "location_id": "...",
  "cheapest_price": 8000.0,
  "promos": ["Diskon 30%", "Paket Hemat"],
  "banner_image_url": "...", "address": "...",
  "operational_hours": "08:00 - 17:00",
  "categories": ["Ayam", "Minuman", "Nasi"],
  "menus": [ /* MenuItemResponse[] */ ]
}
```

#### `MenuItemResponse`
```json
{
  "id": "...", "name": "...", "description": "...",
  "price": 15000.0, "image_url": "...", "category": "Nasi",
  "rating": 4.5, "rating_count": 10,
  "is_popular": true, "prep_time": "10-20 mnt",
  "stall": "Warung Bu Ani", "restaurant_id": "...",
  "variants": ["Level 1", "Level 2"],
  "customizations": [
    {
      "id": "...", "title": "Level Pedas",
      "type": "CHOICE", "is_required": true,
      "options": [
        { "id": "...", "label": "Tidak Pedas", "price": 0 },
        { "id": "...", "label": "Level 1", "price": 0 }
      ]
    }
  ]
}
```

#### `VendorAnalyticsSummaryResponse`
```json
{
  "todayOrders": 12,
  "todayRevenue": 350000.0,
  "pendingOrders": 2,
  "processingOrders": 3,
  "averageRating": 4.2
}
```

#### `VendorRevenueResponse`
```json
{
  "totalRevenue": 1200000.0,
  "totalOrders": 45,
  "breakdown": [
    { "date": "2026-06-01", "revenue": 400000.0, "orderCount": 15 },
    { "date": "2026-06-02", "revenue": 800000.0, "orderCount": 30 }
  ]
}
```

#### `VendorTopItemResponse`
```json
{
  "menuItemId": "...", "name": "Nasi Goreng", "imageUrl": "...",
  "totalQuantity": 25, "totalRevenue": 375000.0
}
```

#### `VendorOrderTrendResponse`
```json
{ "date": "2026-06-01", "orderCount": 15, "totalRevenue": 400000.0 }
```

#### `PromoResponse` (extends MenuItemResponse with originalPrice)
```json
{
  // same as MenuItemResponse + original_price, badge_text, badge_variant
  "original_price": 20000.0, "badge_text": "Diskon 25%",
  "badge_variant": "destructive"
}
```

#### `VoucherResponse`
```json
{
  "id": "...", "code": "HEMAT20",
  "value": 20.0, "description": "Diskon 20%...",
  "min_spend": null, "max_discount": 15000.0, "is_active": true
}
```

#### `ValidateVoucherResponse`
```json
{
  "valid": true,
  "voucher": { /* VoucherResponse */ },
  "discount": 5000.0
}
```

#### `BannerResponse`
```json
{
  "id": "...", "image_url": "...", "title": "Promo Akhir Bulan!",
  "link_url": "/promo", "is_active": true, "location_id": "..."
}
```

And the remaining simple responses: `CategoryResponse`, `LocationResponse`, `MarqueeNodeResponse`, `FAQResponse`, `TermResponse`, `RestaurantResponse`, `RestaurantReviewResponse`, `MenuItemReviewResponse`, `VendorRestaurantResponse`, `VendorCustomizationResponse`, `VendorCustomizationOptionResponse`.

---

## 17. Configuration Reference

### 17.1 `application.properties`

```properties
spring.application.name=kantin-kita

# Database
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/kantin_kita}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# JWT
app.jwt.secret=${JWT_SECRET:your-256-bit-secret-key-for-kantin-kita-app-change-in-production}
app.jwt.expiration-ms=${JWT_EXPIRATION_MS:86400000}

# Swagger
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.info.title=Kantin Kita API
springdoc.info.version=1.0.0
springdoc.info.description=API documentation for Kantin Kita

# Xendit
xendit.api-key=${XENDIT_API_KEY:}
xendit.callback-token=${XENDIT_CALLBACK_TOKEN:}
xendit.success-redirect-url=${XENDIT_SUCCESS_URL:http://localhost:3000/orders/}
xendit.failure-redirect-url=${XENDIT_FAILURE_URL:http://localhost:3000/orders/}

# Server
server.port=${SERVER_PORT:8080}

# Seeder
app.seed.enabled=${APP_SEED_ENABLED:false}
```

### 17.2 `.env.example`

```bash
DB_URL=jdbc:mysql://localhost:3306/kantin_kita
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=
JWT_EXPIRATION_MS=86400000

XENDIT_API_KEY=
XENDIT_CALLBACK_TOKEN=
XENDIT_SUCCESS_URL=http://localhost:3000/orders/
XENDIT_FAILURE_URL=http://localhost:3000/orders/

SERVER_PORT=8080
APP_SEED_ENABLED=true
```

### 17.3 `spring.factories`

```
org.springframework.boot.env.EnvironmentPostProcessor=\
com.example.demo.config.DotenvEnvironmentPostProcessor
```

This enables loading `.env` file from project root into Spring's Environment.

---

## 18. Known Anomalies & Issues

### 🔴 KRITIS

#### A1. Customer Tidak Bisa Cancel Order
- **File**: `OrderController.java`, `OrderService.java`
- **Deskripsi**: Tidak ada endpoint cancel dari sisi customer. Order PENDING/UNPAID hanya bisa berubah via callback.
- **Dampak**: Order menggantung selamanya jika customer tidak jadi pesan.
- **Solusi**: Tambah `PATCH /api/v1/orders/{id}/cancel` → hanya untuk PENDING + UNPAID.

#### A2. Tidak Ada Expiry Mechanism untuk UNPAID Orders
- **File**: Tidak ada scheduler/batch task
- **Deskripsi**: Order PENDING+UNPAID tidak pernah otomatis expire.
- **Dampak**: Data kotor di dashboard vendor (pendingOrders), inflasi statistik.
- **Solusi**: Tambah `@Scheduled` task yang cancel order UNPAID > 30 menit.

#### A3. Vendor Tidak Bisa Menolak/Membatalkan Order
- **File**: `VendorOrderService.java:27-30`
- **Deskripsi**: `VALID_TRANSITIONS` hanya berisi PROCESSING→READY→COMPLETED.
- **Dampak**: Vendor tidak bisa cancel order jika stok habis atau restoran tutup.
- **Solusi**: Tambah transisi PENDING→CANCELLED dan PROCESSING→CANCELLED (dengan alasan).

### 🟡 SEDANG

#### ~~A4. Xendit Callback Token Tidak Mandatory~~
- **Status**: ✅ FIXED
- **File**: `PaymentService.java`, `PaymentController.java`
- **Perubahan**: `x-callback-token` jadi `required=true` di controller. Service sekarang throw 500 jika token tidak dikonfigurasi, dan 401 jika token tidak match. Ditambah state guard (cegah double-process) dan amount verification.

#### ~~A5. Tidak Ada Validasi Jam Operasional~~
- **Status**: ✅ FIXED
- **File**: `OrderService.java`
- **Perubahan**: Validasi `isOpen` dan `operationalHours` (format `"HH:mm - HH:mm"`) di `createOrder()`. Timezone pake `Asia/Jakarta` (hardcode). Overnight hours (misal `22:00 - 02:00`) juga didukung.

#### A6. MenuItem Tidak Punya Stock/Inventory
- **File**: `MenuItem.java`, `OrderService.java`
- **Deskripsi**: Tidak ada field stock / isAvailable. Menu bisa di-order unlimited.
- **Dampak**: Over-ordering, customer kecewa karena pesanan tidak bisa dipenuhi.
- **Solusi**: Tambah field `available` / `stock` di MenuItem, validasi saat create order.

#### A7. Voucher Bisa Dipakai Unlimited Kali
- **File**: `OrderService.java:91-105`
- **Deskripsi**: Tidak ada pengecekan apakah voucher sudah dipakai user yang sama.
- **Dampak**: Satu voucher bisa dipakai berkali-kali oleh user yang sama.
- **Solusi**: Tambah tabel `voucher_usage` atau counter per user.

### 🟢 RINGAN

#### A8. Rating Calculation O(n) per Review
- **File**: `MenuItemReviewService.java:89-103`, `RestaurantReviewService.java:84-98`
- **Deskripsi**: Setiap review baru, semua review di-fetch ulang untuk hitung average.
- **Dampak**: Performa degrade seiring banyak review.
- **Solusi**: Simpan `totalRating` dan update incremental.

#### A9. Order Number Random (Kolisi Potensial)
- **File**: `OrderService.java:199-201`
- **Deskripsi**: `orderNumber = "#" + String.format("%04d", random.nextInt(10000))` — hanya 10.000 kemungkinan value.
- **Dampak**: Potensi kolisi nomor order.
- **Solusi**: Gunakan timestamp atau counter sequential.

#### A10. Menus Search Tidak Filter Status Restaurant
- **File**: `MenuItemRepository.java:22-23`
- **Deskripsi**: Search JPQL tidak mengecek `restaurant.isOpen`.
- **Dampak**: Menu dari restoran yang tutup tetap muncul di pencarian.
- **Solusi**: Tambah kondisi `AND r.isOpen = true` di query.

#### ~~A11. SalesCount Tipe String~~
- **Status**: ❌ REMOVED
- **File**: `MenuItem.java`, `MenuItemResponse.java`, `VendorMenuService.java`, `DataSeeder.java`, `seed.sql`
- **Keputusan**: Field `salesCount` dihapus total dari backend & frontend. Tidak berguna.

---

## Service Layer File Index

| Service | Package | Key Responsibility |
|---------|---------|-------------------|
| `JwtService` | service | Generate, parse, validate JWT |
| `AuthService` | service | Customer register/login/profile |
| `VendorAuthService` | service | Vendor login/profile |
| `OrderService` | service | Create/list/detail orders + Xendit invoice |
| `PaymentService` | service | Handle Xendit callback |
| `RestaurantService` | service | Browse/detail restaurants |
| `MenuItemService` | service | Search menus (JPQL keyword) |
| `VoucherService` | service | List active vouchers + validate |
| `PromoService` | service | List discounted items |
| `BannerService` | service | Active banners by location |
| `CategoryService` | service | Categories ordered by priority |
| `LocationService` | service | List + nearest (Haversine) |
| `MarqueeNodeService` | service | Active marquee texts |
| `FAQService` | service | All FAQs |
| `TermService` | service | First terms record |
| `RestaurantReviewService` | service | Create/list restaurant reviews + update rating |
| `MenuItemReviewService` | service | Create/list menu item reviews + update rating |
| `VendorRestaurantService` | service | Restaurant CRUD + ownership check |
| `VendorMenuService` | service | Menu CRUD + customizations + options |
| `VendorOrderService` | service | List orders + update status (validated transitions) |
| `VendorAnalyticsService` | service | Summary, revenue, top items, order trends |
| `VendorReviewService` | service | View reviews for owned restaurant |

---

## Repository Custom Methods

| Repository | Custom Query Methods |
|-----------|---------------------|
| `UserRepository` | `findByNim()`, `existsByNim()` |
| `VendorRepository` | `findByEmail()`, `existsByEmail()` |
| `RestaurantRepository` | `findByLocationId()`, `findByNameContainingIgnoreCase()`, `findByLocationIdAndNameContainingIgnoreCase()`, `findByVendorId()` |
| `MenuItemRepository` | `findByNameContainingIgnoreCase()`, `findByRestaurantId()`, `findByOriginalPriceIsNotNull()`, `findByOriginalPriceIsNotNullAndRestaurant_Location_Id()`, `searchByKeyword()` (JPQL) |
| `OrderRepository` | `findByUserIdOrderByCreatedAtDesc()`, `findByUserIdAndStatusOrderByCreatedAtDesc()`, `findByRestaurantIdOrderByCreatedAtDesc()`, `findByRestaurantIdAndStatusOrderByCreatedAtDesc()`, `findByRestaurantIdAndDateRange()` (JPQL), `findByRestaurantIdAndStatusAndDateRange()` (JPQL) |
| `OrderItemRepository` | `findTopItemsByRestaurantIdAndDateRange()` (JPQL with GROUP BY) |
| `BannerRepository` | `findByIsActiveTrue()`, `findByIsActiveTrueAndLocationId()` |
| `VoucherRepository` | `findByIsActiveTrue()`, `findByCodeAndIsActiveTrue()` |
| `MarqueeNodeRepository` | `findByIsActiveTrue()` |
| `CategoryRepository` | `findAllByOrderByPriorityAsc()` |
| `RestaurantReviewRepository` | `findByRestaurantIdOrderByCreatedAtDesc()`, `findByOrderId()`, `findByOrderIdAndUserId()`, `existsByOrderIdAndUserId()` |
| `MenuItemReviewRepository` | `findByMenuItemIdOrderByCreatedAtDesc()`, `findByOrderId()`, `existsByOrderIdAndMenuItemIdAndUserId()` |
| Other repos | Standard CRUD only (no custom methods) |

---

*End of document. Generated from full source code analysis.*
