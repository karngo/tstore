<template>
  <v-container>
    <template v-if="productsInCart.length">
      <v-row
        v-for="(product, index) in productsInCart"
        :key="index"
        justify="center"
      >
        <v-col cols="12" lg="8">
          <v-card outlined>
            <v-container>
              <v-row align="center">
                <v-col cols="6" md="3">
                  <v-img :src="product.imageURL" height="100" contain></v-img>
                </v-col>
                <v-col cols="6" md="4">
                  <div class="text-subtitle-2">{{ product.name }}</div>
                  <div class="text-caption">Price: {{ product.price }}</div>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field
                    class="mt-6"
                    type="number"
                    :min="0"
                    prefix="Qty:"
                    :rules="[isExcessQuantity(product)]"
                    :value="product.orderQty"
                    outlined
                    dense
                    @change="updateQuantity(product, $event)"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" md="2">
                  <v-btn
                    :block="$vuetify.breakpoint.smAndDown"
                    @click="removeFromCart(product.id)"
                    outlined
                  >
                    Remove
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="8"
          class="text-end text-overline font-weight-black"
        >
          <span>Total Price: {{ totalPrice }} </span>
        </v-col>
      </v-row>
    </template>
    <v-row v-else>
      <v-col>
        <h2>Your cart is Empty</h2>
        <span>Add some items from</span>
        <v-btn small elevation="0" text color="primary" to="/">Catalogue</v-btn>
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
    totalPrice() {
      const productsInCart = this.productsInCart;
      if (!Array.isArray(productsInCart) || !productsInCart.length) {
        return 0;
      }

      const totalPrice = productsInCart.reduce((total, product) => {
        const productPrice = (product.orderQty || 0) * product.price;
        return productPrice + total;
      }, 0);

      return totalPrice;
    },
  },
  methods: {
    ...mapActions(["removeFromCart", "updateCart"]),
    updateQuantity(product, quantity) {
      const cartItem = {
        id: product.id,
        orderQty: quantity,
      };

      this.updateCart(cartItem);
    },
    isExcessQuantity(product) {
      return function (orderQty) {
        return orderQty > product.quantity
          ? "Exceeding maximum available quantity"
          : true;
      };
    },
  },
};
</script>
