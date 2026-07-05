// js/systems/stats.js — population history + lifetime totals
const Stats = (() => {
  const MAX = 200;
  let hist = { pl: [], he: [], pr: [] };
  let tot  = { hb: 0, hd: 0, pb: 0, kills: 0 };

  function record(pl, he, pr) {
    hist.pl.push(pl.length);
    hist.he.push(he.length);
    hist.pr.push(pr.length);
    if (hist.pl.length > MAX) { hist.pl.shift(); hist.he.shift(); hist.pr.shift(); }
  }

  function avgGenes(arr) {
    if (!arr.length) return { speed: 0, perc: 0, size: 0 };
    const s = arr.reduce((a, b) => ({
      speed: a.speed + b.g.speed,
      perc:  a.perc  + b.g.perc,
      size:  a.size  + b.g.size,
    }), { speed: 0, perc: 0, size: 0 });
    const n = arr.length;
    return {
      speed: +(s.speed / n).toFixed(2),
      perc:  +(s.perc  / n).toFixed(0),
      size:  +(s.size  / n).toFixed(1),
    };
  }

  function maxGen(arr) { return arr.length ? Math.max(...arr.map(a => a.gen)) : 0; }

  function reset() {
    hist = { pl: [], he: [], pr: [] };
    tot  = { hb: 0, hd: 0, pb: 0, kills: 0 };
  }

  return { record, avgGenes, maxGen, reset,
           get hist() { return hist; },
           get tot()  { return tot;  } };
})();
