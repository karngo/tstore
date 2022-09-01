<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-list dense>
          <CheckFilter
            title="Gender"
            :options="['Men', 'Women']"
            @change="addFilter('gender', $event)"
          />
          <CheckFilter
            title="Color"
            :options="colorOptions"
            @change="addFilter('color', $event)"
          />
          <CheckFilter
            title="Type"
            :options="typeOptions"
            @change="addFilter('type', $event)"
          />
          <CheckFilter
            title="Price"
            :options="priceOptions"
            @change="addFilter('price', $event)"
          />
        </v-list>
      </v-col>
      <v-col cols="9">
        <v-row>
          <v-col>
            <v-text-field
              placeholder="Search for Products..."
              v-model="searchTerm"
              v-on:keydown.enter.stop="filterProductList"
            >
              <template v-slot:append-outer>
                <v-btn tile elevation="0" @click="filterProductList">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0">
            <Catalogue
              :items="displayedProducts"
              :cartItemIds="cartItemIds"
              @click:addToCart="addProductToCart"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Catalogue from "../components/Catalogue.vue";
import CheckFilter from "../components/CheckFilter.vue";
import { mapActions, mapState } from "vuex";

const pricingStructure = {
  "Below 250": [0, 250],
  "250 - 300": [250, 300],
  "300 - 500": [300, 500],
  "Above 500": [500],
};

const isPriceInRange = (productPrice, priceRanges) => {
  const priceValues = priceRanges.map(
    (priceRange) => pricingStructure[priceRange]
  );

  return priceValues.some(([lowerLimit, upperLimit]) => {
    if (!upperLimit) {
      return productPrice >= lowerLimit;
    }

    return productPrice >= lowerLimit && productPrice < upperLimit;
  });
};

export default {
  name: "Home",
  components: {
    Catalogue,
    CheckFilter,
  },
  data() {
    const priceOptions = Object.keys(pricingStructure);
    return {
      searchTerm: "",
      displayedProducts: [],
      filterCriteria: {},
      colorOptions: [],
      typeOptions: [],
      priceOptions,
    };
  },
  computed: {
    ...mapState(["products", "cartItems"]),
    cartItemIds() {
      return this.cartItems.map(({ id }) => id);
    },
  },
  async mounted() {
    await this.fetchProducts();
    this.displayedProducts = this.products;
    this.setFilterOptions();
  },
  methods: {
    ...mapActions(["fetchProducts", "addToCart"]),
    setFilterOptions() {
      this.products.forEach(({ color, type }) => {
        const productColor = color;
        const productType = type;

        if (!this.colorOptions.includes(productColor)) {
          this.colorOptions.push(productColor);
        }

        if (!this.typeOptions.includes(productType)) {
          this.typeOptions.push(productType);
        }
      });
    },
    addFilter(filterKey, filterOptions) {
      this.filterCriteria[filterKey] = filterOptions;
      this.filterProductList();
    },
    filterProductList() {
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

      const filterCriteria = this.filterCriteria;

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
