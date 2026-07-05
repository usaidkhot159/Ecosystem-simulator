// js/core/simulation.js — requestAnimationFrame loop
var Simulation = (() => {
  let running = false, speed = 1, rafId = null, lastT = 0;

  function _frame(ts) {
    rafId = requestAnimationFrame(_frame);
    if (!running) return;
    if (ts - lastT >= CFG.TICK_MS) {
      lastT = ts;
      for (let s = 0; s < speed; s++) {
        Env.update();
        World.tick();
      }
      const canvas = document.getElementById('eco');
      Scene.draw(canvas.getContext('2d'), World.plants, World.herbs, World.preds);
      UI.update();
    }
  }

  function start() {
    running = true;
    if (rafId) cancelAnimationFrame(rafId);
    lastT = 0;
    rafId = requestAnimationFrame(_frame);
  }

  function pause() {
    running = !running;
  }

  function reset() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    Env.reset(); Stats.reset(); Particles.reset(); World.init();
    setTimeout(() => { start(); }, 50);
  }

  function setSpeed(s) { speed = s; }

  return { start, pause, reset, setSpeed, get running() { return running; } };
})();