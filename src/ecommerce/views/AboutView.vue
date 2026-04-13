<template>
  <div class="about-page">
    <div class="about-hero">
      <div class="container">
        <h1>À Propos de MyToys</h1>
        <p>Votre spécialiste des jouets au Maroc depuis 2010</p>
      </div>
    </div>
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h2>Notre Histoire</h2>
          <p>Fondée en 2010 à Casablanca, MyToys est née de la passion d'une famille pour l'univers du jeu et de l'éveil de l'enfant. Ce qui a commencé comme une petite boutique au Maarif est devenu le leader marocain de la vente de jouets en ligne.</p>
          <p>Avec plus de 5 000 références disponibles, nous proposons les meilleures marques mondiales – LEGO, Barbie, Fisher-Price, VTech, Chicco – à des prix compétitifs, avec une livraison express partout au Maroc.</p>
          <h2 style="margin-top: 32px">Notre Mission</h2>
          <p>Rendre le jouet de qualité accessible à toutes les familles marocaines, en offrant un service irréprochable, une livraison rapide et la garantie de produits authentiques et sécurisés.</p>
        </div>
        <div class="about-stats-grid">
          <div v-for="s in stats" :key="s.label" class="about-stat">
            <span class="about-stat__icon">{{ s.icon }}</span>
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </div>
        </div>
      </div>

      <div class="team-section">
        <h2 class="section-title section-title--center">Notre Équipe</h2>
        <div class="team-grid">
          <div v-for="m in team" :key="m.name" class="team-card">
            <div class="team-card__avatar">{{ m.name[0] }}</div>
            <strong>{{ m.name }}</strong>
            <span>{{ m.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { icon: '🗓️', value: '14 ans', label: 'd\'expérience' },
  { icon: '📦', value: '5 000+', label: 'produits' },
  { icon: '😊', value: '50 000+', label: 'clients satisfaits' },
  { icon: '🚚', value: '1h', label: 'livraison à Casablanca' },
  { icon: '⭐', value: '4.9/5', label: 'note moyenne' },
  { icon: '🏪', value: '3', label: 'boutiques physiques' },
];
const team = [
  { name: 'Youssef Alami', role: 'Fondateur & Directeur Général' },
  { name: 'Nadia Bensouda', role: 'Directrice Commerciale' },
  { name: 'Karim Tazi', role: 'Responsable Logistique' },
  { name: 'Sara Mansouri', role: 'Responsable Service Client' },
];
</script>

<style scoped>
.about-page { padding-bottom: 64px; }
.about-hero { background: linear-gradient(135deg, #1A1A2E, var(--color-primary)); color: #fff; padding: 64px 0; text-align: center;
  h1 { font-family: var(--font-primary); font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
  p { font-size: 1.125rem; opacity: 0.85; }
}
.about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 56px 0; align-items: center; }
@media (max-width: 768px) { .about-content { grid-template-columns: 1fr; } }
.about-text h2 { font-family: var(--font-primary); font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; color: var(--color-dark); }
.about-text p { font-size: 1rem; color: var(--color-text-muted); line-height: 1.8; margin-bottom: 16px; }
.about-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.about-stat { text-align: center; padding: 20px; background: var(--color-bg); border-radius: var(--radius-lg); border: 1px solid var(--color-border);
  &__icon { font-size: 1.75rem; display: block; margin-bottom: 8px; }
  strong { display: block; font-size: 1.125rem; font-weight: 800; color: var(--color-primary); }
  span { font-size: 0.8125rem; color: var(--color-text-muted); }
}
.team-section { padding-bottom: 48px; }
.team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 36px; }
@media (max-width: 768px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
.team-card { text-align: center; padding: 28px 20px; border-radius: var(--radius-xl); border: 1px solid var(--color-border); background: var(--color-white);
  strong { display: block; font-size: 0.9375rem; font-weight: 700; margin-top: 12px; }
  span { font-size: 0.8125rem; color: var(--color-text-muted); }
  &__avatar { width: 64px; height: 64px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; margin: 0 auto; }
}
</style>
