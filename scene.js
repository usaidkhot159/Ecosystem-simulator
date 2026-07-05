// js/render/scene.js — composes a full frame onto the canvas
const Scene = {
  draw(ctx, plants, herbs, preds) {
    const W = CFG.W, H = CFG.H;

    // Sky
    ctx.fillStyle = Env.skyColor();
    ctx.fillRect(0, 0, W, H);

    // Stars (visible at night)
    Stars.draw(ctx);

    // Weather particles
    Particles.draw(ctx, Env.particles());

    // Entities — back to front
    plants.forEach(p => p.draw(ctx));
    herbs.forEach(h  => h.draw(ctx));
    preds.forEach(p  => p.draw(ctx));

    // Overlays
    Chart.draw(ctx, 8, H - 112, 215, 104);
    HUD.draw(ctx);
  },
};
