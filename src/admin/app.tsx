import { Star } from "@strapi/icons"
import type { StrapiApp } from "@strapi/strapi/admin"
import PreviewLink from "./extensions/components/PreviewLink"
import "./extensions/custom.css"
import Logo from "./extensions/logo.jpeg"

export default {
  config: {
    auth: {
      logo: Logo,
    },
    menu: {
      logo: Logo,
    },
    head: {
      favicon: Logo,
    },
    locales: ["ja", "en"],
    translations: {
      ja: {
        // =========== ホーム===========
        "global.home": "ホーム",
        "HomePage.header.title": "ハロー {name} 👋",
        "HomePage.header.subtitle": "ここは管理画面です。",
        // =========== コンテンツマネージャ ===========
        "content-manager.plugin.name": "コンテンツ管理",
        "content-manager.header.name": "コンテンツ管理",
        "content-manager.HeaderLayout.button.label-add-entry": "新規作成",
        // タブ
        "content-manager.containers.edit.tabs.draft": "下書き",
        "content-manager.containers.edit.tabs.published": "公開済み",
        // タグ
        "content-manager.containers.List.draft": "下書き",
        "content-manager.containers.List.published": "公開済み",
        // ボタン
        "app.utils.publish": "公開する",
        "global.save": "保存する",
        // ========== 設定 ===========
        "global.settings": "設定",
      },
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
