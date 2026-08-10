// Pure particle-field simulation for the index-page margin background
// ("Margin Field" plan, doc/technical-decisions/2026-08-10-margin-field-canvas.md).
// No DOM/React references by design — components/index/MarginFieldScript.tsx
// owns the canvas, timing (rAF), pointer/scroll sampling, and token reads;
// this module only advances a plain state object given a frame delta and the
// current pointer/scroll input, so it can be unit-tested without jsdom.
//
// 2026-08-10: the original design had a 5-beat IntersectionObserver-driven
// choreography (hero arrivals, a flow-section 4-stage timeline, periodic
// workflow import/export, and a "gather/hold/launch" finale). The finale left
// the field visibly broken after scrolling to the bottom, and the choreography
// added narrative complexity beyond what the background needs. Replaced with
// continuous ambient drift plus a little pointer/scroll reactivity — see the
// ADR's simplification section.

export type Side = 'left' | 'right';

export interface GutterBounds {
  /** Inner edge of the gutter — closest to the content rail. */
  xMin: number;
  /** Outer edge of the gutter — the viewport edge. */
  xMax: number;
  height: number;
}

export interface Particle {
  readonly id: number;
  side: Side;
  x: number;
  y: number;
  vy: number;
  swayPhase: number;
  swaySpeed: number;
}

export interface LinePair {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  alpha: number;
}

export interface FieldState {
  bounds: Record<Side, GutterBounds>;
  particles: Particle[];
  nextId: number;
}

export interface FieldInput {
  /** Viewport-space pointer position (matches the fixed/inset:0 canvas's own
   * coordinate system), or null when the pointer is outside the page. */
  pointerX: number | null;
  pointerY: number | null;
  /** This frame's vertical scroll delta in px, already smoothed by the caller. */
  scrollDeltaPx: number;
}

// --- Tunables ------------------------------------------------------------

/** Ambient drift: slow downward wander — the "resting" state of the document. */
const AMBIENT_SPEED_MIN_PX_S = 3;
const AMBIENT_SPEED_MAX_PX_S = 6;
const AMBIENT_SWAY_SPEED_PX_FRAME = 0.05;

/** Pointer reactivity: a gentle push away from the cursor, felt only within
 * POINTER_RADIUS_PX — "reacts a little," not a repulsion field. */
const POINTER_RADIUS_PX = 90;
const POINTER_STRENGTH_PX_FRAME = 0.6;

/** Scroll reactivity: a small fraction of the frame's scroll delta nudges
 * drift, so the field feels tied to the page without any choreographed
 * response. */
const SCROLL_INFLUENCE = 0.15;

/** Line pairing: same-gutter only, distance-based falloff. */
const LINE_ALPHA = 0.55;
const LINE_THRESHOLD_PX = 92;

/** Particle density: ~1 per 9000 px² of gutter area, clamped per side. */
const DENSITY_DIVISOR = 9000;
const PARTICLES_PER_SIDE_MIN = 10;
const PARTICLES_PER_SIDE_MAX = 32;

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function randRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function ambientVy(): number {
  return randRange(AMBIENT_SPEED_MIN_PX_S, AMBIENT_SPEED_MAX_PX_S) / 60;
}

export function particleCountForGutter(bounds: GutterBounds): number {
  const gutterWidth = bounds.xMax - bounds.xMin;
  const n = Math.round((gutterWidth * bounds.height) / DENSITY_DIVISOR);
  return clamp(n, PARTICLES_PER_SIDE_MIN, PARTICLES_PER_SIDE_MAX);
}

export function createField(bounds: Record<Side, GutterBounds>): FieldState {
  return { bounds, particles: [], nextId: 0 };
}

/** Resize/reflow: reclamp existing particles into the new bounds rather than
 * reseeding — a full reseed on every resize tick would read as a glitch. */
export function setBounds(state: FieldState, side: Side, bounds: GutterBounds): void {
  state.bounds[side] = bounds;
  for (const p of state.particles) {
    if (p.side !== side) continue;
    p.x = clamp(p.x, bounds.xMin, bounds.xMax);
    p.y = clamp(p.y, 0, bounds.height);
  }
}

export function seedAmbient(state: FieldState, side: Side, count?: number): void {
  const bounds = state.bounds[side];
  const n = count ?? particleCountForGutter(bounds);
  for (let i = 0; i < n; i++) {
    const x = randRange(bounds.xMin, bounds.xMax);
    const y = randRange(0, bounds.height);
    state.particles.push({
      id: state.nextId++,
      side,
      x,
      y,
      vy: ambientVy(),
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: randRange(0.15, 0.35) / 60,
    });
  }
}

function stepParticle(bounds: GutterBounds, p: Particle, dt: number, input: FieldInput): void {
  p.swayPhase += p.swaySpeed * dt;
  let dx = Math.sin(p.swayPhase) * AMBIENT_SWAY_SPEED_PX_FRAME * dt;
  let dy = p.vy * dt + input.scrollDeltaPx * SCROLL_INFLUENCE;

  if (input.pointerX !== null && input.pointerY !== null) {
    const pdx = p.x - input.pointerX;
    const pdy = p.y - input.pointerY;
    const distSq = pdx * pdx + pdy * pdy;
    if (distSq < POINTER_RADIUS_PX * POINTER_RADIUS_PX && distSq > 1) {
      const dist = Math.sqrt(distSq);
      const force = (1 - dist / POINTER_RADIUS_PX) * POINTER_STRENGTH_PX_FRAME * dt;
      dx += (pdx / dist) * force;
      dy += (pdy / dist) * force;
    }
  }

  p.x = clamp(p.x + dx, bounds.xMin, bounds.xMax);
  p.y += dy;
  if (p.y > bounds.height) {
    p.y -= bounds.height;
    p.x = randRange(bounds.xMin, bounds.xMax);
  } else if (p.y < 0) {
    p.y += bounds.height;
    p.x = randRange(bounds.xMin, bounds.xMax);
  }
}

/** Advance the whole field by one tick. `dt` is in nominal-60fps frame units
 * (1.0 = 16.667ms, matching the renderer's own `dt = min(now-last,50)/16.667`
 * normalization). */
export function step(state: FieldState, dt: number, input: FieldInput): void {
  for (const p of state.particles) {
    stepParticle(state.bounds[p.side], p, dt, input);
  }
}

/** Same-gutter line pairs only — lines never cross the content rail. */
export function getLines(state: FieldState): LinePair[] {
  const lines: LinePair[] = [];
  const bySide: Record<Side, Particle[]> = { left: [], right: [] };
  for (const p of state.particles) bySide[p.side].push(p);
  const D = LINE_THRESHOLD_PX;
  for (const side of ['left', 'right'] as Side[]) {
    const list = bySide[side];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        const ddx = a.x - b.x;
        const ddy = a.y - b.y;
        const d = Math.sqrt(ddx * ddx + ddy * ddy);
        if (d >= D) continue;
        const alpha = (1 - d / D) * LINE_ALPHA;
        if (alpha <= 0.002) continue;
        lines.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, alpha });
      }
    }
  }
  return lines;
}
