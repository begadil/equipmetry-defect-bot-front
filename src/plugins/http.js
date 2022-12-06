import axios from "axios";
import store from "@/store";
import constants from "@/common/constants";

const restApi = axios.create();

restApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        let errorText = [];
        let fields = Object.keys(error.response.data);
        for (let i = 0; i < fields.length; i++) {
          errorText.push(
            "<b>" +
              fields[i] +
              "</b>: " +
              error.response.data[fields[i]].join(", ")
          );
        }
        await store.dispatch("notification/show", {
          type: "error",
          text: errorText.join("<br />"),
        });
      } else if (error.response.status === 401) {
        await store.dispatch("notification/show", {
          type: "error",
          text: constants.MESSAGE.ERROR.SERVER,
        });
      } else if (error.response.status === 404) {
        await store.dispatch("notification/show", {
          status: true,
          text: constants.MESSAGE.ERROR.NOT_FOUND,
        });
      } else if ([500, 502, 503, 504].includes(error.response.status)) {
        await store.dispatch("notification/show", {
          type: "error",
          text: constants.MESSAGE.ERROR.SERVER,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default restApi;
