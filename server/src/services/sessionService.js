const RouterOSAPI = require('node-routeros').RouterOSAPI;
const models = require('../models');

async function activateUser({ userId, macAddress, ipAddress, packageId, transactionId }) {
  const tx = transactionId ? models.getTransactionById(transactionId) : null;
  const selectedPackage = packageId ? models.getPackageById(packageId) : tx ? models.getPackageById(tx.package_id) : null;

  if (!selectedPackage) {
    throw new Error('Package not found for activation');
  }

  const routeConfig = {
    host: process.env.MIKROTIK_HOST || '192.168.88.1',
    user: process.env.MIKROTIK_USER || 'admin',
    pass: process.env.MIKROTIK_PASSWORD || 'password',
    port: Number(process.env.MIKROTIK_PORT || 8728),
    timeout: Number(process.env.MIKROTIK_TIMEOUT || 15000),
  };

  try {
    const api = new RouterOSAPI(routeConfig);
    await api.connect();

    const username = `user-${userId || 'demo'}`;
    const password = 'Vocha2026!';
    const mac = macAddress || '00:00:00:00:00:00';
    const ip = ipAddress || '192.168.88.35';

    await api.write('/ip/hotspot/user/add', [
      `=name=${username}`,
      `=password=${password}`,
      `=profile=${selectedPackage.name.replace(/\s+/g, '-').toLowerCase()}`,
      `=comment=${tx ? tx.reference : 'manual-activation'}`,
    ]);

    await api.write('/ip/hotspot/host/add', [
      `=mac-address=${mac}`,
      `=address=${ip}`,
      `=comment=${tx ? tx.reference : 'activated'}`,
    ]);

    await api.close();

    const session = models.createSession({
      userId,
      packageId: selectedPackage.id,
      macAddress: mac,
      ipAddress: ip,
      expiresAt: new Date(Date.now() + (selectedPackage.duration_hours || 24) * 60 * 60 * 1000).toISOString(),
      remainingDataMb: selectedPackage.data_amount_mb,
    });

    return {
      success: true,
      session,
      package: selectedPackage,
      username,
      ip,
      message: 'MikroTik user created and access activated successfully',
    };
  } catch (error) {
    const session = models.createSession({
      userId,
      packageId: selectedPackage.id,
      macAddress: macAddress || null,
      ipAddress: ipAddress || null,
      expiresAt: new Date(Date.now() + (selectedPackage.duration_hours || 24) * 60 * 60 * 1000).toISOString(),
      remainingDataMb: selectedPackage.data_amount_mb,
    });

    return {
      success: false,
      fallback: true,
      session,
      package: selectedPackage,
      message: `MikroTik API unavailable. Access granted in simulation mode: ${error.message}`,
    };
  }
}

module.exports = {
  activateUser,
};
