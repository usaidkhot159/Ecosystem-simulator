// js/entities/plant.js — Plant entity
class Plant {
  constructor(x, y) {
    this.x     = x ?? MathU.rnd(10, CFG.W - 10);
    this.y     = y ?? MathU.rnd(10, CFG.H - 10);
    this.size  = MathU.rnd(CFG.PLANT.SMIN, CFG.PLANT.SMAX);
    this.alive = true;
    this.phase = Math.random() * Math.PI * 2;
  }

  update() { this.phase += 0.018; }

  draw(ctx) {
    const dl  = Env.daylight();
    const w   = Env.weather;
    const col = w === 'drought' ? '#a16207'
              : w === 'rain'    ? '#86efac'
              : ColorU.lerpC('#166534', '#4ade80', dl);
    const sx  = Math.sin(this.phase) * 1.4;

    ctx.save();
    ctx.translate(this.x + sx, this.y);

    // Stem
    ctx.beginPath();
    ctx.strokeStyle = ColorU.lerpC('#14532d', '#86efac', dl * 0.5);
    ctx.lineWidth   = 1.5;
    ctx.moveTo(0, 0); ctx.lineTo(0, -this.size * 1.4);
    ctx.stroke();

    // Leaf
    ctx.beginPath();
    ctx.arc(0, -this.size * 1.4, this.size, 0, Math.PI * 2);
    ctx.fillStyle   = col;
    ctx.globalAlpha = 0.82 + dl * 0.18;
    ctx.fill();

    // Highlight
    ctx.beginPath();
    ctx.arc(-this.size * 0.3, -this.size * 1.7, this.size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle   = 'rgba(255,255,255,0.15)';
    ctx.globalAlpha = 1;
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.restore();
  }
}
