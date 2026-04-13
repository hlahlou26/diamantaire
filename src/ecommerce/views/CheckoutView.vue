<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">Commander</h1>

      <!-- Steps -->
      <div class="checkout-steps">
        <div v-for="(step, i) in steps" :key="step.id" class="checkout-step" :class="{ active: currentStep === i, done: currentStep > i }">
          <div class="checkout-step__num">
            <svg v-if="currentStep > i" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="checkout-step__label">{{ step.label }}</span>
          <div v-if="i < steps.length - 1" class="checkout-step__sep" />
        </div>
      </div>

      <div class="checkout-layout">
        <!-- Left: Form Steps -->
        <div class="checkout-form">

          <!-- Step 1: Shipping -->
          <div v-if="currentStep === 0" class="form-section">
            <h2 class="form-section__title">Informations de livraison</h2>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Prénom *</label>
                <input v-model="form.firstName" type="text" class="form-control" placeholder="Prénom" required />
              </div>
              <div class="form-group">
                <label class="form-label">Nom *</label>
                <input v-model="form.lastName" type="text" class="form-control" placeholder="Nom" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">E-mail *</label>
              <input v-model="form.email" type="email" class="form-control" placeholder="exemple@email.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Téléphone *</label>
              <input v-model="form.phone" type="tel" class="form-control" placeholder="+212 6 XX XX XX XX" required />
            </div>
            <div class="form-group">
              <label class="form-label">Adresse *</label>
              <input v-model="form.address" type="text" class="form-control" placeholder="Numéro et nom de rue" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Ville *</label>
                <select v-model="form.city" class="form-select" required>
                  <option value="">Sélectionner une ville</option>
                  <option v-for="city in moroccanCities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Code postal</label>
                <input v-model="form.zipCode" type="text" class="form-control" placeholder="20000" />
              </div>
            </div>

            <!-- Delivery options -->
            <h3 class="form-section__sub">Mode de livraison</h3>
            <div class="delivery-options">
              <label v-for="opt in deliveryOptions" :key="opt.id" class="delivery-option" :class="{ selected: form.deliveryType === opt.id }">
                <input type="radio" v-model="form.deliveryType" :value="opt.id" class="delivery-option__radio" />
                <div class="delivery-option__content">
                  <div class="delivery-option__title">{{ opt.icon }} {{ opt.name }}</div>
                  <div class="delivery-option__desc">{{ opt.desc }}</div>
                </div>
                <div class="delivery-option__price">{{ opt.price === 0 ? 'Gratuit' : formatPrice(opt.price) }}</div>
              </label>
            </div>

            <button class="btn btn--primary btn--full btn--lg" style="margin-top: 24px" @click="nextStep" :disabled="!step1Valid">
              Continuer → Paiement
            </button>
          </div>

          <!-- Step 2: Payment -->
          <div v-if="currentStep === 1" class="form-section">
            <h2 class="form-section__title">Mode de paiement</h2>
            <div class="payment-options">
              <label v-for="opt in paymentOptions" :key="opt.id" class="payment-option" :class="{ selected: form.paymentMethod === opt.id }">
                <input type="radio" v-model="form.paymentMethod" :value="opt.id" />
                <div class="payment-option__content">
                  <span class="payment-option__icon">{{ opt.icon }}</span>
                  <div>
                    <strong>{{ opt.name }}</strong>
                    <p>{{ opt.desc }}</p>
                  </div>
                </div>
              </label>
            </div>

            <div v-if="form.paymentMethod === 'card'" class="card-form">
              <div class="form-group">
                <label class="form-label">Numéro de carte</label>
                <input v-model="form.cardNumber" type="text" class="form-control" placeholder="1234 5678 9012 3456" maxlength="19" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Date d'expiration</label>
                  <input v-model="form.cardExpiry" type="text" class="form-control" placeholder="MM/AA" maxlength="5" />
                </div>
                <div class="form-group">
                  <label class="form-label">CVV</label>
                  <input v-model="form.cardCvv" type="text" class="form-control" placeholder="123" maxlength="3" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Nom sur la carte</label>
                <input v-model="form.cardName" type="text" class="form-control" :placeholder="`${form.firstName} ${form.lastName}`" />
              </div>
            </div>

            <div class="form-nav">
              <button class="btn btn--ghost" @click="currentStep = 0">← Retour</button>
              <button class="btn btn--primary btn--lg" @click="nextStep" :disabled="!form.paymentMethod">
                Continuer → Révision
              </button>
            </div>
          </div>

          <!-- Step 3: Review -->
          <div v-if="currentStep === 2" class="form-section">
            <h2 class="form-section__title">Révision de la commande</h2>

            <div class="review-block">
              <h4>Livraison</h4>
              <p>{{ form.firstName }} {{ form.lastName }}</p>
              <p>{{ form.address }}, {{ form.city }}</p>
              <p>{{ form.phone }} · {{ form.email }}</p>
              <button class="btn btn--ghost btn--sm" @click="currentStep = 0">Modifier</button>
            </div>

            <div class="review-block">
              <h4>Paiement</h4>
              <p>{{ paymentOptions.find(o => o.id === form.paymentMethod)?.name }}</p>
              <button class="btn btn--ghost btn--sm" @click="currentStep = 1">Modifier</button>
            </div>

            <div class="review-block">
              <h4>Articles ({{ cartStore.totalItems }})</h4>
              <div class="review-items">
                <div v-for="item in cartStore.items" :key="item.id" class="review-item">
                  <img :src="item.thumbnail" :alt="item.name" />
                  <span>{{ item.name }}</span>
                  <span>x{{ item.quantity }}</span>
                  <span>{{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>

            <label class="form-check" style="margin: 16px 0">
              <input type="checkbox" v-model="form.acceptTerms" />
              <span>J'accepte les <a href="#" style="color:var(--color-primary)">conditions générales</a> de vente *</span>
            </label>

            <div class="form-nav">
              <button class="btn btn--ghost" @click="currentStep = 1">← Retour</button>
              <button class="btn btn--primary btn--lg" @click="placeOrder" :disabled="!form.acceptTerms || placing">
                {{ placing ? 'Traitement...' : '✓ Confirmer la commande' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <div class="checkout-summary">
          <h3>Votre commande</h3>
          <div class="checkout-summary__items">
            <div v-for="item in cartStore.items" :key="item.id" class="checkout-summary-item">
              <div class="checkout-summary-item__img">
                <img :src="item.thumbnail" :alt="item.name" />
                <span class="checkout-summary-item__qty">{{ item.quantity }}</span>
              </div>
              <span class="checkout-summary-item__name">{{ item.name }}</span>
              <span class="checkout-summary-item__total">{{ formatPrice(item.price * item.quantity) }}</span>
            </div>
          </div>
          <div class="checkout-summary__rows">
            <div class="checkout-summary__row">
              <span>Sous-total</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div class="checkout-summary__row">
              <span>Livraison</span>
              <span :class="{ 'text-green': selectedDelivery?.price === 0 }">{{ selectedDelivery?.price === 0 ? 'Gratuite' : formatPrice(selectedDelivery?.price || 39) }}</span>
            </div>
            <div class="checkout-summary__row checkout-summary__row--total">
              <span>Total</span>
              <span>{{ formatPrice(cartStore.subtotal + (selectedDelivery?.price || 39)) }}</span>
            </div>
          </div>
          <div class="checkout-summary__secure">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1l-9 4v6c0 5.25 3.75 10.15 9 11.5C17.25 21.15 21 16.25 21 11V5L12 1z"/></svg>
            Paiement sécurisé SSL 256-bit
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart.js';

const router = useRouter();
const cartStore = useCartStore();
const currentStep = ref(0);
const placing = ref(false);

const steps = [
  { id: 'shipping', label: 'Livraison' },
  { id: 'payment', label: 'Paiement' },
  { id: 'review', label: 'Révision' },
];

const form = ref({
  firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zipCode: '',
  deliveryType: 'standard', paymentMethod: '', cardNumber: '', cardExpiry: '', cardCvv: '', cardName: '', acceptTerms: false,
});

const moroccanCities = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kénitra','Tétouan','Safi','El Jadida','Béni Mellal','Nador','Mohammedia'];

const deliveryOptions = [
  { id: 'express', icon: '⚡', name: 'Livraison Express 1h', desc: 'Casablanca uniquement · Aujourd\'hui', price: 49 },
  { id: 'standard', icon: '🚚', name: 'Livraison Standard 24h', desc: 'Partout au Maroc · Demain', price: 39 },
  { id: 'free', icon: '🎉', name: 'Livraison Gratuite 48h', desc: 'Commandes ≥ 500 MAD', price: 0 },
];

const paymentOptions = [
  { id: 'card', icon: '💳', name: 'Carte bancaire', desc: 'Visa, Mastercard, CMI – Paiement sécurisé SSL' },
  { id: 'cod', icon: '📦', name: 'Contre remboursement', desc: 'Payez en espèces à la livraison' },
  { id: 'paypal', icon: '💸', name: 'PayPal', desc: 'Paiement rapide et sécurisé via PayPal' },
  { id: 'cih', icon: '🏦', name: 'Virement bancaire', desc: 'CIH Bank, Attijariwafa, BMCE, Banque Populaire' },
];

const step1Valid = computed(() => form.value.firstName && form.value.lastName && form.value.email && form.value.phone && form.value.address && form.value.city);

const selectedDelivery = computed(() => deliveryOptions.find(d => d.id === form.value.deliveryType));

function formatPrice(p) {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(p);
}

function nextStep() {
  if (currentStep.value < 2) currentStep.value++;
}

async function placeOrder() {
  placing.value = true;
  await new Promise(r => setTimeout(r, 1500));
  cartStore.clearCart();
  placing.value = false;
  router.push('/order-confirmation');
}
</script>

<style lang="scss" scoped>
.checkout-page { padding-bottom: 64px; }
.page-title { font-family: var(--font-primary); font-size: 1.75rem; font-weight: 800; margin: 20px 0 32px; }

.checkout-steps {
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
}

.checkout-step {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  &__num {
    width: 36px; height: 36px;
    border-radius: var(--radius-full);
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--color-text-muted);
    transition: var(--transition);
  }

  &__label { font-size: 0.875rem; font-weight: 500; color: var(--color-text-muted); margin: 0 10px; white-space: nowrap; }
  &__sep { flex: 1; min-width: 32px; height: 2px; background: var(--color-border); margin: 0 4px; }

  &.active .checkout-step__num { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
  &.active .checkout-step__label { color: var(--color-primary); font-weight: 700; }
  &.done .checkout-step__num { background: var(--color-success); border-color: var(--color-success); color: #fff; }
  &.done .checkout-step__sep { background: var(--color-success); }
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 28px;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
}

.form-section {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: 28px;

  &__title { font-size: 1.125rem; font-weight: 700; margin-bottom: 24px; }
  &__sub { font-size: 1rem; font-weight: 600; margin: 20px 0 14px; }
}

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; @media (max-width: 480px) { grid-template-columns: 1fr; } }

.delivery-options, .payment-options { display: flex; flex-direction: column; gap: 10px; }

.delivery-option, .payment-option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition);

  &:hover { border-color: var(--color-primary); background: rgba(232,0,28,0.02); }
  &.selected { border-color: var(--color-primary); background: rgba(232,0,28,0.04); }

  &__radio { display: none; }
  &__content { flex: 1; }
  &__title { font-weight: 600; font-size: 0.9375rem; }
  &__desc { font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 2px; }
  &__price { font-weight: 700; color: var(--color-primary); white-space: nowrap; }

  &__icon { font-size: 1.5rem; }
}

.card-form { background: var(--color-bg); border-radius: var(--radius-lg); padding: 20px; margin-top: 16px; }

.form-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; gap: 12px; }

.review-block {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  margin-bottom: 14px;
  position: relative;

  h4 { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); margin-bottom: 8px; }
  p { font-size: 0.9375rem; color: var(--color-text); line-height: 1.6; }
  .btn { position: absolute; top: 14px; right: 14px; }
}

.review-items { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.review-item { display: flex; align-items: center; gap: 10px; font-size: 0.875rem;
  img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; border: 1px solid var(--color-border); }
  span:first-of-type { flex: 1; }
  span:last-child { font-weight: 700; color: var(--color-primary); }
}

.checkout-summary {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: 24px;
  position: sticky;
  top: calc(var(--header-height) + 60px);

  h3 { font-size: 1.0625rem; font-weight: 700; margin-bottom: 16px; }

  &__items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--color-border); }
  &__rows { display: flex; flex-direction: column; gap: 10px; }
  &__row { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--color-text-muted); .text-green { color: var(--color-success); font-weight: 600; }
    &--total { font-size: 1rem; font-weight: 800; color: var(--color-dark); padding-top: 10px; border-top: 2px solid var(--color-border); margin-top: 4px; } }
  &__secure { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--color-text-muted); margin-top: 16px; justify-content: center; }
}

.checkout-summary-item {
  display: flex;
  align-items: center;
  gap: 10px;

  &__img { position: relative; width: 48px; height: 48px; border-radius: 8px; overflow: hidden; flex-shrink: 0; border: 1px solid var(--color-border);
    img { width: 100%; height: 100%; object-fit: cover; } }
  &__qty { position: absolute; top: -6px; right: -6px; background: var(--color-primary); color: #fff; font-size: 0.625rem; font-weight: 700; width: 18px; height: 18px; border-radius: 9px; display: flex; align-items: center; justify-content: center; }
  &__name { flex: 1; font-size: 0.8125rem; color: var(--color-text); line-height: 1.4; }
  &__total { font-size: 0.875rem; font-weight: 700; color: var(--color-dark); white-space: nowrap; }
}
</style>
