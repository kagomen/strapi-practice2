import { Star } from "@strapi/icons"
import type { StrapiApp } from "@strapi/strapi/admin"
import PreviewLink from "./extensions/components/PreviewLink"
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

    app.addMenuLink({
      to: "/hello",
      icon: Star,
      intlLabel: {
        id: "my-plugin.plugin.name",
        defaultMessage: "My plugin",
      },
      permissions: [],
      Component: async () => {
        const component = await import("./extensions/components/CustomMenu")
        return { default: component.default }
      },
    })
  },

  bootstrap(app: StrapiApp) {
    app
      .getPlugin("content-manager")
      // プレビューボタン
      .injectComponent("editView", "right-links", {
        name: "preview-link",
        Component: PreviewLink,
      })
  },
}
