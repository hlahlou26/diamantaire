<template>
  <div id="app-root">
    <TheHeader />
    <CartSidebar />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <TheFooter />
    <BackToTop />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';
import CartSidebar from './components/layout/CartSidebar.vue';
import BackToTop from './components/common/BackToTop.vue';
import { useCartStore } from './stores/cart.js';
import { useWishlistStore } from './stores/wishlist.js';

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

onMounted(() => {
  cartStore.loadFromStorage();
  wishlistStore.loadFromStorage();
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
