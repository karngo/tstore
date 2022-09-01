<template>
  <v-container>
    <v-row
      v-for="(product, index) in productsInCart"
      :key="index"
      justify="center"
    >
      <v-col cols="8">
        <v-card outlined>
          <v-container>
            <v-row align="center">
              <v-col cols="3">
                <v-img :src="product.imageURL" height="100" contain></v-img>
              </v-col>
              <v-col>
                <div class="text-subtitle-2">{{ product.name }}</div>
                <div class="text-caption">Price: {{ product.price }}</div>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  hide-details="auto"
                  type="number"
                  prefix="Qty:"
                  :value="product.orderQty"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn @click="removeFromCart(product.id)" outlined>
                  Remove
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Cart",
  computed: {
    ...mapState(["cartItems", "products"]),
    productsInCart() {
      const productsInCart = this.cartItems
        .map((cartItem) => {
          const product = this.products.find(({ id }) => id == cartItem.id);

          if (!product) {
            return;
          }

          product.orderQty = cartItem.orderQty;
          return product;
        })
        .filter((product) => product);

      return productsInCart;
    },
  },
  methods: {
    ...mapActions(["removeFromCart"]),
  },
};
</script>
