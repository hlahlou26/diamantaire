<template>
  <div class="header-wrapper">
    <!-- Top Bar -->
    <div class="topbar">
      <div class="container topbar__inner">
        <div class="topbar__left">
          <span>🚚 Livraison Express 1h à Casablanca</span>
          <span class="topbar__sep">|</span>
          <span>📞 +212 5 22 XX XX XX</span>
        </div>
        <div class="topbar__right">
          <a href="#">Suivi commande</a>
          <span class="topbar__sep">|</span>
          <a href="#">Aide</a>
          <span class="topbar__sep">|</span>
          <RouterLink to="/login">Connexion</RouterLink>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <header class="header" :class="{ 'header--scrolled': isScrolled, 'header--menu-open': mobileMenuOpen }">
      <div class="container header__inner">

        <!-- Logo -->
        <RouterLink to="/" class="header__logo">
          <div class="logo">
            <span class="logo__icon">🧸</span>
            <div>
              <span class="logo__name">MyToys</span>
              <span class="logo__tagline">Maroc</span>
            </div>
          </div>
        </RouterLink>

        <!-- Search Bar -->
        <form class="header__search" @submit.prevent="handleSearch">
          <div class="search-box">
            <select v-model="searchCategory" class="search-box__cat">
              <option value="">Toutes catégories</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.slug">{{ cat.name }}</option>
            </select>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher jouets, marques..."
              class="search-box__input"
              @keyup.enter="handleSearch"
            />
            <button type="submit" class="search-box__btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>
        </form>

        <!-- Header Actions -->
        <div class="header__actions">
          <RouterLink to="/account" class="header__action" title="Mon compte">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="header__action-label">Compte</span>
          </RouterLink>
          <RouterLink to="/wishlist" class="header__action" title="Ma liste">
            <div class="header__action-wrap">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span v-if="wishlistStore.totalItems > 0" class="header__badge">{{ wishlistStore.totalItems }}</span>
            </div>
            <span class="header__action-label">Favoris</span>
          </RouterLink>
          <button class="header__action header__cart-btn" @click="cartStore.toggleCart()">
            <div class="header__action-wrap">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span v-if="cartStore.totalItems > 0" class="header__badge header__badge--red">{{ cartStore.totalItems }}</span>
            </div>
            <span class="header__action-label">Panier</span>
          </button>

          <!-- Mobile menu toggle -->
          <button class="header__burger" @click="toggleMobileMenu" :class="{ active: mobileMenuOpen }">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="nav" :class="{ 'nav--open': mobileMenuOpen }">
        <div class="container nav__inner">
          <ul class="nav__list">
            <li class="nav__item nav__item--all">
              <button class="nav__link nav__link--all" @click="toggleAllCats">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                Toutes catégories
                <svg class="nav__chevron" :class="{ rotate: allCatsOpen }" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <Transition name="fade">
                <div v-if="allCatsOpen" class="megamenu megamenu--all">
                  <div class="container">
                    <div class="megamenu__grid">
                      <RouterLink
                        v-for="cat in categories"
                        :key="cat.id"
                        :to="`/category/${cat.slug}`"
                        class="megamenu__cat-item"
                        @click="closeAll"
                      >
                        <span class="megamenu__cat-icon">{{ cat.icon }}</span>
                        <span>{{ cat.name }}</span>
                        <small>{{ cat.count }} produits</small>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </Transition>
            </li>
            <li v-for="cat in featuredCategories" :key="cat.id" class="nav__item nav__item--mega">
              <RouterLink :to="`/category/${cat.slug}`" class="nav__link" @click="closeAll">
                {{ cat.name }}
              </RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/shop?filter=promo" class="nav__link nav__link--promo" @click="closeAll">
                🔥 Promotions
              </RouterLink>
            </li>
            <li class="nav__item">
              <RouterLink to="/shop?filter=nouveau" class="nav__link nav__link--new" @click="closeAll">
                ✨ Nouveautés
              </RouterLink>
            </li>
          </ul>

          <div class="nav__delivery">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Livraison gratuite dès 500 MAD
          </div>
        </div>
      </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div v-if="mobileMenuOpen" class="sidebar-overlay" @click="closeAll" />
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart.js';
import { useWishlistStore } from '../../stores/wishlist.js';
import { categories, getFeaturedCategories } from '../../data/categories.js';

const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const searchQuery = ref('');
const searchCategory = ref('');
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const allCatsOpen = ref(false);

const featuredCategories = computed(() => getFeaturedCategories().slice(0, 6));

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
    searchQuery.value = '';
    closeAll();
  }
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  document.body.classList.toggle('sidebar-open', mobileMenuOpen.value);
}

function toggleAllCats() {
  allCatsOpen.value = !allCatsOpen.value;
}

function closeAll() {
  mobileMenuOpen.value = false;
  allCatsOpen.value = false;
  document.body.classList.remove('sidebar-open');
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style lang="scss" scoped>
.header-wrapper { position: sticky; top: 0; z-index: 800; }

.topbar {
  background: var(--color-dark);
  color: rgba(255,255,255,0.85);
  font-size: 0.75rem;

  @media (max-width: 767px) { display: none; }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
  }
  &__left, &__right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__sep { opacity: 0.3; }
  &__right a:hover { color: var(--color-accent); }
}

.header {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  transition: box-shadow 0.2s;

  &--scrolled { box-shadow: var(--shadow-md); }

  &__inner {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 68px;
  }

  &__logo { flex-shrink: 0; }

  &__search {
    flex: 1;
    max-width: 560px;
    @media (max-width: 767px) { display: none; }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
  }

  &__action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 10px;
    border-radius: var(--radius-md);
    color: var(--color-text);
    transition: var(--transition);
    cursor: pointer;
    position: relative;

    &:hover { color: var(--color-primary); background: rgba(232,0,28,0.05); }
  }

  &__action-wrap { position: relative; }

  &__action-label {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    @media (max-width: 480px) { display: none; }
  }

  &__badge {
    position: absolute;
    top: -6px;
    right: -8px;
    background: var(--color-primary);
    color: #fff;
    font-size: 0.625rem;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border: 2px solid #fff;

    &--red { background: var(--color-primary); }
  }

  &__cart-btn { background: none; border: none; }

  &__burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 8px;
    border-radius: var(--radius-sm);

    @media (max-width: 767px) { display: flex; }

    span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--color-dark);
      border-radius: 1px;
      transition: var(--transition);
    }

    &.active {
      span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;

  &__icon { font-size: 2rem; }
  &__name {
    display: block;
    font-family: var(--font-primary);
    font-size: 1.375rem;
    font-weight: 800;
    color: var(--color-primary);
    line-height: 1.1;
  }
  &__tagline {
    display: block;
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
}

.search-box {
  display: flex;
  align-items: stretch;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  transition: border-color 0.2s;

  &:focus-within { border-color: var(--color-primary); }

  &__cat {
    padding: 0 12px;
    border: none;
    border-right: 1px solid var(--color-border);
    background: #F9FAFB;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    cursor: pointer;
    outline: none;
    appearance: none;
    max-width: 140px;

    @media (max-width: 900px) { display: none; }
  }

  &__input {
    flex: 1;
    padding: 10px 16px;
    border: none;
    font-size: 0.9375rem;
    outline: none;

    &::placeholder { color: #9CA3AF; }
  }

  &__btn {
    padding: 0 18px;
    background: var(--color-primary);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;

    &:hover { background: var(--color-primary-dark); }
  }
}

.nav {
  background: var(--color-white);
  border-top: 1px solid var(--color-border);

  @media (max-width: 767px) {
    display: none;
    &--open { display: block; }
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;

    @media (max-width: 767px) {
      height: auto;
      flex-direction: column;
      align-items: stretch;
      padding: 8px 16px 16px;
    }
  }

  &__list {
    display: flex;
    align-items: center;
    gap: 0;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__item { position: relative; }

  &__link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 14px;
    height: 46px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    transition: color 0.15s;
    white-space: nowrap;
    cursor: pointer;

    @media (max-width: 767px) { height: 44px; border-bottom: 1px solid var(--color-border); }

    &:hover { color: var(--color-primary); }
    &--all { background: var(--color-primary); color: #fff; border-radius: var(--radius-sm); margin-right: 4px;
      &:hover { background: var(--color-primary-dark); color: #fff; } }
    &--promo { color: var(--color-primary); font-weight: 700; }
    &--new { color: var(--color-secondary); font-weight: 700; }
    &.router-link-active { color: var(--color-primary); font-weight: 600; }
  }

  &__chevron { transition: transform 0.2s; &.rotate { transform: rotate(180deg); } }

  &__delivery {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: var(--color-success);
    font-weight: 600;
    white-space: nowrap;
    @media (max-width: 900px) { display: none; }
  }
}

.megamenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-white);
  box-shadow: var(--shadow-xl);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  z-index: 500;
  width: 640px;
  border: 1px solid var(--color-border);
  border-top: none;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    padding: 16px;
  }

  &__cat-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: var(--radius-md);
    transition: background 0.15s;
    font-size: 0.875rem;
    font-weight: 500;

    &:hover { background: rgba(232,0,28,0.05); color: var(--color-primary); }

    small {
      margin-left: auto;
      font-size: 0.6875rem;
      color: var(--color-text-muted);
    }
  }

  &__cat-icon { font-size: 1.25rem; }
}
</style>
