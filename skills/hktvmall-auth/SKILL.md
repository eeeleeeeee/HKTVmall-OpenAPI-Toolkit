---
name: hktvmall-auth
description: HKTVmall authentication reference. Use when generating x-auth-token, setting up JWT for HKTVmall OpenAPI, handling 401 Unauthorized errors, or asking how to get UUID and Private Key from MMS system.
---

# HKTVmall Authentication

All HKTVmall OpenAPI calls require a JWT token in the `x-auth-token` header, signed with **RS256** using credentials from the MMS system.

## Step 1 — Get UUID and Private Key from MMS

**MMS 2.0:** Store Management → Store Basic Settings → Edit store → Enable Open API → copy UUID and Private Key

**MMS 1.0:** eCommerce → Merchant → Merchant Store Status → Edit store → Enable Open API → copy UUID and Private Key

> The UUID and Private Key are shown **only once**. If you leave without copying, disable and re-enable Open API to regenerate.

## Step 2 — Generate JWT Token

**Header:**
```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

**Payload** (refresh `iat` every 30 minutes):
```json
{
  "sub": "shoalter",
  "name": "shoalter",
  "iat": <current_unix_timestamp>,
  "x-api-key": "<your UUID from MMS>"
}
```

Sign with your **Private Key** using RS256.

## Step 3 — Use in API Requests

```
x-auth-token: <generated JWT>
```

## Code Examples

**Node.js (jsonwebtoken):**
```js
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem', 'utf8');
const token = jwt.sign(
  { sub: 'shoalter', name: 'shoalter', 'x-api-key': process.env.HKTV_UUID },
  privateKey,
  { algorithm: 'RS256', expiresIn: '30m' }
);
```

**Python (PyJWT):**
```python
import jwt, time

with open('private.pem') as f:
    private_key = f.read()

token = jwt.encode(
    {'sub': 'shoalter', 'name': 'shoalter', 'iat': int(time.time()), 'x-api-key': UUID},
    private_key,
    algorithm='RS256'
)
```

## Common Mistakes

| Issue | Fix |
|---|---|
| HTTP 401 Unauthorized | Token expired — regenerate with current `iat` |
| Token invalid | Wrong Private Key or UUID mismatch |
| Credentials lost | Disable + re-enable Open API in MMS to regenerate |
| Token rejected after save | UUID/Key only activate after clicking Save in MMS |