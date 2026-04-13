<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found__content">
        <div class="not-found__emoji">🧸</div>
        <h1>404</h1>
        <h2>Page introuvable</h2>
        <p>Oups ! La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <div class="not-found__actions">
          <RouterLink to="/" class="btn btn--primary btn--lg">Retour à l'accueil</RouterLink>
          <RouterLink to="/shop" class="btn btn--outline btn--lg">Voir la boutique</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.not-found { min-height: 70vh; display: flex; align-items: center; background: var(--color-bg); }
.not-found__content { max-width: 480px; margin: 0 auto; text-align: center; padding: 64px 24px; }
.not-found__emoji { font-size: 5rem; margin-bottom: 16px; }
h1 { font-family: var(--font-primary); font-size: 6rem; font-weight: 900; color: var(--color-primary); line-height: 1; margin-bottom: 8px; }
h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; }
p { color: var(--color-text-muted); margin-bottom: 32px; font-size: 1rem; }
.not-found__actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
</style>
