import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const isOpen = ref(false);

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const shipping = computed(() => (subtotal.value >= 500 ? 0 : 39));

  const total = computed(() => subtotal.value + shipping.value);

  const savings = computed(() =>
    items.value.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + (item.originalPrice - item.price) * item.quantity;
      }
      return sum;
    }, 0)
  );

  function addItem(product, quantity = 1) {
    const existing = items.value.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        thumbnail: product.thumbnail,
        category: product.category,
        quantity,
        stock: product.stock,
      });
    }
    saveToStorage();
    openCart();
  }

  function removeItem(productId) {
    items.value = items.value.filter((i) => i.id !== productId);
    saveToStorage();
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find((i) => i.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        item.quantity = Math.min(quantity, item.stock);
        saveToStorage();
      }
    }
  }

  function clearCart() {
    items.value = [];
    saveToStorage();
  }

  function openCart() {
    isOpen.value = true;
  }

  function closeCart() {
    isOpen.value = false;
  }

  function toggleCart() {
    isOpen.value = !isOpen.value;
  }

  function saveToStorage() {
    localStorage.setItem('mytoys-cart', JSON.stringify(items.value));
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('mytoys-cart');
    if (stored) {
      items.value = JSON.parse(stored);
    }
  }

  function isInCart(productId) {
    return items.value.some((i) => i.id === productId);
  }

  return {
    items,
    isOpen,
    totalItems,
    subtotal,
    shipping,
    total,
    savings,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    saveToStorage,
    loadFromStorage,
    isInCart,
  };
});
