// .vitepress/config.js
import path from "path";
import fs from "fs";
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

export default {
  // 站点级选项
  title: "mars",
  description: "zhaoyang cv",

  themeConfig: {
    ignoreDeadLinks: ["./index"],
    // 主题级选项
    siteTitle: "朝阳的小站",
    nav: [
      {
        text: "关于我",
        link: "/me",
      },
      {
        text: "联系我",
        items: [
          { text: "Github", link: "https://github.com/unbrain" },
          { text: "Gmail", link: "mailto:marsorsun@gmail.com" },
          { text: "Wechat", link: "phone:18349108862" },
        ],
      },
      // { text: "很久以前", link: "/old/初探vim" },
    ],
    footer: {
      copyright: "Copyright © 2022-present zhaoyang12",
    },
    sidebar: [
      {
        text: "关于我",
        link: "/me",
      },
      {
        text: "算法",
        collapsed: true,
        items: getPath("Algorithm"),
      },
      {
        text: "vue",
        collapsed: true,
        items: getPath("packages"),
      },
      {
        text: "很久以前",
        collapsed: true,
        items: getPath("old"),
      },
    ],
  },
  vite: { clearScreen: false },
};
