<template>
  <div class="search-page">
    <div class="search-hero">
      <div class="container">
        <h1 class="search-hero__title">Recherche</h1>
        <form class="search-hero__form" @submit.prevent="doSearch">
          <input v-model="query" type="text" placeholder="Rechercher un jouet, une marque..." class="search-hero__input" autofocus />
          <button type="submit" class="btn btn--primary btn--lg">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Rechercher
          </button>
        </form>
        <div v-if="query" class="search-hero__meta">
          <span>{{ results.length }} résultat(s) pour « <strong>{{ query }}</strong> »</span>
        </div>
      </div>
    </div>

    <div class="container" style="padding: 32px 16px 64px">
      <!-- Popular Searches -->
      <div v-if="!query" class="popular-searches">
        <h3>Recherches populaires :</h3>
        <div class="popular-searches__chips">
          <button
            v-for="term in popularTerms"
            :key="term"
            class="chip"
            @click="query = term; doSearch()"
          >{{ term }}</button>
        </div>
      </div>

      <!-- Results -->
      <div v-else-if="results.length" class="products-grid">
        <ProductCard v-for="p in results" :key="p.id" :product="p" />
      </div>

      <!-- No Results -->
      <div v-else-if="query" class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <h3 class="empty-state__title">Aucun résultat pour « {{ query }} »</h3>
        <p class="empty-state__text">Essayez d'autres mots-clés ou parcourez nos catégories</p>
        <RouterLink to="/shop" class="btn btn--primary">Voir toute la boutique</RouterLink>
      </div>

      <!-- Suggestions when empty query -->
      <div v-if="!query" class="suggested-categories">
        <h3 class="section-title" style="margin-top: 40px">Ou parcourez par catégorie</h3>
        <div class="cat-chips" style="margin-top: 20px">
          <RouterLink v-for="cat in categories" :key="cat.id" :to="`/category/${cat.slug}`" class="cat-chip-link">
            <span>{{ cat.icon }}</span> {{ cat.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '../components/product/ProductCard.vue';
import { searchProducts } from '../data/products.js';
import { categories } from '../data/categories.js';

const route = useRoute();
const router = useRouter();
const query = ref('');
const results = ref([]);

const popularTerms = ['LEGO', 'Barbie', 'Puzzle', 'Voiture RC', 'Peluche', 'Jeu de société', 'VTech', 'Hot Wheels', 'Monopoly', 'Trampoline'];

function doSearch() {
  if (query.value.trim()) {
    results.value = searchProducts(query.value.trim());
    router.replace({ query: { q: query.value.trim() } });
  }
}

onMounted(() => {
  if (route.query.q) {
    query.value = route.query.q;
    doSearch();
  }
});

watch(() => route.query.q, (q) => {
  if (q && q !== query.value) {
    query.value = q;
    doSearch();
  }
});
</script>

<style lang="scss" scoped>
.search-hero {
  background: linear-gradient(135deg, #1A1A2E 0%, var(--color-primary) 100%);
  padding: 48px 0;
  color: #fff;

  &__title { font-family: var(--font-primary); font-size: 2rem; font-weight: 800; margin-bottom: 24px; }
  &__form { display: flex; gap: 0; border-radius: var(--radius-full); overflow: hidden; box-shadow: var(--shadow-xl); max-width: 640px;
    @media (max-width: 480px) { flex-direction: column; border-radius: var(--radius-lg); }
  }
  &__input { flex: 1; padding: 14px 24px; border: none; font-size: 1rem; outline: none; }
  &__meta { margin-top: 16px; font-size: 0.9375rem; opacity: 0.85; }
}

.popular-searches {
  margin-bottom: 32px;
  h3 { font-size: 0.9375rem; font-weight: 600; color: var(--color-text-muted); margin-bottom: 14px; }
  &__chips { display: flex; flex-wrap: wrap; gap: 8px; }
}

.cat-chips { display: flex; flex-wrap: wrap; gap: 10px; }

.cat-chip-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
  background: var(--color-white);

  &:hover { border-color: var(--color-primary); color: var(--color-primary); background: rgba(232,0,28,0.04); }
}
</style>
