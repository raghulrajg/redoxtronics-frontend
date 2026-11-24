/**
 * Generates smooth, nested "equipotential" rings (like the field lines around
 * an electrode) deterministically at build time. Used as a background motif.
 */
type Pt = [number, number];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function closedSpline(points: Pt[]): string {
  const n = points.length;
  const f = (v: number) => String(Math.round(v));
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return `${d}Z`;
}

export interface FieldOptions {
  cx: number;
  cy: number;
  rings?: number;
  base?: number;
  gap?: number;
  seed?: number;
  /** Horizontal stretch. */
  stretch?: number;
  /** How far rings deviate from perfect circles (0 = circles). */
  wobble?: number;
  points?: number;
}

export function fieldRings({
  cx,
  cy,
  rings = 9,
  base = 40,
  gap = 34,
  seed = 7,
  stretch = 1.25,
  wobble = 0.6,
  points = 14,
}: FieldOptions): string[] {
  const rand = mulberry32(seed);
  const ph = Array.from({ length: 3 }, () => rand() * Math.PI * 2);
  const amp = [0.12, 0.07, 0.04].map((a) => a * wobble);
  const paths: string[] = [];
  for (let k = 0; k < rings; k++) {
    const r0 = base + k * gap;
    const pts: Pt[] = [];
    for (let i = 0; i < points; i++) {
      const t = (i / points) * Math.PI * 2;
      const w =
        amp[0] * Math.sin(2 * t + ph[0] + k * 0.3) +
        amp[1] * Math.sin(3 * t + ph[1] - k * 0.22) +
        amp[2] * Math.sin(5 * t + ph[2] + k * 0.4);
      const r = r0 * (1 + w);
      pts.push([cx + Math.cos(t) * r * stretch, cy + Math.sin(t) * r]);
    }
    paths.push(closedSpline(pts));
  }
  return paths;
}
