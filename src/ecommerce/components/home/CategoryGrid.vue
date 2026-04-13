<template>
  <section class="section cat-section">
    <div class="container">
      <div class="cat-section__header">
        <h2 class="section-title">Nos Catégories</h2>
        <RouterLink to="/shop" class="btn btn--ghost">
          Voir tout
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
        </RouterLink>
      </div>
      <p class="section-subtitle">Trouvez le jouet parfait parmi nos {{ categories.length }} catégories</p>

      <div class="cat-grid">
        <RouterLink
          v-for="cat in categories"
          :key="cat.id"
          :to="`/category/${cat.slug}`"
          class="cat-card"
          :style="{ '--cat-color': catColors[cat.id % catColors.length] }"
        >
          <div class="cat-card__img">
            <img :src="cat.image" :alt="cat.name" loading="lazy" />
            <div class="cat-card__overlay" />
          </div>
          <div class="cat-card__body">
            <span class="cat-card__icon">{{ cat.icon }}</span>
            <h3 class="cat-card__name">{{ cat.name }}</h3>
            <p class="cat-card__count">{{ cat.count }} produits</p>
          </div>
          <div class="cat-card__arrow">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { categories } from '../../data/categories.js';
const catColors = ['#E8001C', '#FF6B35', '#FF69B4', '#1E90FF', '#9B59B6', '#27AE60', '#F39C12', '#16A085', '#E74C3C', '#F1C40F', '#8E44AD', '#2C3E50'];
</script>

<style lang="scss" scoped>
.cat-section {
  background: var(--color-bg);
  padding: 56px 0;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 4px;
  }
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 640px) { grid-template-columns: repeat(3, 1fr); gap: 10px; }
  @media (max-width: 360px) { grid-template-columns: repeat(2, 1fr); }
}

.cat-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  transition: var(--transition-slow);
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    transform: translateY(-4px);
    border-color: transparent;

    .cat-card__overlay { opacity: 0.7; }
    .cat-card__img img { transform: scale(1.06); }
    .cat-card__arrow { opacity: 1; transform: translateX(0); }
  }

  &__img {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;

    img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: var(--cat-color, var(--color-primary));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__body {
    padding: 12px 12px 10px;
    text-align: center;
  }

  &__icon {
    font-size: 1.375rem;
    display: block;
    margin-bottom: 4px;
  }

  &__name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--color-dark);
    line-height: 1.3;
  }

  &__count {
    font-size: 0.6875rem;
    color: var(--color-text-muted);
    margin-top: 2px;
  }

  &__arrow {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    background: #fff;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cat-color, var(--color-primary));
    opacity: 0;
    transform: translateX(6px);
    transition: var(--transition);
  }
}
</style>
