// Simple integration test for bookings and availability
(async () => {
  const API_BASE = process.env.TEST_API_URL || 'http://localhost:4000';
  // choose a date 30 days from now (UTC midnight) to avoid collisions with previous test data
  const now = new Date();
  const future = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 30));
  const date = future.toISOString();
  const time = '10:00 AM';

  // lightweight fetch polyfill loader for Node versions without global fetch
  let fetchFn = global.fetch;
  if (!fetchFn) {
    try {
      const mod = await import('node-fetch');
      fetchFn = mod.default;
    } catch (e) {
      console.error('fetch not available and node-fetch could not be imported');
      process.exit(2);
    }
  }

  const expect = (cond, msg) => {
    if (!cond) throw new Error(msg || 'Expectation failed');
  };

  try {
    console.log('Checking availability (should be available)...');
    let res = await fetchFn(`${API_BASE}/api/availability?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
    expect(res.ok, `Availability endpoint returned ${res.status}`);
    let body = await res.json();
    expect(body && body.available === true, 'Slot expected to be available');
    console.log('OK — slot available');

    console.log('Creating booking (should succeed)...');
    res = await fetchFn(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Integration Test', email: 'itest@example.com', phone: '000', service: 'Test', date, time, notes: 'automated' })
    });
    expect(res.status === 201, `Expected 201 Created, got ${res.status}`);
    body = await res.json();
    console.log('Created booking id=', body.id);

    console.log('Checking availability again (should be unavailable)...');
    res = await fetchFn(`${API_BASE}/api/availability?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
    expect(res.ok, `Availability endpoint returned ${res.status}`);
    body = await res.json();
    expect(body && body.available === false, 'Slot expected to be unavailable');
    console.log('OK — slot now unavailable');

    console.log('Attempting duplicate booking (should return 409)...');
    res = await fetchFn(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Integration Test 2', email: 'itest2@example.com', phone: '000', service: 'Test', date, time, notes: 'duplicate' })
    });
    expect(res.status === 409, `Expected 409 Conflict, got ${res.status}`);
    console.log('OK — duplicate rejected with 409');

    console.log('\nALL TESTS PASSED');
    process.exit(0);
  } catch (err) {
    console.error('TEST FAILED:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
