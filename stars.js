// js/render/stars.js — static star field, twinkle at night
const Stars = (() => {
  const pool = Array.from({ length: 90 }, () => ({
    x:  Math.random() * 840,
    y:  Math.random() * 560,
    r:  Math.random() * 1.2 + 0.3,
    tw: Math.random() * Math.PI * 2,
  }));

  function draw(ctx) {
    const night = 1 - Env.daylight();
    if (night < 0.05) return;
    ctx.save();
    for (const s of pool) {
      s.tw += 0.04;
      const a = night * (0.5 + 0.5 * Math.sin(s.tw)) * 0.75;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    }
    ctx.restore();
  }

  return { draw };
})();
