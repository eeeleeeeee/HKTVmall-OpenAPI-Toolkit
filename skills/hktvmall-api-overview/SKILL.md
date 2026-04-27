---
name: hktvmall-api-overview
description: HKTVmall API overview. Use to discover available HKTVmall API categories (Product, Order, Store, Inventory) before diving into specific endpoints.
---

# HKTVmall API Overview

HKTVmall Open API Platform for merchant integration.

## Available API Categories

### Product (10 APIs)
- **GET** `/oapi/api/product/hktv/product/details` — Get Product Detail
- **POST** `/oapi/api/product/hktv/single/save` — Create Product
- **POST** `/oapi/api/product/hktv/batch/editAll` — Batch Edit Product - All Field
- **GET** `/oapi/api/product/hktv/record/status` — Query Product Update Result
- **GET** `/oapi/api/product/hktv/products/queryByTime` — Search Product by Time with Pagination
- **POST** `/oapi/api/product/hktv/products/queryByProductCode` — Search Product by Product ID
- **GET** `/oapi/api/product/hktv/products/queryProductCodeByStore` —  Search All Product IDs by Store
- **POST** `/oapi/api/product/hktv/batch/edit/price` —  Batch Edit Product - Price
- **POST** `/oapi/api/product/hktv/batch/edit/product-ready-days` — Batch Edit Product - Product Ready Day
- **POST** `/oapi/api/product/hktv/batch/save` — Multi-SKU Product Creation

### Store (2 APIs)
- **GET** `/oapi/api/store/details` — Get Store Information
- **POST** `/oapi/api/store` — Update Store Information

### Inventory (2 APIs)
- **GET** `/oapi/api/inventory/stock/details` — Get Stock Detail
- **POST** `/oapi/api/inventory/stock` — Update Stock Level

### Order (10 APIs)
- **GET** `/oapi/api/order/orders` — Get Order
- **GET** `/oapi/api/order/details` — Get Order Detail
- **POST** `/oapi/api/order/updateOrderStatus` — Update Order Status
- **POST** `/oapi/api/order/cancel` — Cancel Order
- **POST** `/oapi/api/order/splitWaybills` — Split Waybill
- **POST** `/oapi/api/order/printWaybills/html` — Print Waybill 
- **POST** `/oapi/api/order/updateMerchantDeliveryInfo` — Update Merchant Delivery Info
- **GET** `/oapi/api/order/returnEntries` — Get Return Request Orders
- **POST** `/oapi/api/order/uploadMainlandParcelInfo` — Upload Mainland Parcel Info
- **GET** `/oapi/api/order/getPromotionOrder` — Get Order SKU Promotion 

## Common Headers

All API calls require:
- `x-auth-token`: Authentication token
- `storeCode`: Your merchant store code (e.g. H8888881)
- `platformCode`: HKTV
- `businessType`: eCommerce