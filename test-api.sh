#!/bin/bash

# =====================================================
# KANTIN KITA - API TEST CURL COMMANDS
# =====================================================

echo "=== 1. REGISTER USER ==="
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "nim": "123456789012",
    "password": "password123",
    "semester": 5
  }'
echo -e "\n\n"

echo "=== 2. LOGIN (copy token dari response) ==="
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "123456789012",
    "password": "password123"
  }'
echo -e "\n\n"

TOKEN="isi_token_disini"

echo "=== 3. PROFILE ==="
curl http://localhost:8080/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n\n"

# =====================================================
# PUBLIC ENDPOINTS (ga perlu token)
# =====================================================

echo "=== 4. BANNERS ==="
curl http://localhost:8080/api/v1/banners
echo -e "\n\n"

echo "=== 5. LOCATIONS ==="
curl http://localhost:8080/api/v1/locations
echo -e "\n\n"

echo "=== 6. CATEGORIES ==="
curl http://localhost:8080/api/v1/categories
echo -e "\n\n"

echo "=== 7. MARQUEE ==="
curl http://localhost:8080/api/v1/marquee
echo -e "\n\n"

echo "=== 8. FAQS ==="
curl http://localhost:8080/api/v1/faqs
echo -e "\n\n"

echo "=== 9. TERMS ==="
curl http://localhost:8080/api/v1/terms
echo -e "\n\n"

echo "=== 10. VOUCHERS ==="
curl http://localhost:8080/api/v1/vouchers
echo -e "\n\n"

# =====================================================
# AUTH ENDPOINTS (pake token)
# =====================================================

echo "=== 11. RESTAURANTS ==="
curl "http://localhost:8080/api/v1/restaurants?locationId=1" \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n\n"

echo "=== 12. RESTAURANT DETAIL ==="
curl "http://localhost:8080/api/v1/restaurants/UUID-DISINI" \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n\n"

echo "=== 13. MENU SEARCH ==="
curl "http://localhost:8080/api/v1/menus/search?q=nasi" \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n\n"

echo "=== 14. VOUCHER VALIDATE ==="
curl -X POST http://localhost:8080/api/v1/vouchers/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"code": "HEMAT20", "subtotal": 50000}'
echo -e "\n\n"

echo "=== 15. CREATE ORDER ==="
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "restaurantId": "UUID-RESTAURANT",
    "mode": "pickup",
    "items": [
      {
        "menuItemId": "UUID-MENU",
        "qty": 2,
        "variantName": "Level 2",
        "addons": [{"name": "Bakso", "price": 5000}]
      }
    ],
    "voucherCode": "HEMAT20"
  }'
echo -e "\n\n"

echo "=== 16. ORDERS LIST ==="
curl http://localhost:8080/api/v1/orders \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n\n"

echo "=== 17. ORDER DETAIL ==="
curl http://localhost:8080/api/v1/orders/UUID-ORDER \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n\n"

# =====================================================
# XENDIT SIMULATION (ga perlu token, endpoint publik)
# =====================================================

echo "=== 18. SIMULASI XENDIT CALLBACK (PAID) ==="
curl -X POST http://localhost:8080/api/v1/payments/callback \
  -H "Content-Type: application/json" \
  -H "x-callback-token: ISI_DARI_XENDIT" \
  -d '{
    "id": "xendit-invoice-id",
    "external_id": "ORDER-UUID",
    "status": "PAID",
    "paid_amount": 50000
  }'
echo -e "\n\n"
