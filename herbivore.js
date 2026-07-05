// js/entities/herbivore.js — Herbivore (prey)
var Herb = class Herb extends Animal {
  constructor(x, y, genes, gen) {
    super(CFG.HERB, x, y, genes, gen);
    this.flee = false;
  }

  update(plants, preds) {
    if (!this.alive) return null;
    this.flee = false;

    // 1. Flee nearest predator
    const threat = FoodChain.nearest(this, preds, this.g.perc);
    if (threat) {
      this.flee = true;
      VecU.steerAway(this, threat.x, threat.y);
    } else {
      // 2. Seek nearest plant
      const plant = FoodChain.nearest(this, plants, this.g.perc);
      if (plant) {
        VecU.steerToward(this, plant.x, plant.y);
        FoodChain.tryEatPlant(this, plant);
      } else {
        this._wander();
      }
    }

    this._baseUpdate();

    if (Reproduction.canReproduce(this)) {
      const d = Reproduction.spawn(this);
      Stats.tot.hb++;
      return new Herb(d.x, d.y, d.genes, d.gen);
    }
    return null;
  }

  draw(ctx) {
    const dl  = Env.daylight();
    const col = this.flash > 0  ? '#ffffff'
              : this.flee        ? '#fb923c'
              : ColorU.lerpC('#ca8a04', '#facc15', dl);

    CanvasU.trail(ctx, this.trail, this.g.size, '250,204,21');

    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.beginPath();
    ctx.arc(0, 0, this.g.size, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();

    const ea = VecU.headingAngle(this);
    ctx.beginPath();
    ctx.arc(Math.cos(ea) * this.g.size * 0.5, Math.sin(ea) * this.g.size * 0.5,
            this.g.size * 0.24, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    ctx.strokeStyle = this.flee ? '#f97316' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.arc(0, 0, this.g.size, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
    CanvasU.energyBar(ctx, this);
  }
};