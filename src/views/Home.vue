<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field placeholder="Search for Products...">
          <template v-slot:append-outer>
            <v-btn tile elevation="0">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
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
