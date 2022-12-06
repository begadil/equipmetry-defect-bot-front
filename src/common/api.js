import restApi from "@/plugins/http";

export class Api {
  execute(method, resource, data, config = null) {
    return new Promise((resolve, reject) => {
      restApi[method](`${resource}`, data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  // defect
  telegramCreateDefect(data) {
    return this.execute("post", "defect2/tg", data);
  }

  // technic
  telegramLoadTechnic(data) {
    return this.execute("get", `tg/technic`, data);
  }
}
