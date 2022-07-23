<template>
    <div class="title">插件管理中心</div>
    <el-row :gutter="20">
        <el-col
            :span="6"
            v-for="item in plugins"
            :key="item.name"
            class="plugin-item"
        >
            <el-card>
                <template #header>
                    <div class="card-header">
                        <div class="left">
                            <el-avatar
                                :src="item.icon"
                                fit="scale-down"
                                class="plugin-avatar"
                            ></el-avatar>
                            <span> {{ item.name }}</span>
                        </div>
                        <div class="right">
                            <el-button class="button" text>详情</el-button>
                        </div>
                    </div>
                </template>
                <div>
                    <div>下载量：{{ item.downloads_count }}</div>
                    <div>作者：{{ item.author }}</div>
                    <div>
                        状态：{{
                            item.status === "Running" ? "运行中" : "已关闭"
                        }}
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
let plugins = ref([]);
const getPlugins = async () => {
    const { code, data } = await VE_API.plugins.pluginList();
    if (code === 200) {
        plugins.value = data;
    } else {
        plugins.value = [];
    }
};
onMounted(async () => {
    await getPlugins();
});
</script>

<style lang="scss" scoped>
.plugin-item {
    margin-bottom: 20px;
}
.title {
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
    margin-bottom: 20px;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left,
    .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .plugin-avatar {
        margin-right: 10px;
    }
}
</style>
