<template>
  <v-container>
    <v-row>
      <v-col class="pa-0">
        <Catalogue :items="products" />
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
  computed: {
    ...mapState(["products"]),
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
};
</script>
