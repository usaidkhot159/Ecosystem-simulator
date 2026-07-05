// js/utils/genetics.js — gene mutation helpers
const GeneticsU = {
  mutate(value, delta, lo, hi, rate) {
    if (Math.random() >= rate) return value;
    return MathU.clamp(value + MathU.rnd(-delta, delta), lo, hi);
  },

  childGenes(genes, cfg) {
    return {
      speed: GeneticsU.mutate(genes.speed, CFG.MUT_SPEED, 0.4,  4.0,  cfg.MUT),
      perc:  GeneticsU.mutate(genes.perc,  CFG.MUT_PERC,  30,   250,  cfg.MUT),
      size:  GeneticsU.mutate(genes.size,  CFG.MUT_SIZE,  3,    16,   cfg.MUT),
    };
  },

  defaultGenes(cfg) {
    return { speed: cfg.SPEED, perc: cfg.PERC, size: cfg.SIZE };
  },
};
