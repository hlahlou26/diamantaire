<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cartStore.isOpen" class="sidebar-overlay" @click="cartStore.closeCart()" />
    </Transition>
    <Transition name="slide-right">
      <aside v-if="cartStore.isOpen" class="cart-sidebar">
        <!-- Header -->
        <div class="cart-sidebar__header">
          <h2 class="cart-sidebar__title">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Mon Panier
            <span class="cart-sidebar__count">{{ cartStore.totalItems }}</span>
          </h2>
          <button class="cart-sidebar__close" @click="cartStore.closeCart()">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Delivery Banner -->
        <div class="cart-sidebar__delivery" v-if="cartStore.subtotal < 500">
          <div class="delivery-progress">
            <p class="delivery-progress__text">
              Plus que <strong>{{ (500 - cartStore.subtotal).toFixed(0) }} MAD</strong> pour la livraison gratuite !
            </p>
            <div class="delivery-progress__bar">
              <div class="delivery-progress__fill" :style="{ width: Math.min((cartStore.subtotal / 500) * 100, 100) + '%' }" />
            </div>
          </div>
        </div>
        <div class="cart-sidebar__delivery cart-sidebar__delivery--free" v-else>
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          Vous bénéficiez de la livraison gratuite !
        </div>

        <!-- Items -->
        <div class="cart-sidebar__items" v-if="cartStore.items.length > 0">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <RouterLink :to="`/product/${item.slug}`" @click="cartStore.closeCart()" class="cart-item__img">
              <img :src="item.thumbnail" :alt="item.name" loading="lazy" />
            </RouterLink>
            <div class="cart-item__info">
              <RouterLink :to="`/product/${item.slug}`" @click="cartStore.closeCart()" class="cart-item__name">
                {{ item.name }}
              </RouterLink>
              <div class="cart-item__price">
                {{ formatPrice(item.price) }}
                <span v-if="item.originalPrice" class="cart-item__original">{{ formatPrice(item.originalPrice) }}</span>
              </div>
              <div class="cart-item__controls">
                <div class="qty-control">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="qty-control__btn">−</button>
                  <span class="qty-control__val">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" :disabled="item.quantity >= item.stock" class="qty-control__btn">+</button>
                </div>
                <button class="cart-item__remove" @click="cartStore.removeItem(item.id)">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
            </div>
            <div class="cart-item__total">{{ formatPrice(item.price * item.quantity) }}</div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="cart-sidebar__empty">
          <div class="empty-state">
            <div class="empty-state__icon">🛒</div>
            <p class="empty-state__title">Votre panier est vide</p>
            <p class="empty-state__text">Découvrez nos jouets et remplissez votre panier !</p>
            <RouterLink to="/shop" class="btn btn--primary" @click="cartStore.closeCart()">
              Voir la boutique
            </RouterLink>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartStore.items.length > 0" class="cart-sidebar__footer">
          <div v-if="cartStore.savings > 0" class="cart-savings">
            🎉 Vous économisez {{ formatPrice(cartStore.savings) }}
          </div>
          <div class="cart-totals">
            <div class="cart-totals__row">
              <span>Sous-total</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div class="cart-totals__row">
              <span>Livraison</span>
              <span :class="{ 'free': cartStore.shipping === 0 }">
                {{ cartStore.shipping === 0 ? 'Gratuite' : formatPrice(cartStore.shipping) }}
              </span>
            </div>
            <div class="cart-totals__row cart-totals__row--total">
              <span>Total</span>
              <span>{{ formatPrice(cartStore.total) }}</span>
            </div>
          </div>
          <div class="cart-sidebar__ctas">
            <RouterLink to="/cart" class="btn btn--outline btn--full" @click="cartStore.closeCart()">
              Voir le panier
            </RouterLink>
            <RouterLink to="/checkout" class="btn btn--primary btn--full" @click="cartStore.closeCart()">
              Commander →
            </RouterLink>
          </div>
          <p class="cart-sidebar__secure">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1l-9 4v6c0 5.25 3.75 10.15 9 11.5C17.25 21.15 21 16.25 21 11V5L12 1z"/></svg>
            Paiement 100% sécurisé · Retour 30 jours
          </p>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useCartStore } from '../../stores/cart.js';

const cartStore = useCartStore();

function formatPrice(price) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(price);
}
</script>

<style lang="scss" scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 100vw;
  background: var(--color-white);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--color-border);
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.0625rem;
    font-weight: 700;
  }

  &__count {
    background: var(--color-primary);
    color: #fff;
    font-size: 0.6875rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 10px;
  }

  &__close {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    background: var(--color-bg);
    transition: background 0.15s;

    &:hover { background: var(--color-border); }
  }

  &__delivery {
    padding: 12px 24px;
    background: #FFF8F0;
    font-size: 0.8125rem;
    font-weight: 500;
    border-bottom: 1px solid var(--color-border);

    &--free {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #F0FFF4;
      color: var(--color-success);
    }
  }

  &__items {
    flex: 1;
    overflow-y: auto;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__footer {
    padding: 20px 24px;
    border-top: 1px solid var(--color-border);
    background: #FAFAFA;
  }

  &__ctas {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 16px;
  }

  &__secure {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: 12px;
    text-align: center;
  }
}

.delivery-progress {
  &__text { font-size: 0.8125rem; margin-bottom: 8px; }
  &__bar { height: 6px; background: #FFE0B2; border-radius: 3px; overflow: hidden; }
  &__fill { height: 100%; background: var(--color-secondary); border-radius: 3px; transition: width 0.4s ease; }
}

.cart-item {
  display: flex;
  gap: 12px;

  &__img {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid var(--color-border);

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  &__info { flex: 1; min-width: 0; }

  &__name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-text);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 4px;

    &:hover { color: var(--color-primary); }
  }

  &__price {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__original {
    font-size: 0.75rem;
    text-decoration: line-through;
    color: var(--color-text-muted);
    font-weight: 400;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
  }

  &__remove {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    color: var(--color-text-muted);
    transition: var(--transition);

    &:hover { background: #FEF2F2; color: #EF4444; }
  }

  &__total {
    font-weight: 700;
    font-size: 0.9375rem;
    white-space: nowrap;
    color: var(--color-dark);
  }
}

.qty-control {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;

  &__btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    background: #F9FAFB;
    transition: background 0.15s;

    &:hover:not(:disabled) { background: var(--color-border); }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  }

  &__val {
    width: 32px;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    border-left: 1.5px solid var(--color-border);
    border-right: 1.5px solid var(--color-border);
  }
}

.cart-savings {
  background: #FFF8F0;
  border: 1px solid #FFE0B2;
  border-radius: var(--radius-md);
  padding: 8px 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-secondary);
  margin-bottom: 12px;
}

.cart-totals {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__row {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--color-text-muted);

    .free { color: var(--color-success); font-weight: 600; }

    &--total {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-dark);
      padding-top: 10px;
      border-top: 1.5px solid var(--color-border);
      margin-top: 4px;
    }
  }
}
</style>
