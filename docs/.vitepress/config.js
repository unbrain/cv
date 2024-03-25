// .vitepress/config.js
import path from "path";
import fs from "fs";
const getOld = () => {
  const pathName = path.resolve(__dirname, "../old/");
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
      link: `/old/${title}`,
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
    // 主题级选项
    siteTitle: "朝阳的小站",
    nav: [
      { text: "很久以前", link: "/old/Arts（一）" },
      {
        text: "联系我",
        items: [
          { text: "Github", link: "https://github.com/unbrain" },
          { text: "Gmail", link: "mailto:marsorsun@gmail.com" },
          { text: "Wechat", link: "phone:18349108862" },
        ],
      },
    ],
    footer: {
      copyright: "Copyright © 2022-present zhaoyang12",
    },
    sidebar: {
      // 侧边栏
      "/old": [
        // {
        //   text: "介绍",
        //   // link: '../index.md',
        //   collapsible: true,
        //   items: [
        //     { text: "使用", link: "/main/使用.md" },
        //   ],
        // },
        {
          text: "很久以前",
          collapsed: true,
          items: getOld(),
        },
      ],
    },
  },
  paths() {
    return fs.readdirSync("old").map((pkg) => {
      console.log(pkg);
      return { params: { pkg } };
    });
  },
  rewrites: {},
  vite: { clearScreen: false },
};
