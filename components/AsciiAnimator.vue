<template>
  <div class="app" :data-theme="theme" :data-crt="crtMode">
    <div class="terminal">
      <pre ref="screen" aria-label="Animated ASCII art" role="img"></pre>
      <div class="glass"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  theme: { type: String, default: 'ice' },
  crt: { type: Boolean, default: true }
})

const screen = ref(null)
const crtMode = computed(() => (props.crt ? 'on' : 'off'))

let running = false
let t = 0
let cols = 138 // <-- [CUSTOMIZE] Initial horizontal character width resolution
let rows = 38  // <-- [CUSTOMIZE] Initial vertical row count resolution
let speed = 1.0 // <-- [CUSTOMIZE] Global animation speed multiplier
let rafId = 0

// <-- [CUSTOMIZE] Character gradient ramp from darkest/sparse to brightest/dense
const CHARS = " .`^,:;Il!i><~+_-?][}{1)(|\\/*tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
const N = CHARS.length - 1
const clamp01 = (x) => Math.max(0, Math.min(1, x))

function sample(x, y, tt) {
  const nx = (x - cols / 2) / (cols / 2)
  const ny = (y - rows / 2) / (rows / 2)
  const r = Math.hypot(nx, ny)

  // <-- [CUSTOMIZE] Adjust wave frequencies, multipliers, and time factors to change math patterns
  const swirl = Math.sin(10 * (nx * Math.cos(tt * 0.7) + ny * Math.sin(tt * 0.7)) + tt * 0.9)
  const lattice = Math.cos(8.0 * nx + Math.sin(tt * 0.6) * 3.0) + Math.sin(8.0 * ny + Math.cos(tt * 0.5) * 3.0)
  const ripple = Math.sin(12.0 * r - tt * 1.6)

  // <-- [CUSTOMIZE] Blend weights for swirl, lattice, and ripple components
  let val = 0.50 * swirl + 0.35 * lattice + 0.65 * ripple
  val *= Math.exp(-r * 0.6) // <-- [CUSTOMIZE] Edge fade-out intensity multiplier

  return clamp01(0.5 + val * 0.33)
}

function renderFrame(time) {
  if (!screen.value) return
  const lines = new Array(rows)
  for (let y = 0; y < rows; y++) {
    let row = ""
    for (let x = 0; x < cols; x++) {
      const v = sample(x, y, time)
      const idx = (v * N) | 0
      row += CHARS[idx]
    }
    lines[y] = row
  }
  screen.value.textContent = lines.join("\n")
}

let last = performance.now()
function tick(now = performance.now()) {
  const dt = Math.min(64, now - last)
  last = now
  t += (dt / 1000) * speed * 1.0 // <-- [CUSTOMIZE] Time progression speed scaler
  renderFrame(t)
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  
  renderFrame(t)
  if (!prefersReduced) {
    running = true
    tick()
  }

  if (screen.value) {
    const observer = new ResizeObserver(() => {
      const lh = parseFloat(getComputedStyle(screen.value).lineHeight || "14")
      const innerH = screen.value.clientHeight || 400
      const targetRows = Math.max(24, Math.min(72, Math.floor(innerH / lh)))
      if (targetRows !== rows) {
        rows = targetRows
        renderFrame(t)
      }
    })
    observer.observe(screen.value)
  }
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* Load local font exclusively from assets (update filename/path to match your assets folder structure) */
@font-face {
  font-family: 'DosFont';
  src: url('@/assets/fonts/Perfect DOS VGA 437.ttf') format('ttf');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.app {
  --bg: #000;
  --fg: #00f400;
  --glow: #00ffa0;
  --accent: #1f1f1f;
  --border: #2e2e2e;
  
  display: grid;
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: 'DosFont', monospace;
  background: #0a0a0a;
  color: var(--fg);
}

.terminal {
  position: relative;
  background: var(--bg);
  border: none;
  border-radius: 0;
  overflow: hidden;
  width: 100%;
}

.terminal pre {
  margin: 0;
  padding: 0;
  color: var(--fg);
  background: var(--bg);
  font-family: 'DosFont', monospace;
  font-size: 13.5px;
  line-height: 1.05;
  white-space: pre;
  text-shadow: 
    0 0 6px color-mix(in oklab, var(--glow) 40%, transparent 60%), 
    0 0 18px color-mix(in oklab, var(--glow) 20%, transparent 80%);
  user-select: none;
  animation: crt-flicker 3.6s infinite steps(60) alternate;
}

.terminal .glass {
  pointer-events: none;
  position: absolute; 
  inset: 0;
  mix-blend-mode: screen;
  opacity: .55;
  background: 
    repeating-linear-gradient(
      to bottom, 
      rgba(255,255,255,.06), rgba(255,255,255,.06) 1px, 
      rgba(0,0,0,0) 2px, rgba(0,0,0,0) 3px
    ),
    radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,.55) 100%);
}

.app[data-crt="off"] .terminal pre {
  animation: none;
}
.app[data-crt="off"] .terminal .glass {
  display: none;
}

.app[data-theme="green"] { --bg:#000; --fg:#00f400; --glow:#00ffa0; --accent:#101010; --border:#2c2c2c; }
.app[data-theme="amber"] { --bg:#050301; --fg:#ffb000; --glow:#ffc86a; --accent:#1a1207; --border:#3a2a10; }
.app[data-theme="purple"] { --bg:#111111; --fg:#a800ff; --glow:#ef00fe; --accent:#181018; --border:#2c1730; }
.app[data-theme="ice"] { --bg:#111111; --fg:#f5f5f5; --glow:#8ff1ff; --accent:#07181c; --border:#12323a; }

@keyframes crt-flicker {
  0%   { filter: none; }
  2%   { filter: brightness(1.02) saturate(1.1); }
  3%   { filter: brightness(0.98) saturate(0.95); }
  10%  { filter: brightness(1.03); }
  13%  { filter: brightness(0.99); }
  20%  { filter: brightness(1.04) contrast(1.02); }
  22%  { filter: brightness(0.97) contrast(0.99); }
  100% { filter: none; }
}

@media (max-width: 640px) {
  .terminal pre { font-size: 12px; }
}
</style>