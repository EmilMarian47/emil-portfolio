<template>
  <div class="crt">
    <!-- CRT screen -->
    <div class="crt-output">
      <slot />
    </div>

    <!-- Scanlines -->
    <div class="crt-scanlines"></div>

    <!-- Green screen glow -->
    <div class="crt-glow"></div>

    <!-- Screen frame -->
    <div class="crt-frame"></div>

    <!-- Noise -->
    <div class="crt-noise"></div>
  </div>
</template>

<style scoped>
.crt {
  --console-color: #14fdce;
  --console-bg: #031e11;

  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  background: var(--console-bg);
  color: var(--console-color);

  font-family: 'Space mono', monospace;

  -webkit-font-smoothing: none;
}

/* Main screen */
.crt-output {
  position: relative;
  width: 100%;
  height: 100%;

  overflow: hidden;

  background: var(--console-bg);

  text-shadow:
    0 0.2rem 1rem rgba(20, 253, 206, 0.35);

  animation: crt-output 10ms infinite;
}

/* Scanlines */
.crt-scanlines {
  position: absolute;
  inset: 0;

  pointer-events: none;

  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.2) 70%,
    rgba(0, 0, 0, 0.6) 100%
  );

  background-size: 100% 0.3rem;

  z-index: 5;
}

/* Green glow */
.crt-glow {
  position: absolute;
  inset: 0;

  pointer-events: none;

  background:
    radial-gradient(
      circle at center,
      rgba(27, 212, 89, 1) 0%,
      rgba(27, 212, 89, 0.88) 58%,
      rgba(21, 235, 92, 0.57) 80%,
      rgba(19, 94, 29, 0.27) 93%,
      rgba(10, 23, 12, 0) 100%
    );

  opacity: 0.15;

  z-index: 4;

  animation: crt-glow 60s infinite;
}

/* CRT glass / bevel */
.crt-frame {
  position: absolute;
  top: 2%;
  left: 2%;

  width: 96%;
  height: 96%;

  border: 1rem solid;

  border-top-color: #020202;
  border-right-color: #080808;
  border-bottom-color: #121212;
  border-left-color: #080808;

  border-radius: 2rem;

  box-shadow:
    inset 0 0 18rem black,
    inset 0 0 3rem black,
    0 0 10rem black;

  pointer-events: none;

  z-index: 6;
}

/* Noise layer */
.crt-noise {
  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: 0.12;

  background-image:
    repeating-radial-gradient(
      circle at 0 0,
      rgba(255, 255, 255, 0.12) 0,
      rgba(255, 255, 255, 0.12) 1px,
      transparent 1px,
      transparent 3px
    );

  background-size: 4px 4px;

  mix-blend-mode: screen;

  z-index: 7;
}

/* Tiny CRT flicker */
@keyframes crt-output {
  0% {
    opacity: 0.9;
  }

  50% {
    opacity: 1;
  }
}

/* Slow glow animation */
@keyframes crt-glow {
  0% {
    opacity: 0.1;
  }

  50% {
    opacity: 0.2;
  }
}

/* Selection */
.crt ::selection {
  background: var(--console-color);
  color: var(--console-bg);
}
</style>