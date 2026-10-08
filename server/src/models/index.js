const db = require('../config/db');

function getPackages() {
  return db.prepare('SELECT * FROM packages WHERE is_active = 1 ORDER BY price_tzs ASC').all();
}

function getPackageById(id) {
  return db.prepare('SELECT * FROM packages WHERE id = ?').get(id);
}

function createUser({ phone, network, macAddress }) {
  const existing = db.prepare('SELECT * FROM users WHERE phone = ? AND network = ?').get(phone, network);
  if (existing) return existing;

  const result = db.prepare(`
    INSERT INTO users (phone, network, mac_address, status)
    VALUES (?, ?, ?, 'new')
  `).run(phone, network, macAddress || null);

  return db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
}

function createTransaction({ userId, packageId, amountTzs, phone, network, gateway, reference }) {
  const result = db.prepare(`
    INSERT INTO transactions (user_id, package_id, amount_tzs, phone, network, gateway, status, reference)
    VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
  `).run(userId, packageId, amountTzs, phone, network, gateway, reference);

  return db.prepare('SELECT * FROM transactions WHERE id = ?').get(result.lastInsertRowid);
}

function getTransactionById(id) {
  return db.prepare('SELECT * FROM transactions WHERE id = ?').get(id);
}

function updateTransactionStatus(id, status, providerReference, callbackPayload) {
  db.prepare(`
    UPDATE transactions
    SET status = ?, provider_reference = ?, callback_payload = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(status, providerReference || null, callbackPayload ? JSON.stringify(callbackPayload) : null, id);

  return db.prepare('SELECT * FROM transactions WHERE id = ?').get(id);
}

function getTransactionByReference(reference) {
  return db.prepare('SELECT * FROM transactions WHERE reference = ?').get(reference);
}

function createSession({ userId, packageId, macAddress, ipAddress, expiresAt, remainingDataMb }) {
  const result = db.prepare(`
    INSERT INTO sessions (user_id, package_id, mac_address, ip_address, status, expires_at, remaining_data_mb)
    VALUES (?, ?, ?, ?, 'active', ?, ?)
  `).run(userId, packageId, macAddress || null, ipAddress || null, expiresAt || null, remainingDataMb || 0);

  return db.prepare('SELECT * FROM sessions WHERE id = ?').get(result.lastInsertRowid);
}

module.exports = {
  getPackages,
  getPackageById,
  createUser,
  createTransaction,
  getTransactionById,
  updateTransactionStatus,
  getTransactionByReference,
  createSession,
};
