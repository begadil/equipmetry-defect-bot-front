<template>
  <v-app>
    <loading
      :active.sync="loading"
      :can-cancel="parameters.loading.canCancel"
      :color="parameters.loading.color"
      :loader="parameters.loading.loader"
      :width="parameters.loading.width"
      :height="parameters.loading.height"
      :background-color="parameters.loading.backgroundColor"
      :opacity="parameters.loading.opacity"
      :z-index="parameters.loading.zIndex"
    />
    <v-snackbar
      v-model="notificationStatus"
      :timeout="parameters.notification.timeout"
      top
      right
    >
      <span v-html="notificationText"></span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="error"
          text
          v-bind="attrs"
          @click="notificationStatus = false"
        >
          закрыть
        </v-btn>
      </template>
    </v-snackbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";
moment.locale("ru");

Vue.mixin({
  data: () => ({
    selectGlobal: {
      roles: [{ value: "user", text: "Пользователь" }],
    },
    formRules: {
      required: (value) => !!value || "Обязательное поле.",
    },
  }),
  methods: {
    isNumber(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    isInteger($event) {
      if (
        $event.charCode === 0 ||
        /\d/.test(String.fromCharCode($event.charCode))
      ) {
        return true;
      }
      $event.preventDefault();
    },
    isEmpty(str) {
      return !str;
    },
  },
  computed: {
    currentDate() {
      return moment(new Date()).format("YYYY-MM-DD");
    },
  },
});

export default {
  name: "App",
  components: {
    Loading,
  },
  data: () => ({
    parameters: {
      loading: {
        canCancel: false,
        color: "#e7e7e7",
        loader: "dots",
        width: 128,
        height: 128,
        backgroundColor: "#000",
        opacity: 0.7,
        zIndex: 10000,
      },
      notification: {
        timeout: 5000,
      },
    },
  }),
  mounted() {
    this.$store.dispatch("loading/hide");
  },
  computed: {
    loading() {
      return this.$store.getters["loading/status"];
    },
    notificationText() {
      return this.$store.getters["notification/text"];
    },
    notificationStatus: {
      get() {
        return this.$store.getters["notification/status"];
      },
      set() {
        this.$store.dispatch("notification/hide");
      },
    },
  },
};
</script>
