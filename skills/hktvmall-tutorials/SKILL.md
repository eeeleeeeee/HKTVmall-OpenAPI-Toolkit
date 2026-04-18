---
name: hktvmall-tutorials
description: HKTVmall step-by-step tutorials and guides. Use when asking about API tutorials, how-to guides, contacting technical support, or getting started with HKTVmall OpenAPI integration.
---

# HKTVmall API Tutorials

Step-by-step guides to help you master HKTVmall OpenAPI integration.

## How do I authenticate API requests?

*Category: Authentication*

Obtain UUID and Private Key (MMS 1.0 version) :

          Navigate to E-Commerce → Merchant → Merchant Store Status in the MMS system.

            1. Click "Search", and the system will list your store list.
            2. Select the store.
            3. Click “Edit” to enter the store detail page.

          Scroll down the page, find "Enable Open API". 
          Enable Open API by selecting "Yes" under the "Enable Open API" option. The system will generate a UUID and Private Key for the store.

            Copy theUUIDandPrivate Key, then scroll down to click "Save" button to save the settings.
            UUIDand 
            Private Keyare displayed only once. If you leave the page without copying, you will need to disable and re-enable the Open API to regenerate them.

        Obtain UUID and Private Key (MMS 2.0 version) :

          Navigate to Store Management → Store Basic Settings in the MMS2.0 system.

              1. Find your stroe.
              2. Click “Edit” to enter the edit store page.

            Copy theUUIDandPrivate Key, then scroll down to click "Save" button to save the settings.
            Important : The
            UUIDand 
            Private Keyare displayed only once. If you leave the page without copying, you will need to disable and re-enable the Open API to regenerate them.

          Generate x-auth-token:

              Method 1 - Visit the JWT Token Generator page.

                  Click

                    Refresh
                  to get the latest timestamp.
                   ( The iat value must be updated every 30 minutes for the token to remain valid. )

                Paste the UUID you just copied into the “X-API-Key (UUID)” field.
                Paste the private key you just copied into the “RSA Private Key (PEM format)” field.  

      Method 2 - Generate Token Without Using the Online Generator

      JWT Token Generatoronline tool is mainly for non-engineers to generate tokens for temporary testing purposes.
       IT(developer)can directly create the JWT through code and include the following Header:：
        {
  "alg": "RS256",
  "typ": "JWT"
}
  Example of the Payload, ( iat needs to be refreshed every 30 minutes):
   {
  "sub": "shoalter",
  "name": "shoalter",
  "iat": {{current_unix_timestamp }},
  "x-api-key": "{{your_UUID_from_MMS_system}}"
}

Then use your Private Key together with the above Header and Payload information to generate the token using the RS256 algorithm.

                Use x-auth-token in API requests:Include the generated JWT token as the value of the 
                "x-auth-token" field in the request headers.

             Error Handling:If the token is invalid or expired, the API will return an 
              HTTP 401 Unauthorized status code. Please verify your token and ensure the timestamp is up-to-date.Note for MMS System:UUID and Private Key must be saved before they become active. Once saved, the UUID/Key will be hidden. Reopening the API will generate a new set of credentials.

---

## How to Contact Technical Support

*Category: General*

If merchants encounter difficulties or have questions while using the Open API features, they can contact the technical support team via:Email Address: production.issues.mms@shoalter.comEmail Subject FormatPlease set the email subject as:{Your Store ID} - Open API inquires - {The Issue You Encountered}Required InformationIn the email, please provide the following details to help the support team quickly identify the issue:API Endpoint: Specify the API URL where the issue occurred.Error Information or Problem Description: Attach relevant videos or screenshots to describe the issue.Problem Overview: Briefly summarize the issue encountered.Trigger Time: The specific time when the issue occurred.Request Body: Provide the Body information of the API request.Request Result: Share the API response details.ExampleHere is an example of using the GET Stock API:API URL: https://merchant-oapi.shoalter.com/oapi/api/inventory/stock/detailsRequest Body:[
  {
    "warehouseId": "",
    "productId": "H8888881_S_072705116546"
  }
]
Request Result:{
  "message": "authentication fail",
  "code": "error",
  "data": null
}

---
