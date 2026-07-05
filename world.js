// js/core/world.js — entity pools, spawning, and per-tick lifecycle
var World = (() => {
  let plants = [], herbs = [], preds = [];

  function init() {
    plants = []; herbs = []; preds = [];
    for (let i = 0; i < CFG.PLANT.INIT; i++) plants.push(new Plant());
    for (let i = 0; i < CFG.HERB.INIT;  i++) herbs.push(new Herb());
    for (let i = 0; i < CFG.PRED.INIT;  i++) preds.push(new Pred());
  }

  function tick() {
    // Plants — grow faster in rain, daylight helps too
    const gm = Env.plantMod() * (Env.daylight() * 0.6 + 0.4);
    if (plants.length < CFG.PLANT.MAX && Math.random() < CFG.PLANT.RATE * gm)
      plants.push(new Plant());
    plants.forEach(p => p.update());
    plants = plants.filter(p => p.alive);

    // Herbivores
    const newH = [];
    herbs.forEach(h => { const c = h.update(plants, preds); if (c) newH.push(c); });
    const dh = herbs.filter(h => !h.alive).length;
    Stats.tot.hd += dh;
    herbs = herbs.filter(h => h.alive);
    if (herbs.length < CFG.HERB.MAX) herbs.push(...newH);

    // Predators
    const newP = [];
    preds.forEach(p => { const c = p.update(herbs); if (c) newP.push(c); });
    preds = preds.filter(p => p.alive);
    if (preds.length < CFG.PRED.MAX) preds.push(...newP);

    // Particles
    Particles.update(Env.particles());

    // Stats snapshot every 20 ticks
    if (Env.tick % 20 === 0) Stats.record(plants, herbs, preds);
  }

  // Manual spawn buttons
  function addPlant(n = 8) { for (let i = 0; i < n && plants.length < CFG.PLANT.MAX; i++) plants.push(new Plant()); }
  function addHerb()  { if (herbs.length  < CFG.HERB.MAX)  herbs.push(new Herb()); }
  function addPred()  { if (preds.length  < CFG.PRED.MAX)  preds.push(new Pred()); }

  return {
    init, tick, addPlant, addHerb, addPred,
    get plants() { return plants; },
    get herbs()  { return herbs;  },
    get preds()  { return preds;  },
  };
})();