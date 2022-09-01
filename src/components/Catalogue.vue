<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index" cols="4">
        <v-card>
          <v-card-title> {{ item.name }} </v-card-title>
          <v-card-text>
            <v-img :src="item.imageURL" height="100" contain> </v-img>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col class="d-flex justify-center align-center">
                Rs. {{ item.price }}
              </v-col>
              <v-col>
                <v-btn disabled tile elevation="0" v-if="isItemInCart(item)">
                  Item Added
                </v-btn>
                <v-btn
                  tile
                  elevation="0"
                  color="black"
                  class="white--text"
                  v-else
                  @click="$emit('click:addToCart', item)"
                >
                  Add to Cart
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Catalogue",
  props: {
    items: Array,
    cartItemIds: Array,
  },
  methods: {
    isItemInCart(item) {
      return this.cartItemIds?.includes(item.id);
    },
  },
};
</script>
