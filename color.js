// js/utils/color.js — color interpolation helpers
const ColorU = {
  // Interpolate between two hex colours, returns rgb() string
  lerpC(h1, h2, t) {
    const p = s => parseInt(s, 16);
    const r1 = p(h1.slice(1,3)), g1 = p(h1.slice(3,5)), b1 = p(h1.slice(5,7));
    const r2 = p(h2.slice(1,3)), g2 = p(h2.slice(3,5)), b2 = p(h2.slice(5,7));
    return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
  },

  // Inject alpha into an rgb() string → rgba()
  rgba(rgb, a) {
    return rgb.replace('rgb(', 'rgba(').replace(')', `,${a})`);
  },
};
