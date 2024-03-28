// .vitepress/config.js
import path from "path";
import fs from "fs";
import imagemin from "unplugin-imagemin/vite";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";
const getPath = (pathname) => {
  const pathName = path.resolve(__dirname, `../${pathname}/`);
  console.log(pathName);
  const data = [];
  fs.readdirSync(pathName).forEach((file) => {
    data.push(file);
  });

  let items = [];
  for (let key in data) {
    const value = data[key];
    const title = value.replace(".md", () => "");
    items.push({
      text: `${title}`,
      link: `/${pathname}/${title}`,
      // link: '/old/nav.md'
    });
  }

  return items;
};
/**
 * @type {import('vitepress').UserConfigExport}
 */
export default {
  // 站点级选项
  title: "朝阳的小站",
  description: "zhaoyang website",
  head: [["link", { rel: "icon", href: "/icon.png" }]],
  themeConfig: {
    ignoreDeadLinks: ["./index"],
    // 主题级选项
    logo: "/icon.png",
    siteTitle: "",
    nav: [
      {
        text: "朝花夕拾",
        link: "/md/2vue/Readonly",
      },
      {
        text: "关于我",
        link: "/me",
      },
      {
        text: "联系我",
        items: [
          { text: "Github", link: "https://github.com/unbrain" },
          { text: "Gmail", link: "mailto:marsorsun@gmail.com" },
          { text: "Wechat", link: "tel:18349108862" },
        ],
      },
      // { text: "很久以前", link: "/old/初探vim" },
    ],
    footer: {
      copyright: "Copyright © 2022-present zhaoyang",
    },
    // sidebar: [
    //   {
    //     text: "算法",
    //     collapsed: true,
    //     items: getPath("Algorithm"),
    //   },
    //   {
    //     text: "vue",
    //     collapsed: true,
    //     items: getPath("packages"),
    //   },
    //   {
    //     text: "很久以前",
    //     collapsed: true,
    //     items: getPath("old"),
    //   },
    // ],
  },
  vite: {
    clearScreen: false,
    plugins: [
      imagemin({ beforeBundle: true }),
      AutoSidebar({
        // You can also set options to adjust sidebar data
        // see option document below
        collapsed: true,
        titleFromFile: true,
        sideBarResolved: (data) => {
          data["/md/"][0].items.map((item) => {
            item.text = item.text.slice(1);
            return item;
          });
          return data;
        },
        // beforeCreateSideBarItems: (data) => {
        //   console.log(data);
        // }
      }),
    ],
  },
};
