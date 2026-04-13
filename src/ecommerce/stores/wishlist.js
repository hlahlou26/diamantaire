import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([]);

  const totalItems = computed(() => items.value.length);

  function addItem(product) {
    if (!isInWishlist(product.id)) {
      items.value.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        thumbnail: product.thumbnail,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
      });
      saveToStorage();
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter((i) => i.id !== productId);
    saveToStorage();
  }

  function toggleItem(product) {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
      return false;
    } else {
      addItem(product);
      return true;
    }
  }

  function clearWishlist() {
    items.value = [];
    saveToStorage();
  }

  function isInWishlist(productId) {
    return items.value.some((i) => i.id === productId);
  }

  function saveToStorage() {
    localStorage.setItem('mytoys-wishlist', JSON.stringify(items.value));
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('mytoys-wishlist');
    if (stored) {
      items.value = JSON.parse(stored);
    }
  }

  return {
    items,
    totalItems,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isInWishlist,
    saveToStorage,
    loadFromStorage,
  };
});
