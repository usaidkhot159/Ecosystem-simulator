// js/systems/particles.js — rain, storm, fog weather particles
const Particles = (() => {
  let drops = [], fog = [];

  function reset() { drops = []; fog = []; }

  function _spawnDrop(storm) {
    drops.push({
      x:   MathU.rnd(0, CFG.W),
      y:   MathU.rnd(-20, 0),
      len: MathU.rnd(storm ? 14 : 7, storm ? 28 : 16),
      spd: MathU.rnd(storm ? 13 : 6, storm ? 21 : 12),
      a:   MathU.rnd(0.25, 0.65),
    });
  }

  function _spawnFog() {
    fog.push({
      x:  MathU.rnd(-60, CFG.W + 60),
      y:  MathU.rnd(0, CFG.H),
      r:  MathU.rnd(60, 130),
      vx: MathU.rnd(0.2, 0.5),
      a:  MathU.rnd(0.04, 0.11),
    });
  }

  function update(info) {
    if (!info) { drops = []; fog = []; return; }
    if (info.type === 'fog') {
      drops = [];
      while (fog.length < info.n) _spawnFog();
      fog.forEach(b => b.x += b.vx);
      fog = fog.filter(b => b.x < CFG.W + 90);
    } else {
      fog = [];
      const st = info.type === 'storm';
      while (drops.length < info.n) _spawnDrop(st);
      drops.forEach(d => { d.y += d.spd; d.x += st ? 3 : 0.5; });
      drops = drops.filter(d => d.y < CFG.H + 40);
    }
  }

  let ltimer = 0;

  function draw(ctx, info) {
    if (!info) return;
    ctx.save();
    if (info.type === 'fog') {
      for (const b of fog) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(148,163,184,${b.a})`);
        g.addColorStop(1, 'rgba(148,163,184,0)');
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }
    } else {
      const st = info.type === 'storm';
      ctx.strokeStyle = info.col; ctx.lineWidth = st ? 1.5 : 1;
      for (const d of drops) {
        ctx.globalAlpha = d.a;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + (st ? 4 : 1), d.y + d.len);
        ctx.stroke();
      }
      ltimer++;
      if (st && ltimer % 180 < 3) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(200,220,255,0.07)';
        ctx.fillRect(0, 0, CFG.W, CFG.H);
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  return { update, draw, reset };
})();
