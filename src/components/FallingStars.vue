<template>
  <div class="styled-canvas" ref="canvasRef">
    <div v-for="(star, index) in stars" :key="index" class="star" :style="starStyle(star)"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Star } from '@/types'


export default {
  setup() {
    const canvasRef = ref<HTMLDivElement | null>(null);
    const stars = ref<Star[]>([]);
    const maxStars = 80;

    const initializeCanvas = () => {
      const canvas = canvasRef.value;

      if (!canvas) return;

      stars.value = [];
      for (let i = 0; i < maxStars; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let size = Math.random() * 1.25;
        let speed = Math.random() * 0.15;
        stars.value.push({ x, y, size, speed });
      }

      update();
    };

    const update = () => {
      for (let i = 0; i < maxStars; i++) {
        let star = stars.value[i];
        star.y += star.speed;

        if (star.y > window.innerHeight) {
          star.x = Math.random() * window.innerWidth;
          star.y = 0;
        }
      }

      requestAnimationFrame(update);
    };

    const starStyle = (star: Star) => {
      return {
        left: star.x + "px",
        top: star.y + "px",
        width: star.size + "px",
        height: star.size + "px",
      };
    };

    onMounted(() => {
      initializeCanvas();
      update();
    });

    watch(canvasRef, () => {
      initializeCanvas();
    });

    return { canvasRef, stars, starStyle };
  },
};
</script>

<style scoped lang="scss">
.styled-canvas {
  position: fixed;
  top: 0;
  z-index: -1;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0b0b1f;

  .star {
    position: absolute;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
  }
}
</style>
