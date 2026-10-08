const express = require('express');
const models = require('../models');
const mikrotikService = require('../services/mikrotikService');

const router = express.Router();

router.post('/payment', async (req, res) => {
  try {
    const { reference, status, providerReference, transactionId, provider, data } = req.body;

    const tx = transactionId ? models.getTransactionById(transactionId) : models.getTransactionByReference(reference);
    if (!tx) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const updated = models.updateTransactionStatus(tx.id, status || 'paid', providerReference || null, {
      provider: provider || 'gateway',
      payload: data || req.body,
    });

    if (status === 'paid' || status === 'completed') {
      const result = await mikrotikService.activateUser({
        userId: tx.user_id,
        macAddress: null,
        ipAddress: null,
        packageId: tx.package_id,
        transactionId: tx.id,
      });

      return res.json({ success: true, data: { transaction: updated, mikrotik: result } });
    }

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
