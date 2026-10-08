const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbDir = path.join(__dirname, '../../server/data');
const dbPath = path.join(dbDir, 'mfumo_wa_vocha.db');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

function seedPackages() {
  const countResult = db.prepare('SELECT COUNT(*) as count FROM packages').get();
  if (countResult.count > 0) return;

  const insert = db.prepare(`
    INSERT INTO packages (name, price_tzs, data_amount_mb, duration_hours, duration_days, max_speed, description, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const defaultPackages = [
    ['Daily 1GB', 1000, 1024, 24, 1, '10 Mbps', 'Kifurushi cha siku 1', 1],
    ['Weekly 5GB', 4000, 5120, 168, 7, '15 Mbps', 'Kifurushi cha wiki 1', 1],
    ['Monthly 15GB', 12000, 15360, 720, 30, '20 Mbps', 'Kifurushi cha mwezi 1', 1],
  ];

  const transaction = db.transaction(() => {
    for (const pkg of defaultPackages) {
      insert.run(...pkg);
    }
  });

  transaction();
}

const schemaSql = `
  CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price_tzs INTEGER NOT NULL,
    data_amount_mb INTEGER NOT NULL,
    duration_hours INTEGER,
    duration_days INTEGER,
    max_speed TEXT,
    description TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL,
    network TEXT NOT NULL,
    mac_address TEXT,
    status TEXT DEFAULT 'new',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    package_id INTEGER,
    amount_tzs INTEGER NOT NULL,
    phone TEXT NOT NULL,
    network TEXT NOT NULL,
    gateway TEXT,
    status TEXT DEFAULT 'pending',
    reference TEXT,
    provider_reference TEXT,
    callback_payload TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(package_id) REFERENCES packages(id)
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    package_id INTEGER,
    mac_address TEXT,
    ip_address TEXT,
    status TEXT DEFAULT 'active',
    started_at TEXT DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT,
    remaining_data_mb INTEGER DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(package_id) REFERENCES packages(id)
  );

  CREATE TABLE IF NOT EXISTS admin_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

db.exec(schemaSql);
seedPackages();

module.exports = db;
