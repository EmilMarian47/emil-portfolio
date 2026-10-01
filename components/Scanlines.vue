<template>
  <div class="scanlines-wrapper" :style="{ height: heightStyle }">
    <div class="scanlines" :style="{ height: heightStyle }"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  height: {
    type: String,
    default: null,
  },
})

const heightStyle = computed(() => props.height || '260px')
</script>

<style scoped>
.scanlines-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.scanlines {
  background: url('/AdamBlue.png') center no-repeat;
  background-size: cover;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.scanlines:before,
.scanlines:after {
  content: "";
  display: block;
  position: absolute;
}

/* Scanlines overlay */
.scanlines:after {
  animation: scanlineAnimation 0.166667s linear infinite;
  background: linear-gradient(
      to bottom,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.25) 3px,
      rgba(0, 0, 0, 0.25) 5px
    ),
    linear-gradient(
      to right,
      transparent,
      transparent 1px,
      rgba(0, 0, 0, 0.25) 1px,
      rgba(0, 0, 0, 0.25) 2px
    );
  background-size: 100% 5px, 2px 100%;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}

/* Rolling Bar */
.scanlines:before {
  animation: barAnimation 6s linear 2s infinite backwards;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25) 100%,
      transparent 100%
    )
    no-repeat;
  background-size: 100% 50%;
  height: 200%;
  width: 100%;
}

@keyframes scanlineAnimation {
  0% {
    background-position: 0 -5px;
  }
}

@keyframes barAnimation {
  0% {
    background-position: 0 -100%;
  }
  33.333333%,
  100% {
    background-position: 0 100%;
  }
}
</style>
