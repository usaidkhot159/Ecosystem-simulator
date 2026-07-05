// js/systems/daynight.js — day/night cycle calculations
const DayNight = (() => {
  let _tick = 0;

  const dayPhase  = () => (_tick % CFG.DAY_LEN) / CFG.DAY_LEN;
  const daylight  = () => Math.max(0, Math.sin(dayPhase() * Math.PI));
  const isNight   = () => { const p = dayPhase(); return p < 0.1 || p > 0.9; };
  const dayNum    = () => Math.floor(_tick / CFG.DAY_LEN) + 1;

  function timeLabel() {
    const p = dayPhase();
    if (p < 0.05 || p > 0.95) return '🌑 Midnight';
    if (p < 0.25)              return '🌄 Dawn';
    if (p < 0.75)              return '☀️ Day';
    return '🌆 Dusk';
  }

  function skyBase(weatherKey) {
    const dl = daylight();
    const map = {
      clear:   '#1a2744',
      rain:    '#111827',
      storm:   '#130d1a',
      drought: '#2d1800',
      fog:     '#1c2433',
    };
    return ColorU.lerpC('#06080f', map[weatherKey] ?? '#1a2744', dl * 0.9 + 0.1);
  }

  function tick()  { _tick++; }
  function reset() { _tick = 0; }

  return { tick, reset, dayPhase, daylight, isNight, dayNum, timeLabel, skyBase,
           get tickVal() { return _tick; } };
})();
