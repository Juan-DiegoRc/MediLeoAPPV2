export async function login(username: string, password: string, baseUrl = 'http://localhost:3000') {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function fetchLatestMetrics(accessToken: string, baseUrl = 'http://localhost:3000') {
  const res = await fetch(`${baseUrl}/api/protected/metrics`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
}

export async function fetchMetricsHistory(accessToken: string, range = '24h', baseUrl = 'http://localhost:3000') {
  const res = await fetch(`${baseUrl}/api/protected/metrics/history?range=${encodeURIComponent(range)}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) throw new Error('Failed to fetch metrics history');
  return res.json();
}
