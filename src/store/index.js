import Vue from "vue";
import Vuex from "vuex";
import { fetchProductsData } from "./apis";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, newProducts) {
      state.products = newProducts;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const newProducts = await fetchProductsData();
      commit("setProducts", newProducts);
    },
  },
});
