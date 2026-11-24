/**
 * Generates a realistic cyclic voltammogram (the "duck"-shaped curve of a
 * reversible redox couple) at build time, for the illustrations.
 * No runtime JavaScript: the curve is baked into the SVG.
 */

export interface CvPoint {
  /** Potential, V */
  e: number;
  /** Current, µA */
  i: number;
}

export interface CvOptions {
  /** Start / end potential of the sweep (V). */
  e1?: number;
  /** Switching potential (V). */
  e2?: number;
  /** Formal potential of the redox couple (V). */
  e0?: number;
  /** Faradaic peak scale (µA). */
  amplitude?: number;
  /** Double-layer (capacitive) current (µA). */
  cdl?: number;
  /** Points per sweep direction. */
  steps?: number;
}

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
const softplus = (x: number) => (x > 30 ? x : Math.log1p(Math.exp(x)));

/** Peak shape: a sigmoidal rise followed by a smooth, diffusion-limited tail. */
function wave(x: number): number {
  const rise = sigmoid(x / 0.025);
  const tail = 1 / Math.sqrt(1 + (softplus((x - 0.02) / 0.02) * 0.02) / 0.05);
  return rise * tail;
}

/** Forward sweep e1 → e2, then reverse sweep e2 → e1 (a closed loop). */
export function cyclicVoltammogram({
  e1 = -0.2,
  e2 = 0.6,
  e0 = 0.21,
  amplitude = 30,
  cdl = 3,
  steps = 120,
}: CvOptions = {}): CvPoint[] {
  const lambda = 0.09;
  const anodic = (e: number) => amplitude * wave(e - e0);
  const cathodic = (e: number) => amplitude * 0.92 * wave(e0 - e);
  // On the way back the anodic current decays while the cathodic wave grows.
  const iSwitch = cdl + anodic(e2);
  const reverse = (e: number) => -cdl + (iSwitch + cdl) * Math.exp(-(e2 - e) / lambda) - cathodic(e);
  // The forward sweep starts where the reverse sweep ends, so the loop closes.
  const iStart = reverse(e1);
  const forward = (e: number) => cdl + (iStart - cdl) * Math.exp(-(e - e1) / lambda) + anodic(e);

  const pts: CvPoint[] = [];
  for (let k = 0; k <= steps; k++) {
    const e = e1 + ((e2 - e1) * k) / steps;
    pts.push({ e, i: forward(e) });
  }
  for (let k = 1; k <= steps; k++) {
    const e = e2 - ((e2 - e1) * k) / steps;
    pts.push({ e, i: reverse(e) });
  }
  return pts;
}

export interface PlotBox {
  /** Left / right / top / bottom of the plot area, in SVG units. */
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  /** Axis ranges. */
  eMin: number;
  eMax: number;
  iMin: number;
  iMax: number;
}

export function scaler(box: PlotBox) {
  const x = (e: number) => box.x0 + ((e - box.eMin) / (box.eMax - box.eMin)) * (box.x1 - box.x0);
  const y = (i: number) => box.y1 - ((i - box.iMin) / (box.iMax - box.iMin)) * (box.y1 - box.y0);
  return { x, y };
}

/** SVG path data for the curve inside `box`. */
export function cvPath(points: CvPoint[], box: PlotBox): string {
  const { x, y } = scaler(box);
  const r = (v: number) => (Math.round(v * 10) / 10).toString();
  return (
    points.map((p, k) => `${k === 0 ? 'M' : 'L'}${r(x(p.e))} ${r(y(p.i))}`).join('') + 'Z'
  );
}

/** Anodic (max current) and cathodic (min current) peaks. */
export function peaks(points: CvPoint[]) {
  let pa = points[0];
  let pc = points[0];
  for (const p of points) {
    if (p.i > pa.i) pa = p;
    if (p.i < pc.i) pc = p;
  }
  return { anodic: pa, cathodic: pc, deltaMv: Math.round((pa.e - pc.e) * 1000) };
}
