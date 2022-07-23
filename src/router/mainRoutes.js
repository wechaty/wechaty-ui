/*
 * @Author: your name
 * @Date: 2021-01-13 17:39:02
 * @LastEditTime: 2021-01-18 15:48:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\router\mainRoutes.js
 */
export default {
    path: "/",
    name: "AppMain",
    component: () => import("@/layout/AppMain.vue"),
    redirect: { name: "Home" },
    children: [
        {
            path: "home",
            name: "Home",
            meta: {
                title: "首页",
                icon: "HomeFilled",
            },
            component: () => import("@/views/Home.vue"),
        },
        {
            path: "plugins",
            name: "Plugins",
            meta: {
                title: "插件中心",
                icon: "Menu",
            },
            component: () => import("@/views/plugins/index.vue"),
        },
    ],
};
