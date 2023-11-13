<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/header.vue'
import FallingStars from '@/components/FallingStars.vue'
</script>

<template>
  <Header />  
  <RouterView />
  <FallingStars />
</template>

<style lang="scss" scoped>

</style>
