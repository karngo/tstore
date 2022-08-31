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
            <Catalogue :items="displayedProducts" />
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

export default {
  name: "Home",
  components: {
    Catalogue,
    CheckFilter,
  },
  data() {
    return {
      searchTerm: "",
      displayedProducts: [],
      filterCriteria: {},
      colorOptions: [],
      typeOptions: [],
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  async mounted() {
    await this.fetchProducts();
    this.displayedProducts = this.products;
    this.setFilterOptions();
  },
  methods: {
    ...mapActions(["fetchProducts"]),
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
            return filterOptions.some((option) => option == productValue);
          });
        });
      }

      this.displayedProducts = filteredList;
    },
  },
};
</script>
