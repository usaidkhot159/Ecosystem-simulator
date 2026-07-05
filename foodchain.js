// js/systems/foodchain.js — eating interactions between entity layers
const FoodChain = {
  // Returns nearest alive target within range, or null
  nearest(seeker, targets, range) {
    let best = null, bestD = range;
    for (const t of targets) {
      if (!t.alive) continue;
      const d = MathU.dist(seeker, t);
      if (d < bestD) { bestD = d; best = t; }
    }
    return best;
  },

  // Herbivore tries to eat a plant; returns true if eaten
  tryEatPlant(herb, plant) {
    if (MathU.dist(herb, plant) < herb.g.size + plant.size) {
      plant.alive  = false;
      herb.energy  = Math.min(herb.cfg.EMAX, herb.energy + herb.cfg.EAT);
      herb.flash   = 8;
      return true;
    }
    return false;
  },

  // Predator tries to eat a herbivore; returns true if eaten
  tryEatHerb(pred, herb) {
    if (MathU.dist(pred, herb) < pred.g.size + herb.g.size - 2) {
      herb.alive  = false;
      pred.energy = Math.min(pred.cfg.EMAX, pred.energy + pred.cfg.EAT);
      pred.flash  = 10;
      Stats.tot.kills++;
      return true;
    }
    return false;
  },
};
