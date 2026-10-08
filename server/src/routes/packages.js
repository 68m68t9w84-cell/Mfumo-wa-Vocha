const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  const packages = models.getPackages();
  res.json({ success: true, data: packages });
});

router.get('/:id', (req, res) => {
  const pkg = models.getPackageById(req.params.id);
  if (!pkg) {
    return res.status(404).json({ success: false, message: 'Package not found' });
  }
  return res.json({ success: true, data: pkg });
});

router.post('/', (req, res) => {
  const { name, price_tzs, data_amount_mb, duration_hours, duration_days, max_speed, description } = req.body;

  if (!name || !price_tzs || !data_amount_mb) {
    return res.status(400).json({ success: false, message: 'name, price_tzs and data_amount_mb are required' });
  }

  const db = require('../config/db');
  const result = db.prepare(`
    INSERT INTO packages (name, price_tzs, data_amount_mb, duration_hours, duration_days, max_speed, description, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
  `).run(name, Number(price_tzs), Number(data_amount_mb), Number(duration_hours || 0), Number(duration_days || 0), max_speed || 'N/A', description || '');

  const pkg = db.prepare('SELECT * FROM packages WHERE id = ?').get(result.lastInsertRowid);
  return res.status(201).json({ success: true, data: pkg });
});

router.put('/:id', (req, res) => {
  const db = require('../config/db');
  const { name, price_tzs, data_amount_mb, duration_hours, duration_days, max_speed, description, is_active } = req.body;

  db.prepare(`
    UPDATE packages
    SET name = ?, price_tzs = ?, data_amount_mb = ?, duration_hours = ?, duration_days = ?, max_speed = ?, description = ?, is_active = ?
    WHERE id = ?
  `).run(name, Number(price_tzs), Number(data_amount_mb), Number(duration_hours || 0), Number(duration_days || 0), max_speed || 'N/A', description || '', is_active !== undefined ? Number(is_active) : 1, req.params.id);

  const pkg = db.prepare('SELECT * FROM packages WHERE id = ?').get(req.params.id);
  return res.json({ success: true, data: pkg });
});

router.delete('/:id', (req, res) => {
  const db = require('../config/db');
  db.prepare('DELETE FROM packages WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Package deleted' });
});

module.exports = router;
