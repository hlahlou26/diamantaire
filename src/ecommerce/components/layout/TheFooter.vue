<template>
  <footer class="footer">
    <!-- Newsletter Strip -->
    <div class="footer__newsletter-strip">
      <div class="container">
        <div class="newsletter-strip">
          <div class="newsletter-strip__text">
            <h3>📧 Abonnez-vous à notre newsletter</h3>
            <p>Recevez nos offres exclusives et nouveautés en avant-première</p>
          </div>
          <form class="newsletter-strip__form" @submit.prevent="subscribe">
            <input v-model="email" type="email" placeholder="Votre adresse e-mail" required />
            <button type="submit" class="btn btn--primary">S'abonner</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">

          <!-- Brand -->
          <div class="footer__brand">
            <RouterLink to="/" class="footer__logo">
              <span>🧸</span>
              <div>
                <strong>MyToys</strong>
                <small>Maroc</small>
              </div>
            </RouterLink>
            <p class="footer__brand-desc">
              Spécialiste des jouets au Maroc depuis 2010. Plus de 5 000 produits disponibles avec livraison express partout au Maroc.
            </p>
            <div class="footer__social">
              <a href="#" class="footer__social-link" title="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" class="footer__social-link" title="Instagram">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" class="footer__social-link" title="WhatsApp">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <a href="#" class="footer__social-link" title="YouTube">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon fill="white" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
            <div class="footer__apps">
              <a href="#" class="footer__app-badge">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                App Store
              </a>
              <a href="#" class="footer__app-badge">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5v-17c0-.83 1-.97 1.45-.5l14.5 8.5-14.5 8.5C3.97 21.47 3 21.33 3 20.5z"/></svg>
                Google Play
              </a>
            </div>
          </div>

          <!-- Catégories -->
          <div class="footer__col">
            <h4 class="footer__heading">Catégories</h4>
            <ul class="footer__links">
              <li v-for="cat in mainCategories" :key="cat.id">
                <RouterLink :to="`/category/${cat.slug}`">{{ cat.icon }} {{ cat.name }}</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Informations -->
          <div class="footer__col">
            <h4 class="footer__heading">Informations</h4>
            <ul class="footer__links">
              <li><RouterLink to="/about">À propos de nous</RouterLink></li>
              <li><RouterLink to="/contact">Contactez-nous</RouterLink></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Livraison & Retours</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Conditions générales</a></li>
              <li><a href="#">Mentions légales</a></li>
            </ul>
          </div>

          <!-- Mon compte -->
          <div class="footer__col">
            <h4 class="footer__heading">Mon compte</h4>
            <ul class="footer__links">
              <li><RouterLink to="/login">Connexion / Inscription</RouterLink></li>
              <li><RouterLink to="/account">Mon compte</RouterLink></li>
              <li><RouterLink to="/wishlist">Ma liste de souhaits</RouterLink></li>
              <li><RouterLink to="/cart">Mon panier</RouterLink></li>
              <li><a href="#">Suivi de commande</a></li>
            </ul>

            <h4 class="footer__heading" style="margin-top: 24px;">Contact</h4>
            <ul class="footer__contact">
              <li>
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +212 5 22 XX XX XX
              </li>
              <li>
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                contact@mytoys.co.ma
              </li>
              <li>
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Lun-Sam: 9h - 20h
              </li>
              <li>
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Casablanca, Maroc
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Bar -->
    <div class="footer__trust">
      <div class="container">
        <div class="trust-bar">
          <div class="trust-item">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <div>
              <strong>Livraison 24h</strong>
              <span>Partout au Maroc</span>
            </div>
          </div>
          <div class="trust-item">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 1l-9 4v6c0 5.25 3.75 10.15 9 11.5C17.25 21.15 21 16.25 21 11V5L12 1z"/></svg>
            <div>
              <strong>Paiement Sécurisé</strong>
              <span>SSL · CMI · PayPal</span>
            </div>
          </div>
          <div class="trust-item">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.25"/></svg>
            <div>
              <strong>Retour 30 Jours</strong>
              <span>Garantie satisfait</span>
            </div>
          </div>
          <div class="trust-item">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <div>
              <strong>Support 7j/7</strong>
              <span>Chat & Téléphone</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>© 2025 MyToys Maroc · Tous droits réservés · Jouets & Jeux pour Enfants</p>
        <div class="footer__payments">
          <span class="payment-badge">Visa</span>
          <span class="payment-badge">Mastercard</span>
          <span class="payment-badge">CMI</span>
          <span class="payment-badge">CIH Bank</span>
          <span class="payment-badge">PayPal</span>
          <span class="payment-badge">Livraison contre remboursement</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { categories } from '../../data/categories.js';

const email = ref('');
const mainCategories = categories.slice(0, 7);

function subscribe() {
  if (email.value) {
    alert(`Merci ! Vous êtes maintenant abonné(e) avec ${email.value}`);
    email.value = '';
  }
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 48px;

  &__newsletter-strip {
    background: linear-gradient(135deg, var(--color-primary) 0%, #CC0019 100%);
    padding: 36px 0;
  }

  &__main {
    background: #1A1A2E;
    padding: 56px 0;
    color: rgba(255,255,255,0.85);
  }

  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;

    @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; }
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    font-family: var(--font-primary);

    span { font-size: 2rem; }
    strong { display: block; font-size: 1.25rem; color: #fff; }
    small { font-size: 0.6875rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; }
  }

  &__brand-desc {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
    margin-bottom: 20px;
  }

  &__social {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  &__social-link {
    width: 38px;
    height: 38px;
    border-radius: var(--radius-full);
    background: rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.7);
    transition: var(--transition);

    &:hover { background: var(--color-primary); color: #fff; transform: translateY(-2px); }
  }

  &__apps { display: flex; gap: 10px; flex-wrap: wrap; }

  &__app-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: var(--radius-md);
    font-size: 0.75rem;
    color: rgba(255,255,255,0.7);
    transition: var(--transition);

    &:hover { border-color: rgba(255,255,255,0.5); color: #fff; }
  }

  &__heading {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #fff;
    margin-bottom: 16px;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 9px;

    li a {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.6);
      transition: color 0.15s;

      &:hover { color: var(--color-accent); }
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8125rem;
      color: rgba(255,255,255,0.6);

      svg { flex-shrink: 0; color: var(--color-primary); }
    }
  }

  &__trust {
    background: #F9FAFB;
    border-top: 1px solid var(--color-border);
    padding: 28px 0;
  }

  &__bottom {
    background: var(--color-dark);
    padding: 16px 0;
  }

  &__bottom-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;

    p {
      font-size: 0.8125rem;
      color: rgba(255,255,255,0.5);
    }
  }

  &__payments {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
}

.newsletter-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;

  &__text {
    color: #fff;
    h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 4px; }
    p { font-size: 0.875rem; opacity: 0.85; }
  }

  &__form {
    display: flex;
    gap: 0;
    border-radius: var(--radius-full);
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    min-width: 320px;

    @media (max-width: 480px) { min-width: 100%; flex-direction: column; border-radius: var(--radius-md); }

    input {
      flex: 1;
      padding: 12px 20px;
      border: none;
      font-size: 0.9375rem;
      outline: none;
    }

    .btn { border-radius: 0; background: var(--color-dark); &:hover { background: #333; } }
  }
}

.trust-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 14px;

  svg { flex-shrink: 0; color: var(--color-primary); }

  strong { display: block; font-size: 0.9375rem; font-weight: 700; color: var(--color-dark); }
  span { font-size: 0.8125rem; color: var(--color-text-muted); }
}

.payment-badge {
  padding: 4px 10px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
}
</style>
