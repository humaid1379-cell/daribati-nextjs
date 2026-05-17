# API Integration Guide: Daribati Next.js

This document outlines the integration requirements for EmaraTax/FTA API, Telr Payment Gateway, and SendGrid email notifications.

## 1. EmaraTax / FTA API Integration

The UAE Federal Tax Authority (FTA) has launched the EmaraTax platform, which provides APIs for integrating ERP and tax systems.

### Requirements for Connection
- **Registration**: You must register for API access through the EmaraTax portal or the UAE API Marketplace.
- **Authentication**: Access requires API keys or tokens provided by the FTA.
- **Certificates**: Depending on the specific endpoint, mutual TLS (mTLS) or specific digital certificates may be required for secure communication.
- **Endpoints**: The API provides endpoints for VAT registration, tax agent services, and corporate tax compliance.

## 2. Telr Payment Gateway Integration

Telr is a major payment gateway in the UAE, supporting local and international cards.

### Integration Steps
- **Sign Up**: Create a merchant account at telr.com. This requires an active UAE trade license and a corporate bank account.
- **API Keys**: You need your `Store ID` and `Authentication Key` from the Telr dashboard.
- **Endpoints**: All transaction requests must be sent via HTTP POST to the Hosted Payment Page gateway URL: `https://secure.telr.com/gateway/order.json`.
- **Required Fields**:
  - `ivp_method`: The request method (e.g., 'create')
  - `ivp_store`: Your Store ID
  - `ivp_authkey`: Your Authentication Key
  - `ivp_amount`: Transaction amount
  - `ivp_currency`: Currency (e.g., 'AED')
  - `ivp_test`: Set to `1` for test mode, `0` for live mode
  - `ivp_cart`: Unique Cart/Order ID
  - `ivp_desc`: Purchase description
  - `return_auth`, `return_decl`, `return_can`: Callback URLs for authorized, declined, and cancelled transactions.
- **Sandbox Testing**: Set `ivp_test` to `1`. Test mode requests can be sent from any IP address, but live mode requires whitelisting your server IP in the Telr admin panel.

## 3. SendGrid Email Notifications

SendGrid will be used for sending transactional emails, such as tax deadline reminders.

### Integration Steps
- **Sign Up**: Create a SendGrid account.
- **API Key Setup**: Navigate to Settings > API Keys in the SendGrid dashboard. Create a new key with "Mail Send" full access permissions.
- **Node.js Setup**: Install the official package: `npm install @sendgrid/mail`.
- **Implementation**:
  ```javascript
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'user@example.com',
    from: 'notifications@daribati.ae',
    subject: 'Tax Deadline Reminder',
    text: 'Your corporate tax filing is due soon.',
  };
  sgMail.send(msg);
  ```
- **Scheduling**: SendGrid supports scheduling emails up to 72 hours in advance using the `send_at` parameter in the API request, which is ideal for automated reminders.
