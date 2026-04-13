<template>
  <div class="home">
    <HeroBanner />
    <CategoryGrid />

    <!-- Flash Sales Strip -->
    <div class="flash-strip">
      <div class="container flash-strip__inner">
        <div class="flash-strip__label">
          <span>⚡</span> Vente Flash
        </div>
        <div class="flash-strip__items">
          <RouterLink
            v-for="p in flashItems"
            :key="p.id"
            :to="`/product/${p.slug}`"
            class="flash-item"
          >
            <img :src="p.thumbnail" :alt="p.name" />
            <div>
              <span class="flash-item__name">{{ p.name }}</span>
              <span class="flash-item__price">{{ formatPrice(p.price) }}</span>
            </div>
            <span class="flash-item__badge">-{{ p.discount }}%</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <FeaturedProducts />
    <PromoSection />

    <!-- Bestsellers Banner -->
    <section class="section">
      <div class="container">
        <div class="section-header-row">
          <div>
            <h2 class="section-title">🔥 Meilleures Ventes</h2>
            <p class="section-subtitle">Les jouets préférés de nos clients cette semaine</p>
          </div>
          <RouterLink to="/shop?filter=bestseller" class="btn btn--outline">Voir tout →</RouterLink>
        </div>
        <div class="products-grid">
          <ProductCard
            v-for="product in bestsellers"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="section" style="background: var(--color-bg);">
      <div class="container">
        <div class="section-header-row">
          <div>
            <h2 class="section-title">✨ Nouveautés</h2>
            <p class="section-subtitle">Découvrez les derniers arrivages</p>
          </div>
          <RouterLink to="/shop?filter=nouveau" class="btn btn--outline">Voir tout →</RouterLink>
        </div>
        <div class="products-grid">
          <ProductCard
            v-for="product in newArrivals"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section why-us">
      <div class="container">
        <h2 class="section-title section-title--center">Pourquoi choisir MyToys ?</h2>
        <p class="section-subtitle" style="text-align:center">La confiance de plus de 10 000 familles marocaines</p>
        <div class="why-grid">
          <div v-for="reason in reasons" :key="reason.title" class="why-card">
            <div class="why-card__icon">{{ reason.icon }}</div>
            <h3 class="why-card__title">{{ reason.title }}</h3>
            <p class="why-card__text">{{ reason.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section testimonials" style="background: var(--color-bg);">
      <div class="container">
        <h2 class="section-title section-title--center">Ce que disent nos clients</h2>
        <div class="testimonials-grid">
          <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
            <div class="testimonial-card__stars">
              <span v-for="i in 5" :key="i">★</span>
            </div>
            <p class="testimonial-card__text">"{{ t.text }}"</p>
            <div class="testimonial-card__author">
              <div class="testimonial-card__avatar">{{ t.name[0] }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.city }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroBanner from '../components/home/HeroBanner.vue';
import CategoryGrid from '../components/home/CategoryGrid.vue';
import FeaturedProducts from '../components/home/FeaturedProducts.vue';
import PromoSection from '../components/home/PromoSection.vue';
import ProductCard from '../components/product/ProductCard.vue';
import { getBestsellerProducts, getNewProducts, getDiscountedProducts } from '../data/products.js';

const bestsellers = getBestsellerProducts().slice(0, 4);
const newArrivals = getNewProducts().slice(0, 4);
const flashItems = getDiscountedProducts().slice(0, 5);

function formatPrice(p) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(p);
}

const reasons = [
  { icon: '🚚', title: 'Livraison Express', text: 'Livraison en 1h à Casablanca et 24h partout au Maroc. Suivi en temps réel de votre colis.' },
  { icon: '✅', title: 'Produits Certifiés', text: 'Tous nos jouets sont certifiés CE, conformes aux normes de sécurité européennes et marocaines.' },
  { icon: '💳', title: 'Paiement Sécurisé', text: 'Paiement en ligne sécurisé SSL, en espèces, CMI, PayPal ou livraison contre remboursement.' },
  { icon: '🔄', title: 'Retour Gratuit', text: 'Vous avez 30 jours pour retourner votre commande. Remboursement rapide garanti.' },
  { icon: '🎁', title: 'Emballage Cadeau', text: 'Option emballage cadeau disponible pour toutes les commandes. Parfait pour les anniversaires.' },
  { icon: '⭐', title: 'Service Client 7j/7', text: 'Notre équipe est disponible 7j/7 par chat, téléphone et WhatsApp pour vous accompagner.' },
];

const testimonials = [
  { name: 'Fatima Z.', city: 'Casablanca', text: 'Super boutique ! J\'ai commandé un LEGO pour l\'anniversaire de mon fils, livraison en moins de 2h. Emballage impeccable, mon fils est ravi !' },
  { name: 'Mohamed A.', city: 'Rabat', text: 'Très bonne sélection de jouets. Les prix sont compétitifs et la qualité est au rendez-vous. Je recommande vivement MyToys à tous les parents !' },
  { name: 'Khadija B.', city: 'Marrakech', text: 'J\'ai trouvé exactement ce que je cherchais. Le service client est très réactif et m\'a aidée à choisir le bon puzzle pour ma fille de 6 ans.' },
  { name: 'Youssef H.', city: 'Fès', text: 'Livraison rapide, produits authentiques. La trottinette électrique commandée est parfaite. Mon fils de 8 ans ne la quitte plus !' },
  { name: 'Amina L.', city: 'Agadir', text: 'Excellent rapport qualité-prix. Les peluches sont adorables et très douces. L\'emballage cadeau était magnifique, parfait pour offrir.' },
  { name: 'Omar R.', city: 'Tanger', text: 'Cinquième commande sur MyToys et toujours aussi satisfait. La commande du Monopoly Maroc était rapide et le jeu est de très bonne qualité.' },
];
</script>

<style lang="scss" scoped>
.home {}

.flash-strip {
  background: var(--color-dark);
  padding: 12px 0;
  overflow: hidden;

  &__inner {
    display: flex;
    align-items: center;
    gap: 20px;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 800;
    font-size: 0.875rem;
    color: var(--color-accent);
    white-space: nowrap;
    padding-right: 20px;
    border-right: 1px solid rgba(255,255,255,0.2);
    flex-shrink: 0;
  }

  &__items {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
}

.flash-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px 6px 6px;
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  transition: var(--transition);
  white-space: nowrap;
  position: relative;
  flex-shrink: 0;

  &:hover { background: rgba(255,255,255,0.14); }

  img { width: 36px; height: 36px; object-fit: cover; border-radius: 6px; }

  &__name { display: block; font-size: 0.75rem; color: rgba(255,255,255,0.8); max-width: 140px; overflow: hidden; text-overflow: ellipsis; }
  &__price { display: block; font-size: 0.875rem; font-weight: 700; color: var(--color-accent); }
  &__badge { background: var(--color-primary); color: #fff; font-size: 0.6875rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
}

.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.why-us { background: var(--color-white); }

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;

  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}

.why-card {
  text-align: center;
  padding: 32px 24px;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: var(--color-white);
  transition: var(--transition-slow);

  &:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); border-color: transparent; }

  &__icon { font-size: 2.5rem; margin-bottom: 16px; }
  &__title { font-size: 1rem; font-weight: 700; color: var(--color-dark); margin-bottom: 10px; }
  &__text { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.7; }
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.testimonial-card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: 24px;
  border: 1px solid var(--color-border);
  transition: var(--transition-slow);

  &:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

  &__stars { color: var(--color-accent-dark); font-size: 0.875rem; margin-bottom: 12px; }
  &__text { font-size: 0.9375rem; color: var(--color-text); line-height: 1.7; margin-bottom: 20px; font-style: italic; }
  &__author { display: flex; align-items: center; gap: 12px;
    strong { display: block; font-size: 0.9375rem; font-weight: 700; }
    span { font-size: 0.8125rem; color: var(--color-text-muted); }
  }
  &__avatar { width: 42px; height: 42px; border-radius: var(--radius-full); background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 700; flex-shrink: 0; }
}
</style>
