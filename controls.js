// js/ui/controls.js — button and speed-selector event bindings
const Controls = {
  init() {
    document.getElementById('btnPause').addEventListener('click', () => {
      Simulation.pause();
      document.getElementById('btnPause').textContent =
        Simulation.running ? '⏸ Pause' : '▶ Resume';
    });

    document.getElementById('btnReset').addEventListener('click', () => {
      document.getElementById('btnPause').textContent = '⏸ Pause';
      Simulation.reset();
    });

    document.getElementById('btnPlant').addEventListener('click', () => World.addPlant(8));
    document.getElementById('btnHerb').addEventListener('click',  () => World.addHerb());
    document.getElementById('btnPred').addEventListener('click',  () => World.addPred());

    document.querySelectorAll('.spd').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.spd').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        Simulation.setSpeed(parseInt(btn.dataset.s));
      });
    });
  },
};
