const crypto = require('crypto');
const models = require('../models');

async function callGateway({ gateway, phone, amountTzs, packageId, network }) {
  const provider = gateway || 'demo';
  const reference = `VOCHA-${Date.now()}-${crypto.randomBytes(5).toString('hex')}`;

  if (process.env.GATEWAY_API_URL && process.env.GATEWAY_API_URL !== 'http://localhost:3001') {
    const response = await fetch(`${process.env.GATEWAY_API_URL}/api/payments/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        phone,
        amount_tzs: amountTzs,
        network,
        reference,
        package_id: packageId,
      }),
    });

    if (!response.ok) {
      throw new Error('Gateway request failed');
    }

    return await response.json();
  }

  return {
    success: true,
    provider,
    reference,
    status: 'pending',
    message: 'Demo gateway request accepted. We are simulating a payment request.',
  };
}

async function initiatePayment({ packageId, phone, network, macAddress, clientIp }) {
  const pkg = models.getPackageById(packageId);
  if (!pkg) {
    throw new Error('Package not found');
  }

  const user = models.createUser({ phone, network, macAddress });
  const reference = `VOCHA-${Date.now()}-${crypto.randomBytes(5).toString('hex')}`;

  const paymentRecord = models.createTransaction({
    userId: user.id,
    packageId: pkg.id,
    amountTzs: Number(pkg.price_tzs),
    phone,
    network,
    gateway: 'azampay-demo',
    reference,
  });

  const gatewayResult = await callGateway({
    gateway: 'azampay-demo',
    phone,
    amountTzs: Number(pkg.price_tzs),
    packageId: pkg.id,
    network,
  });

  const updatedRecord = models.updateTransactionStatus(
    paymentRecord.id,
    gatewayResult.status || 'pending',
    gatewayResult.reference || reference,
    {
      provider: gatewayResult.provider || 'azampay-demo',
      clientIp,
      package: pkg,
      gatewayResponse: gatewayResult,
    }
  );

  return {
    id: updatedRecord.id,
    reference: updatedRecord.reference,
    provider_reference: updatedRecord.provider_reference,
    package: pkg,
    amount_tzs: updatedRecord.amount_tzs,
    status: updatedRecord.status,
    message: gatewayResult.message || 'Payment request created successfully',
  };
}

module.exports = {
  initiatePayment,
  callGateway,
};
