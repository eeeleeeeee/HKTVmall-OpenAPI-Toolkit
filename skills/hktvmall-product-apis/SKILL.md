---
name: hktvmall-product-apis
description: HKTVmall Product API reference. Use when writing code that calls HKTVmall Product endpoints (GET /oapi/api/product/hktv/product/details, POST /oapi/api/product/hktv/single/save, POST /oapi/api/product/hktv/batch/editAll, GET /oapi/api/product/hktv/record/status, GET /oapi/api/product/hktv/products/queryByTime, POST /oapi/api/product/hktv/products/queryByProductCode, GET /oapi/api/product/hktv/products/queryProductCodeByStore, POST /oapi/api/product/hktv/batch/edit/price, POST /oapi/api/product/hktv/batch/edit/product-ready-days, POST /oapi/api/product/hktv/batch/save).
---

# HKTVmall Product API Reference

Use this skill when helping developers write code that calls HKTVmall Product APIs.
Base URL for all Product APIs: `https://merchant-oapi.shoalter.com`

## Required Headers (all endpoints)

```
Content-Type: application/json
x-auth-token: <token>        # obtain via auth flow
storeCode: <Your Store Code> # e.g. H8888881
platformCode: HKTV
businessType: eCommerce
```

## Endpoints

### Get Product Detail (取得商品詳情)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/product/details`
Version: v1.0.0

The Get Product Details API allows users to retrieve detailed product information by specifying input parameters to query specific product fields.Core Features:Input Range: Supports querying up to 100 SKU at a time, enabling flexible and bulk product data retrieval for efficient handling of large-scale product information.Data Integrity: Ensures that the returned product data includes all necessary fields and meets system requirements, reducing errors caused by missing data.

**Request Body:**

*Get Single Product Detail*
```json
[ 
  { 
    "skuCode":"H8888881_S_a1"
  }
]
```

*Get Multiple Product Details*
```json
[
    {
        "skuCode": "H8888881_S_a1"
    },
    {
        "skuCode": "H8888881_S_a2"
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
            "status": "success",
            "skuCode": "a1",
            "createdBy": "user",
            "createdDate": "user",
            "lastUpdatedBy": "OpenAPI-H8888881",
            "lastUpdatedDate": "2025-10-07",
            "platformCode": "HKTV",
            "storefrontStoreCode": "H8888881",
            "fullSkuCode": "H8888881_S_a1",
            "productCode": "a1",
            "skuName": "test 1 apple",
            "skuNameTchi": "test 1 apple",
            "skuNameZhCN": "test 1 apple",
            "primaryCategoryCode": "AA83204020001",
            "skuSDescEn": "123525",
            "skuSDescCh": "123525",
            "skuSDescZhCN": "123525",
            "skuLDescEn": "123525",
            "skuLDescCh": "123525",
            "skuLDescZhCN": null,
            "invoiceRemarksEn": null,
            "invoiceRemarksCh": null,
            "invoiceRemarksZhCN": null,
            "videoLink": null,
            "videoLinkEn": null,
            "videoLinkCh": null,
            "videoLinkZhCN": null,
            "barcode": null,
            "brandCode": "HOTTOYS",
            "manuCountry": "EG",
            "weight": 1,
            "weightUnit": "g",
            "packHeight": 10,
            "packDepth": 10,
            "packLength": 10,
            "packDimensionUnit": "cm",
            "packBoxType": "H",
            "packSpecEn": null,
            "packSpecCh": null,
            "packSpecZhCN": null,
            "currencyCode": "HKD",
            "originalPrice": 274,
            "sellingPrice": 0,
            "mallDollar": 0,
            "mallDollarVip": 0.00,
            "productReadyMethod": "M",
            "deliveryMethod": "merchant-delivery",
            "returnDays": 0,
            "productReadyDays": 12,
            "pickupDays": "MSU",
            "pickupTimeslot": "AM/PM/EV",
            "colorEn": null,
            "colorCh": null,
            "colorZhCN": null,
            "size": null,
            "sizeSystem": null,
            "invisibleFlag": "N",
            "colorFamilies": null,
            "featureStartTime": null,
            "featureEndTime": null,
            "voucherType": null,
            "voucherDisplayType": null,
            "userMax": null,
            "redeemStartDate": null,
            "urgent": null,
            "expiryType": null,
            "fixedRedemptionDate": null,
            "uponPurchaseDate": null,
            "finePrintEn": "123525",
            "finePrintCh": "",
            "finePrintZhCN": "",
            "cost": null,
            "removalServices": null,
            "field1": null,
            "value1": null,
            "field2": null,
            "value2": null,
            "field3": null,
            "value3": null,
            "discountText": null,
            "discountTextTchi": null,
            "discountTextZhCN": null,
            "style": null,
            "goodsType": null,
            "warrantyPeriodUnit": null,
            "warrantyPeriod": null,
            "warrantySupplierEn": null,
            "warrantySupplierCh": null,
            "warrantySupplierZhCN": null,
            "serviceCentreAddressEn": null,
            "serviceCentreAddressCh": null,
            "serviceCentreAddressZhCN": null,
            "serviceCentreEmail": null,
            "serviceCentreContact": null,
            "warrantyRemarkEn": null,
            "warrantyRemarkCh": null,
            "warrantyRemarkZhCN": null,
            "onOfflineStatus": "ONLINE",
            "productCategories": [
                {
                    "productCatCode": "AA83204020001",
                    "name": "AA83204020001 - Cat Carrying Bags",
                    "productCatName": "Cat Carrying Bags"
                }
            ],
            "imagesMainPhotoList": [
                {
                    "fileName": "123456.jpg",
                    "filePath": "https://cdn-media-test.hkmpcl.com.hk/dev-hktv-mms/HKTV/mms/uploadProductImage/247e/b58d/4398/123456.jpg",
                    "imageType": "main"
                }
            ],
            "imagesProductPhotoList": [
                {
                    "fileName": "123456.jpg",
                    "filePath": "https://cdn-media-test.hkmpcl.com.hk/dev-hktv-mms/HKTV/mms/uploadProductImage/fb4c/3f88/7122/123456.jpg",
                    "imageType": "main"
                }
            ],
            "imagesOtherPhotoList": [
                {
                    "fileName": "123456.jpg",
                    "filePath": "https://cdn-media-test.hkmpcl.com.hk/dev-hktv-mms/HKTV/mms/uploadProductImage/fb4c/3f88/7122/123456.jpg",
                    "imageType": "main"
                }
            ],
            "imagesAdvertisingList": null,
            "commissionRate": 10.00,
            "brandNameEn": "HOTTOYS",
            "brandNameTc": "HOTTOYS",
            "brandNameZhCN": "HOTTOYS",
            "isPrimarySku": "Y",
            "storeLandMarkFlag": "N",
            "partnerInfo": null,
            "externalPlatform": null
        }
    ]
}
```

---

### Create Product (建立商品)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/single/save`
Version: v1.0.1

The Create Product API enables users to create products, supporting the creation of only one product per request. This API is suitable for basic operations of product addition on the HKTV platform, allowing for fast and accurate product data creation.Core Features:Single Product Creation: Each request supports creating only one product, ensuring operational stability and accuracy.Flexible Configuration: Allows configuration of detailed attributes such as multilingual names, descriptions, prices, brands, and categories to meet diverse product requirements.Multimedia Support: Supports product images, video links, and other multimedia content to enhance product presentation.

**Request Body:**

```json
{   
    "skuCode": "123456",   
    "productCode": "123456",   
    "productCategories": [
        {
        "productCatCode": "AA00000000001"
        }
    ],
    "primaryCategoryCode": "AA00000000001",
    "brandCode": "ABC123456",
    "productReadyMethod": "MLC",
    "onOfflineStatus": "ONLINE",
    "isPrimarySku": "N",
    "skuName": "x",   
    "skuNameTchi": "X",   
    "skuNameZhCN": "x",   
    "skuSDescEn": "X",   
    "skuSDescCh": "X",   
    "skuSDescZhCN": "x",   
    "skuLDescEn": "x",   
    "skuLDescCh": "x",   
    "skuLDescZhCN": "x",   
    "mainPhoto": "x",
    "otherProductPhoto": [
         "x",
         "x",
         "x",
         "x"
         ],
     "otherPhoto": [
         "x",
         "x",
         "x"
         ],
    "advertisingPhoto": "x",
    "manuCountry": "ABW",
    "currencyCode": "RMB",
    "originalPrice": 30,
    "sellingPrice": 25,
    "userMax": 10,
    "style": "RED",
    "discountText": "Discount Text",
    "discountTextTchi": "折扣文字描述",
    "discountTextZhCN": "折扣文字描述",
    "barcode": "12456", 
    "packSpecEn": "Packing Spec",
    "packSpecCh": "包裝規格",
    "packSpecZhCN": "包装规格",
    "packHeight": 1,
    "packLength": 2,
    "packDepth": 3,
    "packDimensionUnit": "mm",
    "weight": 4,
    "weightUnit": "g",
    "packBoxType": "H",
    "cartonHeight": 5,
    "cartonLength": 6,
    "cartonWidth": 7,
    "invisibleFlag": "Y",
    "finePrintEn": "Fine Print",
    "finePrintCh": "條款與細則",
    "finePrintZhCN": "条款与细则",
    "invoiceRemarksEn": "Invoice Remark",
    "invoiceRemarksCh": "發票備註",
    "invoiceRemarksZhCN": "发票备注",
    "returnDays": 7,
    "productReadyDays": "5",
    "pickupDays": "MSU",
    "pickupTimeslot": "AM/PM/EV",
    "productOverseaDeliveryList":[ 
        "MO"
    ],
    "minimumShelfLife": 1,
    "externalPlatform" :{
            "source":[
                "TMALL"
            ],
            "productId": "123456",
            "skuId": "123465"
    },
    "colorFamilies": "BEIGE",
    "colorEn": "_Beige(7229)", // _Beige(4cm). _Beige(7229)
    "sizeSystem": "INTL",
    "size": "67cm-135cm", // 67cm-135cm. 53cm-102cm
    "field1": "power",
    "value1": "p0d00", // p0d00. p0d25
    "field2": "cyl",
    "value2": "c-0d75", // c-0d75. c-1d00
    "field3": "axis",
    "value3": "a20",
    "videoLink": "=ZVRuUV8bTrc",
    "videoLinkEn": "Video Text 1",
    "videoLinkCh": "影片文本 1",
    "videoLinkZhCN": "视频文字 1",
    "videoLink2": "=ZVRuUV8bTrc",
    "videoLinkEn2": "Video Text 2",
    "videoLinkCh2": "影片文本 2",
    "videoLinkZhCN2": "视频文字 2",
    "videoLink3": "=ZVRuUV8bTrc",
    "videoLinkEn3": "Video Text 3",
    "videoLinkCh3": "影片文本 3",
    "videoLinkZhCN3": "视频文字 3",
    "videoLink4": "=ZVRuUV8bTrc",
    "videoLinkEn4": "Video Text 4",
    "videoLinkCh4": "影片文本 4",
    "videoLinkZhCN4": "视频文字 4",
    "videoLink5": "=ZVRuUV8bTrc",
    "videoLinkEn5": "Video Text 5",
    "videoLinkCh5": "影片文本 5",
    "videoLinkZhCN5": "视频文字 5",
    "removalServices": "Y",
    "warranty": "Y",
    "goodsType": "authorized goods",
    "warrantyPeriodUnit": "Years",
    "warrantyPeriod": 999,
    "warrantySupplierEn": "Warranty Supplier",
    "warrantySupplierCh": "保養供應商",
    "warrantySupplierZhCN": "保养供应商",
    "serviceCentreAddressEn": "Service Centre Address",
    "serviceCentreAddressCh": "服務中心地址", 
    "serviceCentreAddressZhCN": "服务中心地址", 
    "serviceCentreEmail": "TEST@shaolter.com",
    "serviceCentreContact": "Service Centre Contact",
    "warrantyRemarkEn": "Warranty Remark",
    "warrantyRemarkCh": "保養備註",
    "warrantyRemarkZhCN": "保养备注",
    "warehouse": "H8888881-1"
}
```

**Response:**

```json
{
  "message": "Open API single save successful",
  "code": "success",
  "data": {
    "skuCode": "single_save_oapi_test",
    "status": "success",
    "message": null
  }
}
```

```json
{
  "message": "Open API single save failed",
  "code": "fail",
  "data": {
    "skuCode": "single_save_oapi_test",
    "status": "fail",
    "message": [
       "errorMessage1",
       "errorMessage2"
    ]
  }
}
```

```json
{
    "status": -1,
    "data": null,
    "errorMessageList": ["Do not repeat the same action: The request has already been successfully submitted and is currently being processed. Please wait for the process to complete."],
    "fail": true,
    "success": false
}
```

---

### Batch Edit Product - All Field (批量編輯商品 - 所有欄位)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/batch/editAll`
Version: v1.0.0

The Batch Edit Product - All Field allows users to update product information in bulk, supporting modifications for up to 100 products per request. This API is ideal for efficiently managing large-scale product updates on the HKTV platform, ensuring flexibility and accuracy.Core Features:Bulk Product Updates: Each request supports updating up to 100 products, optimizing operational efficiency for large-scale product management.Selective Field Updates:Fields can be left blank to retain original values.Omitted fields or fields with a&nbsp;null&nbsp;value will remain unchanged.To remove specific data, provide an empty string ("") or an empty array ([]).Flexible Configuration: Update multilingual names, descriptions, prices, brands, categories, and other attributes to meet diverse business requirements.Error Handling: Built-in mechanisms validate requests and provide clear feedback for errors, ensuring accurate updates.After submission, the update is asynchronous, and the result must be checked using the&nbsp;Check Product Record API.

**Request Body:**

```json
[
  {
    "skuCode": "a3",
    "productReadyMethod": "N",
    "productCategories": [
      {
        "productCatCode": "AA85302000001"
      },
      {
        "productCatCode": "AA83202540001"
      }
    ],
    "primaryCategoryCode": "AA83202540001",
    "brandCode": "A2",
    "skuName": "2",
    "skuNameTchi": "2",
    "skuNameZhCN": "2",
    "skuSDescEn": "2",
    "skuSDescCh": "2",
    "skuSDescZhCN": "2",
    "skuLDescEn": "1",
    "skuLDescCh": "1",
    "skuLDescZhCN": "1",
    "userMax": 0,
    "mainPhoto": "string",
    "otherProductPhoto": [
       "string"
     ],
    "otherPhoto": [
       "string"
     ],
    "advertisingPhoto": "string",
    "videoLink": "=1",
    "videoLinkEn": "1",
    "videoLinkCh": "1",
    "videoLinkZhCN": "1",
    "videoLink2": "string",
    "videoLinkEn2": "string",
    "videoLinkCh2": "string",
    "videoLinkZhCN2": "string",
    "videoLink3": "string",
    "videoLinkEn3": "string",
    "videoLinkCh3": "string",
    "videoLinkZhCN3": "string",
    "videoLink4": "string",
    "videoLinkEn4": "string",
    "videoLinkCh4": "string",
    "videoLinkZhCN4": "string",
    "videoLink5": "string",
    "videoLinkEn5": "string",
    "videoLinkCh5": "string",
    "videoLinkZhCN5": "string",
    "manuCountry": "AF",
    "colorFamilies": "YELLOW",
    "colorEn": "_yellow-green",
    "sizeSystem": "INTL",
    "size": "S",
    "currencyCode": "HKD",
    "originalPrice": "1",
    "cost": null,
    "sellingPrice": "1",
    "style": "RED",
    "discountText": "1",
    "discountTextTchi": "1",
    "discountTextZhCN": "1",
    "packSpecEn": "1",
    "packSpecCh": "1",
    "packSpecZhCN": "1",
    "packHeight": 1,
    "packLength": 1,
    "packDepth": 1,
    "packDimensionUnit": "cm",
    "weight": 1,
    "weightUnit": "g",
    "packBoxType": "H",
    "invisibleFlag": "N",
    "barcode": [ "123456", "456789",  "789456"],
    "featureStartTime": null,
    "featureEndTime": null,
    "redeemStartDate": "2020-01-01",
    "fixedRedemptionDate": "2020-01-01",
    "uponPurchaseDate": null,
    "finePrintEn": "1",
    "finePrintCh": "1",
    "finePrintZhCN": "1",
    "removalServices": "N",
    "warranty": "string",
    "goodsType": "parallel goods",
    "warrantyPeriodUnit": "Years",
    "warrantyPeriod": 1,
    "warrantySupplierCh": "1",
    "warrantySupplierEn": "1",
    "warrantySupplierZhCN": "1",
    "serviceCentreAddressEn": "1",
    "serviceCentreAddressCh": "1",
    "serviceCentreAddressZhCN": "1",
    "serviceCentreEmail": "1@hktv.com.hk",
    "serviceCentreContact": "1",
    "warrantyRemarkEn": "1",
    "warrantyRemarkCh": "1",
    "warrantyRemarkZhCN": "1",
    "invoiceRemarksEn": "1",
    "invoiceRemarksCh": "1",
    "invoiceRemarksZhCN": "1",
    "returnDays": 0,
    "productReadyDays": "0",
    "pickupDays": "MS",
    "pickupTimeslot": "AM",
    "productOverseaDeliveryList": [
    "string"
     ],
    "minimumShelfLife": 0,
    "onOfflineStatus": "ONLINE",
    "warehouse":"H8888881-1"
  }
]
```

**Response:**

```json
{ 
  "message": "Open API batch edit successful", 
  "code": "success", 
  "data": {
    "recordId": 1,
    "status": "success", 
    "message": null 
  }
}
```

```json
{ 
  "message": "Open API batch edit failed", 
  "code": "fail", 
  "data": {
    "recordId": null,
    "status": "fail", 
    "message": [
       "error1","error2"
    ]
  }
}
```

```json
{
    "status": -1,
    "data": null,
    "errorMessageList": ["Do not repeat the same action: The request has already been successfully submitted and is currently being processed. Please wait for the process to complete."],
    "fail": true,
    "success": false
}
```

---

### Query Product Update Result (查詢產品編輯結果)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/record/status`
Version: v1.0.0

The Query Product Update Result API is used to retrieve the result of product update records based on the recordIds returned by other APIs.Input Range: 1 ~ 100Applicable API:Batch Edit Product - All FieldBatch Edit Product - PriceBatch Edit Product - Product Ready Day

**Response:**

```json
{
    "message": null,
    "code": "success",
    "data": [
        {
            "recordId": 60535,
            "status": "FAIL",
            "rows": [
                {
                    "status": "FAIL",
                    "uuid": null,
                    "skuId": "X123465",
                    "errorMessage": "Store warehouse doesn't exist, \nInput Product Ready Method isn''t available to this store, \nCannot find any matches contract terms."
                }
            ]
        },
        {
            "recordId": 60536,
            "status": "SUCCESS",
            "rows": [
                {
                    "status": "SUCCESS",
                    "uuid": "78ded184-58e1-472f-b892-e6b816cf05c5",
                    "skuId": "X123465",
                    "errorMessage": null
                }
            ]
        }
    ]
}
```

---

### Search Product by Time with Pagination (按時間搜尋商品並支持分頁)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/products/queryByTime`
Version: v1.0.0

This API is used to retrieve updated SKU information based on a time range.Time Range: Optionally input&nbsp;updateTimeFrom&nbsp;and&nbsp;updateTimeTo&nbsp;as filter criteria.Without Time Range: If no time range is provided, all SKU data will be returned.Pagination: A maximum of 100 records per page can be returned, with a default of 10 records per page.

**Response:**

```json
{
  "message": null,
  "code": "success",
  "data": [
    {
      "createdBy": "hever_m_610@hktv.com.hk",
      "createdDate": "2021-08-18",
      "lastUpdatedBy": "SYSTEM",
      "lastUpdatedDate": "2021-09-10",
      "platformCode": "HKTV",
      "storefrontStoreCode": "H8888881",
      "fullSkuCode": "H8888881_S_a1",
      "productCode": "a1",
      "skuCode": "a1",
      "skuName": "1",
      "skuNameTchi": "1",
      "primaryCategoryCode": "AA13408000001",
      "skuSDescEn": "1",
      "skuSDescCh": "1",
      "skuSDescZhCN": "1",
      "skuLDescEn": "1",
      "skuLDescCh": "1",
      "skuLDescZhCN": "1",
      "invoiceRemarksEn": "1",
      "invoiceRemarksCh": "1",
      "invoiceRemarksZhCN": "1",
      "videoLink": null,
      "videoLinkEn": "1",
      "videoLinkCh": "1",
      "videoLinkZhCN": "1",
      "barcode": "1",
      "brandCode": "A1",
      "manuCountry": "AF",
      "weight": 1,
      "weightUnit": "g",
      "packHeight": 1,
      "packLength": 1,
      "packDepth": 1,
      "packDimensionUnit": "cm",
      "packBoxType": "L",
      "packSpecEn": "1",
      "packSpecCh": "1",
      "packSpecZhCN": "1",
      "currencyCode": "HKD",
      "originalPrice": 1,
      "sellingPrice": null,
      "mallDollar": 0,
      "mallDollarVip": 0,
      "productReadyMethod": "N",
      "deliveryMethod": "hktv-standard-delivery",
      "returnDays": 0,
      "productReadyDays": 2,
      "pickupDays": "MS",
      "pickupTimeslot": "AM",
      "colorEn": "_Beige(7229)",
      "colorCh": "杏色(7229)",
      "sizeSystem": "INTL",
      "size": "S",
      "invisibleFlag": "N",
      "colorFamilies": "BLACK",
      "featureStartTime": "2020-01-01",
      "featureEndTime": "2020-01-01",
      "voucherType": null,
      "voucherDisplayType": null,
      "userMax": null,
      "redeemStartDate": "2020-01-01",
      "urgent": null,
      "expiryType": null,
      "fixedRedemptionDate": null,
      "uponPurchaseDate": 1,
      "finePrintEn": "1",
      "finePrintCh": "1",
      "finePrintZhCN": "1",
      "cost": null,
      "removalServices": "N",
      "field1": null,
      "value1": null,
      "field2": null,
      "value2": null,
      "field3": null,
      "value3": null,
      "discountText": null,
      "discountTextTchi": null,
      "discountTextZhCN": null,
      "style": null,
      "goodsType": "parallel goods",
      "warrantyPeriodUnit": "Years",
      "warrantyPeriod": 1,
      "warrantySupplierCh": "1",
      "warrantySupplierEn": "1",
      "warrantySupplierZhCN": "1",
      "serviceCentreAddressCh": "1",
      "serviceCentreAddressEn": "1",
      "serviceCentreAddressZhCN": "1",
      "serviceCentreEmail": "1@hktv.com.hk",
      "serviceCentreContact": "1",
      "warrantyRemarkEn": "1",
      "warrantyRemarkCh": "1",
      "warrantyRemarkZhCN": "1",
      "onOfflineStatus": "ONLINE",
      "productCategories": [
        {
          "name": "AA13408000001 - Medical Equipment",
          "productCatCode": "AA13408000001",
          "productCatName": "Medical Equipment"
        }
      ],
      "imagesMainPhotoList": [
        {
          "fileName": "a1_compress_KAzrySpiOb_20210818120505_01.jpg",
          "imageType": "main",
          "filePath": "https://mmstest-images.hkmpcl.com.hk/images/HKTV/100239/a1_compress_KAzrySpiOb_20210818 120505_01.jpg"
        }
      ],
      "imagesProductPhotoList": null,
      "imagesOtherPhotoList": null,
      "imagesAdvertisingList": null,
      "commissionRate": null,
      "brandNameEn": "A1",
      "brandNameTc": "A1",
      "isPrimarySku": "Y",
      "storeLandMarkFlag": "N"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1,
    "totalPages": 5
  }
}
```

```json
{
    "message": "",
    "code": "fail",
    "data": null
}
```

---

### Search Product by Product ID (按產品編號搜尋商品)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/products/queryByProductCode`
Version: v1.0.0

This API is used to retrieve SKU information based on Product ID.Multiple Product ID Query: Supports querying multiple&nbsp;productCode&nbsp;at once.Pagination: Allows defining the number of records per page (pageSize), with a maximum of 100.

**Request Body:**

*Search Multiple Products by Product Codes*
```json
{
  "page": 1,
  "pageSize": 10,
  "productCode":["a1","b2"]
}
```

*Single Query at a Time*
```json
{
  "page": 1,
  "pageSize": 10,
  "productCode":["a1"]
}
```

**Response:**

```json
{
  "message": null,
  "code": "success",
  "data": [
    {
      "createdBy": "hever_m_610@hktv.com.hk",
      "createdDate": "2021-08-18",
      "lastUpdatedBy": "SYSTEM",
      "lastUpdatedDate": "2021-09-10",
      "platformCode": "HKTV",
      "storefrontStoreCode": "H8888881",
      "fullSkuCode": "H8888881_S_a1",
      "productCode": "a1",
      "skuCode": "a1",
      "skuName": "1",
      "skuNameTchi": "1",
      "primaryCategoryCode": "AA13408000001",
      "skuSDescEn": "1",
      "skuSDescCh": "1",
      "skuSDescZhCN": "1",
      "skuLDescEn": "1",
      "skuLDescCh": "1",
      "skuLDescZhCN": "1",
      "invoiceRemarksEn": "1",
      "invoiceRemarksCh": "1",
      "invoiceRemarksZhCN": "1",
      "videoLink": null,
      "videoLinkEn": "1",
      "videoLinkCh": "1",
      "videoLinkZhCN": "1",
      "barcode": "1",
      "brandCode": "A1",
      "manuCountry": "AF",
      "weight": 1,
      "weightUnit": "g",
      "packHeight": 1,
      "packLength": 1,
      "packDepth": 1,
      "packDimensionUnit": "cm",
      "packBoxType": "L",
      "packSpecEn": "1",
      "packSpecCh": "1",
      "packSpecZhCN": "1",
      "currencyCode": "HKD",
      "originalPrice": 1,
      "sellingPrice": null,
      "mallDollar": 0,
      "mallDollarVip": 0,
      "productReadyMethod": "N",
      "deliveryMethod": "hktv-standard-delivery",
      "returnDays": 0,
      "productReadyDays": 2,
      "pickupDays": "MS",
      "pickupTimeslot": "AM",
      "colorEn": "_Beige(7229)",
      "colorCh": "杏色(7229)",
      "sizeSystem": "INTL",
      "size": "S",
      "invisibleFlag": "N",
      "colorFamilies": "BLACK",
      "featureStartTime": "2020-01-01",
      "featureEndTime": "2020-01-01",
      "voucherType": null,
      "voucherDisplayType": null,
      "userMax": null,
      "redeemStartDate": "2020-01-01",
      "urgent": null,
      "expiryType": null,
      "fixedRedemptionDate": null,
      "uponPurchaseDate": 1,
      "finePrintEn": "1",
      "finePrintCh": "1",
      "finePrintZhCN": "1",
      "cost": null,
      "removalServices": "N",
      "field1": null,
      "value1": null,
      "field2": null,
      "value2": null,
      "field3": null,
      "value3": null,
      "discountText": null,
      "discountTextTchi": null,
      "discountTextZhCN": null,
      "style": null,
      "goodsType": "parallel goods",
      "warrantyPeriodUnit": "Years",
      "warrantyPeriod": 1,
      "warrantySupplierCh": "1",
      "warrantySupplierEn": "1",
      "warrantySupplierZhCN": "1",
      "serviceCentreAddressCh": "1",
      "serviceCentreAddressEn": "1",
      "serviceCentreAddressZhCN": "1",
      "serviceCentreEmail": "1@hktv.com.hk",
      "serviceCentreContact": "1",
      "warrantyRemarkEn": "1",
      "warrantyRemarkCh": "1",
      "warrantyRemarkZhCN": "1",
      "onOfflineStatus": "ONLINE",
      "productCategories": [
        {
          "name": "AA13408000001 - Medical Equipment",
          "productCatCode": "AA13408000001",
          "productCatName": "Medical Equipment"
        }
      ],
      "imagesMainPhotoList": [
        {
          "fileName": "a1_compress_KAzrySpiOb_20210818120505_01.jpg",
          "imageType": "main",
          "filePath": "https://mmstest-images.hkmpcl.com.hk/images/HKTV/100239/a1_compress_KAzrySpiOb_20210818 120505_01.jpg"
        }
      ],
      "imagesProductPhotoList": null,
      "imagesOtherPhotoList": null,
      "imagesAdvertisingList": null,
      "commissionRate": null,
      "brandNameEn": "A1",
      "brandNameTc": "A1",
      "isPrimarySku": "Y",
      "storeLandMarkFlag": "N"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1,
    "totalPages": 5
  }
}
```

```json
{
    "message": "",
    "code": "fail",
    "data": null
}
```

---

###  Search All Product IDs by Store (按商店搜尋所有產品編號)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/products/queryProductCodeByStore`
Version: v1.0.0

This API is used to retrieve all Product IDs under a specific storeCode.Pagination: Supports paginated queries using&nbsp;page&nbsp;and&nbsp;pageSize&nbsp;to control the number of returned records, with a maximum of 100 per page.

**Response:**

```json
{
  "message": null,
  "code": "success",
  "data": [
    "a1",
    "a2",
    "a3",
    "b1",
    "b2"
  ],
  "pagination": {
    "page": 1,
    "pageSize": 100,
    "total": 10000,
    "totalPages": 100
  }
}
```

```json
{
    "message": "",
    "code": "fail",
    "data": null
}
```

---

###  Batch Edit Product - Price (批量編輯商品 - 價格)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/batch/edit/price`
Version: v1.0.0

This API is used to batch edit the price information of SKUs, with a maximum of 100 SKUs per request.After submission, the update is asynchronous, and the result must be checked using the Check Product Record API.

**Request Body:**

*Single Update at a Time*
```json
[
  {
    "skuCode": "skuCode",
    "originalPrice": 20.00,
    "sellingPrice": 0.00,
    "style": "RED",
    "discountTextEn": "discountTextEn_da85b29cb4b5",
    "discountTextCh": "discountTextCh_5211e4737983",
    "discountTextZhCN": discountTextCh_5211e4737984,
  }
]
```

*Batch Updates*
```json
[
  {
    "skuCode": "skuCode1",
    "originalPrice": 20.00,
    "sellingPrice": 0.00,
    "style": "RED",
    "discountTextEn": "discountTextEn_da85b29cb4b5",
    "discountTextCh": "discountTextCh_5211e4737983",
    "discountTextZhCN": discountTextCh_5211e4737984,
  },
 {
    "skuCode": "skuCode2",
    "originalPrice": 20.00,
    "sellingPrice": 0.00,
    "style": "RED",
    "discountTextEn": "discountTextEn_da85b29cb4b5",
    "discountTextCh": "discountTextCh_5211e4737983",
    "discountTextZhCN": discountTextCh_5211e4737984,
  }
]
```

**Response:**

```json
{ 
  "message": "Open API batch edit successful", 
  "code": "success", 
  "data": {
    "recordId": 1,
    "status": "success", 
    "message": null 
  }
}
```

```json
{
    "status": -1,
    "data": null,
    "errorMessageList": ["Do not repeat the same action: The request has already been successfully submitted and is currently being processed. Please wait for the process to complete."],
    "fail": true,
    "success": false
}
```

---

### Batch Edit Product - Product Ready Day (批量編輯商品 - 商品備貨天數)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/batch/edit/product-ready-days`
Version: v1.0.0

This API is used to batch edit the Product Ready Day field value of products.Input Range: 1 to 100This operation is asynchronous, and results must be checked using the&nbsp;Check Product Record API.

**Request Body:**

*Single Update at a Time*
```json
[
  {
    "skuCode": "single_create_oapi_test_1015_04",
    "productReadyDays": "5"
  }
]
```

*Batch Updates*
```json
[
  {
    "skuCode": "single_create_oapi_test_1015_04",
    "productReadyDays": "5"
  },
  {
    "skuCode": "SKU001",
    "productReadyDays": "6"
  }
]
```

**Response:**

```json
{ 
  "message": "Open API batch edit successful", 
  "code": "success", 
  "data": {
    "recordId": 1,
    "status": "success", 
    "message": null 
  }
}
```

```json
{
    "status": -1,
    "data": null,
    "errorMessageList": ["Do not repeat the same action: The request has already been successfully submitted and is currently being processed. Please wait for the process to complete."],
    "fail": true,
    "success": false
}
```

---

### Multi-SKU Product Creation (多 SKU 商品創建)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/product/hktv/batch/save`
Version: v1.0.0

The Multi-SKU Product Creation API allows merchants to create a single product containing multiple variations (up to 1,000 SKUs) in one request. By adopting a SPU-SKU hierarchical structure, this API optimizes resource usage and significantly improves the upload efficiency for cross-border merchants.Core Features:Batch Creation: Support for creating up to 1,000 SKUs under one product ID to reduce repeated API calls.Efficiency Optimization: Shared media (photos/videos) at the product level are processed only once, significantly reducing overall processing time.Asynchronous Processing: This is an asynchronous API. After submission, use the returned recordId to track the final status via the Check Product Record API.Validation Logic: If the Primary SKU fails, the entire request is rejected. If the Primary SKU is successful, remaining SKUs allow for partial success. Detailed results for each SKU must be checked via API.

**Request Body:**

*Single SKU at a Time*
```json
{
  "productCode": "123456",
  "productReadyMethod": "MLC",
  "productCategories": [
    {
      "productCatCode": "AA00000000001"
    }
  ],
  "primaryCategoryCode": "AA00000000001",
  "brandCode": "ABC123456",
  "skuName": "x",
  "skuNameTchi": "X",
  "skuNameZhCN": "x",
  "invisibleFlag": "Y",
  "manuCountry": "ABW",
  "currencyCode": "RMB",
  "warehouse": "H8888881-1",
  "otherProductPhoto": [
    "x",
    "x",
    "x",
    "x"
  ],
  "otherPhoto": [
    "x",
    "x",
    "x"
  ],
  "advertisingPhoto": "x",
  "videoLink": "=ZVRuUV8bTrc",
  "videoLinkEn": "Video Text 1",
  "videoLinkCh": "影片文本 1",
  "videoLinkZhCN": "视频文字 1",
  "videoLink2": "=ZVRuUV8bTrc",
  "videoLinkEn2": "Video Text 2",
  "videoLinkCh2": "影片文本 2",
  "videoLinkZhCN2": "视频文字 2",
  "videoLink3": "=ZVRuUV8bTrc",
  "videoLinkEn3": "Video Text 3",
  "videoLinkCh3": "影片文本 3",
  "videoLinkZhCN3": "视频文字 3",
  "videoLink4": "=ZVRuUV8bTrc",
  "videoLinkEn4": "Video Text 4",
  "videoLinkCh4": "影片文本 4",
  "videoLinkZhCN4": "视频文字 4",
  "videoLink5": "=ZVRuUV8bTrc",
  "videoLinkEn5": "Video Text 5",
  "videoLinkCh5": "影片文本 5",
  "videoLinkZhCN5": "视频文字 5",
  "skuSDescEn": "X",
  "skuSDescCh": "X",
  "skuSDescZhCN": "x",
  "skuLDescEn": "x",
  "skuLDescCh": "x",
  "skuLDescZhCN": "x",
  "featureStartTime": "2026-01-26 12:00:00",
  "featureEndTime": "2026-12-31 23:59:59",
  "voucherType": "HOKOBUY",
  "expiryType": "FIXED",
  "redeemStartDate": "2026-02-01",
  "fixedRedemptionDate": "2026-12-31",
  "uponPurchaseDate": null,
  "voucherDisplayType": "CODE128A",
  "voucherTemplateType": "TemplateA",
  "finePrintEn": "Fine Print",
  "finePrintCh": "條款與細則",
  "finePrintZhCN": "条款与细则",
  "invoiceRemarksEn": "Invoice Remark",
  "invoiceRemarksCh": "發票備註",
  "invoiceRemarksZhCN": "发票备注",
  "removalServices": "Y",
  "warranty": "Y",
  "goodsType": "authorized goods",
  "warrantyPeriodUnit": "Years",
  "warrantyPeriod": 999,
  "warrantySupplierEn": "Warranty Supplier",
  "warrantySupplierCh": "保養供應商",
  "warrantySupplierZhCN": "保养供应商",
  "serviceCentreAddressEn": "Service Centre Address",
  "serviceCentreAddressCh": "服務中心地址",
  "serviceCentreAddressZhCN": "服务中心地址",
  "serviceCentreEmail": "TEST@shaolter.com",
  "serviceCentreContact": "Service Centre Contact",
  "warrantyRemarkEn": "Warranty Remark",
  "warrantyRemarkCh": "保養備註",
  "warrantyRemarkZhCN": "保养备注",
  "returnDays": 7,
  "productReadyDays": "5",
  "pickupDays": "MSU",
  "pickupTimeslot": "AM/PM/EV",
  "productOverseaDeliveryList": [
    "MO"
  ],
  "minimumShelfLife": 1,
  "skus": [
    {
      "skuCode": "123456",
      "isPrimarySku": "N",
      "skuName": "x",
      "skuNameTchi": "X",
      "skuNameZhCN": "x",
      "skuSDescEn": "X",
      "skuSDescCh": "X",
      "skuSDescZhCN": "x",
      "skuLDescEn": "x",
      "skuLDescCh": "x",
      "skuLDescZhCN": "x",
      "mainPhoto": "x",
      "userMax": 10,
      "colorFamilies": "BEIGE",
      "colorEn": "_Beige(7229)",
      "sizeSystem": "INTL",
      "size": "67cm-135cm",
      "field1": "power",
      "value1": "p0d00",
      "field2": "cyl",
      "value2": "c-0d75",
      "field3": "axis",
      "value3": "a20",
      "originalPrice": 30,
      "sellingPrice": 25,
      "style": "RED",
      "discountText": "Discount Text",
      "discountTextTchi": "折扣文字描述",
      "discountTextZhCN": "折扣文字描述",
      "barcodes": [
        "12456"
      ],
      "weight": 4,
      "weightUnit": "g",
      "packHeight": 1,
      "packLength": 2,
      "packDepth": 3,
      "cartonHeight": 5,
      "cartonLength": 6,
      "cartonWidth": 7,
      "packDimensionUnit": "mm",
      "packBoxType": "H",
      "packSpecEn": "Packing Spec",
      "packSpecCh": "包裝規格",
      "packSpecZhCN": "包装规格",
      "onOfflineStatus": "ONLINE",
      "externalPlatform": {
        "source": [
          "TMALL"
        ],
        "productId": "123456",
        "skuId": "123465",
        "categoryId": "text"
      }
    }
  ]
}
```

**Response:**

```json
{ 
  "message": "Open API batch create successful", 
  "code": "success", 
  "data": {
    "recordId": 1,
    "status": "success", 
    "message": null 
  }
}
```

```json
{ 
  "message": "Open API batch create failed", 
  "code": "fail", 
  "data": {
    "recordId": null,
    "status": "fail", 
    "message": [
       "error1","error2"
    ]
  }
}
```

```json
{
    "status": -1,
    "data": null,
    "errorMessageList": ["Do not repeat the same action: The request has already been successfully submitted and is currently being processed. Please wait for the process to complete."],
    "fail": true,
    "success": false
}
```

---
