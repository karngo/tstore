<template>
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
</template>
<script>
import { mapState } from "vuex";
import CheckFilter from "../../components/CheckFilter.vue";
import { pricingStructure } from "./util";

export default {
  name: "ProductFilter",
  data() {
    const priceOptions = Object.keys(pricingStructure);
    return {
      colorOptions: [],
      typeOptions: [],
      priceOptions,
      filterCriteria: {},
    };
  },
  components: {
    CheckFilter,
  },
  watch: {
    products() {
      this.setFilterOptions();
    },
  },
  computed: {
    ...mapState(["products"]),
  },
  mounted() {
    this.setFilterOptions();
  },
  methods: {
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
      this.$emit("filter", this.filterCriteria);
    },
  },
};
</script>
