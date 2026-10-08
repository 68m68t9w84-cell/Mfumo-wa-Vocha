# Mfumo wa Wi-Fi Captive Portal

Mfumo wa Wi-Fi Captive Portal wa kuuza intaneti kupitia viingilio vya Wi-Fi kwa kutumia vifurushi vya data kwa Tanzania.

## Vipengele
- Landing page ya captive portal ya simu ya rununu
- Orodha ya vifurushi vya intaneti
- Fomu ya malipo kwa kutumia MTN MoMo / Tigo Pesa / Airtel Money / Halopesa
- Webhook callback ya kuthibitisha malipo
- MikroTik RouterOS integration kwa aktivishaji wa session
- Admin dashboard ya kuongeza/kuhariri vifurushi na kuona ripoti

## Project structure

```text
Mfumo-wa-Vocha/
├── README.md
├── .gitignore
├── .env.example
├── server/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── data/
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── models/
│       │   └── index.js
│       ├── routes/
│       │   ├── packages.js
│       │   ├── payments.js
│       │   ├── webhooks.js
│       │   └── mikrotik.js
│       ├── services/
│       │   ├── paymentService.js
│       │   ├── mikrotikService.js
│       │   └── sessionService.js
│       └── utils/
│           └── response.js
├── client/
│   └── public/
│       ├── index.html
│       ├── admin.html
│       ├── styles.css
│       ├── app.js
│       └── admin.js
└── docs/
    └── setup.md
```

## Quick start

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Open:
- Landing page: http://localhost:3000
- Admin page: http://localhost:3000/admin.html

## Environment variables

```env
PORT=3000
APP_NAME="Mfumo wa Vocha"
JWT_SECRET=change-me
DB_PATH=./data/mfumo_wa_vocha.db
GATEWAY_API_URL=http://localhost:3001
GATEWAY_USERNAME=demo
GATEWAY_PASSWORD=demo
MIKROTIK_HOST=192.168.88.1
MIKROTIK_USER=admin
MIKROTIK_PASSWORD=password
MIKROTIK_PORT=8728
MIKROTIK_TIMEOUT=15000
```

## Notes

This project is a production-ready starter implementation for a captive portal, payment flow, and MikroTik integration. For live production, replace the demo gateway with Azam Pay, Selcom, or a direct M-Pesa/STK integration and configure your MikroTik hotspot rules.
