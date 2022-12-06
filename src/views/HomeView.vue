<template>
  <div>
    <v-dialog v-model="catalog.modal" max-width="720" scrollable>
      <v-card height="75vh">
        <v-card-title class="px-4 pt-3 pb-2 flex-column">
          <div class="d-flex align-center" style="width: 100%">
            <p class="ma-0 txt fs-20 c-black text-center">Группа</p>
          </div>
        </v-card-title>
        <v-card-text class="pt-1 pb-1 px-2" style="background: #ebedf0">
          <template v-for="(el, elInd) in handbook.catalog">
            <v-card class="px-0 py-0 my-2 fullWidthCard" :key="elInd" flat>
              <div class="pl-3 pr-1 d-flex align-center py-4">
                <div
                  class="d-flex align-center"
                  @click="
                    () => {
                      if (
                        catalog.selectedElem.filter((obj) => obj === el).length
                      ) {
                        catalog.selectedElem = catalog.selectedElem.filter(
                          (obj) => obj !== el
                        );
                      } else {
                        catalog.selectedElem.push(el);
                      }
                    }
                  "
                >
                  <v-checkbox
                    class="my-0"
                    color="#0F6EB5"
                    readonly
                    :off-icon="
                      catalog.selectedElem.filter((obj) => obj === el).length
                        ? '$checkboxOn'
                        : '$checkboxOff'
                    "
                    hide-details
                  >
                    <template v-slot:label>
                      <div class="txt c-dark-blue fs-16">
                        {{ el }}
                      </div>
                    </template>
                  </v-checkbox>
                </div>
              </div>
            </v-card>
          </template>
        </v-card-text>
        <v-card-actions
          class="align-center justify-center pt-2 pb-2 px-3"
          v-if="catalog.selectedElem.length"
        >
          <v-btn
            class="btn--operation bg-blue"
            block
            depressed
            height="39"
            @click="
              form['abstract_group'] = catalog.selectedElem.join(', ');
              catalog.modal = false;
            "
          >
            Выбрать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-app-bar app height="60px" color="primary" fixed dark width="100vw">
      <div class="d-flex align-center" style="width: 100vw">
        <v-icon color="white" size="39">$vuetify.icons.equipmetryIcon</v-icon>
        <div class="ml-auto">
          <template v-if="user">
            <div class="txt c-white fs-16 lh-18 text-truncate user-info fw-600">
              {{ user["first_name"] }} {{ user["last_name"] }}
            </div>
            <div class="txt c-white fs-14 lh-16 text-truncate user-info">
              {{ user["username"] }}
            </div>
          </template>
        </div>
      </div>
    </v-app-bar>
    <v-container>
      <v-form class="mt-3 mb-2" ref="formCreateDefect">
        <v-row>
          <v-col cols="12" class="py-0">
            <div>
              <div class="mb-1">
                <label class="_label">Техника</label>
              </div>
              <v-autocomplete
                v-model="form.technic"
                :items="handbook.technic"
                item-value="id"
                item-text="gov_number"
                solo
                :append-icon="isEmpty(form.technic) ? 'mdi-chevron-down' : null"
                clear-icon="mdi-close-circle"
                clearable
                class="_input-bordered no-shadow"
                flat
                :rules="[rulesForm.required]"
              >
                <template v-slot:selection="{ item }">
                  <div>
                    {{ item["gov_number"] }}, {{ item["brand_name"] }}
                    {{ item["model_name"] }}
                  </div>
                </template>
                <template v-slot:item="{ item }">
                  <div class="d-flex align-center">
                    <div>
                      <p class="txt c-black fs-15 ma-0">
                        {{ item["gov_number"] }}, {{ item["brand_name"] }}
                        {{ item["model_name"] }}
                      </p>
                      <p class="txt c-blue-grey-3 fs-14 ma-0">
                        {{ item["type_name"] }}, Vin:
                        <template v-if="item['vin_prefix']">
                          {{ item["vin_prefix"] }}-{{ item["vin_number"] }}
                        </template>
                        <template v-else>
                          {{ item["vin"] }}
                        </template>
                      </p>
                    </div>
                  </div>
                </template>
              </v-autocomplete>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <div>
              <div class="mb-1">
                <label class="_label">Вид дефекта</label>
              </div>
              <v-select
                v-model="form['type_defect']"
                :items="handbook['type_defect']"
                :append-icon="
                  isEmpty(form['type_defect']) ? 'mdi-chevron-down' : null
                "
                clear-icon="mdi-close-circle"
                clearable
                solo
                class="_input-bordered no-shadow"
                flat
                :rules="[rulesForm.required]"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <div>
              <div class="mb-1">
                <label class="_label">Название/описание дефекта</label>
              </div>
              <v-textarea
                v-model="form.title"
                :append-icon="isEmpty(form.title) ? 'mdi-chevron-down' : null"
                clear-icon="mdi-close-circle"
                clearable
                solo
                class="_input-bordered no-shadow"
                flat
                rows="2"
                no-resize
                :rules="[rulesForm.required]"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <div @click="showCatalog">
              <div class="mb-1">
                <label class="_label">Группа</label>
              </div>
              <v-text-field
                :value="form['abstract_group']"
                readonly
                solo
                class="_input-bordered no-shadow"
                flat
                :append-icon="
                  isEmpty(form['abstract_group']) ? 'mdi-chevron-down' : null
                "
                clear-icon="mdi-close-circle"
                clearable
                @click:clear="form['abstract_group'] = null"
                :rules="[rulesForm.required]"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <div>
              <div class="mb-1">
                <label class="_label">Одометр на момент выявления</label>
              </div>
              <v-text-field
                v-model="form.odometer"
                :append-icon="
                  isEmpty(form.odometer) ? 'mdi-chevron-down' : null
                "
                clear-icon="mdi-close-circle"
                clearable
                solo
                class="_input-bordered no-shadow"
                flat
                :rules="[rulesForm.required, rulesForm.integer]"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <div>
              <div class="mb-1">
                <label class="_label">Местоположение техники</label>
              </div>
              <v-text-field
                v-model="form.location"
                :append-icon="
                  isEmpty(form.location) ? 'mdi-chevron-down' : null
                "
                clear-icon="mdi-close-circle"
                clearable
                solo
                class="_input-bordered no-shadow"
                flat
                :rules="[rulesForm.required]"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <div>
              <div class="mb-1">
                <label class="_label">Код ошибки</label>
              </div>
              <v-text-field
                v-model="form['error_code']"
                :append-icon="
                  isEmpty(form['error_code']) ? 'mdi-chevron-down' : null
                "
                clear-icon="mdi-close-circle"
                clearable
                solo
                class="_input-bordered no-shadow"
                flat
              />
            </div>
          </v-col>
        </v-row>
        <pre>
          {{ r }}
        </pre>
        <v-footer
          app
          fixed
          bottom
          class="py-3"
          tile
          style="background: transparent"
        >
          <v-btn
            class="btn--operation bg-blue"
            depressed
            height="39"
            block
            @click="handlerSave"
          >
            Добавить дефект
          </v-btn>
        </v-footer>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      catalog: {
        modal: false,
        selectedElem: [],
      },
      r: {
        req: {},
        res: {},
      },
      form: {
        technic: null,
        type_defect: null,
        title: null,
        abstract_group: null,
        odometer: null,
        location: null,
        error_code: null,
      },
      handbook: {
        technic: [],
        type_defect: ["Аварийный", "Не аварийный"],
        type_visibility: ["Явный", "Скрытый"],
        condition: ["Исправно", "Неисправно"],
        catalog: [
          "Двигатель",
          "Масло и жидкости",
          "Система управления и питания",
          "Сцепление и трансмиссия",
          "Ходовая часть автомобиля",
          "Электрооборудование",
          "Кузов и экстерьер",
          "Интерьер",
          "Отопление и кондиционирование салона",
          "Инструменты и эксплуатационные материалы",
        ],
      },
    };
  },
  methods: {
    showCatalog() {
      this.catalog = {
        modal: true,
        selectedElem: this.form["abstract_group"]
          ? this.form["abstract_group"].split(", ")
          : [],
      };
    },
    handlerSave() {
      this.$store.dispatch("loading/show");
      if (!this.$refs.formCreateDefect.validate()) {
        this.$store.dispatch("loading/hide");
        this.$store.dispatch("notification/show", {
          text: this.$constants.MESSAGE.ERROR.FORM,
          type: "error",
        });
      } else {
        this.$api
          .telegramCreateDefect(`defect2/tg`, {
            username: this.user ? this.user.username : null,
            technic: this.form.technic,
            type_defect: this.form["type_defect"],
            title: this.form.title,
            abstract_group: this.form["abstract_group"],
            odometer: this.form.odometer,
            location: this.form.location,
            error_code: this.form["error_code"],
          })
          .then((response) => {
            this.$store.dispatch("loading/hide");
            if (response.status === 201) {
              this.$store.dispatch("notification/show", {
                text: this.$constants.MESSAGE.SUCCESS,
                type: "success",
              });
              this.$telegram.sendData(
                JSON.stringify({ id: response.data.id, title: this.form.title })
              );
            }
          })
          .catch(() => {
            this.$store.dispatch("loading/hide");
          });
      }
    },
  },
  mounted() {
    this.$store.dispatch("loading/show");
    this.r.req = {
      username: this.user ? this.user.username : null,
    };
    this.$api
      .telegramLoadTechnic({
        params: {
          username: this.user ? this.user.username : null,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.r.res = response.data;
          this.handbook.technic = response.data;
          if (this.handbook.technic.length === 1) {
            this.form.technic = this.handbook.technic[0].id;
          }
        }
        this.$store.dispatch("loading/hide");
      })
      .catch((error) => {
        console.log(error);
        this.$store.dispatch("loading/hide");
      });
  },
};
</script>
