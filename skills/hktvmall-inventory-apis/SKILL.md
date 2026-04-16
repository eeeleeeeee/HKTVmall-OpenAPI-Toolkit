---
name: hktvmall-inventory-apis
description: HKTVmall Inventory API reference. Use when writing code that calls HKTVmall Inventory endpoints (GET /oapi/api/inventory/stock/details, POST /oapi/api/inventory/stock).
---

# HKTVmall Inventory API Reference

Use this skill when helping developers write code that calls HKTVmall Inventory APIs.
Base URL for all Inventory APIs: `https://merchant-oapi.shoalter.com`

## Required Headers (all endpoints)

```
Content-Type: application/json
x-auth-token: <token>        # obtain via auth flow
storeCode: <Your Store Code> # e.g. H8888881
platformCode: HKTV
businessType: eCommerce
```

## Endpoints

### Get Stock Detail (取得庫存資料)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/inventory/stock/details`
Version: v1.0.0

The Get Stock Detail API is used to retrieve stock levels and stock status for specific products within a warehouse. The SKU input range for stock levels is 1 to 100.

**Request Body:**

```json
[
  {
    "warehouseId": "H888888101",
    "productId": "H8888881_S_a3"
  }
]
```

```json
[
  {
    "warehouseId": null,
    "productId": "H8888881_S_a3"
  }
]
```

```json
[
  {
    "productId": "H8888881_S_a3"
  }
]
```

```json
[
  {
    "productId": "H8888881_S_a3"
  },
  {
    "productId": "H8888881_S_a4"
  }
]
```

**Response:**

```json
{
  "message": null,
  "code": "success",
  "data": [
    {
      "productId": "H8888881_S_a3",
      "instockStatus": "",
      "availableToSell": 10,
      "inProcess": 0
    }
  ]
}
```

---

### Update Stock Level (更新庫存資料)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/inventory/stock`
Version: v1.0.0

The Update Stock API is used to update stock levels for specific products in the warehouse. The number of SKUs that can be updated in a single request, which is 1 to 100.

**Request Body:**

```json
[
    {
        "productId": "H8888881_S_250422Test_0001",
        "quantity": 1,
        "action": "add"
    }
]
```

```json
[
    {
        "productId": "H8888881_S_250422Test_0001",
        "quantity": 1,
        "action": "add"
    },
    {
        "productId": "H8888881_S_250422Test_999",
        "quantity": 1,
        "action": "add"
    }
]
```

**Response:**

```json
{
  "code": "SUCCESS",
  "response": {
    "successList": [
      {
        "productId": "H8888881_S_250422Test_0001",
        "action": "ADD",
        "qty": 1
      }
    ],
    "failList": [
      {
        "productId": "H8888881_S_250422Test_999",
        "action": "ADD",
        "qty": 1,
        "message": "Product not found: H8888881_S_250422Test_999. Please check productId in MMS or check productId again."
      }
    ]
  }
}
```

---
