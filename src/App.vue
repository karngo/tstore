<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" class="px-6">
      <v-btn to="/" plain class="transparent"> TeeRex Store </v-btn>
      <v-spacer></v-spacer>
      <v-btn text to="/" v-if="!$vuetify.breakpoint.xsOnly"> Products </v-btn>
      <v-btn icon to="/cart">
        <v-badge
          color="green"
          :value="cartItems.length"
          :content="cartItems.length"
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["cartItems"]),
  },
};
</script>
