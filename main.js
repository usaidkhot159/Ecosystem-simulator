// js/core/main.js — entry point, bootstraps everything on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  UI.init();
  World.init();
  Simulation.start();
});
