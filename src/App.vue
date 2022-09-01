<template>
  <v-app>
    <v-main>
      <v-app-bar color="deep-purple accent-4" class="px-6">
        <v-toolbar-title>TeeRex Store</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/"> Products </v-btn>
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
