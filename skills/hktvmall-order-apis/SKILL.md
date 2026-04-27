---
name: hktvmall-order-apis
description: HKTVmall Order API reference. Use when writing code that calls HKTVmall Order endpoints (GET /oapi/api/order/orders, GET /oapi/api/order/details, POST /oapi/api/order/updateOrderStatus, POST /oapi/api/order/cancel, POST /oapi/api/order/splitWaybills, POST /oapi/api/order/printWaybills/html, POST /oapi/api/order/updateMerchantDeliveryInfo, GET /oapi/api/order/returnEntries, POST /oapi/api/order/uploadMainlandParcelInfo, GET /oapi/api/order/getPromotionOrder).
---

# HKTVmall Order API Reference

Use this skill when helping developers write code that calls HKTVmall Order APIs.
Base URL for all Order APIs: `https://merchant-oapi.shoalter.com`

## Required Headers (all endpoints)

```
Content-Type: application/json
x-auth-token: <token>        # see hktvmall-auth skill
storeCode: <Your Store Code> # e.g. H8888881
platformCode: HKTV
businessType: eCommerce
```

## Endpoints

### Get Order (查詢訂單)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/order/orders`
Version: v1.0.0

The Get Order API allows merchants to search for order numbers based on the customer's order date, warehouse check-in date, or delivery date. Each request should include only one type of date condition. For all three types of dates (Order Date, Pickup Date, and Delivery Date), merchants may enter either a single date or a date range. The system will return results according to the specified conditions.Notes:For each query, the start date and end date must be within 90 days.Get Order API can only retrieve order numbers. If merchants wish to view detailed order information, they must use&nbsp;Get Order Detail.Use cases for Get Order API:Retrieve orders based on the customer's order date, refer to Request Body 1Retrieve orders based on the warehouse check-in date, refer to Request Body 1Retrieve orders based on the customer's requested delivery date, refer to Request Body 1

**Request Body:**

*If a merchant wants to find orders scheduled for delivery to the HKTVmall warehouse on October 1, they should include the following parameters in the request body:*
```json
{
  "orderDateStart": "2025-10-01 00:00:00",
  "orderDateEnd": "2025-10-31 23:59:59",
  "pageSize": 5,
  "page": 2
}
```

*Using the warehouse check-in date as the search condition, merchants can specify a date range, and the system will return the order numbers that match the criteria.*
```json
{
  "pickupDateStart": "2025-10-01 00:00:00",
  "pickupDateEnd": "2025-10-01 23:59:59",
  "pageSize": 5,
  "page": 2
}
```

*Using the customer's requested delivery date as the search condition, merchants can specify a date range, and the system will return the order numbers that match the criteria.*
```json
{
  "deliveryDateStart": "2025-10-01 00:00:00",
  "deliveryDateEnd": "2025-10-01 23:59:59",
  "pageSize": 5,
  "page": 2
}
```

**Response:**

```json
{
  "message": "",
  "code": "success",
  "data": {
    "subOrderNumbers": [
      "H202518121852-H8888881",
      "H202518121855-H8888881",
      "H202518121859-H8888881",
      "H202518121848-H8888881",
      "H202518121261-H8888881"
    ]
  },
  "pagination": {
    "page": 1,
    "pageSize": 5,
    "total": 150
  }
}
```

---

### Get Order Detail (查詢訂單詳情)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/order/details`
Version: v1.1.0

The Get Order Detail API allows merchants to retrieve detailed order information based on subOrderNumbers (sub-order numbers), including product information, waybill number, order date, warehouse check-in date, delivery date, and more. Each request can query up to 300 sub-order numbers at a time.Notes:subOrderNumbers can be obtained from the Get Order API.trackingId refers to the Waybill Number, which may change due to HKTVmall’s warehouse handling process.consignmentCode is the unique identifier for each sub-order. Once created when the waybill is generated, it will never change. Therefore, merchants who need to track shipment progress can use the consignmentCode as the tracking reference.consignmentStatus represents the Waybill Status.recipientName, contactPhoneNumber, and deliveryAddress apply only to merchant delivery.When a customer adds products to the shopping cart, the HKTVmall system generates a transactionId, which applies only to merchants under special contracts.totalPrice equals SKU selling price × selling quantity, and the total amount does not include discounts.mainlandCourierTrackingNumber and mainlandCourierCompanyName apply only to Mainland merchants.

**Request Body:**

*Single search at a Time*
```json
{
   "subOrderNumbers":[
      "H250212003003-H8888881"
   ]
}
```

*Multiple Searches at a Time*
```json
{
   "subOrderNumbers":[
      "H250108004011-H8888881",
      "H250108004034-H8888881",
      "H250203002042-H8888881"
   ]
}
```

**Response:**

```json
{
    "message": "success",
    "code": "success",
    "data": {
        "successList": [
            {
                "consignmentCode": "5533727",
                "trackingId": "4005337275",
                "transactionId": "15481123719086096-51219011_20251224093027",
                "orderDate": "2025-12-24 09:30:28.0",
                "consignmentStatus": "CONFIRMED",
                "orderId": "H251224001003-H8888881",
                "pickUpDate": "2098-01-01 11:00:00.0",
                "deliveryDate": "2098-01-01 14:00:00.0",
                "deliveryMethod": "merchant-delivery",
                "recipientName": "hello_customer",
                "contactPhoneNumber": "22221428",
                "deliveryAddress": "香港, 半山, 天匯, 側",
                "consignmentEntries": [
                    {
                        "skuId": "H8888881_S_A002",
                        "skuNameEn": "A002",
                        "skuNameZh": "A002",
                        "brand": "黑橋牌",
                        "quantity": "2",
                        "totalPrice": "700.0",
                        "pk": null
                    }
                ],
                "warehouseId": "H888888109",
                "deliverToWarehouse": "青衣 9/F",
                "mainlandCourierTrackingNumber": null,
                "mainlandCourierCompanyName": null,
                "message": null
            },
        ],
        "failList": []
    },
    "pagination": {
        "page": 1,
        "pageSize": 6,
        "total": 6
    }
}
```

```json
{
  "message": "Partial failure occurred while retrieving orders.",
  "code": "fail",
  "data": {
    "successList": [
      {
        "consignmentCode": "5454005",
        "trackingId": "4004540054",
        "orderDate": "2025-02-03 16:22:06.0",
        "consignmentStatus": "CONFIRMED",
        "orderId": "H250203002042-H8888881",
        "transactionId": "15481123719086096-32071166_20210914101606",
        "pickUpDate": "2098-01-01 11:00:00.0",
        "deliveryDate": "2098-01-01 14:00:00.0",
        "deliveryMethod": "merchant-delivery",
        "recipientName": "hello_customer ",
        "contactPhoneNumber": "62958451",
        "deliveryAddress": "香港, 半山, 天匯, 1F",
        "consignmentEntries": [
          {
            "skuId": "H8888881_S_LT-INS-001-Ginseng",
            "skuNameEn": "Ginseng body insurance",
            "skuNameZh": "給人參的人參保險",
            "brand": "富衛保險",
            "quantity": "2",
            "totalPrice": "200.0"
          }
        ],
        "warehouseId": "H888888109",
        "deliverToWarehouse": "青衣 9/F",
        "mainlandCourierTrackingNumber": null,
        "mainlandCourierCompanyName": null,
        "message": null
      }
    ],
    "failList": [
      {
        "orderId": "H250203002042-H8888881",
        "consignmentCode": "5454005"
      },
      {
        "orderId": "H250203002043-H8888881",
        "consignmentCode": "5454006"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "pageSize": 1,
    "total": 1
  }
}
```

```json
{
    "message": "Unable to get results from requests. Try again or contact support.",
    "code": "fail",
    "data": null,
    "pagination": {
        "page": null,
        "pageSize": null,
        "total": null
    }
}
```

---

### Update Order Status (更新訂單狀態)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/order/updateOrderStatus`
Version: v1.0.0

The Update Order Status API allows merchants to update the delivery status of their orders. It supports updating either a single order or multiple orders, with a maximum of 100 orders per request.In the MMS system, the available order status options that merchants can update are as follows:ACKNOWLEDGED: The merchant confirms that the order is ready for shipment. This status is optional and can be used based on the merchant's business needs.PICKED: The merchant has completed product packaging and confirmed that the goods will be sent to the HKTVmall warehouse.RECEIVED_BY_CUSTOMER: The customer has received the goods and completed the acknowledgment process.Notes:If the delivery method is Standard Delivery or Non-Standard Delivery, the order status can be updated to: ACKNOWLEDGED, PICKED.If the delivery method is Merchant Delivery, the order status can be updated to: ACKNOWLEDGED, RECEIVED_BY_CUSTOMER.If the delivery method is Third-Party Logistics (3PL), no status update is required.When an order status is updated to RECEIVED_BY_CUSTOMER, it indicates that the order cycle is complete. The system will automatically change the status to ORDER_COMPLETED after 7 days.If the merchant is unable to ship the order for any reason, the Cancel Order API must be used to cancel the order.

**Request Body:**

*Update the status of single order*
```json
[
  {
    "orderNumber": "H141209002005-H8888881",
    "trackingId": "4001882233",
    "status": "ACKNOWLEDGED"
  }
]
```

*Update the status of multiple orders at once*
```json
[
  {
    "orderNumber": "H141209002005-H8888881",
    "trackingId": "4001882233",
    "status": "ACKNOWLEDGED"
  },
  {
    "orderNumber": "H141209002005-H8888881",
    "trackingId": "4001882234",
    "status": "ACKNOWLEDGED"
  }
]
```

**Response:**

```json
{
    "message": "success",
    "code": "success",
    "data": {
        "successList": [
            {
                "orderNumber": "H141209002005-H8888881",
                "waybillNumber": "4001882233",
                "successCode": "FROM_HYBRIS_SYSTEM",
                "status": "ACKNOWLEDGED"
            }
        ],
        "failList": []
    },
    "pagination": {
        "page": null,
        "pageSize": null,
        "total": null
    }
}
```

```json
{
    "message": "success",
    "code": "success",
    "data": {
        "successList": [
            {
                "orderNumber": "H251103001010-H8888881",
                "waybillNumber": "4005197888",
                "successCode": "FROM_HYBRIS_SYSTEM",
                "status": "ACKNOWLEDGED"
            },
            {
                "orderNumber": "H251105001047-H8888881",
                "waybillNumber": "4005203676",
                "successCode": "FROM_HYBRIS_SYSTEM",
                "status": "ACKNOWLEDGED"
            }
        ],
        "failList": []
    },
    "pagination": {
        "page": null,
        "pageSize": null,
        "total": null
    }
}
```

---

### Cancel Order (取消訂單)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/order/cancel`
Version: v1.0.0

The Cancel Order API allows merchants to cancel one or multiple orders, supporting batch cancellation. Each request can cancel between 1 and 100 orders.Notes:When a merchant cancels an order, the order status will be updated to Cancelled, and the system will trigger the force out-of-stock mechanism. Inventory adjustments must be made in the stock settings.Once an order is cancelled, it cannot be restored.

**Request Body:**

*Full Cancellation*
```json
[
   {
      "orderNumber":"H250424000078-B1316001",
      "trackingId":"7144218492",
   }
]
```

*Partial Cancellation*
```json
[
   {
      "orderNumber":"H250424000078-B1316001",
      "trackingId":"7144218492",
      "entries":[
         {
            "productCode":"B1316001_S_StandardDelivery_MtoW_002",
            "quantity": "1"
         }
      ]
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
        "orderNumber": "H250407001003-H9492001",
        "waybillNumber": "4004688808",
        "successCode": "FROM_HYBRIS_SYSTEM",
        "status": "CANCELLED"
      }
    ],
    "failList": []
  }
}
```

---

### Split Waybill (拆分運單)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/order/splitWaybills`
Version: v1.0.0

The Split Waybill API allows merchants to split waybills associated with an order.Notes:Splitting is only allowed when the number of items in the order is greater than two.Batch waybill splitting is not supported.Once a waybill is split, it cannot be reverted.

**Request Body:**

*Single transaction at a time*
```json
{
    "waybillNumber": "4004704530",
    "entries": [
        {
            "productCode": "H8888881_S_10011014",
            "quantity": 4
        }
    ]
}
```

**Response:**

```json
{
    "code": "SUCCESS",
    "response": {
        "data": [
            "4004704530", // waybill number
            "5470453",    // consignmentCode
            "4004704530-1", //the waybill number that been split out
            "5470624" //the consignmentCode of the waybill that been split out
        ]
    }
}
```

---

### Print Waybill  (列印運單)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/order/printWaybills/html`
Version: v1.0.0

The Print Waybill API allows merchants to print waybills that have not yet been shipped, with a maximum of 300 waybills per request.Notes:The API response is returned in HTML format, which already complies with HKTVmall's waybill layout requirements. Therefore, merchants need to have their engineers convert the HTML format into a visualized UI for viewing.The waybill supports the following size formats and content options:A5Label (waybill only)Label (with product list)Due to the waybill format settings and the number of products included in a waybill, the document may contain more than one page. Merchants should check their own system's print settings to ensure that no product details are omitted.

**Request Body:**

*Single transaction at a time*
```json
{
    "waybill": "4004712041",
    "suborderNumbers": "H250417007024-C0539001",
    "paperSize": "A5"
}
```

*Multiple transactions at a time*
```json
{
    "waybill": "4004712041,4004712042",
    "suborderNumbers": "H250417007024-C0539001,H250417007025-C0539001",
    "paperSize": "A5"
}
```

**Response:**

```json
{
    "message": null,
    "code": "success",
    "Data": “<html>”,
    "pagination": {
        "page": null,
        "pageSize": null,
        "total": null
    }
}
```

---

### Update Merchant Delivery Info (更新商家配送資訊)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/order/updateMerchantDeliveryInfo`
Version: v1.0.0

The Update Merchant Delivery Info API allows merchants to update waybill information for orders with the Merchant Delivery shipping method.Notes:This API is only applicable to waybills with the Merchant Delivery method. It does not apply to Standard Delivery or Non-Standard Delivery.The deliveryBy field should be set to "merchant_inhub" or "hktv_pickup" only if the merchant has signed a contract to use HKTV's last-mile delivery service.

**Request Body:**

*Single transaction at a time*
```json
[
 {
   "deliveryDate": "2025-02-12 10:59:54",
   "referenceNumber": "SF-123345",
   "remarks": “Delivery to 5th floor”,
   "dateContactedCustomer": “2025-02-12 10:59:54",
   "deliveryBy": "merchant_inhub",
   "subOrderNumber": "H250109003005-H8888881",
   "trackingId": "593599783",
   "expectedPickupDate": "2025-02-12"
 }
]
```

**Response:**

```json
{
   "Message":null,
   "Code":"success",
   "Data":null,
   "Pagination":{
      "Page":1,
      "pageSize":0,
      "Total":0
   }
}
```

---

### Get Return Request Orders (退貨、退款或換貨訂單查詢)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/order/returnEntries`
Version: v1.0.0

The Get Return Request Orders API allows merchants to retrieve orders in which customers have requested a return, refund, or replacement within a specified time range.Notes:This API is only applicable to Standard Delivery. It does not apply to Merchant Delivery or Non-Standard Delivery.The time range for each query request must not exceed 7 days.

**Request Body:**

```json
{
    "merchantCode": "H8888881",
    "productCode": "H8888881_S_10012002",
    "orderId": "H251023000033",
    "dateFrom": "2025-11-01 00:00:00",
    "dateTo": "2025-11-07 00:00:00",
    "hasImage": "true",
    "status": "all",
    "currentPage": "1",
    "pageSize": "10"
}
```

**Response:**

```json
{
    "message": "success",
    "code": "success",
    "data": [
        {
            "reportDate": "2024-08-01 17:55",
            "orderId": "H240801001153",
            "productCode": "H8888881_S_10012099",
            "productName": "CP - test_日式雞肉餃子(急凍)",
            "quantity": "1",
            "needReturn": "true",
            "status": "ACCEPTED_BY_HKTV",
            "responsibility": "HKTV",
            "customerName": "Kenneth test Cheng",
            "returnOption": "refundWithReturn",
            "reportReason": "WRONG",
            "returnDescription": "",
            "uploadedPhotos": [
                ""
            ],
            "returnEntryPk": "8890825562626",
            "merchantToCsRemark": null,
            "returnRequestId": "R02871001-B001",
            "returnRequestType": "Refund",
            "replacementOrderNumber": "",
            "merchantCsReturnMessage": []
        },
        {
            "reportDate": "2024-08-01 18:04",
            "orderId": "H240801001164",
            "productCode": "H8888881_S_10008704",
            "productName": "聖碧濤 - 12345 意大利天然有汽礦泉水 (原箱) 12345",
            "quantity": "1",
            "needReturn": "true",
            "status": "ACCEPTED_BY_HKTV",
            "responsibility": "HKTV",
            "customerName": "Kenneth test Cheng",
            "returnOption": "refundWithReturn",
            "reportReason": "WRONG",
            "returnDescription": "",
            "uploadedPhotos": [
                ""
            ],
            "returnEntryPk": "8890825726466",
            "merchantToCsRemark": null,
            "returnRequestId": "R02871003-B001",
            "returnRequestType": "Refund",
            "replacementOrderNumber": "",
            "merchantCsReturnMessage": []
        }
    ],
    "pagination": {
        "page": 1,
        "pageSize": 20,
        "total": 2
    }
}
```

---

### Upload Mainland Parcel Info (上傳大陸物流包裹信息)

**POST** `https://merchant-oapi.shoalter.com/oapi/api/order/uploadMainlandParcelInfo`
Version: v1.0.0

The Upload Mainland Parcel Info API allows Mainland China merchants to upload Mainland waybill numbers and the names of Mainland logistics companies.Notes:This API is only applicable to Standard Delivery where the Product Ready Method is Mainland Consolidation. It does not apply to Merchant Delivery or Non-Standard Delivery.Due to system recognition requirements, the mainlandCourierTrackingNumber field only allows English letters (uppercase and lowercase), Arabic numerals, and hyphens (-), with a maximum length of 30 characters.If the merchant delivers goods to the HKTVmall warehouse by themselves, both mainlandCourierTrackingNumber and mainlandCourierCompanyName should be entered as None.Batch uploads are supported, with up to 100 waybills per request.The results of mainlandCourierTrackingNumber and mainlandCourierCompanyName should check GetOrderDetail response.

**Request Body:**

```json
[
    {
        "waybillNumber": "4004946707",
        "mainlandCourierTrackingNumber": “SGX-123456",
        "mainlandCourierCompanyName": “中通快递”
    },
    {
        "waybillNumber": "7503552473",
        "mainlandCourierTrackingNumber": "SF123456789",
        "mainlandCourierCompanyName": "中通快递"
    }
]
```

**Response:**

```json
{
    "message": success,
    "code": "success",
    "data": {
        "successList": [
            {
                "waybillNumber": "4004946707", "4004946708",
                "message": null
            }
        ],
        "failList": []
    },
    "pagination": {
        "page": null,
        "pageSize": null,
        "total": null
    }
}
```

```json
{
    "message": partial failure,
    "code": "success",
    "data": {
        "successList": [
            {
                "waybillNumber": "4004946707",
                "message": null
            }
        ],
        "failList": [
            {
                "waybillNumber": "7503552473",
                "message": "Waybill not found."
            }
        ]
    },
    "pagination": {
        "page": null,
        "pageSize": null,
        "total": null
    }
}
```

---

### Get Order SKU Promotion  (查詢訂單 SKU 優惠活動資訊)

**GET** `https://merchant-oapi.shoalter.com/oapi/api/order/getPromotionOrder`
Version: v1.0.0

This API allows users to retrieve SKU promotion information by subOrderNumbers.
                Supports querying by single or multiple subOrderNumbers.
                Promotion supports: Free Gift Promotion, Mix and Match Promotion, Redemption Promotion
            
            Notes:
            
                subOrderNumbers can be obtained from the Get Order API.

**Request Body:**

*Single Sub-Order Query*
```json
{
    "subOrderNumbers": [
        "H141209000003-H8888881"
    ],
    "page":1,
    "pageSize":10
}
```

*Multiple Sub-Order Query*
```json
{
    "subOrderNumbers": [
        "H141209000003-H8888881",
        "H141209000004-H8888881"
    ],
    "page":1,
    "pageSize":10
}
```

**Response:**

```json
{
  "message": "success",
  "status": "success",
  "data": {
    "successList": [
      {
        "orderId": "H141209000003-H8888881",
        "orderEntries": [
          {
            "skuId": "H8888881_S_FRESHMEAT2",
            "promotion": {
              "promotionType": "FreeGift",
              "settingType": "Trigger"
            }
          },
          {
            "skuId": "H8888881_S_003",
            "promotion": {
              "promotionType": "Redemption",
              "settingType": "Gift"
            }
          },
          {
            "skuId": "H8888881_S_002",
            "promotion": {
              "promotionType": "MixAndMatch",
              "settingType": "Trigger"
            }
          },
          {
            "skuId": "H8888881_S_004",
            "promotion": {
              
            }
          }
        ]
      }
    ],
    "failList": [
      
    ]
  },
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1
  }
}
```

```json
{
  "message": "Partial failure occurred while retrieving orders.",
  "status": "fail",
  "data": {
    "successList": [
      {
        "orderId": "H141209000003-H8888881",
        "orderEntries": [
          {
            "skuId": "H8888881_S_FRESHMEAT2",
            "promotion": {
              "promotionType": "FreeGift",
              "settingType": "Trigger"
            }
          },
          {
            "skuId": "H8888881_S_003",
            "promotion": {
              "promotionType": "Redemption",
              "settingType": "Gift"
            }
          },
          {
            "skuId": "H8888881_S_002",
            "promotion": {
              "promotionType": "MixAndMatch",
              "settingType": "Trigger"
            }
          },
          {
            "skuId": "H8888881_S_004",
            "promotion": {
              
            }
          }
        ]
      }
    ],
    "failList": [
      "H141209000003-H8888881"
    ]
  },
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1
  }
}
```

```json
{
    "message": "Unable to get results from requests. Try again or contact support.",
    "code": "fail",
    "data": null,
    "pagination": {
        "page": null,
        "pageSize": null,
        "total": null
    }
}
```

---
