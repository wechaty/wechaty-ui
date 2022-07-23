/*
 * @Author: your name
 * @Date: 2021-01-13 17:32:55
 * @LastEditTime: 2021-12-02 17:02:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\plugins\permission.js
 */
import NProgress from "nprogress";
import { SET_BOT_SERVER } from "@/store/modules/app/type";
import { ElMessageBox } from "element-plus";

export default {
    install: (app, { router, store }) => {
        router.beforeEach(async (to, from, next) => {
            const botServer = store.getters.botServer;
            if (!botServer) {
                ElMessageBox.prompt("请输入服务器地址", "提示", {
                    showClose: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    confirmButtonText: "确认",
                    cancelButtonText: "Cancel",
                    showCancelButton: false,
                }).then(({ value }) => {
                    store.commit(`app/${SET_BOT_SERVER}`, value);
                    window.location.reload();
                });
                next();
            } else {
                next();
            }
        });
        router.afterEach(() => {
            NProgress.done();
        });
    },
};
