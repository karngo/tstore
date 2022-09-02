<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-if="!isXSmallScreen">
        <ProductFilter @filter="filterProductList" />
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col>
            <v-text-field
              placeholder="Search for Products..."
              v-model="searchTerm"
              v-on:keydown.enter.stop="filterProductList()"
            >
              <template v-slot:append-outer>
                <v-btn tile elevation="0" @click="filterProductList()">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-menu
                  v-if="isXSmallScreen"
                  bottom
                  :close-on-content-click="false"
                  max-height="400"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn tile elevation="0" v-bind="attrs" v-on="on">
                      <v-icon>mdi-filter</v-icon>
                    </v-btn>
                  </template>

                  <ProductFilter @filter="filterProductList" class="pa-4" />
                </v-menu>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0">
            <Catalogue
              v-if="displayedProducts.length"
              :items="displayedProducts"
              :cartItemIds="cartItemIds"
              @click:addToCart="addProductToCart"
            />
            <div v-else>
              <h3>No Results Found</h3>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Catalogue from "../../components/Catalogue.vue";
import ProductFilter from "./ProductFilter.vue";
import { mapActions, mapState } from "vuex";
import { isPriceInRange } from "./util";

export default {
  name: "Home",
  components: {
    Catalogue,
    ProductFilter,
  },
  data() {
    return {
      searchTerm: "",
      displayedProducts: [],
    };
  },
  watch: {
    searchTerm(value) {
      if (!value && !this.displayedProducts.length) {
        this.filterProductList();
      }
    },
  },
  computed: {
    ...mapState(["products", "cartItems"]),
    cartItemIds() {
      return this.cartItems.map(({ id }) => id);
    },
    isXSmallScreen() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  async mounted() {
    await this.fetchProducts();
    this.displayedProducts = this.products;
  },
  methods: {
    ...mapActions(["fetchProducts", "addToCart"]),
    filterProductList(filterCriteria = {}) {
      const searchKeys = this.searchTerm.trim().split(" ");

      let filteredList = [...this.products];

      if (searchKeys.length) {
        filteredList = filteredList.filter(({ name, type, color }) => {
          return searchKeys.every((searchKey) => {
            return [name, type, color].some((productKey) =>
              productKey.toLowerCase().includes(searchKey.toLowerCase())
            );
          });
        });
      }

      const filterKeys = Object.keys(filterCriteria).filter(
        (key) => filterCriteria[key]?.length
      );

      if (filterKeys.length) {
        filteredList = filteredList.filter((product) => {
          return filterKeys.every((filterKey) => {
            const filterOptions = filterCriteria[filterKey];
            const productValue = product[filterKey];

            if (filterKey != "price") {
              return filterOptions.some((option) => option == productValue);
            }

            return isPriceInRange(productValue, filterOptions);
          });
        });
      }

      this.displayedProducts = filteredList;
    },
    addProductToCart(product) {
      const cartItem = {
        id: product.id,
        orderQty: 1,
      };

      this.addToCart(cartItem);
    },
  },
};
</script>
