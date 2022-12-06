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
      equipmetryIcon: {
        component: () => import("@/components/icons/EquipmetryIcon"),
      },
    },
  },
});
