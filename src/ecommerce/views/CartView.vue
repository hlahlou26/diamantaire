<template>
  <div class="cart-page">
    <div class="container">
      <nav class="breadcrumb" style="padding: 20px 0 16px">
        <RouterLink to="/">Accueil</RouterLink>
        <span class="separator">/</span>
        <span class="current">Mon Panier</span>
      </nav>

      <h1 class="page-title">Mon Panier <span v-if="cartStore.totalItems">({{ cartStore.totalItems }})</span></h1>

      <div v-if="cartStore.items.length" class="cart-layout">
        <!-- Items -->
        <div class="cart-items">
          <!-- Free shipping progress -->
          <div class="free-ship-bar" v-if="cartStore.subtotal < 500">
            <p>Plus que <strong>{{ (500 - cartStore.subtotal).toFixed(0) }} MAD</strong> pour la livraison gratuite !</p>
            <div class="free-ship-bar__track"><div class="free-ship-bar__fill" :style="{width: Math.min(cartStore.subtotal/500*100,100)+'%'}" /></div>
          </div>
          <div class="free-ship-bar free-ship-bar--done" v-else>
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            Félicitations ! Vous bénéficiez de la livraison gratuite.
          </div>

          <!-- Item List -->
          <div class="cart-item-row" v-for="item in cartStore.items" :key="item.id">
            <RouterLink :to="`/product/${item.slug}`" class="cart-item-row__img">
              <img :src="item.thumbnail" :alt="item.name" />
            </RouterLink>
            <div class="cart-item-row__info">
              <RouterLink :to="`/product/${item.slug}`" class="cart-item-row__name">{{ item.name }}</RouterLink>
              <div class="cart-item-row__price-row">
                <span class="cart-item-row__price">{{ formatPrice(item.price) }}</span>
                <span v-if="item.originalPrice" class="cart-item-row__original">{{ formatPrice(item.originalPrice) }}</span>
              </div>
              <div class="cart-item-row__actions">
                <div class="qty-control">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="qty-control__btn">−</button>
                  <span class="qty-control__val">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" :disabled="item.quantity >= item.stock" class="qty-control__btn">+</button>
                </div>
                <button class="btn btn--ghost btn--sm" @click="cartStore.removeItem(item.id)" style="color: #EF4444">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  Supprimer
                </button>
                <RouterLink :to="`/wishlist`" class="btn btn--ghost btn--sm">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  Favoris
                </RouterLink>
              </div>
            </div>
            <div class="cart-item-row__total">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>

          <div class="cart-controls">
            <RouterLink to="/shop" class="btn btn--ghost">← Continuer mes achats</RouterLink>
            <button class="btn btn--ghost" style="color:#EF4444" @click="cartStore.clearCart()">Vider le panier</button>
          </div>
        </div>

        <!-- Summary -->
        <div class="cart-summary">
          <h3 class="cart-summary__title">Récapitulatif</h3>

          <!-- Promo Code -->
          <div class="promo-input">
            <input v-model="promoCode" type="text" placeholder="Code promo" class="form-control" />
            <button class="btn btn--outline btn--sm" @click="applyPromo">Appliquer</button>
          </div>

          <div class="cart-summary__rows">
            <div class="cart-summary__row">
              <span>Sous-total ({{ cartStore.totalItems }} articles)</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div v-if="cartStore.savings > 0" class="cart-summary__row cart-summary__row--save">
              <span>Économies</span>
              <span>-{{ formatPrice(cartStore.savings) }}</span>
            </div>
            <div class="cart-summary__row">
              <span>Livraison</span>
              <span :class="{ 'text-green': cartStore.shipping === 0 }">{{ cartStore.shipping === 0 ? 'Gratuite 🎉' : formatPrice(cartStore.shipping) }}</span>
            </div>
            <div v-if="promoApplied" class="cart-summary__row cart-summary__row--save">
              <span>Code promo ({{ promoCode }})</span>
              <span>-{{ formatPrice(promoDiscount) }}</span>
            </div>
            <div class="cart-summary__row cart-summary__row--total">
              <span>Total TTC</span>
              <span>{{ formatPrice(finalTotal) }}</span>
            </div>
          </div>

          <RouterLink to="/checkout" class="btn btn--primary btn--full btn--lg">
            Commander maintenant →
          </RouterLink>

          <div class="cart-summary__payment">
            <p>Modes de paiement acceptés :</p>
            <div class="payment-methods">
              <span>💳 CMI</span>
              <span>💳 Visa/MC</span>
              <span>📦 Contre remboursement</span>
              <span>💸 PayPal</span>
            </div>
          </div>

          <div class="cart-summary__guarantee">
            <div v-for="g in guarantees" :key="g.text" class="guarantee-item">
              <span>{{ g.icon }}</span>
              <span>{{ g.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="empty-state" style="padding: 80px 24px">
        <div class="empty-state__icon">🛒</div>
        <h2 class="empty-state__title">Votre panier est vide</h2>
        <p class="empty-state__text">Parcourez notre boutique et ajoutez des jouets à votre panier</p>
        <RouterLink to="/shop" class="btn btn--primary btn--lg">Découvrir nos jouets</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart.js';

const cartStore = useCartStore();
const promoCode = ref('');
const promoApplied = ref(false);
const promoDiscount = ref(0);

function formatPrice(p) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(p);
}

function applyPromo() {
  if (promoCode.value.toLowerCase() === 'mytoys10') {
    promoDiscount.value = Math.round(cartStore.subtotal * 0.1);
    promoApplied.value = true;
  } else {
    alert('Code promo invalide.');
  }
}

const finalTotal = computed(() => cartStore.total - promoDiscount.value);

const guarantees = [
  { icon: '🔒', text: 'Paiement 100% sécurisé' },
  { icon: '🔄', text: 'Retour gratuit 30 jours' },
  { icon: '🚚', text: 'Livraison rapide partout au Maroc' },
];
</script>

<style lang="scss" scoped>
.cart-page { padding-bottom: 64px; }
.page-title { font-family: var(--font-primary); font-size: 1.75rem; font-weight: 800; margin-bottom: 28px; span { color: var(--color-text-muted); font-weight: 500; font-size: 1.25rem; } }

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 28px;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
}

.cart-items { display: flex; flex-direction: column; gap: 0; }

.free-ship-bar {
  background: #FFF8F0;
  border: 1px solid #FFE0B2;
  border-radius: var(--radius-lg);
  padding: 14px 18px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 16px;

  p { margin-bottom: 8px; }
  &__track { height: 6px; background: #FFE0B2; border-radius: 3px; overflow: hidden; }
  &__fill { height: 100%; background: var(--color-secondary); border-radius: 3px; transition: width 0.4s; }

  &--done { background: #F0FFF4; border-color: #BBF7D0; color: var(--color-success); display: flex; align-items: center; gap: 8px; }
}

.cart-item-row {
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid var(--color-border);
  align-items: flex-start;

  &__img { width: 96px; height: 96px; flex-shrink: 0; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border);
    img { width: 100%; height: 100%; object-fit: cover; } }
  &__info { flex: 1; }
  &__name { font-size: 1rem; font-weight: 600; color: var(--color-dark); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 6px;
    &:hover { color: var(--color-primary); } }
  &__price-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  &__price { font-size: 1.0625rem; font-weight: 700; color: var(--color-primary); }
  &__original { font-size: 0.875rem; text-decoration: line-through; color: var(--color-text-muted); }
  &__actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  &__total { font-size: 1.0625rem; font-weight: 800; color: var(--color-dark); white-space: nowrap; padding-top: 4px; }
}

.qty-control {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;

  &__btn { width: 32px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 1.125rem; background: var(--color-bg); transition: background 0.15s; &:hover:not(:disabled) { background: var(--color-border); } &:disabled { opacity: 0.4; cursor: not-allowed; } }
  &__val { width: 36px; text-align: center; font-weight: 700; font-size: 0.9375rem; border-left: 1.5px solid var(--color-border); border-right: 1.5px solid var(--color-border); }
}

.cart-controls { display: flex; justify-content: space-between; padding-top: 16px; flex-wrap: wrap; gap: 10px; }

.cart-summary {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: 24px;
  position: sticky;
  top: calc(var(--header-height) + 60px);
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title { font-size: 1.125rem; font-weight: 700; }

  &__rows { display: flex; flex-direction: column; gap: 12px; }
  &__row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9375rem;
    color: var(--color-text-muted);

    .text-green { color: var(--color-success); font-weight: 600; }

    &--save { color: var(--color-success); font-weight: 600; }
    &--total { font-size: 1.0625rem; font-weight: 800; color: var(--color-dark); padding-top: 12px; border-top: 2px solid var(--color-border); margin-top: 4px; }
  }

  &__payment { font-size: 0.8125rem; color: var(--color-text-muted); text-align: center; }
  &__guarantee { display: flex; flex-direction: column; gap: 8px; padding-top: 4px; }
}

.promo-input { display: flex; gap: 8px; .form-control { flex: 1; } }

.payment-methods { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 8px;
  span { font-size: 0.75rem; background: var(--color-bg); padding: 4px 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); } }

.guarantee-item { display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--color-text-muted); }
</style>
