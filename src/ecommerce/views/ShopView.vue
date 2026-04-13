<template>
  <div class="shop-page">
    <!-- Page Header -->
    <div class="page-banner">
      <div class="container">
        <nav class="breadcrumb">
          <RouterLink to="/">Accueil</RouterLink>
          <span class="separator">/</span>
          <span class="current">Boutique</span>
        </nav>
        <h1 class="page-banner__title">Notre Boutique</h1>
        <p class="page-banner__sub">{{ store.filteredProducts.length }} produits disponibles</p>
      </div>
    </div>

    <div class="container shop-layout">
      <!-- Sidebar Filters -->
      <aside class="shop-sidebar" :class="{ open: filtersOpen }">
        <div class="shop-sidebar__header">
          <h3>Filtres</h3>
          <button class="shop-sidebar__close" @click="filtersOpen = false">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="sidebar-section">
          <div class="sidebar-active-filters">
            <button class="btn btn--sm btn--ghost" @click="store.resetFilters()">
              ✕ Effacer tout
            </button>
          </div>
        </div>

        <!-- Categories -->
        <div class="sidebar-section">
          <h4 class="sidebar-section__title">Catégories</h4>
          <ul class="sidebar-cats">
            <li>
              <button
                class="sidebar-cat"
                :class="{ active: !store.currentCategory }"
                @click="store.setCategory(null)"
              >
                Toutes les catégories
                <span>{{ store.products.length }}</span>
              </button>
            </li>
            <li v-for="cat in categories" :key="cat.id">
              <button
                class="sidebar-cat"
                :class="{ active: store.currentCategory === cat.slug }"
                @click="store.setCategory(cat.slug)"
              >
                {{ cat.icon }} {{ cat.name }}
                <span>{{ cat.count }}</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Price Range -->
        <div class="sidebar-section">
          <h4 class="sidebar-section__title">Prix (MAD)</h4>
          <div class="price-range">
            <div class="price-range__inputs">
              <input v-model.number="priceMin" type="number" min="0" max="5000" placeholder="Min" class="form-control" />
              <span>–</span>
              <input v-model.number="priceMax" type="number" min="0" max="5000" placeholder="Max" class="form-control" />
            </div>
            <button class="btn btn--outline btn--sm btn--full" @click="applyPrice">Appliquer</button>
          </div>
        </div>

        <!-- Brands -->
        <div class="sidebar-section">
          <h4 class="sidebar-section__title">Marques</h4>
          <div class="sidebar-brands">
            <label v-for="brand in store.allBrands" :key="brand" class="form-check">
              <input type="checkbox" :value="brand" v-model="selectedBrands" @change="applyBrands" />
              <span>{{ brand }}</span>
            </label>
          </div>
        </div>

        <!-- In Stock -->
        <div class="sidebar-section">
          <label class="form-check">
            <input type="checkbox" v-model="inStock" @change="store.setFilters({ inStock })" />
            <span>En stock uniquement</span>
          </label>
        </div>
      </aside>

      <!-- Overlay for mobile filters -->
      <Transition name="fade">
        <div v-if="filtersOpen" class="sidebar-overlay" @click="filtersOpen = false" />
      </Transition>

      <!-- Products Area -->
      <main class="shop-main">
        <!-- Toolbar -->
        <div class="shop-toolbar">
          <button class="btn btn--ghost btn--sm" @click="filtersOpen = true">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
            Filtres
            <span v-if="hasActiveFilters" class="toolbar-badge">!</span>
          </button>

          <p class="shop-toolbar__count">
            <strong>{{ store.filteredProducts.length }}</strong> produits
          </p>

          <div class="shop-toolbar__right">
            <select v-model="sortBy" class="form-select" style="width:auto;font-size:0.875rem" @change="store.setSortBy(sortBy)">
              <option value="popular">Popularité</option>
              <option value="newest">Nouveautés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
              <option value="discount">Meilleures promos</option>
            </select>

            <div class="view-toggle">
              <button :class="{ active: !listView }" @click="listView = false" title="Grille">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </button>
              <button :class="{ active: listView }" @click="listView = true" title="Liste">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid/List -->
        <div v-if="store.paginatedProducts.length" :class="listView ? 'products-list' : 'products-grid'">
          <ProductCard
            v-for="product in store.paginatedProducts"
            :key="product.id"
            :product="product"
            :list-view="listView"
          />
        </div>

        <!-- Empty -->
        <div v-else class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <h3 class="empty-state__title">Aucun produit trouvé</h3>
          <p class="empty-state__text">Essayez d'ajuster vos filtres ou votre recherche</p>
          <button class="btn btn--primary" @click="store.resetFilters()">Réinitialiser les filtres</button>
        </div>

        <!-- Pagination -->
        <div v-if="store.totalPages > 1" class="pagination">
          <button class="pagination__btn" :disabled="store.currentPage === 1" @click="store.setPage(store.currentPage - 1)">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            v-for="page in pageNumbers"
            :key="page"
            class="pagination__btn"
            :class="{ active: store.currentPage === page }"
            @click="typeof page === 'number' && store.setPage(page)"
          >{{ page }}</button>
          <button class="pagination__btn" :disabled="store.currentPage === store.totalPages" @click="store.setPage(store.currentPage + 1)">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/product/ProductCard.vue';
import { useProductsStore } from '../stores/products.js';
import { categories } from '../data/categories.js';

const route = useRoute();
const store = useProductsStore();

const filtersOpen = ref(false);
const listView = ref(false);
const sortBy = ref('popular');
const priceMin = ref(0);
const priceMax = ref(5000);
const selectedBrands = ref([]);
const inStock = ref(false);

const hasActiveFilters = computed(
  () => store.currentCategory || selectedBrands.value.length || inStock.value ||
    store.filters.priceMin > 0 || store.filters.priceMax < 5000
);

const pageNumbers = computed(() => {
  const total = store.totalPages;
  const current = store.currentPage;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
});

function applyPrice() {
  store.setFilters({ priceMin: priceMin.value, priceMax: priceMax.value });
}

function applyBrands() {
  store.setFilters({ brands: selectedBrands.value });
}

onMounted(() => {
  const filter = route.query.filter;
  const q = route.query.q;
  if (q) store.setSearch(q);
  else if (filter === 'promo' || filter === 'bestseller' || filter === 'nouveau') {
    store.setSortBy(filter === 'promo' ? 'discount' : filter === 'nouveau' ? 'newest' : 'popular');
  } else {
    store.setCategory(null);
  }
});

watch(() => route.query, (q) => {
  if (q.q) store.setSearch(q.q);
});
</script>

<style lang="scss" scoped>
.page-banner {
  background: linear-gradient(135deg, #1A1A2E 0%, var(--color-primary) 100%);
  padding: 32px 0 28px;
  color: #fff;
  margin-bottom: 0;

  &__title { font-family: var(--font-primary); font-size: 1.75rem; font-weight: 800; margin: 8px 0 4px; }
  &__sub { font-size: 0.9375rem; opacity: 0.75; }
}

.shop-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 28px;
  padding-top: 28px;
  padding-bottom: 48px;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
}

.shop-sidebar {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  position: sticky;
  top: calc(var(--header-height) + 60px);

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: -100%;
    bottom: 0;
    width: 300px;
    z-index: 1000;
    transition: left 0.3s ease;
    overflow-y: auto;
    border-radius: 0;
    &.open { left: 0; }
  }

  &__header {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-border);
    font-weight: 700;
    @media (max-width: 1024px) { display: flex; }
  }

  &__close { width: 32px; height: 32px; border-radius: var(--radius-full); background: var(--color-bg); display: flex; align-items: center; justify-content: center; }
}

.sidebar-section {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);

  &:last-child { border-bottom: none; }

  &__title { font-size: 0.875rem; font-weight: 700; color: var(--color-dark); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }
}

.sidebar-cats { display: flex; flex-direction: column; gap: 2px; }

.sidebar-cat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 7px 10px;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--color-text);
  transition: var(--transition);
  text-align: left;

  span { font-size: 0.75rem; background: var(--color-bg); padding: 1px 7px; border-radius: 10px; color: var(--color-text-muted); }

  &:hover { background: rgba(232,0,28,0.05); color: var(--color-primary); }
  &.active { background: rgba(232,0,28,0.08); color: var(--color-primary); font-weight: 600; span { background: var(--color-primary); color: #fff; } }
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__inputs {
    display: flex;
    align-items: center;
    gap: 8px;
    .form-control { padding: 8px 10px; font-size: 0.875rem; }
  }
}

.sidebar-brands {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
}

.sidebar-active-filters { display: flex; flex-wrap: wrap; gap: 6px; }

.shop-main {}

.shop-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  margin-bottom: 20px;
  flex-wrap: wrap;

  &__count { font-size: 0.875rem; color: var(--color-text-muted); margin-right: auto; }
  &__right { display: flex; align-items: center; gap: 10px; margin-left: auto; }
}

.toolbar-badge {
  background: var(--color-primary);
  color: #fff;
  font-size: 0.625rem;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-toggle {
  display: flex;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;

  button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    transition: var(--transition);

    &:hover { color: var(--color-primary); background: rgba(232,0,28,0.05); }
    &.active { background: var(--color-primary); color: #fff; }
  }
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
