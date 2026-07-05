// js/utils/canvas.js — reusable canvas drawing primitives
const CanvasU = {
  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y,     x + w, y + r,     r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h,     x, y + h - r,     r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y,         x + r, y,          r);
    ctx.closePath();
  },

  panel(ctx, x, y, w, h, r = 8) {
    CanvasU.roundRect(ctx, x, y, w, h, r);
    ctx.fillStyle   = 'rgba(0,0,0,0.52)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth   = 1;
    ctx.stroke();
  },

  energyBar(ctx, entity) {
    const bw  = entity.g.size * 2.4;
    const bh  = 3;
    const bx  = entity.x - bw / 2;
    const by  = entity.y - entity.g.size - 7;
    const pct = MathU.clamp(entity.energy / entity.cfg.EMAX, 0, 1);

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = pct > 0.5 ? '#4ade80' : pct > 0.25 ? '#facc15' : '#f87171';
    ctx.fillRect(bx, by, bw * pct, bh);
    ctx.restore();
  },

  trail(ctx, trailArr, size, rgb) {
    ctx.save();
    for (let i = 1; i < trailArr.length; i++) {
      const a = (i / trailArr.length) * 0.22;
      ctx.beginPath();
      ctx.arc(trailArr[i].x, trailArr[i].y, size * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${a})`;
      ctx.fill();
    }
    ctx.restore();
  },
};
