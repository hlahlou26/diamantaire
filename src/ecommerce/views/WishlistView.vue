<template>
  <div class="wishlist-page">
    <div class="container">
      <nav class="breadcrumb" style="padding: 20px 0 16px">
        <RouterLink to="/">Accueil</RouterLink><span class="separator">/</span>
        <span class="current">Ma liste de souhaits</span>
      </nav>
      <h1 class="page-title">Ma Liste de Souhaits <span v-if="wishlistStore.totalItems">({{ wishlistStore.totalItems }})</span></h1>

      <div v-if="wishlistStore.items.length" class="products-grid">
        <ProductCard v-for="p in wishlistStore.items" :key="p.id" :product="p" />
      </div>
      <div v-else class="empty-state" style="padding: 80px 24px">
        <div class="empty-state__icon">❤️</div>
        <h2 class="empty-state__title">Votre liste est vide</h2>
        <p class="empty-state__text">Cliquez sur le ❤️ d'un produit pour l'ajouter à vos favoris</p>
        <RouterLink to="/shop" class="btn btn--primary btn--lg">Parcourir la boutique</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '../components/product/ProductCard.vue';
import { useWishlistStore } from '../stores/wishlist.js';
const wishlistStore = useWishlistStore();
</script>

<style scoped>
.wishlist-page { padding-bottom: 64px; }
.page-title { font-family: var(--font-primary); font-size: 1.75rem; font-weight: 800; margin-bottom: 28px; }
.page-title span { color: var(--color-text-muted); font-weight: 500; font-size: 1.25rem; }
</style>
