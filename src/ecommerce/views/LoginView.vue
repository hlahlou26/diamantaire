<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <!-- Tabs -->
        <div class="auth-tabs">
          <button :class="{ active: mode === 'login' }" @click="mode = 'login'">Connexion</button>
          <button :class="{ active: mode === 'register' }" @click="mode = 'register'">Créer un compte</button>
        </div>

        <!-- Login Form -->
        <form v-if="mode === 'login'" class="auth-form" @submit.prevent="handleLogin">
          <div class="auth-header">
            <h1>Bienvenue !</h1>
            <p>Connectez-vous à votre compte MyToys</p>
          </div>

          <div class="social-login">
            <button type="button" class="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continuer avec Google
            </button>
            <button type="button" class="social-btn">
              <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Continuer avec Facebook
            </button>
          </div>

          <div class="auth-divider"><span>ou avec votre e-mail</span></div>

          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input v-model="loginForm.email" type="email" class="form-control" placeholder="exemple@email.com" required />
          </div>
          <div class="form-group">
            <label class="form-label" style="display:flex; justify-content:space-between">
              Mot de passe
              <a href="#" style="font-weight:400; color:var(--color-primary); font-size:0.8125rem">Mot de passe oublié ?</a>
            </label>
            <div class="password-field">
              <input v-model="loginForm.password" :type="showPwd ? 'text' : 'password'" class="form-control" placeholder="Votre mot de passe" required />
              <button type="button" class="password-toggle" @click="showPwd = !showPwd">
                <svg v-if="!showPwd" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <label class="form-check" style="margin-bottom: 16px">
            <input type="checkbox" v-model="loginForm.remember" />
            <span>Se souvenir de moi</span>
          </label>

          <button type="submit" class="btn btn--primary btn--full btn--lg">Se connecter</button>
          <p class="auth-switch">Pas encore de compte ? <a @click="mode = 'register'">Créer un compte →</a></p>
        </form>

        <!-- Register Form -->
        <form v-else class="auth-form" @submit.prevent="handleRegister">
          <div class="auth-header">
            <h1>Créer un compte</h1>
            <p>Rejoignez la famille MyToys et profitez d'avantages exclusifs</p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prénom *</label>
              <input v-model="registerForm.firstName" type="text" class="form-control" placeholder="Prénom" required />
            </div>
            <div class="form-group">
              <label class="form-label">Nom *</label>
              <input v-model="registerForm.lastName" type="text" class="form-control" placeholder="Nom" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">E-mail *</label>
            <input v-model="registerForm.email" type="email" class="form-control" placeholder="exemple@email.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Téléphone</label>
            <input v-model="registerForm.phone" type="tel" class="form-control" placeholder="+212 6 XX XX XX XX" />
          </div>
          <div class="form-group">
            <label class="form-label">Mot de passe *</label>
            <div class="password-field">
              <input v-model="registerForm.password" :type="showPwd ? 'text' : 'password'" class="form-control" placeholder="Minimum 8 caractères" required />
              <button type="button" class="password-toggle" @click="showPwd = !showPwd">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          <label class="form-check" style="margin-bottom: 8px">
            <input type="checkbox" v-model="registerForm.newsletter" />
            <span>Recevoir les offres et nouveautés par e-mail</span>
          </label>
          <label class="form-check" style="margin-bottom: 16px">
            <input type="checkbox" v-model="registerForm.terms" required />
            <span>J'accepte les <a href="#" style="color:var(--color-primary)">conditions générales</a> *</span>
          </label>

          <button type="submit" class="btn btn--primary btn--full btn--lg">Créer mon compte</button>
          <p class="auth-switch">Déjà un compte ? <a @click="mode = 'login'">Se connecter →</a></p>
        </form>

        <!-- Benefits -->
        <div class="auth-benefits">
          <h4>Pourquoi créer un compte ?</h4>
          <ul>
            <li v-for="b in benefits" :key="b">
              <svg width="14" height="14" fill="none" stroke="var(--color-success)" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              {{ b }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const mode = ref('login');
const showPwd = ref(false);

const loginForm = ref({ email: '', password: '', remember: false });
const registerForm = ref({ firstName: '', lastName: '', email: '', phone: '', password: '', newsletter: true, terms: false });

const benefits = ['Suivi de vos commandes en temps réel', 'Liste de souhaits personnalisée', 'Historique d\'achats complet', 'Offres exclusives membres', 'Retours simplifiés en un clic', 'Adresses sauvegardées'];

function handleLogin() {
  router.push('/account');
}

function handleRegister() {
  router.push('/account');
}
</script>

<style lang="scss" scoped>
.auth-page { padding: 48px 0 80px; background: var(--color-bg); min-height: calc(100vh - 180px); }

.auth-card {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 320px;
  grid-template-rows: auto 1fr;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-lg);

  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.auth-tabs {
  grid-column: 1 / -1;
  display: flex;
  border-bottom: 1px solid var(--color-border);

  button {
    flex: 1;
    padding: 16px;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-muted);
    transition: var(--transition);
    border-bottom: 3px solid transparent;
    margin-bottom: -1px;

    &:hover { color: var(--color-primary); }
    &.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }
  }
}

.auth-form { padding: 36px; }

.auth-header {
  margin-bottom: 28px;
  h1 { font-family: var(--font-primary); font-size: 1.625rem; font-weight: 800; margin-bottom: 6px; }
  p { font-size: 0.9375rem; color: var(--color-text-muted); }
}

.social-login { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 11px 20px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 500;
  transition: var(--transition);

  &:hover { border-color: #999; background: var(--color-bg); }
}

.auth-divider {
  text-align: center;
  position: relative;
  margin: 20px 0;
  color: var(--color-text-muted);
  font-size: 0.8125rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--color-border);
    z-index: 0;
  }

  span { background: #fff; padding: 0 14px; position: relative; z-index: 1; }
}

.password-field { position: relative; }
.password-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); }

.auth-switch { text-align: center; margin-top: 16px; font-size: 0.875rem; color: var(--color-text-muted);
  a { color: var(--color-primary); font-weight: 600; cursor: pointer; } }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; @media (max-width: 480px) { grid-template-columns: 1fr; } }

.auth-benefits {
  padding: 36px 28px;
  background: linear-gradient(135deg, #1A1A2E, #0F3460);
  color: #fff;

  @media (max-width: 768px) { display: none; }

  h4 { font-size: 1rem; font-weight: 700; margin-bottom: 20px; color: var(--color-accent); }
  ul { display: flex; flex-direction: column; gap: 14px; }
  li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.875rem; color: rgba(255,255,255,0.85); line-height: 1.5; }
}
</style>
