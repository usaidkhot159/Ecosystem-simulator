// js/render/chart.js — in-canvas population line chart
const Chart = {
  draw(ctx, x, y, w, h) {
    const hist = Stats.hist;
    if (hist.pl.length < 2) return;

    ctx.save();
    CanvasU.panel(ctx, x, y, w, h);

    // Title
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font      = '700 10px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText('POPULATION HISTORY', x + 9, y + 14);

    const pad = { l: 9, r: 9, t: 22, b: 16 };
    const cw  = w - pad.l - pad.r;
    const ch  = h - pad.t - pad.b;
    const mv  = Math.max(1, ...hist.pl, ...hist.he, ...hist.pr);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth   = 1;
    for (let i = 0; i <= 4; i++) {
      const gy = y + pad.t + (ch / 4) * i;
      ctx.beginPath(); ctx.moveTo(x + pad.l, gy); ctx.lineTo(x + pad.l + cw, gy); ctx.stroke();
    }

    // Series
    const series = [
      { d: hist.pl, c: '#4ade80', lb: 'Plants' },
      { d: hist.he, c: '#facc15', lb: 'Prey'   },
      { d: hist.pr, c: '#f87171', lb: 'Pred'   },
    ];
    for (const s of series) {
      if (s.d.length < 2) continue;
      ctx.beginPath(); ctx.strokeStyle = s.c; ctx.lineWidth = 1.5; ctx.lineJoin = 'round';
      s.d.forEach((v, i) => {
        const px = x + pad.l + (i / (s.d.length - 1)) * cw;
        const py = y + pad.t + ch - (v / mv) * ch;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Legend
    let lx = x + pad.l;
    for (const s of series) {
      ctx.fillStyle = s.c; ctx.fillRect(lx, y + h - 13, 7, 5);
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '9px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(s.lb, lx + 9, y + h - 8);
      lx += 50;
    }
    ctx.restore();
  },
};
