import restApi from "@/plugins/http";
import constants from "@/common/constants";

export class Api {
  execute(method, resource, data, config = null) {
    return new Promise((resolve, reject) => {
      restApi[method](`${resource}`, data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  // defect
  equipmetryCreateDefect(data) {
    return this.execute("post", `${constants.API_URL}defect2/tg`, data);
  }

  // technic
  equipmetryLoadTechnic(data) {
    return this.execute("get", `${constants.API_URL}tg/technic`, data);
  }

  // telegram answerWebAppQuery
  telegramAnswerWebAppQuery(data) {
    return this.execute(
      "post",
      `https://api.telegram.org/bot${constants.TELEGRAM.TOKEN}/answerWebAppQuery`,
      data
    );
  }
}
