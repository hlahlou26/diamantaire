<template>
  <section class="hero">
    <div class="hero__slider">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="hero__slide"
        :class="{ active: currentSlide === index }"
        :style="{ background: slide.bg }"
      >
        <div class="container hero__content">
          <div class="hero__text">
            <span class="hero__tag">{{ slide.tag }}</span>
            <h1 class="hero__title" v-html="slide.title"></h1>
            <p class="hero__desc">{{ slide.desc }}</p>
            <div class="hero__actions">
              <RouterLink :to="slide.link" class="btn btn--primary btn--lg">
                {{ slide.cta }}
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
              </RouterLink>
              <RouterLink to="/shop?filter=promo" class="btn btn--white btn--lg">
                Voir les promos
              </RouterLink>
            </div>
            <div class="hero__stats">
              <div v-for="stat in slide.stats" :key="stat.label" class="hero__stat">
                <strong>{{ stat.value }}</strong>
                <span>{{ stat.label }}</span>
              </div>
            </div>
          </div>
          <div class="hero__visual">
            <div class="hero__img-wrap">
              <img :src="slide.image" :alt="slide.title" loading="eager" />
              <div class="hero__badge-float hero__badge-float--1">
                <span>{{ slide.badge1 }}</span>
              </div>
              <div class="hero__badge-float hero__badge-float--2">
                <span>🚚 Livraison 1h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <button class="hero__prev" @click="prevSlide">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button class="hero__next" @click="nextSlide">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <!-- Dots -->
      <div class="hero__dots">
        <button
          v-for="(_, i) in slides"
          :key="i"
          class="hero__dot"
          :class="{ active: currentSlide === i }"
          @click="goToSlide(i)"
        />
      </div>
    </div>

    <!-- Quick Category Chips -->
    <div class="hero__chips">
      <div class="container">
        <div class="chips-row">
          <RouterLink
            v-for="cat in quickCats"
            :key="cat.slug"
            :to="`/category/${cat.slug}`"
            class="chip"
          >
            <span>{{ cat.icon }}</span>
            {{ cat.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { categories } from '../../data/categories.js';

const currentSlide = ref(0);
let timer = null;

const slides = [
  {
    bg: 'linear-gradient(135deg, #E8001C 0%, #FF4D6D 50%, #FF6B35 100%)',
    tag: '🎉 Fête des enfants',
    title: 'Le Plus Grand Choix<br>de Jouets au Maroc',
    desc: 'Plus de 5 000 jouets disponibles. Livraison express en 1h à Casablanca !',
    cta: 'Découvrir la boutique',
    link: '/shop',
    image: 'https://placehold.co/540x420/FFFFFF/E8001C?text=🧸+Jouets+MyToys',
    badge1: '⭐ 4.9/5 – 10 000+ avis',
    stats: [
      { value: '5 000+', label: 'Produits' },
      { value: '1h', label: 'Livraison Casa' },
      { value: '10K+', label: 'Clients satisfaits' },
    ],
  },
  {
    bg: 'linear-gradient(135deg, #1E3A5F 0%, #2E6DB4 100%)',
    tag: '🧱 Collection LEGO',
    title: 'Construisez des Mondes<br>Extraordinaires',
    desc: 'Découvrez toute la gamme LEGO City, Technic, Star Wars et plus encore.',
    cta: 'Explorer LEGO',
    link: '/category/lego',
    image: 'https://placehold.co/540x420/FFFFFF/1E3A5F?text=🧱+LEGO+Collection',
    badge1: '🆕 Nouveautés 2025',
    stats: [
      { value: '124', label: 'Sets LEGO' },
      { value: '30%', label: 'Réduction max' },
      { value: '2j', label: 'Délai livraison' },
    ],
  },
  {
    bg: 'linear-gradient(135deg, #FF6B35 0%, #F7C59F 100%)',
    tag: '🔥 Soldes d\'été',
    title: 'Jusqu\'à <span style="color:#FFD700">-50%</span><br>sur les Bestsellers',
    desc: 'Profitez de nos meilleures offres sur une sélection de jouets premium.',
    cta: 'Voir les promotions',
    link: '/shop?filter=promo',
    image: 'https://placehold.co/540x420/FFFFFF/FF6B35?text=🔥+Soldes+-50%',
    badge1: '⏳ Offres limitées',
    stats: [
      { value: '-50%', label: 'Réduction max' },
      { value: '200+', label: 'Articles soldés' },
      { value: '24h', label: 'Livraison Maroc' },
    ],
  },
];

const quickCats = categories.slice(0, 8);

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
  resetTimer();
}
function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
  resetTimer();
}
function goToSlide(i) {
  currentSlide.value = i;
  resetTimer();
}
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 5500);
}

onMounted(() => { timer = setInterval(nextSlide, 5500); });
onUnmounted(() => clearInterval(timer));
</script>

<style lang="scss" scoped>
.hero {
  &__slider { position: relative; overflow: hidden; min-height: 480px; }

  &__slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.6s ease;
    display: flex;
    align-items: center;

    &.active { opacity: 1; position: relative; }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 40px;
    padding: 64px 32px;
    min-height: 480px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      padding: 40px 16px;
      text-align: center;
    }
  }

  &__text { color: #fff; }

  &__tag {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    padding: 6px 16px;
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #fff;
  }

  &__title {
    font-family: var(--font-primary);
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 16px;
    color: #fff;
    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
  }

  &__desc {
    font-size: 1.0625rem;
    opacity: 0.9;
    margin-bottom: 28px;
    max-width: 420px;

    @media (max-width: 768px) { margin: 0 auto 28px; }
  }

  &__actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    @media (max-width: 768px) { justify-content: center; }
  }

  &__stats {
    display: flex;
    gap: 28px;
    margin-top: 32px;

    @media (max-width: 768px) { justify-content: center; }
  }

  &__stat {
    text-align: center;

    strong {
      display: block;
      font-size: 1.375rem;
      font-weight: 800;
      color: var(--color-accent);
    }
    span { font-size: 0.75rem; opacity: 0.8; }
  }

  &__visual {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) { display: none; }
  }

  &__img-wrap {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: visible;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(20px);
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);

    img {
      width: 100%;
      max-width: 420px;
      border-radius: var(--radius-lg);
    }
  }

  &__badge-float {
    position: absolute;
    background: #fff;
    border-radius: var(--radius-md);
    padding: 8px 14px;
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--color-dark);
    box-shadow: var(--shadow-md);
    white-space: nowrap;

    &--1 { top: -10px; right: -10px; color: var(--color-primary); }
    &--2 { bottom: 10px; left: -16px; }
  }

  &__prev, &__next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: var(--radius-full);
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    z-index: 10;

    &:hover { background: rgba(255,255,255,0.35); }

    @media (max-width: 480px) { display: none; }
  }

  &__prev { left: 16px; }
  &__next { right: 16px; }

  &__dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: rgba(255,255,255,0.4);
    transition: var(--transition);

    &.active { width: 24px; background: #fff; }
  }

  &__chips { padding: 12px 0; background: var(--color-bg); border-bottom: 1px solid var(--color-border); }
}

.chips-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: var(--radius-full);
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  transition: var(--transition);

  &:hover { border-color: var(--color-primary); color: var(--color-primary); background: rgba(232,0,28,0.04); }
}
</style>
