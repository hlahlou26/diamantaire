<template>
  <div class="category-page" v-if="category">
    <!-- Banner -->
    <div class="category-banner" :style="{ background: bannerBg }">
      <div class="container">
        <nav class="breadcrumb">
          <RouterLink to="/">Accueil</RouterLink>
          <span class="separator">/</span>
          <span class="current">{{ category.name }}</span>
        </nav>
        <div class="category-banner__content">
          <span class="category-banner__icon">{{ category.icon }}</span>
          <div>
            <h1 class="category-banner__title">{{ category.name }}</h1>
            <p class="category-banner__desc">{{ category.description }}</p>
            <p class="category-banner__count">{{ store.filteredProducts.length }} produits disponibles</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Subcategories -->
    <div v-if="category.subcategories?.length" class="subcategories-bar">
      <div class="container">
        <div class="subcategories-row">
          <button
            class="subcategory-chip"
            :class="{ active: !activeSubcat }"
            @click="activeSubcat = null"
          >Tous</button>
          <button
            v-for="sub in category.subcategories"
            :key="sub"
            class="subcategory-chip"
            :class="{ active: activeSubcat === sub }"
            @click="activeSubcat = sub"
          >{{ sub }}</button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container" style="padding-top: 28px; padding-bottom: 48px">
      <div class="shop-toolbar" style="margin-bottom: 20px">
        <p class="shop-toolbar__count">
          <strong>{{ filteredProducts.length }}</strong> produits
        </p>
        <div class="shop-toolbar__right">
          <select v-model="sortBy" class="form-select" style="width:auto; font-size:0.875rem">
            <option value="popular">Popularité</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="newest">Nouveautés</option>
            <option value="rating">Meilleures notes</option>
          </select>
        </div>
      </div>

      <div v-if="filteredProducts.length" class="products-grid">
        <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
      </div>

      <div v-else class="empty-state">
        <div class="empty-state__icon">{{ category.icon }}</div>
        <h3 class="empty-state__title">Aucun produit dans cette sous-catégorie</h3>
        <button class="btn btn--primary" @click="activeSubcat = null">Voir tous les produits</button>
      </div>
    </div>
  </div>

  <div v-else class="container" style="padding: 80px 16px; text-align:center">
    <h2>Catégorie introuvable</h2>
    <RouterLink to="/shop" class="btn btn--primary" style="margin-top: 20px">Retour à la boutique</RouterLink>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/product/ProductCard.vue';
import { useProductsStore } from '../stores/products.js';
import { getCategoryBySlug } from '../data/categories.js';
import { getProductsByCategory } from '../data/products.js';

const route = useRoute();
const store = useProductsStore();

const category = ref(null);
const activeSubcat = ref(null);
const sortBy = ref('popular');

const bannerBg = computed(() => {
  const bgs = ['linear-gradient(135deg,#E8001C,#FF6B35)', 'linear-gradient(135deg,#1E3A5F,#2E6DB4)', 'linear-gradient(135deg,#27AE60,#1ABC9C)', 'linear-gradient(135deg,#9B59B6,#8E44AD)', 'linear-gradient(135deg,#F39C12,#E67E22)', 'linear-gradient(135deg,#16A085,#1ABC9C)'];
  return bgs[(category.value?.id || 1) % bgs.length];
});

const filteredProducts = computed(() => {
  let prods = getProductsByCategory(route.params.slug);
  if (activeSubcat.value) {
    prods = prods.filter(p => p.subcategory === activeSubcat.value);
  }
  switch (sortBy.value) {
    case 'price-asc': return [...prods].sort((a, b) => a.price - b.price);
    case 'price-desc': return [...prods].sort((a, b) => b.price - a.price);
    case 'newest': return [...prods].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'rating': return [...prods].sort((a, b) => b.rating - a.rating);
    default: return [...prods].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
  }
});

function load() {
  category.value = getCategoryBySlug(route.params.slug) || null;
  store.setCategory(route.params.slug);
  activeSubcat.value = null;
}

onMounted(load);
watch(() => route.params.slug, load);
</script>

<style lang="scss" scoped>
.category-banner {
  padding: 40px 0 32px;
  color: #fff;
  margin-bottom: 0;

  &__content { display: flex; align-items: center; gap: 20px; margin-top: 12px; }
  &__icon { font-size: 3.5rem; }
  &__title { font-family: var(--font-primary); font-size: 2rem; font-weight: 800; margin-bottom: 6px; }
  &__desc { font-size: 1rem; opacity: 0.85; margin-bottom: 4px; }
  &__count { font-size: 0.875rem; opacity: 0.7; }
}

.subcategories-bar {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  padding: 12px 0;
}

.subcategories-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.subcategory-chip {
  padding: 7px 18px;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  border: 1.5px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-text);
  transition: var(--transition);

  &:hover { border-color: var(--color-primary); color: var(--color-primary); }
  &.active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
}

.shop-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  &__count { font-size: 0.9375rem; color: var(--color-text-muted); margin-right: auto; }
  &__right { margin-left: auto; }
}
</style>
