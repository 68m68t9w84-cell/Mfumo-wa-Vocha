async function loadPackages() {
  const res = await fetch('/api/packages');
  const data = await res.json();
  if (!data.success) {
    document.getElementById('packageTable').innerHTML = 'Failed to load packages';
    return;
  }

  const table = `
    <table class="list-table">
      <thead>
        <tr>
          <th>Jina</th>
          <th>Data</th>
          <th>Gharama</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        ${data.data.map((pkg) => `
          <tr>
            <td>${pkg.name}</td>
            <td>${pkg.data_amount_mb} MB</td>
            <td>TSh ${Number(pkg.price_tzs).toLocaleString()}</td>
            <td>${pkg.duration_days ? `${pkg.duration_days} days` : `${pkg.duration_hours} hours`}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('packageTable').innerHTML = table;
}

document.getElementById('packageForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    name: document.getElementById('name').value,
    price_tzs: Number(document.getElementById('price_tzs').value),
    data_amount_mb: Number(document.getElementById('data_amount_mb').value),
    duration_days: Number(document.getElementById('duration_days').value || 0),
    description: 'Package created from admin dashboard',
  };

  const res = await fetch('/api/packages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (data.success) {
    document.getElementById('packageForm').reset();
    loadPackages();
  }
});

(async function init() {
  await loadPackages();
  document.getElementById('txSummary').innerHTML = 'No recent transaction data found. Connect the payment gateway to populate this section.';
})();
