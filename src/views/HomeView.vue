<template>
  <div>
    <v-card height="50px" tile dark>
      <v-card-title class="primary align-center">
        <v-icon color="white" size="39">$vuetify.icons.equipmetryIcon</v-icon>
        <div class="ml-auto text--white text-truncate user-info">
          <template v-if="user">
            {{ user["first_name"] }} {{ user["last_name"] }}
          </template>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  computed: {
    user() {
      if (this.$telegram.initDataUnsafe) {
        if (this.$telegram.initDataUnsafe.user) {
          return this.$telegram.initDataUnsafe.user;
        }
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.user-info {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 600;
  max-width: 65vw;
}
</style>
