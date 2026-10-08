const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

const db = require('./src/config/db');
const packageRoutes = require('./src/routes/packages');
const paymentRoutes = require('./src/routes/payments');
const webhookRoutes = require('./src/routes/webhooks');
const mikrotikRoutes = require('./src/routes/mikrotik');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: process.env.APP_NAME || 'Mfumo wa Vocha',
    time: new Date().toISOString(),
    packages: db.prepare('SELECT COUNT(*) as count FROM packages').get().count,
  });
});

app.use('/api/packages', packageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/mikrotik', mikrotikRoutes);

const clientDir = path.join(__dirname, '../client/public');
app.use(express.static(clientDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(clientDir, 'admin.html'));
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Mfumo wa Vocha running on http://localhost:${PORT}`);
});
