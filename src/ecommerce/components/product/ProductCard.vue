<template>
  <article class="product-card" :class="{ 'product-card--list': listView }">
    <!-- Badges -->
    <div class="product-card__badges">
      <span v-if="product.discount > 0" class="badge badge--red">-{{ product.discount }}%</span>
      <span v-if="product.isNew" class="badge badge--green">Nouveau</span>
      <span v-if="product.isBestseller && !product.isNew" class="badge badge--orange">Bestseller</span>
    </div>

    <!-- Wishlist -->
    <button
      class="product-card__wishlist"
      :class="{ active: wishlistStore.isInWishlist(product.id) }"
      @click.prevent="toggleWishlist"
      :title="wishlistStore.isInWishlist(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
    >
      <svg width="18" height="18" :fill="wishlistStore.isInWishlist(product.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>

    <!-- Image -->
    <RouterLink :to="`/product/${product.slug}`" class="product-card__img-wrap">
      <img
        :src="product.thumbnail"
        :alt="product.name"
        class="product-card__img"
        loading="lazy"
      />
      <div class="product-card__overlay">
        <button class="product-card__quick-view" @click.prevent="emit('quickView', product)">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Aperçu rapide
        </button>
      </div>
    </RouterLink>

    <!-- Info -->
    <div class="product-card__body">
      <!-- Rating -->
      <div class="product-card__rating">
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star" :class="{ empty: i > Math.round(product.rating) }">★</span>
        </div>
        <span class="product-card__reviews">({{ product.reviews }})</span>
      </div>

      <!-- Name -->
      <RouterLink :to="`/product/${product.slug}`" class="product-card__name">
        {{ product.name }}
      </RouterLink>

      <!-- Brand -->
      <p v-if="product.brand" class="product-card__brand">{{ product.brand }}</p>

      <!-- Age -->
      <p v-if="product.ageMin !== undefined" class="product-card__age">
        <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
        {{ product.ageMin }}{{ product.ageMax ? `–${product.ageMax}` : '+' }} ans
      </p>

      <!-- Price -->
      <div class="product-card__price">
        <span class="price__current">{{ formatPrice(product.price) }}</span>
        <span v-if="product.originalPrice" class="price__original">{{ formatPrice(product.originalPrice) }}</span>
      </div>

      <!-- Stock -->
      <p v-if="product.stock <= 5 && product.stock > 0" class="product-card__stock">
        ⚠️ Plus que {{ product.stock }} en stock !
      </p>
      <p v-else-if="!product.inStock" class="product-card__out">Rupture de stock</p>

      <!-- Add to Cart -->
      <button
        class="product-card__add btn btn--primary btn--full"
        :disabled="!product.inStock || adding"
        @click.prevent="addToCart"
      >
        <Transition name="fade" mode="out-in">
          <span v-if="added" key="added">✓ Ajouté !</span>
          <span v-else key="add" class="add-btn-inner">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {{ product.inStock ? 'Ajouter au panier' : 'Indisponible' }}
          </span>
        </Transition>
      </button>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../../stores/cart.js';
import { useWishlistStore } from '../../stores/wishlist.js';

const props = defineProps({
  product: { type: Object, required: true },
  listView: { type: Boolean, default: false },
});

const emit = defineEmits(['quickView']);

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const adding = ref(false);
const added = ref(false);

function formatPrice(price) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(price);
}

async function addToCart() {
  if (!props.product.inStock || adding.value) return;
  adding.value = true;
  await new Promise((r) => setTimeout(r, 300));
  cartStore.addItem(props.product);
  adding.value = false;
  added.value = true;
  setTimeout(() => (added.value = false), 1800);
}

function toggleWishlist() {
  wishlistStore.toggleItem(props.product);
}
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: var(--transition-slow);
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
    border-color: transparent;

    .product-card__overlay { opacity: 1; }
    .product-card__img { transform: scale(1.04); }
  }

  &--list {
    flex-direction: row;
    .product-card__img-wrap { width: 180px; flex-shrink: 0; aspect-ratio: 1; }
    .product-card__body { padding: 20px; }

    @media (max-width: 480px) { flex-direction: column; .product-card__img-wrap { width: 100%; } }
  }

  &__badges {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 2;
  }

  &__wishlist {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 34px;
    height: 34px;
    border-radius: var(--radius-full);
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9CA3AF;
    transition: var(--transition);
    z-index: 2;
    box-shadow: var(--shadow-sm);

    &:hover { color: var(--color-primary); background: #fff; transform: scale(1.1); }
    &.active { color: var(--color-primary); background: #FFF0F0; }
  }

  &__img-wrap {
    position: relative;
    overflow: hidden;
    background: #F9FAFB;
    aspect-ratio: 1;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.35);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 16px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &__quick-view {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.95);
    color: var(--color-dark);
    padding: 8px 18px;
    border-radius: var(--radius-full);
    font-size: 0.8125rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
    transition: var(--transition);

    &:hover { background: #fff; transform: scale(1.03); }
  }

  &__body {
    padding: 14px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__reviews {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  &__name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-dark);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.15s;
    margin-top: 2px;

    &:hover { color: var(--color-primary); }
  }

  &__brand {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  &__age {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  &__price {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    flex-wrap: wrap;
  }

  &__stock {
    font-size: 0.75rem;
    color: var(--color-warning);
    font-weight: 600;
  }

  &__out {
    font-size: 0.75rem;
    color: #9CA3AF;
  }

  &__add {
    margin-top: auto;
    padding: 9px 16px;
    font-size: 0.875rem;

    &:disabled:not(.btn--primary[disabled]) { background: #E5E7EB; color: #9CA3AF; }
  }
}

.add-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}
</style>
