<template>
  <section class="section featured">
    <div class="container">
      <!-- Tabs -->
      <div class="featured__header">
        <div class="featured__tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="featured__tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </div>
        <RouterLink :to="`/shop?filter=${activeTab}`" class="btn btn--ghost btn--sm">
          Tout voir →
        </RouterLink>
      </div>

      <!-- Products Carousel -->
      <div class="featured__grid">
        <ProductCard
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
          @quickView="openQuickView"
        />
      </div>
    </div>

    <!-- Quick View Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="quickViewProduct" class="modal-overlay" @click.self="closeQuickView">
          <div class="quick-view">
            <button class="quick-view__close" @click="closeQuickView">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div class="quick-view__content">
              <div class="quick-view__img">
                <img :src="quickViewProduct.thumbnail" :alt="quickViewProduct.name" />
              </div>
              <div class="quick-view__info">
                <div class="quick-view__badges">
                  <span v-if="quickViewProduct.discount > 0" class="badge badge--red">-{{ quickViewProduct.discount }}%</span>
                  <span v-if="quickViewProduct.isNew" class="badge badge--green">Nouveau</span>
                </div>
                <h3 class="quick-view__name">{{ quickViewProduct.name }}</h3>
                <div class="quick-view__rating">
                  <div class="stars">
                    <span v-for="i in 5" :key="i" class="star" :class="{ empty: i > Math.round(quickViewProduct.rating) }">★</span>
                  </div>
                  <span>({{ quickViewProduct.reviews }} avis)</span>
                </div>
                <div class="quick-view__price">
                  <span class="price__current">{{ formatPrice(quickViewProduct.price) }}</span>
                  <span v-if="quickViewProduct.originalPrice" class="price__original">{{ formatPrice(quickViewProduct.originalPrice) }}</span>
                </div>
                <p class="quick-view__desc">{{ quickViewProduct.description }}</p>
                <ul class="quick-view__features">
                  <li v-for="f in quickViewProduct.features?.slice(0, 3)" :key="f">
                    <svg width="14" height="14" fill="none" stroke="var(--color-success)" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    {{ f }}
                  </li>
                </ul>
                <div class="quick-view__qty">
                  <div class="qty-control">
                    <button @click="qvQty = Math.max(1, qvQty - 1)" class="qty-control__btn">−</button>
                    <span class="qty-control__val">{{ qvQty }}</span>
                    <button @click="qvQty++" class="qty-control__btn">+</button>
                  </div>
                  <button class="btn btn--primary" style="flex:1" @click="addToCartFromQV">
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Ajouter au panier
                  </button>
                </div>
                <RouterLink :to="`/product/${quickViewProduct.slug}`" class="quick-view__detail-link" @click="closeQuickView">
                  Voir le détail complet →
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductCard from '../product/ProductCard.vue';
import { useCartStore } from '../../stores/cart.js';
import { getFeaturedProducts, getBestsellerProducts, getNewProducts, getDiscountedProducts } from '../../data/products.js';

const cartStore = useCartStore();
const activeTab = ref('featured');
const quickViewProduct = ref(null);
const qvQty = ref(1);

const tabs = [
  { id: 'featured', label: 'Sélection', icon: '⭐' },
  { id: 'bestseller', label: 'Bestsellers', icon: '🔥' },
  { id: 'nouveau', label: 'Nouveautés', icon: '✨' },
  { id: 'promo', label: 'Promotions', icon: '🏷️' },
];

const displayedProducts = computed(() => {
  const map = {
    featured: getFeaturedProducts(),
    bestseller: getBestsellerProducts(),
    nouveau: getNewProducts(),
    promo: getDiscountedProducts(),
  };
  return (map[activeTab.value] || []).slice(0, 8);
});

function formatPrice(p) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(p);
}

function openQuickView(product) {
  quickViewProduct.value = product;
  qvQty.value = 1;
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  quickViewProduct.value = null;
  document.body.style.overflow = '';
}

function addToCartFromQV() {
  cartStore.addItem(quickViewProduct.value, qvQty.value);
  closeQuickView();
}
</script>

<style lang="scss" scoped>
.featured {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 16px;
  }

  &__tabs {
    display: flex;
    gap: 6px;
    background: var(--color-bg);
    padding: 5px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    flex-wrap: wrap;
  }

  &__tab {
    padding: 8px 18px;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-muted);
    transition: var(--transition);
    white-space: nowrap;

    &:hover { color: var(--color-primary); background: rgba(232,0,28,0.05); }
    &.active { background: var(--color-primary); color: #fff; box-shadow: 0 2px 10px rgba(232,0,28,0.3); }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.quick-view {
  position: relative;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  overflow-y: auto;

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    background: var(--color-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: var(--transition);

    &:hover { background: var(--color-border); }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;

    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  &__img {
    background: var(--color-bg);
    border-radius: var(--radius-xl) 0 0 var(--radius-xl);
    overflow: hidden;
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;

    img { width: 100%; height: 100%; object-fit: cover; }

    @media (max-width: 600px) { border-radius: var(--radius-xl) var(--radius-xl) 0 0; min-height: 240px; }
  }

  &__info {
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__badges { display: flex; gap: 6px; }

  &__name { font-size: 1.125rem; font-weight: 700; color: var(--color-dark); line-height: 1.4; }

  &__rating {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  &__price {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__desc {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8125rem;
      color: var(--color-text);
    }
  }

  &__qty {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 4px;
  }

  &__detail-link {
    font-size: 0.8125rem;
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: underline;
    text-align: center;
  }
}

.qty-control {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;

  &__btn {
    width: 36px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    background: #F9FAFB;
    &:hover { background: var(--color-border); }
  }

  &__val {
    width: 40px;
    text-align: center;
    font-weight: 600;
    border-left: 1.5px solid var(--color-border);
    border-right: 1.5px solid var(--color-border);
  }
}
</style>
