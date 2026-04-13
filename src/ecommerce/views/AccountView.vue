<template>
  <div class="account-page">
    <div class="container">
      <div class="account-layout">
        <!-- Sidebar -->
        <aside class="account-sidebar">
          <div class="account-sidebar__profile">
            <div class="account-avatar">A</div>
            <div>
              <strong>Asmae Benali</strong>
              <span>asmae@exemple.ma</span>
            </div>
          </div>
          <nav class="account-nav">
            <button v-for="tab in tabs" :key="tab.id" class="account-nav__item" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
              <span>{{ tab.icon }}</span>
              {{ tab.label }}
              <span v-if="tab.badge" class="account-nav__badge">{{ tab.badge }}</span>
            </button>
          </nav>
          <button class="btn btn--ghost btn--full" style="margin-top: 16px; color: #EF4444">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Déconnexion
          </button>
        </aside>

        <!-- Content -->
        <main class="account-content">
          <!-- Dashboard -->
          <div v-if="activeTab === 'dashboard'">
            <h2 class="account-content__title">Tableau de bord</h2>
            <div class="account-stats">
              <div v-for="stat in accountStats" :key="stat.label" class="account-stat">
                <span class="account-stat__icon">{{ stat.icon }}</span>
                <strong class="account-stat__val">{{ stat.value }}</strong>
                <span class="account-stat__label">{{ stat.label }}</span>
              </div>
            </div>
            <div class="recent-orders">
              <h3>Commandes récentes</h3>
              <div class="order-card" v-for="order in recentOrders" :key="order.id">
                <div class="order-card__header">
                  <span class="order-card__id">#{{ order.id }}</span>
                  <span class="order-card__date">{{ order.date }}</span>
                  <span class="order-badge" :class="`order-badge--${order.statusClass}`">{{ order.status }}</span>
                  <span class="order-card__total">{{ order.total }}</span>
                </div>
                <div class="order-card__items">
                  <span v-for="item in order.items" :key="item">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Orders -->
          <div v-if="activeTab === 'orders'">
            <h2 class="account-content__title">Mes commandes</h2>
            <div class="order-card" v-for="order in recentOrders" :key="order.id">
              <div class="order-card__header">
                <span class="order-card__id">#{{ order.id }}</span>
                <span class="order-card__date">{{ order.date }}</span>
                <span class="order-badge" :class="`order-badge--${order.statusClass}`">{{ order.status }}</span>
                <span class="order-card__total">{{ order.total }}</span>
              </div>
              <div class="order-card__items"><span v-for="item in order.items" :key="item">{{ item }}</span></div>
              <div class="order-card__actions">
                <button class="btn btn--ghost btn--sm">Voir le détail</button>
                <button class="btn btn--outline btn--sm">Suivre la livraison</button>
              </div>
            </div>
          </div>

          <!-- Profile -->
          <div v-if="activeTab === 'profile'">
            <h2 class="account-content__title">Mes informations</h2>
            <form class="profile-form" @submit.prevent>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Prénom</label><input type="text" value="Asmae" class="form-control" /></div>
                <div class="form-group"><label class="form-label">Nom</label><input type="text" value="Benali" class="form-control" /></div>
              </div>
              <div class="form-group"><label class="form-label">E-mail</label><input type="email" value="asmae@exemple.ma" class="form-control" /></div>
              <div class="form-group"><label class="form-label">Téléphone</label><input type="tel" value="+212 6 12 34 56 78" class="form-control" /></div>
              <div class="form-group"><label class="form-label">Date de naissance</label><input type="date" class="form-control" /></div>
              <button type="submit" class="btn btn--primary">Sauvegarder les modifications</button>
            </form>
          </div>

          <!-- Wishlist Tab -->
          <div v-if="activeTab === 'wishlist'">
            <h2 class="account-content__title">Ma liste de souhaits</h2>
            <div v-if="wishlistStore.items.length" class="products-grid">
              <ProductCard v-for="p in wishlistStore.items" :key="p.id" :product="p" />
            </div>
            <div v-else class="empty-state"><div class="empty-state__icon">❤️</div><p class="empty-state__title">Liste vide</p><RouterLink to="/shop" class="btn btn--primary">Découvrir des jouets</RouterLink></div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from '../components/product/ProductCard.vue';
import { useWishlistStore } from '../stores/wishlist.js';

const wishlistStore = useWishlistStore();
const activeTab = ref('dashboard');

const tabs = [
  { id: 'dashboard', icon: '🏠', label: 'Tableau de bord' },
  { id: 'orders', icon: '📦', label: 'Mes commandes', badge: 3 },
  { id: 'wishlist', icon: '❤️', label: 'Mes favoris' },
  { id: 'profile', icon: '👤', label: 'Mon profil' },
];

const accountStats = [
  { icon: '📦', value: '12', label: 'Commandes' },
  { icon: '❤️', value: '8', label: 'Favoris' },
  { icon: '⭐', value: '5', label: 'Avis donnés' },
  { icon: '💰', value: '3 420 MAD', label: 'Total dépensé' },
];

const recentOrders = [
  { id: 'MT-24891', date: '12 Avril 2025', status: 'Livré', statusClass: 'success', total: '549 MAD', items: ['LEGO City Station Spatiale'] },
  { id: 'MT-24756', date: '3 Avril 2025', status: 'En transit', statusClass: 'info', total: '299 MAD', items: ['Peluche Ours Polaire 80cm', 'Doudou Lapin Musical'] },
  { id: 'MT-24612', date: '24 Mars 2025', status: 'Livré', statusClass: 'success', total: '1 099 MAD', items: ['Barbie Dreamhouse'] },
];
</script>

<style lang="scss" scoped>
.account-page { padding: 32px 0 64px; background: var(--color-bg); min-height: calc(100vh - 180px); }

.account-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.account-sidebar {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: 20px;
  position: sticky;
  top: calc(var(--header-height) + 60px);

  &__profile { display: flex; align-items: center; gap: 14px; padding-bottom: 20px; border-bottom: 1px solid var(--color-border); margin-bottom: 16px;
    strong { display: block; font-size: 0.9375rem; font-weight: 700; }
    span { font-size: 0.8125rem; color: var(--color-text-muted); } }
}

.account-avatar { width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 700; flex-shrink: 0; }

.account-nav { display: flex; flex-direction: column; gap: 2px;
  &__item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.9375rem; color: var(--color-text); transition: var(--transition); text-align: left;
    &:hover { background: rgba(232,0,28,0.05); color: var(--color-primary); }
    &.active { background: rgba(232,0,28,0.08); color: var(--color-primary); font-weight: 600; }
  }
  &__badge { margin-left: auto; background: var(--color-primary); color: #fff; font-size: 0.6875rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; }
}

.account-content { background: var(--color-white); border-radius: var(--radius-xl); border: 1px solid var(--color-border); padding: 28px;
  &__title { font-family: var(--font-primary); font-size: 1.375rem; font-weight: 800; margin-bottom: 24px; }
}

.account-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px;
  @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
}

.account-stat { text-align: center; padding: 20px; background: var(--color-bg); border-radius: var(--radius-lg); border: 1px solid var(--color-border);
  &__icon { display: block; font-size: 1.75rem; margin-bottom: 8px; }
  &__val { display: block; font-size: 1.125rem; font-weight: 800; color: var(--color-dark); }
  &__label { display: block; font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px; }
}

.recent-orders h3 { font-size: 1rem; font-weight: 700; margin-bottom: 16px; }

.order-card { border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 12px;
  &__header { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 8px; }
  &__id { font-weight: 700; color: var(--color-dark); }
  &__date { font-size: 0.875rem; color: var(--color-text-muted); margin-right: auto; }
  &__total { font-weight: 700; color: var(--color-primary); margin-left: auto; }
  &__items { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;
    span { background: var(--color-bg); font-size: 0.8125rem; padding: 4px 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); } }
  &__actions { display: flex; gap: 8px; }
}

.order-badge { padding: 3px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700;
  &--success { background: #D1FAE5; color: #065F46; }
  &--info { background: #DBEAFE; color: #1E40AF; }
  &--warning { background: #FEF3C7; color: #92400E; }
}

.profile-form { max-width: 560px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; @media (max-width: 480px) { grid-template-columns: 1fr; } }
</style>
