---
name: hktvmall-store-apis
description: HKTVmall Store API reference. Use when writing code that calls HKTVmall Store endpoints (GET /oapi/api/store/details, POST /oapi/api/store).
---

# HKTVmall Store API Reference

Use this skill when helping developers write code that calls HKTVmall Store APIs.
Base URL for all Store APIs: `https://mms-api.shoalter.com/mmsAdmin`

## Required Headers (all endpoints)

```
Content-Type: application/json
x-auth-token: <token>        # obtain via auth flow
storeCode: <Your Store Code> # e.g. H8888881
platformCode: HKTV
businessType: eCommerce
```

## Endpoints

### Get Store Information (取得店鋪資料)

**GET** `https://mms-api.shoalter.com/mmsAdmin/oapi/api/store/details`
Version: v1.0.0

The Get Store API is used to retrieve detailed store information, including platform details, store names, merchant details, delivery thresholds, and fees.

**Response:**

```json
{
  "message": null,
  "code": "success",
  "data": [
    {
      "platformCode": "HKTV",
      "storefrontStoreCode": "H8888881",
      "storeNameEn": "EN",
      "storeNameZh": "ZH",
      "storeNameZh": "ZHCN",
      "merchantNameEn": "hever_m_610",
      "merchantNameZh": "hever_m_610",
      "deliveryThreshold": 2,
      "deliveryFee": 3
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 1
  }
}
```

---

### Update Store Information (更新商店資訊)

**POST** `https://mms-api.shoalter.com/mmsAdmin/oapi/api/store`
Version: v1.0.0

The Update Store API is used to update store information, including platform details, store names (in multiple languages), merchant delivery thresholds, and delivery fees.

**Request Body:**

```json
[
  {
    "platformCode": "HKTV",
    "storefrontStoreCode": "H8888881",
    "storeNameEn": "EN",
    "storeNameZh": "ZH",
    "storeNameZhCN": "ZHCN",
    "deliveryThreshold": 2,
    "deliveryFee": 3
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
      "platformCode": "HKTV",
      "storefrontStoreCode": "H8888881",
      "status": "success",
      "message": "H8888881 is updated"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 1
  }
}
```

---
