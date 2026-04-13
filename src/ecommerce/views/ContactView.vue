<template>
  <div class="contact-page">
    <div class="contact-hero">
      <div class="container">
        <h1>Contactez-nous</h1>
        <p>Notre équipe est disponible 7j/7 pour vous aider</p>
      </div>
    </div>
    <div class="container">
      <div class="contact-layout">
        <div class="contact-info">
          <h2>Nos coordonnées</h2>
          <div class="contact-cards">
            <div v-for="c in contacts" :key="c.title" class="contact-card">
              <span class="contact-card__icon">{{ c.icon }}</span>
              <div>
                <strong>{{ c.title }}</strong>
                <p>{{ c.value }}</p>
                <span>{{ c.hours }}</span>
              </div>
            </div>
          </div>
          <div class="contact-map">
            <div class="map-placeholder">
              🗺️ Retrouvez-nous à Casablanca<br />
              <small>Maarif · Hay Hassani · Ain Chock</small>
            </div>
          </div>
        </div>
        <form class="contact-form" @submit.prevent="sendMessage">
          <h2>Envoyez-nous un message</h2>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Prénom</label><input v-model="form.name" type="text" class="form-control" placeholder="Votre prénom" required /></div>
            <div class="form-group"><label class="form-label">E-mail</label><input v-model="form.email" type="email" class="form-control" placeholder="Votre e-mail" required /></div>
          </div>
          <div class="form-group"><label class="form-label">Sujet</label>
            <select v-model="form.subject" class="form-select" required>
              <option value="">Choisir un sujet</option>
              <option>Suivi de commande</option><option>Retour / Remboursement</option>
              <option>Produit défectueux</option><option>Question sur un produit</option><option>Autre</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">Message</label><textarea v-model="form.message" class="form-control" rows="5" placeholder="Décrivez votre demande..." required style="resize: vertical"></textarea></div>
          <button type="submit" class="btn btn--primary btn--lg btn--full">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Envoyer le message
          </button>
          <p v-if="sent" class="form-success">✅ Message envoyé ! Nous vous répondrons sous 24h.</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const form = ref({ name: '', email: '', subject: '', message: '' });
const sent = ref(false);
const contacts = [
  { icon: '📞', title: 'Téléphone', value: '+212 5 22 XX XX XX', hours: 'Lun–Sam : 9h–20h' },
  { icon: '📧', title: 'E-mail', value: 'contact@mytoys.co.ma', hours: 'Réponse sous 24h' },
  { icon: '💬', title: 'WhatsApp', value: '+212 6 XX XX XX XX', hours: '7j/7 : 9h–22h' },
  { icon: '📍', title: 'Adresse', value: 'Casablanca, Maroc', hours: '3 boutiques disponibles' },
];
function sendMessage() { sent.value = true; form.value = { name:'', email:'', subject:'', message:'' }; }
</script>

<style scoped>
.contact-page { padding-bottom: 64px; }
.contact-hero { background: linear-gradient(135deg, var(--color-primary), #FF6B35); color: #fff; padding: 48px 0; text-align: center;
  h1 { font-family: var(--font-primary); font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
  p { font-size: 1rem; opacity: 0.85; }
}
.contact-layout { display: grid; grid-template-columns: 1fr 1.4fr; gap: 40px; padding: 48px 0; }
@media (max-width: 900px) { .contact-layout { grid-template-columns: 1fr; } }
.contact-info h2, .contact-form h2 { font-family: var(--font-primary); font-size: 1.375rem; font-weight: 700; margin-bottom: 24px; }
.contact-cards { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
.contact-card { display: flex; align-items: flex-start; gap: 16px; padding: 16px 18px; border-radius: var(--radius-lg); border: 1px solid var(--color-border); background: var(--color-white);
  &__icon { font-size: 1.5rem; }
  strong { display: block; font-size: 0.9375rem; font-weight: 700; margin-bottom: 2px; }
  p { font-size: 0.9375rem; color: var(--color-text); }
  span { font-size: 0.8125rem; color: var(--color-text-muted); }
}
.map-placeholder { background: linear-gradient(135deg, #F0F4FF, #E8F0FE); border-radius: var(--radius-xl); min-height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.5rem; border: 1px solid var(--color-border); text-align: center; padding: 20px; color: var(--color-text-muted); }
.contact-form { background: var(--color-white); border-radius: var(--radius-xl); border: 1px solid var(--color-border); padding: 32px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
.form-success { color: var(--color-success); font-weight: 600; font-size: 0.9375rem; margin-top: 14px; text-align: center; }
</style>
