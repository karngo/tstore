<template>
  <div>
    <v-subheader v-if="title"> {{ title }} </v-subheader>
    <v-list-item-group color="primary" v-model="selectedOptions" multiple>
      <v-list-item
        v-for="(option, index) in options"
        :key="index"
        :value="option"
        class="filter-item"
      >
        <v-checkbox
          dense
          hide-details
          class="text-caption"
          :value="selectedOptions.includes(option)"
        >
          <template v-slot:label>
            <v-list-item-title>
              {{ option.toUpperCase() }}
            </v-list-item-title>
          </template>
        </v-checkbox>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>
<script>
export default {
  name: "CheckFilter",
  props: {
    title: String,
    options: Array,
  },
  data() {
    return {
      selectedOptions: [],
    };
  },
  watch: {
    selectedOptions() {
      this.$emit("change", this.selectedOptions);
    },
  },
};
</script>
<style lang="scss" scoped>
.filter-item {
  min-height: 0px;
  ::v-deep {
    .v-input--checkbox {
      margin: 0px;
      padding: 0px;
    }
  }
}
</style>
