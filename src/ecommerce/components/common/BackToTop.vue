<template>
  <Transition name="fade">
    <button v-if="visible" class="back-to-top" @click="scrollToTop" title="Retour en haut">
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(false);

function handleScroll() {
  visible.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(232,0,28,0.4);
  z-index: 600;
  transition: all 0.2s ease;
}
.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(232,0,28,0.5);
}
</style>
