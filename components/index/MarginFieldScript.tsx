'use client';

import { useEffect } from 'react';
import {
  createField,
  setBounds,
  seedAmbient,
  step,
  getLines,
  type FieldState,
  type GutterBounds,
  type Side,
} from './marginField';

// Margin Field background (doc/technical-decisions/2026-08-10-margin-field-canvas.md).
// Owns all DOM/timing concerns; marginField.ts is a pure, DOM-free simulation.
//
// Wires the mount gate, canvas lifecycle, DPR/clip handling, and a single
// ambient rAF loop that reacts a little to pointer position and scroll
// velocity. The section-triggered choreography (hero arrivals, a flow-section
// 4-stage timeline, workflow/coming-soon periodic import/export, and a
// gather/hold/launch finale) that used to live here was removed — see the
// ADR's simplification section.

const MOUNT_MIN_VIEWPORT_WIDTH = 1200; // existing breakpoint, app/original.css:1171
const MOUNT_MIN_GUTTER_WIDTH = 128;
const CLIP_PAD = 24; // > the 6px box-shadow bleed past the rail (app/original.css)
const DOT_SIZE = 2;
const RESIZE_DEBOUNCE_MS = 150;
const MAX_FRAME_MS = 50; // clamp for frame-rate independence + tab-resume jumps
const FRAME_MS_60 = 1000 / 60;
const SCROLL_SMOOTHING = 0.15; // low-pass filter so a single wheel tick doesn't jolt the field

export function MarginFieldScript() {
  useEffect(() => {
    const reduceMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkMql = window.matchMedia('(prefers-color-scheme: dark)');

    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let field: FieldState | null = null;
    let rafId: number | null = null;
    let resizeTimer: number | null = null;
    let lastFrameTime = 0;
    let dotColor = '';
    let lineColor = '';
    const navEl = document.querySelector<HTMLDetailsElement>('.nav-menu');
    let navOpen = false;

    let pointerX: number | null = null;
    let pointerY: number | null = null;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      dotColor = cs.getPropertyValue('--text-muted').trim();
      // dark's --border-subtle is near-invisible once line alpha is applied —
      // dark reads --border-primary instead (plan §テーマ・reduced motion・モバイル).
      lineColor = (darkMql.matches ? cs.getPropertyValue('--border-primary') : cs.getPropertyValue('--border-subtle')).trim();
    }

    function getRailRect(): { left: number; right: number } | null {
      const container = document.querySelector('.container');
      if (!container) return null;
      const rect = container.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    }

    // Mount-gate width check only — actual render/simulation sizing always
    // comes from canvas.getBoundingClientRect() (plan: innerWidth includes
    // the scrollbar gutter that a fixed/inset:0 element does not, so using it
    // for anything but the gate stretches the field ~1%).
    function gateOk(): boolean {
      if (reduceMql.matches) return false;
      if (window.innerWidth < MOUNT_MIN_VIEWPORT_WIDTH) return false;
      const rail = getRailRect();
      if (!rail) return false;
      const gutter = (window.innerWidth - (rail.right - rail.left)) / 2;
      return gutter >= MOUNT_MIN_GUTTER_WIDTH;
    }

    function computeBounds(w: number, h: number, rail: { left: number; right: number }): Record<Side, GutterBounds> {
      return {
        left: { xMin: 0, xMax: Math.max(rail.left - CLIP_PAD, 0), height: h },
        right: { xMin: Math.min(rail.right + CLIP_PAD, w), xMax: w, height: h },
      };
    }

    function resizeBackingStore() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function mount() {
      if (canvas) return;
      const rail = getRailRect();
      if (!rail) return;
      canvas = document.createElement('canvas');
      canvas.id = 'margin-field';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
      if (!ctx) {
        canvas.remove();
        canvas = null;
        return;
      }
      readColors();
      resizeBackingStore();
      const rect = canvas.getBoundingClientRect();
      const bounds = computeBounds(rect.width, rect.height, rail);
      field = createField(bounds);
      seedAmbient(field, 'left');
      seedAmbient(field, 'right');
      lastFrameTime = performance.now();
      lastScrollY = window.scrollY;
      scrollVelocity = 0;
      rafId = requestAnimationFrame(tick);
    }

    function teardown() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      if (canvas) canvas.remove();
      canvas = null;
      ctx = null;
      field = null;
    }

    function drawClip(w: number, h: number, railLeft: number, railRight: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.rect(0, 0, Math.max(railLeft - CLIP_PAD, 0), h);
      ctx.rect(Math.min(railRight + CLIP_PAD, w), 0, Math.max(w - railRight - CLIP_PAD, 0), h);
      ctx.clip();
    }

    function tick(now: number) {
      rafId = requestAnimationFrame(tick);
      if (!canvas || !ctx || !field) return;
      const deltaMs = Math.min(now - lastFrameTime, MAX_FRAME_MS);
      const dt = deltaMs / FRAME_MS_60;
      lastFrameTime = now;

      const rawScrollDelta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollVelocity += (rawScrollDelta - scrollVelocity) * SCROLL_SMOOTHING;

      step(field, dt, { pointerX, pointerY, scrollDeltaPx: scrollVelocity });

      const rail = getRailRect();
      if (!rail) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.save();
      drawClip(rect.width, rect.height, rail.left, rail.right);

      ctx.fillStyle = dotColor;
      for (const p of field.particles) {
        ctx.fillRect(p.x | 0, p.y | 0, DOT_SIZE, DOT_SIZE);
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      for (const line of getLines(field)) {
        ctx.globalAlpha = line.alpha;
        ctx.beginPath();
        ctx.moveTo(line.ax, line.ay);
        ctx.lineTo(line.bx, line.by);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function reconcileMount() {
      if (!gateOk()) {
        teardown();
        return;
      }
      if (!canvas || !field) {
        mount();
        return;
      }
      const rail = getRailRect();
      if (!rail) return;
      resizeBackingStore();
      const rect = canvas.getBoundingClientRect();
      const bounds = computeBounds(rect.width, rect.height, rail);
      setBounds(field, 'left', bounds.left);
      setBounds(field, 'right', bounds.right);
    }

    function onResize() {
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(reconcileMount, RESIZE_DEBOUNCE_MS);
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
      } else if (canvas && !navOpen) {
        lastFrameTime = performance.now();
        lastScrollY = window.scrollY;
        scrollVelocity = 0;
        rafId = requestAnimationFrame(tick);
      }
    }

    function onColorSchemeChange() {
      if (canvas) readColors();
    }

    function onReducedMotionChange() {
      reconcileMount();
    }

    // .nav-menu's overlay (::before/::after, app/original.css:349) fully
    // covers the canvas while open — pause the rAF loop rather than pay for
    // frames nobody can see.
    function onNavToggle() {
      if (!navEl) return;
      navOpen = navEl.open;
      if (navOpen) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
      } else if (canvas && !document.hidden) {
        lastFrameTime = performance.now();
        lastScrollY = window.scrollY;
        scrollVelocity = 0;
        rafId = requestAnimationFrame(tick);
      }
    }

    // No @media print rule exists for this canvas (the plan keeps CSS at
    // zero lines) — hide/restore it imperatively instead.
    function onBeforePrint() {
      if (canvas) canvas.style.display = 'none';
    }

    function onAfterPrint() {
      if (canvas) canvas.style.display = '';
    }

    function onPointerMove(e: PointerEvent) {
      pointerX = e.clientX;
      pointerY = e.clientY;
    }

    function onPointerLeave() {
      pointerX = null;
      pointerY = null;
    }

    if (gateOk()) mount();

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    darkMql.addEventListener('change', onColorSchemeChange);
    reduceMql.addEventListener('change', onReducedMotionChange);
    navEl?.addEventListener('toggle', onNavToggle);
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    window.addEventListener('pointermove', onPointerMove);
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);

    return () => {
      teardown();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      darkMql.removeEventListener('change', onColorSchemeChange);
      reduceMql.removeEventListener('change', onReducedMotionChange);
      navEl?.removeEventListener('toggle', onNavToggle);
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
    };
  }, []);

  return null;
}
