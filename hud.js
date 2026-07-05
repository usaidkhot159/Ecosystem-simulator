// js/render/hud.js — HUD: day arc, time label, weather label
const HUD = {
  draw(ctx) {
    const phase = Env.dayPhase();
    const dl    = Env.daylight();
    const cx    = CFG.W / 2, cy = 26, R = 17;

    ctx.save();

    // Background arc
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth   = 3;
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + phase * Math.PI * 2);
    ctx.strokeStyle = phase < 0.5 ? '#facc15' : '#60a5fa';
    ctx.lineWidth   = 3;
    ctx.stroke();

    // Sun / Moon icon
    ctx.font      = '14px serif';
    ctx.textAlign = 'center';
    ctx.fillText(dl > 0.3 ? '☀️' : '🌙', cx, cy + 5);

    // Day number
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font      = '700 10px system-ui';
    ctx.fillText(`DAY ${Env.dayNum()}`, cx, cy + 25);

    // Top-right labels
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font      = '11px system-ui';
    ctx.fillText(Env.timeLabel(), CFG.W - 9, 18);
    ctx.fillText(Env.wLabel(),    CFG.W - 9, 33);

    ctx.restore();
  },
};
