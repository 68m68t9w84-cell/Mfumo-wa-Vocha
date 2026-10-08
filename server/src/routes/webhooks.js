const express = require('express');
const models = require('../models');
const paymentService = require('../services/paymentService');
const mikrotikService = require('../services/mikrotikService');

const router = express.Router();

router.post('/initiate', async (req, res) => {
  try {
    const { packageId, phone, network, macAddress } = req.body;

    if (!packageId || !phone || !network) {
      return res.status(400).json({ success: false, message: 'packageId, phone and network are required' });
    }

    const payment = await paymentService.initiatePayment({
      packageId,
      phone,
      network,
      macAddress,
      clientIp: req.ip,
    });

    return res.status(201).json({ success: true, data: payment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/status/:id', async (req, res) => {
  try {
    const tx = models.getTransactionById(req.params.id);
    if (!tx) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    return res.json({ success: true, data: tx });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/activate', async (req, res) => {
  try {
    const { transactionId, userId, macAddress, ipAddress, packageId } = req.body;

    const tx = models.getTransactionById(transactionId);
    if (!tx) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const result = await mikrotikService.activateUser({
      userId,
      macAddress,
      ipAddress,
      packageId,
      transactionId,
    });

    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
