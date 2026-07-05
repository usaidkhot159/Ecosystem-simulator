// js/systems/environment.js — facade that combines DayNight + Weather
const Env = {
  update() { DayNight.tick(); Weather.tick(); },
  reset()  { DayNight.reset(); Weather.reset(); },

  daylight:  () => DayNight.daylight(),
  isNight:   () => DayNight.isNight(),
  dayPhase:  () => DayNight.dayPhase(),
  dayNum:    () => DayNight.dayNum(),
  timeLabel: () => DayNight.timeLabel(),
  skyColor:  () => DayNight.skyBase(Weather.current),
  wLabel:    () => Weather.label(),
  particles: () => Weather.particles(),
  plantMod:  () => Weather.plantMod(),
  speedMod:  () => Weather.speedMod(),
  drainMod:  () => Weather.drainMod(),

  get tick()    { return DayNight.tickVal; },
  get weather() { return Weather.current; },
};
