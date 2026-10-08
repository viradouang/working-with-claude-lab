const { loadApp } = require('./setup/loadApp');

describe('theme toggle (TODO-231)', () => {
  beforeEach(() => { localStorage.clear(); });

  // AC-4: dark by default when nothing is stored
  test('applies dark theme by default when localStorage is empty', async () => {
    const { document } = await loadApp();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  // AC-1: toggle button exists in the header
  test('renders the theme-toggle button in the header', async () => {
    const { document } = await loadApp();
    const btn = document.getElementById('theme-toggle');
    expect(btn).not.toBeNull();
    expect(document.getElementById('app-header').contains(btn)).toBe(true);
  });

  // AC-1: clicking toggles from dark to light
  test('clicking the toggle switches from dark to light', async () => {
    const { document } = await loadApp();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    document.getElementById('theme-toggle').click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  // AC-1: clicking again switches back to dark
  test('clicking the toggle twice returns to dark', async () => {
    const { document } = await loadApp();
    const btn = document.getElementById('theme-toggle');
    btn.click();
    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  // AC-2: theme is applied via data-theme on <html>, not inline styles
  test('theme is set as a data-theme attribute on the html element', async () => {
    const { document } = await loadApp();
    document.getElementById('theme-toggle').click();
    expect(document.documentElement.hasAttribute('data-theme')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  // AC-3: preference is restored from localStorage on load
  test('restores light theme from localStorage on load', async () => {
    localStorage.setItem('ops-theme', 'light');
    const { document } = await loadApp();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  // AC-3: dark stored value is honoured
  test('restores dark theme from localStorage on load', async () => {
    localStorage.setItem('ops-theme', 'dark');
    const { document } = await loadApp();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  // AC-3: toggling persists the new value to localStorage
  test('persists the toggled theme to localStorage', async () => {
    const { document } = await loadApp();
    document.getElementById('theme-toggle').click();
    expect(localStorage.getItem('ops-theme')).toBe('light');
  });

  // button label reflects the theme you will get on next click
  test('button label shows "Light" (next action) when dark is active', async () => {
    const { document } = await loadApp();
    expect(document.getElementById('theme-toggle').textContent).toMatch(/light/i);
  });

  test('button label shows "Dark" (next action) when light is active', async () => {
    const { document } = await loadApp();
    document.getElementById('theme-toggle').click();
    expect(document.getElementById('theme-toggle').textContent).toMatch(/dark/i);
  });
});
