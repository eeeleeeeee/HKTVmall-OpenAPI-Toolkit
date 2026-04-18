---
name: hktvmall-qna
description: HKTVmall FAQ and Q&A reference. Use when asking about rate limits, HTTP 400/401/403/429 errors, API troubleshooting, common integration issues, or frequently asked questions about HKTVmall OpenAPI.
---

# HKTVmall Q&A / Frequently Asked Questions

Answers to common questions about HKTVmall OpenAPI integration.

## How do I authenticate API requests?
*(如何驗證 API 請求？)*
Tags: `auth` `api-key` `security`

To authenticate API requests:Include your API key in the request headers: Use the "x-auth-token" field to pass your token.Obtain your API key/UUID: Refer to the tutorial for detailed steps on how to retrieve your key/UUID from the system. The token consists of your API key and other components as explained in the tutorial.Important Notes:If the token is incorrect, the API will return an HTTP 401 status code (Unauthorized). Please double-check your token.For the MMS system:The UUID/key will only be valid after clicking Save. If not saved, it means the API is not enabled.Once saved, the UUID/key will be hidden. Closing and reopening the API will generate a new UUID/key.

---

## What are the rate limits for API calls?
*(API 呼叫的速率限制是什麼？)*
Tags: `rate-limit` `subscription` `pricing`

Our APIs have different rate limits depending on the system and store. If the rate limit is exceeded, the API will respond with an HTTP 429 status code (Too Many Requests). Below are the rate limits for each system:Product API:Replenish Rate: 2 requests per second (per store)Burst Capacity: 100 requestsOrder API:Replenish Rate: 10 requests per second (per store)Burst Capacity: 150 requestsInventory API:Replenish Rate: 3 requests per second (per store)Burst Capacity: 100 requestsTo avoid exceeding the rate limit, please implement proper rate-limiting mechanisms in your integration.

---

## API Common Issues
*(API 常見問題)*

Q1: What causes 400/403 Forbidden errors?This issue likely occurs due to an expired token or invalid token. Please also double-check that you are using the correct UUID/Private Key.Q2: How to troubleshoot 400/403 Forbidden errors?Ensure your token is regenerated every 30 minutes.Q3: Why does the API return 200 status but the action is not completed/succeed?Sometimes the API returns a 200 status code, indicating that the API call was successful, but the expected action was not executed. For example, when using /updateStock to update inventory numbers, the inventory amount might not reflect correctly.Q4: How to troubleshoot 200 status with incomplete actions?Pay attention to the response code within the API response.Sometimes the response includes additional details indicating adjustments needed on your end.Example Response:{
    "message": null,
    "code": "success",
    "data": [
        {
            "message": "Invalid productId or product is offline.",
            "productId": "H8888881_S_a3"
        }
    ],
    "pagination": {
        "page": 1,
        "pageSize": 20,
        "total": 1
    }
}
Q5: What does "Code is success but message shows more details" mean?It means the API call was successful (code: success), but there are additional details in the response message requiring further action or corrections.

---
