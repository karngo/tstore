<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index" cols="3">
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
                <v-btn tile elevation="0" color="black" class="white--text">
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
  },
};
</script>
