import Vue from "vue";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import ru from "vuetify/es5/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#23314b",
        errorRed: "#E71D36",
        primaryDefault: "#3D3DD8",
        successGreen: "#3C8505",
      },
    },
  },
  lang: {
    locales: {
      ru,
    },
    current: "ru",
  },
  icons: {
    values: {
      alertCircle: {
        component: () => import("@/components/icons/AlertCircle"),
      },
      checkCircle: {
        component: () => import("@/components/icons/CheckCircle"),
      },
      equipmetryIcon: {
        component: () => import("@/components/icons/EquipmetryIcon"),
      },
    },
  },
});
