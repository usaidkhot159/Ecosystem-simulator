// js/utils/math.js — pure math helpers
const MathU = {
  rnd:   (a, b) => Math.random() * (b - a) + a,
  ri:    (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
  clamp: (v, lo, hi) => Math.max(lo, Math.min(hi, v)),
  dist:  (a, b) => Math.hypot(a.x - b.x, a.y - b.y),
  rPos:  (m = 20) => ({ x: MathU.rnd(m, CFG.W - m), y: MathU.rnd(m, CFG.H - m) }),
};
