<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin | Mfumo wa Vocha</title>
    <link rel="stylesheet" href="/styles.css" />
    <style>
      .admin-shell {
        max-width: 1100px;
        margin: 50px auto;
        background: rgba(18, 31, 45, 0.9);
        border: 1px solid rgba(148, 163, 184, 0.18);
        border-radius: 20px;
        padding: 20px;
      }

      .admin-grid {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: 18px;
      }

      .admin-card {
        background: rgba(29, 48, 70, 0.82);
        border: 1px solid rgba(148, 163, 184, 0.15);
        border-radius: 16px;
        padding: 16px;
      }

      .admin-card h3 {
        margin-top: 0;
      }

      .form-grid {
        display: grid;
        gap: 12px;
      }

      .list-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
      }

      .list-table th, .list-table td {
        text-align: left;
        padding: 10px 8px;
        border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      }

      .status-pill {
        display: inline-block;
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 0.75rem;
        font-weight: 700;
      }

      .status-pill.pending { background: rgba(251,191,36,0.12); color: #fbbf24; }
      .status-pill.paid { background: rgba(52,211,153,0.12); color: #34d399; }

      @media (max-width: 900px) {
        .admin-grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <div class="admin-shell">
      <div class="topbar">
        <div class="brand">
          <div class="brand-mark">V</div>
          <span>Vocha Admin</span>
        </div>
        <a class="admin-link" href="/">Portal</a>
      </div>

      <div class="admin-grid">
        <div class="admin-card">
          <h3>Ongeza Kifurushi</h3>
          <form id="packageForm" class="form-grid">
            <div class="field-group">
              <label for="name">Jina la kifurushi</label>
              <input id="name" type="text" required />
            </div>
            <div class="field-group">
              <label for="price_tzs">Gharama (TZS)</label>
              <input id="price_tzs" type="number" required />
            </div>
            <div class="field-group">
              <label for="data_amount_mb">Data (MB)</label>
              <input id="data_amount_mb" type="number" required />
            </div>
            <div class="field-group">
              <label for="duration_days">Siku</label>
              <input id="duration_days" type="number" value="1" />
            </div>
            <button type="submit">Hifadhi Kifurushi</button>
          </form>
        </div>

        <div class="admin-card">
          <h3>Ripoti ya Malipo</h3>
          <div id="txSummary">Loading...</div>
        </div>
      </div>

      <div class="admin-card" style="margin-top: 18px;">
        <h3>Orodha ya Vifurushi</h3>
        <div id="packageTable"></div>
      </div>
    </div>

    <script src="/admin.js"></script>
  </body>
</html>
