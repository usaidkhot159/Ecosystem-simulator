// js/systems/weather.js — weather state machine
const Weather = (() => {
  let current = 'clear', next = 'clear', blend = 1, wTick = 0;

  const WEIGHTS = { clear: 0.40, rain: 0.25, storm: 0.10, drought: 0.15, fog: 0.10 };
  const ICONS   = { clear: '☀️', rain: '🌧️', storm: '⛈️', drought: '🔥', fog: '🌫️' };

  function pick() {
    let r = Math.random(), acc = 0;
    for (const [w, v] of Object.entries(WEIGHTS)) { acc += v; if (r < acc) return w; }
    return 'clear';
  }

  function tick() {
    wTick++;
    if (blend < 1) { blend = Math.min(1, blend + 0.005); if (blend >= 1) current = next; }
    if (wTick >= CFG.WEATHER_INTERVAL) {
      wTick = 0;
      const c = pick();
      if (c !== current) { next = c; blend = 0; }
    }
  }

  function reset() { current = 'clear'; next = 'clear'; blend = 1; wTick = 0; }

  const label      = () => `${ICONS[current]} ${current[0].toUpperCase() + current.slice(1)}`;
  const plantMod   = () => ({ clear: 1, rain: 2.5, storm: 0.5, drought: 0.15, fog: 0.8  }[current] ?? 1);
  const speedMod   = () => ({ storm: 0.6, fog: 0.75, rain: 0.85 }[current] ?? 1);
  const drainMod   = () => ({ storm: 1.4, drought: 1.3 }[current] ?? 1);

  function particles() {
    if (current === 'rain')  return { type: 'rain',  n: 60,  col: '#60a5fa' };
    if (current === 'storm') return { type: 'storm', n: 110, col: '#93c5fd' };
    if (current === 'fog')   return { type: 'fog',   n: 18,  col: '#94a3b8' };
    return null;
  }

  return { tick, reset, label, plantMod, speedMod, drainMod, particles,
           get current() { return current; } };
})();
