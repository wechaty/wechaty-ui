/*
 * @Author: your name
 * @Date: 2021-12-02 16:55:35
 * @LastEditTime: 2021-12-02 16:58:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-element-admin\src\store\modules\app\index.js
 */
import { TOGGLE_SLIDER, SET_BOT_SERVER } from "./type.js";
export default {
    namespaced: true,
    state: {
        slider: {
            opened: JSON.parse(sessionStorage.getItem("opened")),
        },
        botServer: localStorage.getItem("botServer"),
    },
    mutations: {
        [TOGGLE_SLIDER](state) {
            state.slider.opened = !state.slider.opened;
            sessionStorage.setItem(
                "opened",
                JSON.stringify(state.slider.opened)
            );
        },
        [SET_BOT_SERVER](state, token) {
            state.botServer = token;
            localStorage.setItem("botServer", state.botServer);
        },
    },
    actions: {
        [TOGGLE_SLIDER]({ commit }) {
            commit(TOGGLE_SLIDER);
        },
    },
};
