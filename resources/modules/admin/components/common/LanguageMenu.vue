<template lang="pug">
  v-menu(
    max-height='calc(100% - 16px)'
  )
    template(
      v-slot:activator='{ on }'
    )
      v-btn(
        v-on='on'
        :disabled='disabled'
        icon
      )
        v-img(
          :src='activeLocale.flag'
          max-width='22'
        )
    v-list(
      dense
      shaped
    )
      v-list-item(
        v-for='(locale, index) in locales'
        :key='locale.code'
        :input-value='activeLocale.code === locale.code'
        @click='onSelectLocale(locale)'
      )
        v-list-item-avatar(
          tile
          width='24'
          height='24'
          min-width='24'
        )
          v-img(
            :src='locale.flag'
          )
        v-list-item-title {{locale.alpha3}}
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from "vue-property-decorator";
import { Locales } from "admin/constants";

const defaultLocales = [
  {
    code: Locales.EN,
    alpha2: "US",
    alpha3: "USA",
    flag: "//cdn.vuetifyjs.com/images/flags/us.png"
  },
  {
    code: Locales.RU,
    alpha2: "RU",
    alpha3: "RUS",
    flag: "//cdn.vuetifyjs.com/images/flags/ru.png"
  },
  {
    code: Locales.ES,
    alpha2: "ES",
    alpha3: "ESP",
    flag: "//cdn.vuetifyjs.com/images/flags/mx.png"
  },
  {
    code: Locales.PT,
    alpha2: "PT",
    alpha3: "PRT",
    flag: "//cdn.vuetifyjs.com/images/flags/br.png"
  },
  {
    code: Locales.CN,
    alpha2: "CN",
    alpha3: "CHN",
    flag: "//cdn.vuetifyjs.com/images/flags/cn.png"
  },
  {
    code: Locales.JP,
    alpha2: "JP",
    alpha3: "JPN",
    flag: "//cdn.vuetifyjs.com/images/flags/jp.png"
  }
];

@Component
export default class LanguageMenu extends Vue {
  @Model("change", { type: String })
  private readonly value!: string;
  @Prop({
    type: Array,
    default: () => defaultLocales
  })
  private readonly locales!: Array<ILocale>;
  @Prop({
    type: Boolean,
    default: false
  })
  private readonly disabled!: boolean;
  private activeLocale = this.locales.find(({ code }) => code === this.value);
  @Emit("change")
  private onSelectLocale(locale: ILocale) {
    this.activeLocale = locale;
    console.log("locale => ", locale);
    return locale.code;
  }
}

interface ILocale {
  readonly code: Locales;
  readonly alpha2: string;
  readonly alpha3: string;
  readonly flag: string;
}
</script>