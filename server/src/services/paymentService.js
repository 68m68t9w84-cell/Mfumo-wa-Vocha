const express = require('express');
const mikrotikService = require('../services/mikrotikService');

const router = express.Router();

router.post('/activate', async (req, res) => {
  try {
    const { userId, macAddress, ipAddress, packageId, transactionId } = req.body;
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
