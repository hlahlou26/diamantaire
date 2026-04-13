import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'MyToys Maroc | Jouets & Jeux pour Enfants' },
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/ShopView.vue'),
    meta: { title: 'Boutique – MyToys' },
  },
  {
    path: '/category/:slug',
    name: 'category',
    component: () => import('../views/CategoryView.vue'),
    meta: { title: 'Catégorie – MyToys' },
  },
  {
    path: '/product/:slug',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
    meta: { title: 'Produit – MyToys' },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: { title: 'Recherche – MyToys' },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    meta: { title: 'Panier – MyToys' },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue'),
    meta: { title: 'Commande – MyToys' },
  },
  {
    path: '/order-confirmation',
    name: 'order-confirmation',
    component: () => import('../views/OrderConfirmationView.vue'),
    meta: { title: 'Commande confirmée – MyToys' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Connexion – MyToys' },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/AccountView.vue'),
    meta: { title: 'Mon compte – MyToys' },
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('../views/WishlistView.vue'),
    meta: { title: 'Liste de souhaits – MyToys' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'À propos – MyToys' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Contact – MyToys' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Page introuvable – MyToys' },
  },
];

const router = createRouter({
  history: createWebHistory('/ecommerce/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to) => {
  document.title = to.meta.title || 'MyToys Maroc';
});

export default router;
