<template>
  <div>
    <v-btn @click="close">Закрыть</v-btn>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    close() {
      this.$telegram.close();
    },
  },
};
</script>
