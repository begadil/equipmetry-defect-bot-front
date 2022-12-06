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
      centered
      dark
      :class="
        notificationType
          ? '__snackbar snackbar-' + notificationType
          : '__snackbar'
      "
    >
      <template v-slot:default>
        <div class="d-flex align-center">
          <div>
            <template v-if="notificationType === 'error'">
              <v-icon color="errorRed" size="20" class="mr-1">
                $vuetify.icons.alertCircle
              </v-icon>
            </template>
            <template v-else-if="notificationType === 'info'">
              <v-icon color="primaryDefault" size="20" class="mr-1">
                $vuetify.icons.alertCircle
              </v-icon>
            </template>
            <template v-else-if="notificationType === 'success'">
              <v-icon color="successGreen" size="20" class="mr-1">
                $vuetify.icons.checkCircle
              </v-icon>
            </template>
          </div>
          <div class="px-3">
            <div
              v-html="notificationText"
              class="txt c-greyscale fs-16 lh-18"
            ></div>
          </div>
        </div>
      </template>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          icon
          v-bind="attrs"
          @click="notificationStatus = false"
          small
          class="mr-2"
        >
          <v-icon size="16">mdi-close</v-icon>
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
    rulesForm: {
      required: (value) => !!value || "Обязательно",
      requiredList: (value) => value.length > 0 || "Обязательно",
      number: (value) => {
        const pattern = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/;
        return pattern.test(value) || "Некорректное число";
      },
      integer: (value) => {
        const pattern = /^\d+$/;
        return pattern.test(value) || "Некорректное число";
      },
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
    user() {
      if (this.$telegram.initDataUnsafe) {
        if (this.$telegram.initDataUnsafe.user) {
          return this.$telegram.initDataUnsafe.user;
        }
      }
      return null;
    },
    queryId() {
      if (this.$telegram.initDataUnsafe) {
        return this.$telegram.initDataUnsafe["query_id"];
      }
      return null;
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
    notificationType() {
      return this.$store.getters["notification/type"];
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

<style lang="scss">
@import "./assets/style/app";

::-webkit-scrollbar {
  transition: 0.3s all ease;
  width: 2px;
  height: 5px;
}

::-webkit-scrollbar:horizontal {
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: #3c4858;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3c4368;
}
</style>
