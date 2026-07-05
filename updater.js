// js/ui/updater.js — writes live data into the dashboard DOM
const UIUpdater = {
  update() {
    const { plants, herbs, preds } = World;
    const t  = Stats.tot;
    const hg = Stats.avgGenes(herbs);
    const pg = Stats.avgGenes(preds);

    // Population counts
    document.getElementById('cPlants').textContent = plants.length;
    document.getElementById('cHerbs').textContent  = herbs.length;
    document.getElementById('cPreds').textContent  = preds.length;

    // Environment
    document.getElementById('eDay').textContent     = `Day ${Env.dayNum()}`;
    document.getElementById('eTime').textContent    = Env.timeLabel();
    document.getElementById('eWeather').textContent = Env.wLabel();
    document.getElementById('eDL').textContent      = Math.round(Env.daylight() * 100) + '%';

    // Genetics
    document.getElementById('tHS').textContent  = hg.speed;
    document.getElementById('tPS').textContent  = pg.speed;
    document.getElementById('tHV').textContent  = hg.perc;
    document.getElementById('tPV').textContent  = pg.perc;
    document.getElementById('tHSz').textContent = hg.size;
    document.getElementById('tPSz').textContent = pg.size;
    document.getElementById('tHG').textContent  = Stats.maxGen(herbs);
    document.getElementById('tPG').textContent  = Stats.maxGen(preds);

    // Speed bars
    document.getElementById('bHS').style.cssText = `width:${Math.min(100,(hg.speed/4)*100)}%;background:#facc15`;
    document.getElementById('bPS').style.cssText = `width:${Math.min(100,(pg.speed/4)*100)}%;background:#f87171`;

    // Totals
    document.getElementById('totHB').textContent = t.hb;
    document.getElementById('totHD').textContent = t.hd;
    document.getElementById('totPB').textContent = t.pb;
    document.getElementById('totK').textContent  = t.kills;
  },
};
