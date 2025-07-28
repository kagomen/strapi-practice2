import { Star } from "@strapi/icons"
import type { StrapiApp } from "@strapi/strapi/admin"
import "./extensions/custom.css"
import Logo from "./extensions/logo.jpeg"

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // "ja",
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    auth: {
      logo: Logo,
    },
    menu: {
      logo: Logo,
    },
    head: {
      favicon: Logo,
    },
  },

  register(app: StrapiApp) {
    app.widgets.register({
      icon: Star,
      title: {
        id: "widget title",
      },
      component: async () => {
        const component = await import("./extensions/components/CustomWidget")
        return component.default
      },
      id: "custom-widget-id",
    })
  },

  bootstrap(app: StrapiApp) {},
}
