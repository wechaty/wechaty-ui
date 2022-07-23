<!--
 * @Author: your name
 * @Date: 2021-01-08 16:58:43
 * @LastEditTime: 2022-04-28 16:31:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\components\SlideMenu.vue
-->
<template>
    <el-sub-menu
        :index="menu.name + ''"
        v-if="menu.children && menu.children.length > 0"
    >
        <template #title>
            <el-icon :size="16" style="margin-right: 6px">
                <component :is="menu.meta.icon" />
            </el-icon>
            <span>{{ menu.meta.title }}</span>
        </template>
        <slide-menu
            v-for="child in menu.children"
            :key="child.name"
            :menu="child"
        ></slide-menu>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.name" @click="clickMenu(menu)">
        <el-icon :size="16" style="margin-right: 6px">
            <component :is="menu.meta.icon" />
        </el-icon>
        <span>{{ menu.meta.title }}</span>
    </el-menu-item>
</template>

<script setup>
import { useRouter } from "vue-router";
import { toRefs } from "vue";
const props = defineProps(["menu"]);
const { menu } = toRefs(props);
const router = useRouter();
const clickMenu = (menu) => {
    router.push({
        name: menu.name,
    });
};
</script>

<style lang="scss">
li.el-menu-item.is-active {
    background-color: darken($sideBgColor, 15%) !important;
}
.el-menu-item .el-icon svg {
    vertical-align: unset;
}
.el-sub-menu__title .el-icon svg {
    vertical-align: unset;
}
// .el-sub-menu.is-active:not(.is-opened) .el-sub-menu__title i {
//     color: $base-color;
// }
</style>
