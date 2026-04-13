<template>
  <div class="confirmation-page">
    <div class="container">
      <div class="confirmation-card">
        <div class="confirmation-icon">✅</div>
        <h1 class="confirmation-title">Commande confirmée !</h1>
        <p class="confirmation-sub">Merci pour votre commande. Vous recevrez un e-mail de confirmation sous peu.</p>
        <div class="confirmation-order-id">
          Numéro de commande : <strong>#MT-{{ orderId }}</strong>
        </div>
        <div class="confirmation-steps">
          <div v-for="(step, i) in steps" :key="step.label" class="conf-step">
            <div class="conf-step__num">{{ i + 1 }}</div>
            <div>
              <strong>{{ step.label }}</strong>
              <span>{{ step.desc }}</span>
            </div>
          </div>
        </div>
        <div class="confirmation-ctas">
          <RouterLink to="/account" class="btn btn--outline">Suivre ma commande</RouterLink>
          <RouterLink to="/" class="btn btn--primary">Retour à l'accueil</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const orderId = Math.floor(10000 + Math.random() * 90000);
const steps = [
  { label: 'Commande reçue', desc: 'Votre commande a été enregistrée avec succès' },
  { label: 'Préparation', desc: 'Votre colis est en cours de préparation' },
  { label: 'Expédition', desc: 'Livraison express en 1h ou 24h selon votre choix' },
];
</script>

<style scoped>
.confirmation-page { padding: 64px 0; min-height: 60vh; display: flex; align-items: center; background: var(--color-bg); }
.confirmation-card { max-width: 560px; margin: 0 auto; text-align: center; background: #fff; border-radius: var(--radius-xl); border: 1px solid var(--color-border); padding: 48px 36px; box-shadow: var(--shadow-lg); }
.confirmation-icon { font-size: 4rem; margin-bottom: 20px; }
.confirmation-title { font-family: var(--font-primary); font-size: 1.875rem; font-weight: 800; color: var(--color-success); margin-bottom: 12px; }
.confirmation-sub { font-size: 1rem; color: var(--color-text-muted); margin-bottom: 24px; }
.confirmation-order-id { background: var(--color-bg); border-radius: var(--radius-lg); padding: 14px 20px; font-size: 0.9375rem; margin-bottom: 28px; color: var(--color-text-muted); }
.confirmation-steps { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; text-align: left; }
.conf-step { display: flex; align-items: flex-start; gap: 14px;
  &__num { width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; flex-shrink: 0; }
  strong { display: block; font-size: 0.9375rem; font-weight: 700; }
  span { font-size: 0.8125rem; color: var(--color-text-muted); }
}
.confirmation-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
</style>
