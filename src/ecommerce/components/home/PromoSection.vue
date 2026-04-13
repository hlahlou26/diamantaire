<template>
  <section class="promo-section">
    <div class="container">
      <!-- Deal of the Day -->
      <div class="deal-banner">
        <div class="deal-banner__text">
          <span class="deal-banner__label">⏰ Offre du Jour</span>
          <h2 class="deal-banner__title">{{ dealProduct.name }}</h2>
          <p class="deal-banner__desc">{{ dealProduct.description?.slice(0, 100) }}...</p>
          <div class="deal-banner__price">
            <span class="deal-current">{{ formatPrice(dealProduct.price) }}</span>
            <span class="deal-original">{{ formatPrice(dealProduct.originalPrice) }}</span>
            <span class="deal-save">Économisez {{ formatPrice(dealProduct.originalPrice - dealProduct.price) }}</span>
          </div>
          <div class="deal-banner__countdown">
            <div v-for="unit in countdown" :key="unit.label" class="countdown-unit">
              <span class="countdown-unit__val">{{ unit.value }}</span>
              <span class="countdown-unit__label">{{ unit.label }}</span>
            </div>
          </div>
          <button class="btn btn--white btn--lg" @click="addDeal">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Profiter de l'offre
          </button>
        </div>
        <div class="deal-banner__img">
          <img :src="dealProduct.thumbnail" :alt="dealProduct.name" />
          <div class="deal-badge">-{{ dealProduct.discount }}%</div>
        </div>
      </div>

      <!-- 3 Promo Banners -->
      <div class="promo-grid">
        <RouterLink
          v-for="banner in promoBanners"
          :key="banner.id"
          :to="banner.link"
          class="promo-card"
          :style="{ background: banner.bg }"
        >
          <div class="promo-card__content">
            <span class="promo-card__tag">{{ banner.tag }}</span>
            <h3 class="promo-card__title">{{ banner.title }}</h3>
            <p class="promo-card__sub">{{ banner.sub }}</p>
            <span class="promo-card__cta">
              {{ banner.cta }}
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
          <div class="promo-card__emoji">{{ banner.emoji }}</div>
        </RouterLink>
      </div>

      <!-- Brand Logos -->
      <div class="brands-bar">
        <p class="brands-bar__title">Nos marques partenaires</p>
        <div class="brands-row">
          <div v-for="brand in brands" :key="brand" class="brand-chip">{{ brand }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '../../stores/cart.js';
import { getDiscountedProducts } from '../../data/products.js';

const cartStore = useCartStore();
const dealProduct = getDiscountedProducts()[0];

const promoBanners = [
  { id: 1, tag: '🧱 LEGO', title: 'Nouvelles Collections', sub: 'Jusqu\'à -30%', cta: 'Découvrir', link: '/category/lego', bg: 'linear-gradient(135deg, #1E3A5F 0%, #2E6DB4 100%)', emoji: '🧱' },
  { id: 2, tag: '🎂 Anniversaire', title: 'Idées Cadeaux', sub: 'Dès 49 MAD', cta: 'Voir les cadeaux', link: '/shop?filter=featured', bg: 'linear-gradient(135deg, #C0392B 0%, #E8001C 100%)', emoji: '🎁' },
  { id: 3, tag: '🚀 Nouveautés', title: 'Arrivages de la Semaine', sub: '50+ nouveaux produits', cta: 'Explorer', link: '/shop?filter=nouveau', bg: 'linear-gradient(135deg, #16A085 0%, #1ABC9C 100%)', emoji: '✨' },
];

const brands = ['LEGO', 'Barbie', 'Hot Wheels', 'Fisher-Price', 'VTech', 'Chicco', 'Ravensburger', 'Hasbro', 'Mattel', 'Steiff'];

function formatPrice(p) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(p);
}

function addDeal() {
  cartStore.addItem(dealProduct);
}

// Countdown timer
const endTime = ref(Date.now() + 18 * 3600 * 1000 + 42 * 60 * 1000 + 15 * 1000);
const now = ref(Date.now());
let timer = null;

const countdown = computed(() => {
  const diff = Math.max(0, endTime.value - now.value);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return [
    { value: String(h).padStart(2, '0'), label: 'Heures' },
    { value: String(m).padStart(2, '0'), label: 'Minutes' },
    { value: String(s).padStart(2, '0'), label: 'Secondes' },
  ];
});

onMounted(() => { timer = setInterval(() => (now.value = Date.now()), 1000); });
onUnmounted(() => clearInterval(timer));
</script>

<style lang="scss" scoped>
.promo-section { padding: 48px 0; background: var(--color-bg); }

.deal-banner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 24px;
  min-height: 320px;

  @media (max-width: 768px) { grid-template-columns: 1fr; }

  &__text {
    padding: 40px 44px;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: center;
  }

  &__label {
    display: inline-block;
    background: var(--color-primary);
    color: #fff;
    padding: 5px 14px;
    border-radius: var(--radius-full);
    font-size: 0.8125rem;
    font-weight: 700;
    width: fit-content;
  }

  &__title {
    font-family: var(--font-primary);
    font-size: clamp(1.25rem, 2.5vw, 1.625rem);
    font-weight: 800;
    line-height: 1.25;
  }

  &__desc {
    font-size: 0.875rem;
    opacity: 0.7;
  }

  &__price {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__countdown { display: flex; gap: 12px; align-items: center; }

  &__img {
    position: relative;
    background: rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;

    img { max-height: 260px; object-fit: contain; border-radius: var(--radius-lg); }

    @media (max-width: 768px) { min-height: 200px; }
  }
}

.deal-current { font-size: 1.625rem; font-weight: 800; color: var(--color-accent); }
.deal-original { font-size: 1rem; text-decoration: line-through; color: rgba(255,255,255,0.5); }
.deal-save { font-size: 0.8125rem; background: rgba(255,215,0,0.2); color: var(--color-accent); padding: 4px 10px; border-radius: var(--radius-full); font-weight: 600; }
.deal-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--color-primary);
  color: #fff;
  font-size: 1.125rem;
  font-weight: 800;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(232,0,28,0.5);
}

.countdown-unit {
  background: rgba(255,255,255,0.1);
  border-radius: var(--radius-md);
  padding: 8px 14px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.15);

  &__val { display: block; font-size: 1.375rem; font-weight: 800; color: var(--color-accent); line-height: 1; }
  &__label { display: block; font-size: 0.6875rem; color: rgba(255,255,255,0.6); margin-top: 4px; text-transform: uppercase; }
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.promo-card {
  border-radius: var(--radius-xl);
  padding: 28px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  transition: var(--transition-slow);
  min-height: 140px;

  &:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); .promo-card__emoji { transform: scale(1.15) rotate(10deg); } }

  &__content { color: #fff; }
  &__tag { display: block; font-size: 0.75rem; font-weight: 700; opacity: 0.85; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
  &__title { font-size: 1.125rem; font-weight: 800; margin-bottom: 4px; }
  &__sub { font-size: 0.875rem; opacity: 0.8; margin-bottom: 12px; }
  &__cta { display: flex; align-items: center; gap: 4px; font-size: 0.875rem; font-weight: 700; background: rgba(255,255,255,0.2); padding: 7px 14px; border-radius: var(--radius-full); width: fit-content; transition: background 0.2s; &:hover { background: rgba(255,255,255,0.3); } }

  &__emoji { font-size: 3.5rem; opacity: 0.8; transition: transform 0.3s ease; flex-shrink: 0; }
}

.brands-bar {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  border: 1px solid var(--color-border);

  &__title { font-size: 0.8125rem; font-weight: 600; color: var(--color-text-muted); text-align: center; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.06em; }
}

.brands-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.brand-chip {
  padding: 7px 18px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-text-muted);
  transition: var(--transition);
  cursor: default;

  &:hover { border-color: var(--color-primary); color: var(--color-primary); }
}
</style>
