// js/entities/animal.js — base Animal class
var Animal = class Animal {
  constructor(cfg, x, y, genes, gen) {
    this.cfg    = cfg;
    this.x      = x  ?? MathU.rnd(20, CFG.W - 20);
    this.y      = y  ?? MathU.rnd(20, CFG.H - 20);
    this.g      = genes ?? GeneticsU.defaultGenes(cfg);
    this.energy = cfg.E0;
    this.alive  = true;
    this.age    = 0;
    this.rTimer = MathU.ri(0, cfg.REPR_CD);
    this.gen    = gen ?? 0;
    this.flash  = 0;
    this.vx     = MathU.rnd(-1, 1);
    this.vy     = MathU.rnd(-1, 1);
    this.tx     = null;
    this.ty     = null;
    this.trail  = [];
  }

  _wander() {
    if (!this.tx || MathU.dist(this, { x: this.tx, y: this.ty }) < 15) {
      const p = MathU.rPos(); this.tx = p.x; this.ty = p.y;
    }
    VecU.steerToward(this, this.tx, this.ty);
  }

  _baseUpdate() {
    this.age++;
    this.rTimer++;
    this.flash = Math.max(0, this.flash - 1);
    this.energy -= this.cfg.DRAIN * Env.drainMod() * (this.g.size / this.cfg.SIZE);
    if (this.energy <= 0) { this.alive = false; return; }
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 7) this.trail.shift();
    VecU.capSpeed(this, this.g.speed * Env.speedMod());
    VecU.applyAndBounce(this);
  }
};