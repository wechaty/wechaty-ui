<template>
    <div>
        <div class="header">
            <div class="title">插件管理中心</div>
            <el-button type="primary" text @click="changeBotServer"
                >修改BotServer</el-button
            >
        </div>

        <el-row :gutter="20">
            <el-col
                :span="6"
                v-for="item in plugins"
                :key="item.name"
                class="plugin-item"
            >
                <pluginCard :info="item" @update="getPlugins" />
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import pluginCard from "@/components/plugins/pluginCard";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
import { SET_BOT_SERVER } from "@/store/modules/app/type";

const store = useStore();

let plugins = ref([]);
const getPlugins = async () => {
    const { code, data } = await VE_API.plugins.pluginList();
    if (code === 200) {
        plugins.value = data;
    } else {
        plugins.value = [];
    }
};
const changeBotServer = () => {
    ElMessageBox.prompt("请输入服务器地址", "提示", {
        showClose: false,
        inputPlaceholder: "bot server",
        inputValue: "http://dev.chatie.io:8004",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        confirmButtonText: "确认",
        cancelButtonText: "Cancel",
        showCancelButton: false,
    }).then(({ value }) => {
        store.commit(`app/${SET_BOT_SERVER}`, value);
        window.location.reload();
    });
};
onMounted(async () => {
    await getPlugins();
});
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.plugin-item {
    margin-bottom: 20px;
}
.title {
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
    margin-bottom: 20px;
}
</style>
