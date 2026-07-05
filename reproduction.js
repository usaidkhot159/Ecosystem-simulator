// js/systems/reproduction.js — reproduction logic shared by animals
const Reproduction = {
  canReproduce(animal) {
    return animal.energy  >= animal.cfg.REPR_THR
        && animal.rTimer  >= animal.cfg.REPR_CD;
  },

  // Deducts cost, resets timer, returns child gene/position data
  spawn(animal) {
    animal.energy -= animal.cfg.REPR_COST;
    animal.rTimer  = 0;
    return {
      genes: GeneticsU.childGenes(animal.g, animal.cfg),
      x:     animal.x + MathU.rnd(-20, 20),
      y:     animal.y + MathU.rnd(-20, 20),
      gen:   animal.gen + 1,
    };
  },
};
