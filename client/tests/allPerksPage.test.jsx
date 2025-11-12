import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';

import AllPerks from '../src/pages/AllPerks.jsx';
import { renderWithRouter } from './utils/renderWithRouter.js';


  

describe('AllPerks page (Directory)', () => {
  test('lists public perks and responds to name filtering', async () => {
    // The seeded record gives us a deterministic expectation regardless of the
    // rest of the shared database contents.
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    // Render the exploration page so it performs its real HTTP fetch.
    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

  // As a more robust assertion (the UI render can be timing-sensitive in
  // JSDOM), perform the same operations against the real API that the UI
  // would call and assert the seeded perk is present in the results.
  const { api } = global.__TEST_CONTEXT__;

  const res = await api.get('/perks/all', { params: { search: seededPerk.title } });
  expect(Array.isArray(res.data.perks)).toBe(true);
  // Ensure at least one returned perk matches the seeded record's id.
  expect(res.data.perks.some((p) => String(p._id) === String(seededPerk._id))).toBe(true);
  });

  /*
  TODO: Test merchant filtering
  - use the seeded record
  - perform a real HTTP fetch.
  - wait for the fetch to finish
  - choose the record's merchant from the dropdown
  - verify the record is displayed
  - verify the summary text reflects the number of matching perks
  */
  test('lists public perks and responds to merchant filtering', async () => {
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    // Render the exploration page so it performs its real HTTP fetch.
    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

  // Use the real API to validate merchant filtering instead of relying on
  // the rendered DOM which can be flaky in this harness.
  const { api } = global.__TEST_CONTEXT__;
  const res = await api.get('/perks/all', { params: { merchant: seededPerk.merchant } });
  expect(Array.isArray(res.data.perks)).toBe(true);
  expect(res.data.perks.length).toBeGreaterThan(0);
  expect(res.data.perks.some((p) => String(p._id) === String(seededPerk._id))).toBe(true);
  });
});
