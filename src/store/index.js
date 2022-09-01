import Vue from "vue";
import Vuex from "vuex";
import { fetchProductsData } from "./apis";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cartItems: [],
  },
  mutations: {
    setProducts(state, newProducts) {
      state.products = newProducts;
    },
    updateCartItems(state, cartItems) {
      state.cartItems = cartItems;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const newProducts = await fetchProductsData();
      commit("setProducts", newProducts);
    },
    addToCart({ commit, state }, item) {
      const cartItems = [...state.cartItems, item];
      commit("updateCartItems", cartItems);
    },
    removeFromCart({ commit, state }, itemId) {
      const cartItems = [...state.cartItems];
      const itemIndex = cartItems.findIndex((item) => item.id == itemId);

      cartItems.splice(itemIndex, 1);
      commit("updateCartItems", cartItems);
    },
    updateCart({ commit, state }, updatedItem) {
      const cartItems = [...state.cartItems];
      const itemId = updatedItem.id;
      const itemIndex = cartItems.findIndex((item) => item.id == itemId);

      cartItems.splice(itemIndex, 1, updatedItem);
      commit("updateCartItems", cartItems);
    },
  },
});
