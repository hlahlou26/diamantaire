import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { products as allProducts, getProductsByCategory, searchProducts } from '../data/products.js';
import { categories } from '../data/categories.js';

export const useProductsStore = defineStore('products', () => {
  const products = ref(allProducts);
  const currentCategory = ref(null);
  const searchQuery = ref('');
  const sortBy = ref('popular');
  const filters = ref({ priceMin: 0, priceMax: 5000, brands: [], inStock: false });
  const currentPage = ref(1);
  const perPage = ref(12);

  const allBrands = computed(() => {
    const brands = [...new Set(allProducts.map((p) => p.brand).filter(Boolean))];
    return brands.sort();
  });

  const filteredProducts = computed(() => {
    let result = currentCategory.value
      ? getProductsByCategory(currentCategory.value)
      : searchQuery.value
      ? searchProducts(searchQuery.value)
      : [...allProducts];

    if (filters.value.inStock) result = result.filter((p) => p.inStock);
    if (filters.value.brands.length)
      result = result.filter((p) => filters.value.brands.includes(p.brand));
    result = result.filter(
      (p) => p.price >= filters.value.priceMin && p.price <= filters.value.priceMax
    );

    switch (sortBy.value) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result = [...result].sort((a, b) => b.discount - a.discount);
        break;
      default:
        result = [...result].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  });

  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage.value));

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return filteredProducts.value.slice(start, start + perPage.value);
  });

  function setCategory(slug) {
    currentCategory.value = slug;
    searchQuery.value = '';
    currentPage.value = 1;
  }

  function setSearch(query) {
    searchQuery.value = query;
    currentCategory.value = null;
    currentPage.value = 1;
  }

  function setSortBy(sort) {
    sortBy.value = sort;
    currentPage.value = 1;
  }

  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters };
    currentPage.value = 1;
  }

  function resetFilters() {
    filters.value = { priceMin: 0, priceMax: 5000, brands: [], inStock: false };
    sortBy.value = 'popular';
    currentPage.value = 1;
  }

  function setPage(page) {
    currentPage.value = page;
  }

  return {
    products,
    categories,
    currentCategory,
    searchQuery,
    sortBy,
    filters,
    currentPage,
    perPage,
    totalPages,
    allBrands,
    filteredProducts,
    paginatedProducts,
    setCategory,
    setSearch,
    setSortBy,
    setFilters,
    resetFilters,
    setPage,
  };
});
