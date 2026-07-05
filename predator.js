// js/entities/predator.js — Predator (apex)
var Pred = class Pred extends Animal {
  constructor(x, y, genes, gen) {
    super(CFG.PRED, x, y, genes, gen);
    this.hunt = false;
  }

  update(herbs) {
    if (!this.alive) return null;
    this.hunt = false;

    const target = FoodChain.nearest(this, herbs, this.g.perc);
    if (target) {
      this.hunt = true;
      VecU.steerToward(this, target.x, target.y);
      FoodChain.tryEatHerb(this, target);
    } else {
      this._wander();
    }

    this._baseUpdate();

    if (Reproduction.canReproduce(this)) {
      const d = Reproduction.spawn(this);
      Stats.tot.pb++;
      return new Pred(d.x, d.y, d.genes, d.gen);
    }
    return null;
  }

  draw(ctx) {
    const dl  = Env.daylight();
    const col = this.flash > 0 ? '#ffffff'
              : this.hunt       ? '#dc2626'
              : ColorU.lerpC('#991b1b', '#f87171', dl);

    CanvasU.trail(ctx, this.trail, this.g.size, '248,113,113');

    ctx.save();
    ctx.translate(this.x, this.y);
    const s = this.g.size;

    ctx.beginPath();
    ctx.moveTo(0, -s * 1.3); ctx.lineTo(s, 0);
    ctx.lineTo(0, s * 0.8);  ctx.lineTo(-s, 0);
    ctx.closePath();
    ctx.fillStyle = col;
    ctx.fill();

    const ea = VecU.headingAngle(this);
    ctx.beginPath();
    ctx.arc(Math.cos(ea) * s * 0.5, Math.sin(ea) * s * 0.5, s * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = this.hunt ? '#fef08a' : '#0f172a';
    ctx.fill();

    ctx.strokeStyle = this.hunt ? 'rgba(220,38,38,0.7)' : 'rgba(255,255,255,0.18)';
    ctx.lineWidth   = this.hunt ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(0, -s * 1.3); ctx.lineTo(s, 0);
    ctx.lineTo(0, s * 0.8);  ctx.lineTo(-s, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
    CanvasU.energyBar(ctx, this);
  }
};