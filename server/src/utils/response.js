const models = require('../models');

function listActiveSessions() {
  const db = require('../config/db');
  return db.prepare(`
    SELECT s.*, p.name as package_name, u.phone, u.network
    FROM sessions s
    LEFT JOIN packages p ON p.id = s.package_id
    LEFT JOIN users u ON u.id = s.user_id
    WHERE s.status = 'active'
    ORDER BY s.started_at DESC
  `).all();
}

module.exports = {
  listActiveSessions,
};
