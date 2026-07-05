// js/core/config.js — all tuneable simulation constants
const CFG = {
  W: 840,
  H: 560,
  DAY_LEN: 1200,
  WEATHER_INTERVAL: 900,
  TICK_MS: 33,

  PLANT: {
    INIT: 60, MAX: 140,
    RATE: 0.004,
    ENERGY: 40,
    SMIN: 4, SMAX: 10,
  },

  HERB: {
    INIT: 20, MAX: 60,
    SPEED: 1.3,
    E0: 80,   EMAX: 120,
    DRAIN: 0.12,
    EAT: 40,
    REPR_THR: 100, REPR_COST: 50, REPR_CD: 300,
    PERC: 90,
    SIZE: 6,
    MUT: 0.10,
  },

  PRED: {
    INIT: 5, MAX: 20,
    SPEED: 1.9,
    E0: 100,  EMAX: 160,
    DRAIN: 0.18,
    EAT: 70,
    REPR_THR: 130, REPR_COST: 70, REPR_CD: 500,
    PERC: 140,
    SIZE: 9,
    MUT: 0.10,
  },

  MUT_SPEED:  0.30,
  MUT_PERC:  18,
  MUT_SIZE:   1.5,
};
