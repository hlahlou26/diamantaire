<template>
  <div class="product-page" v-if="product">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb" style="padding: 20px 0 16px">
        <RouterLink to="/">Accueil</RouterLink>
        <span class="separator">/</span>
        <RouterLink :to="`/category/${product.category}`">{{ categoryName }}</RouterLink>
        <span class="separator">/</span>
        <span class="current">{{ product.name }}</span>
      </nav>

      <!-- Product Layout -->
      <div class="product-layout">
        <!-- Gallery -->
        <div class="product-gallery">
          <div class="product-gallery__main">
            <img :src="selectedImage" :alt="product.name" class="product-gallery__main-img" />
            <div class="product-gallery__zoom-hint">🔍 Survolez pour zoomer</div>
          </div>
          <div class="product-gallery__thumbs" v-if="product.images?.length > 1">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              class="product-gallery__thumb"
              :class="{ active: selectedImage === img }"
              @click="selectedImage = img"
            >
              <img :src="img" :alt="`Vue ${i + 1}`" />
            </button>
          </div>

          <!-- Share -->
          <div class="product-share">
            <span>Partager :</span>
            <button class="share-btn" title="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </button>
            <button class="share-btn" title="WhatsApp">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="product-info">
          <!-- Badges -->
          <div class="product-info__badges">
            <span v-if="product.discount > 0" class="badge badge--red">-{{ product.discount }}%</span>
            <span v-if="product.isNew" class="badge badge--green">Nouveau</span>
            <span v-if="product.isBestseller" class="badge badge--orange">Bestseller</span>
            <span v-if="product.stock <= 5 && product.stock > 0" class="badge badge--yellow">Stock limité</span>
          </div>

          <h1 class="product-info__name">{{ product.name }}</h1>

          <div class="product-info__meta">
            <div class="product-rating-row">
              <div class="stars" style="font-size: 1rem;">
                <span v-for="i in 5" :key="i" class="star" :class="{ empty: i > Math.round(product.rating) }">★</span>
              </div>
              <span class="product-rating__val">{{ product.rating }}</span>
              <span class="product-rating__count">({{ product.reviews }} avis)</span>
            </div>
            <span class="product-info__brand" v-if="product.brand">
              Marque : <strong>{{ product.brand }}</strong>
            </span>
          </div>

          <!-- Price -->
          <div class="product-price-block">
            <span class="product-price__current">{{ formatPrice(product.price) }}</span>
            <span v-if="product.originalPrice" class="product-price__original">{{ formatPrice(product.originalPrice) }}</span>
            <span v-if="product.discount > 0" class="product-price__save">
              Économisez {{ formatPrice(product.originalPrice - product.price) }}
            </span>
          </div>

          <!-- Stock & Age -->
          <div class="product-info__details">
            <div class="detail-row">
              <span class="detail-row__label">Disponibilité :</span>
              <span :class="product.inStock ? 'in-stock' : 'out-stock'">
                {{ product.inStock ? `✓ En stock (${product.stock} restants)` : '✗ Rupture de stock' }}
              </span>
            </div>
            <div v-if="product.ageMin !== undefined" class="detail-row">
              <span class="detail-row__label">Âge recommandé :</span>
              <span>{{ product.ageMin }}{{ product.ageMax ? `–${product.ageMax}` : '+' }} ans</span>
            </div>
            <div v-if="product.weight" class="detail-row">
              <span class="detail-row__label">Poids :</span>
              <span>{{ product.weight }}</span>
            </div>
          </div>

          <!-- Quantity + CTA -->
          <div class="product-cta">
            <div class="qty-selector">
              <button @click="qty = Math.max(1, qty - 1)" class="qty-selector__btn">−</button>
              <input v-model.number="qty" type="number" min="1" :max="product.stock" class="qty-selector__input" />
              <button @click="qty = Math.min(product.stock, qty + 1)" class="qty-selector__btn">+</button>
            </div>
            <button
              class="btn btn--primary btn--lg"
              style="flex: 1"
              :disabled="!product.inStock"
              @click="addToCart"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {{ product.inStock ? 'Ajouter au panier' : 'Indisponible' }}
            </button>
            <button class="btn btn--outline btn--icon" @click="toggleWishlist" :title="inWishlist ? 'Retirer des favoris' : 'Favoris'">
              <svg width="18" height="18" :fill="inWishlist ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>

          <!-- Buy Now -->
          <RouterLink to="/checkout" class="btn btn--secondary btn--full" @click="addToCart">
            ⚡ Acheter maintenant
          </RouterLink>

          <!-- Delivery Info -->
          <div class="delivery-info">
            <div class="delivery-info__item">
              <svg width="16" height="16" fill="none" stroke="var(--color-success)" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span><strong>Livraison 1h</strong> à Casablanca</span>
            </div>
            <div class="delivery-info__item">
              <svg width="16" height="16" fill="none" stroke="var(--color-success)" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span><strong>Livraison 24h</strong> partout au Maroc</span>
            </div>
            <div class="delivery-info__item">
              <svg width="16" height="16" fill="none" stroke="var(--color-success)" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.25"/></svg>
              <span><strong>Retour gratuit</strong> sous 30 jours</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs: Description / Features / Reviews -->
      <div class="product-tabs">
        <div class="product-tabs__nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="product-tabs__tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >{{ tab.label }}</button>
        </div>
        <div class="product-tabs__content">
          <div v-if="activeTab === 'description'">
            <p class="product-desc">{{ product.description }}</p>
            <ul v-if="product.features?.length" class="product-features">
              <li v-for="f in product.features" :key="f">
                <svg width="16" height="16" fill="none" stroke="var(--color-success)" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                {{ f }}
              </li>
            </ul>
          </div>
          <div v-if="activeTab === 'specs'">
            <table class="specs-table">
              <tbody>
                <tr v-if="product.brand"><td>Marque</td><td>{{ product.brand }}</td></tr>
                <tr v-if="product.ageMin !== undefined"><td>Âge</td><td>{{ product.ageMin }}{{ product.ageMax ? `–${product.ageMax}` : '+' }} ans</td></tr>
                <tr v-if="product.weight"><td>Poids</td><td>{{ product.weight }}</td></tr>
                <tr v-if="product.dimensions"><td>Dimensions</td><td>{{ product.dimensions }}</td></tr>
                <tr><td>Référence</td><td>MT-{{ product.id.toString().padStart(5, '0') }}</td></tr>
              </tbody>
            </table>
          </div>
          <div v-if="activeTab === 'reviews'">
            <div class="reviews-summary">
              <div class="reviews-score">
                <span class="reviews-score__val">{{ product.rating }}</span>
                <div class="stars" style="font-size: 1.5rem">
                  <span v-for="i in 5" :key="i" class="star" :class="{ empty: i > Math.round(product.rating) }">★</span>
                </div>
                <span class="reviews-score__count">Basé sur {{ product.reviews }} avis</span>
              </div>
            </div>
            <div class="mock-reviews">
              <div v-for="review in mockReviews" :key="review.name" class="review-item">
                <div class="review-item__header">
                  <div class="review-item__avatar">{{ review.name[0] }}</div>
                  <div>
                    <strong>{{ review.name }}</strong>
                    <span>{{ review.date }}</span>
                  </div>
                  <div class="stars" style="margin-left:auto">
                    <span v-for="i in 5" :key="i" class="star" :class="{ empty: i > review.rating }">★</span>
                  </div>
                </div>
                <p class="review-item__text">{{ review.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="related-section">
        <h2 class="section-title">Produits similaires</h2>
        <div class="products-grid" style="margin-top: 24px">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container" style="padding: 80px 16px; text-align: center">
    <h2>Produit introuvable</h2>
    <RouterLink to="/shop" class="btn btn--primary" style="margin-top: 20px">Retour à la boutique</RouterLink>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/product/ProductCard.vue';
import { useCartStore } from '../stores/cart.js';
import { useWishlistStore } from '../stores/wishlist.js';
import { getProductBySlug, getProductsByCategory } from '../data/products.js';
import { categories } from '../data/categories.js';

const route = useRoute();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const product = ref(null);
const selectedImage = ref('');
const qty = ref(1);
const activeTab = ref('description');

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'specs', label: 'Caractéristiques' },
  { id: 'reviews', label: `Avis` },
];

const categoryName = computed(() => {
  const cat = categories.find((c) => c.slug === product.value?.category);
  return cat?.name || 'Catégorie';
});

const inWishlist = computed(() => product.value ? wishlistStore.isInWishlist(product.value.id) : false);

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return getProductsByCategory(product.value.category)
    .filter((p) => p.id !== product.value.id)
    .slice(0, 4);
});

const mockReviews = [
  { name: 'Aicha M.', date: 'Il y a 2 jours', rating: 5, text: 'Excellent produit, conforme à la description. Livraison très rapide à Casablanca.' },
  { name: 'Karim T.', date: 'Il y a 1 semaine', rating: 4, text: 'Très bon rapport qualité-prix. Mon fils est ravi !' },
  { name: 'Sara B.', date: 'Il y a 2 semaines', rating: 5, text: 'Parfait pour l\'âge indiqué. Emballage cadeau superbe.' },
];

function formatPrice(p) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(p);
}

function addToCart() {
  if (product.value?.inStock) cartStore.addItem(product.value, qty.value);
}

function toggleWishlist() {
  if (product.value) wishlistStore.toggleItem(product.value);
}

function loadProduct() {
  const p = getProductBySlug(route.params.slug);
  product.value = p || null;
  if (p) selectedImage.value = p.images?.[0] || p.thumbnail;
}

onMounted(loadProduct);
watch(() => route.params.slug, loadProduct);
</script>

<style lang="scss" scoped>
.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 56px;

  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 28px; }
}

.product-gallery {
  &__main {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: var(--color-bg);
    aspect-ratio: 1;
    border: 1px solid var(--color-border);
    margin-bottom: 12px;
  }
  &__main-img { width: 100%; height: 100%; object-fit: cover; }
  &__zoom-hint { position: absolute; bottom: 12px; right: 12px; font-size: 0.75rem; background: rgba(0,0,0,0.5); color: #fff; padding: 4px 10px; border-radius: var(--radius-full); }
  &__thumbs { display: flex; gap: 10px; flex-wrap: wrap; }
  &__thumb {
    width: 72px; height: 72px;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 2px solid var(--color-border);
    cursor: pointer;
    transition: border-color 0.15s;

    img { width: 100%; height: 100%; object-fit: cover; }
    &.active { border-color: var(--color-primary); }
    &:hover { border-color: var(--color-primary); }
  }
}

.product-share {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.share-btn {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  transition: var(--transition);
  &:hover { border-color: var(--color-primary); color: var(--color-primary); }
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__badges { display: flex; gap: 6px; flex-wrap: wrap; }
  &__name { font-family: var(--font-primary); font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 800; color: var(--color-dark); line-height: 1.3; }
  &__meta { display: flex; flex-direction: column; gap: 6px; }
  &__brand { font-size: 0.875rem; color: var(--color-text-muted); }
  &__details { display: flex; flex-direction: column; gap: 8px; }
}

.product-rating-row { display: flex; align-items: center; gap: 10px; }
.product-rating__val { font-weight: 700; color: var(--color-dark); }
.product-rating__count { font-size: 0.875rem; color: var(--color-text-muted); }

.product-price-block {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.product-price__current { font-size: 1.875rem; font-weight: 800; color: var(--color-primary); }
.product-price__original { font-size: 1.125rem; text-decoration: line-through; color: var(--color-text-muted); }
.product-price__save { font-size: 0.875rem; background: #FFF0F0; color: var(--color-primary); padding: 4px 10px; border-radius: var(--radius-full); font-weight: 600; }

.detail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;

  &__label { color: var(--color-text-muted); min-width: 130px; }
  .in-stock { color: var(--color-success); font-weight: 600; }
  .out-stock { color: #EF4444; font-weight: 600; }
}

.product-cta {
  display: flex;
  gap: 10px;
  align-items: center;
}

.qty-selector {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;

  &__btn { width: 40px; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; background: var(--color-bg); transition: background 0.15s; &:hover { background: var(--color-border); } }
  &__input { width: 52px; text-align: center; border: none; border-left: 1.5px solid var(--color-border); border-right: 1.5px solid var(--color-border); font-size: 1rem; font-weight: 700; outline: none; height: 44px; }
}

.delivery-info {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__item { display: flex; align-items: center; gap: 10px; font-size: 0.875rem; }
}

.product-tabs {
  margin-bottom: 56px;

  &__nav { display: flex; border-bottom: 2px solid var(--color-border); gap: 0; }
  &__tab {
    padding: 14px 24px;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text-muted);
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    transition: var(--transition);

    &:hover { color: var(--color-primary); }
    &.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }
  }

  &__content { padding: 28px 0; }
}

.product-desc { font-size: 1rem; line-height: 1.8; color: var(--color-text); margin-bottom: 24px; }

.product-features {
  display: flex;
  flex-direction: column;
  gap: 10px;

  li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.9375rem; }
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;

  td { padding: 12px 16px; border-bottom: 1px solid var(--color-border); &:first-child { color: var(--color-text-muted); font-weight: 500; width: 200px; } }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--color-bg); }
}

.reviews-summary {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 24px;
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
}

.reviews-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &__val { font-size: 3rem; font-weight: 800; color: var(--color-dark); line-height: 1; }
  &__count { font-size: 0.875rem; color: var(--color-text-muted); }
}

.mock-reviews { display: flex; flex-direction: column; gap: 20px; }

.review-item {
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  &__header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
    strong { font-size: 0.9375rem; }
    span { font-size: 0.8125rem; color: var(--color-text-muted); }
  }
  &__avatar { width: 40px; height: 40px; border-radius: var(--radius-full); background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; }
  &__text { font-size: 0.9375rem; line-height: 1.7; color: var(--color-text); }
}

.related-section { padding-bottom: 48px; }
</style>
