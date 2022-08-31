<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          placeholder="Search for Products..."
          v-model="searchTerm"
          v-on:keydown.enter.stop="searchProducts"
        >
          <template v-slot:append-outer>
            <v-btn tile elevation="0" @click="searchProducts">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <Catalogue :items="displayedProducts" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Catalogue from "../components/Catalogue.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Catalogue,
  },
  data() {
    return {
      searchTerm: "",
      displayedProducts: [],
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  async mounted() {
    await this.fetchProducts();
    this.displayedProducts = this.products;
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    searchProducts() {
      const searchKeys = this.searchTerm.trim().split(" ");

      if (!searchKeys.length) {
        this.displayedProducts = this.products;
      }

      const searchedProducts = this.products.filter(({ name, type, color }) => {
        return searchKeys.every((searchKey) => {
          return [name, type, color].some((productKey) =>
            productKey.toLowerCase().includes(searchKey.toLowerCase())
          );
        });
      });

      this.displayedProducts = searchedProducts;
    },
  },
};
</script>
