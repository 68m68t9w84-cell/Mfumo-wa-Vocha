* { box-sizing: border-box; }

:root {
  --bg: #081320;
  --panel: #121f2d;
  --panel-soft: #14273a;
  --card: #1d3046;
  --primary: #38bdf8;
  --primary-strong: #0ea5e9;
  --success: #34d399;
  --warning: #fbbf24;
  --text: #e5f3ff;
  --muted: #a9bfd5;
  --danger: #f87171;
  --border: rgba(148, 163, 184, 0.2);
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #06131f 0%, #101f2d 100%);
  color: var(--text);
}

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 20px 56px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: #021018;
  font-weight: 800;
}

.admin-link {
  color: var(--text);
  text-decoration: none;
  border: 1px solid var(--border);
  padding: 10px 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: center;
}

.hero-copy {
  padding: 20px 0;
}

.eyebrow {
  display: inline-block;
  color: var(--primary);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 16px;
}

.hero-copy h1 {
  font-size: clamp(2.5rem, 5vw, 4.1rem);
  line-height: 1.05;
  margin: 0 0 18px;
}

.hero-copy p {
  margin: 0;
  max-width: 620px;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}

.portal-box {
  background: rgba(18, 31, 45, 0.9);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 20px 45px rgba(1, 9, 15, 0.45);
  padding: 18px;
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.box-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.live-tag {
  background: rgba(52, 211, 153, 0.12);
  color: var(--success);
  border: 1px solid rgba(52, 211, 153, 0.4);
  border-radius: 999px;
  padding: 7px 10px;
  font-size: 0.75rem;
  font-weight: 700;
}

.package-list {
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
}

.package-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.package-card:hover,
.package-card.selected {
  transform: translateY(-1px);
  border-color: rgba(56, 189, 248, 0.9);
  box-shadow: 0 10px 20px rgba(14, 165, 233, 0.2);
}

.package-name {
  font-weight: 700;
  font-size: 1.02rem;
  margin-bottom: 4px;
}

.package-meta {
  color: var(--muted);
  font-size: 0.85rem;
}

.package-price {
  font-weight: 800;
  color: var(--primary);
  font-size: 1.15rem;
}

.purchase-form {
  display: grid;
  gap: 14px;
  margin-top: 16px;
}

.field-group {
  display: grid;
  gap: 8px;
}

label {
  color: var(--muted);
  font-size: 0.88rem;
  font-weight: 600;
}

input, select, button {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  padding: 14px 14px;
  font: inherit;
}

input:focus, select:focus {
  outline: none;
  border-color: rgba(56, 189, 248, 0.9);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

button {
  margin-top: 8px;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: #03151f;
  border: none;
  transition: transform 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

.hidden {
  display: none !important;
}

.status-box {
  margin-top: 16px;
  border-radius: 16px;
  padding: 14px 16px;
  border: 1px solid rgba(52, 211, 153, 0.25);
  background: rgba(52, 211, 153, 0.08);
  color: var(--text);
  line-height: 1.6;
}

.status-box.error {
  border-color: rgba(248, 113, 113, 0.35);
  background: rgba(248, 113, 113, 0.08);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
