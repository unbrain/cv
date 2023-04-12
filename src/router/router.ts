import Home from '../views/Hi.vue';
import About from '../views/About.vue'
import Project from '../views/Project.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/hi', component: Home },
  { path: '/about', component: About },
  { path: '/project', component: Project },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export { router }
