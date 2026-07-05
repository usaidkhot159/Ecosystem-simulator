// js/utils/vector.js — 2-D vector steering helpers (operates on objects with .vx/.vy)
const VecU = {
  steerToward(entity, tx, ty, force = 0.3) {
    const a = Math.atan2(ty - entity.y, tx - entity.x);
    entity.vx += Math.cos(a) * force;
    entity.vy += Math.sin(a) * force;
  },

  steerAway(entity, tx, ty, force = 0.5) {
    const a = Math.atan2(entity.y - ty, entity.x - tx);
    entity.vx += Math.cos(a) * force;
    entity.vy += Math.sin(a) * force;
  },

  capSpeed(entity, maxSpd) {
    const mag = Math.hypot(entity.vx, entity.vy);
    if (mag > maxSpd) {
      entity.vx = (entity.vx / mag) * maxSpd;
      entity.vy = (entity.vy / mag) * maxSpd;
    }
    entity.vx *= 0.92;
    entity.vy *= 0.92;
  },

  applyAndBounce(entity) {
    entity.x = MathU.clamp(entity.x + entity.vx, 5, CFG.W - 5);
    entity.y = MathU.clamp(entity.y + entity.vy, 5, CFG.H - 5);
    if (entity.x <= 5 || entity.x >= CFG.W - 5) entity.vx *= -1;
    if (entity.y <= 5 || entity.y >= CFG.H - 5) entity.vy *= -1;
  },

  headingAngle(entity) {
    return Math.atan2(entity.vy, entity.vx);
  },
};
