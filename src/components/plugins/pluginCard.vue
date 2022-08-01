<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <div class="left">
                    <el-avatar
                        :src="info.icon"
                        fit="scale-down"
                        class="plugin-avatar"
                    ></el-avatar>
                    <el-tooltip :content="info.name">
                        <span class="plugin-name"> {{ info.name }}</span>
                    </el-tooltip>
                </div>
                <div class="right">
                    <el-switch
                        v-model="status"
                        inline-prompt
                        style="
                            --el-switch-on-color: #13ce66;
                            --el-switch-off-color: #ff4949;
                        "
                        active-text="开"
                        inactive-text="关"
                        :active-value="1"
                        :inactive-value="0"
                        @change="changeStatus"
                    />
                </div>
            </div>
        </template>
        <div class="plugin-info">
            <div class="plugin-info_item author-info">
                <el-avatar
                    v-if="info.avatar"
                    :src="info.avatar"
                    fit="scale-down"
                /><a :href="info.author_link || 'javascript:void(0)'">{{
                    info.author
                }}</a>
            </div>
        </div>
        <div class="plugin-action">
            <el-button v-if="info.view_url" type="primary" @click="goView"
                >查看详情</el-button
            >
            <el-button type="primary" @click="showConfig">json配置</el-button>
        </div>
        <el-drawer
            v-model="show"
            title="json 配置"
            direction="rtl"
            :before-close="handleClose"
        >
            <JsonEditorVue
                class="editor"
                v-model="jsonConfig"
                style="height: 500px; width: 500px"
            />
            <div class="json-action">
                <el-button type="info" @click="cancel">取消</el-button>
                <el-button type="success" @click="saveConfig"
                    >保存配置</el-button
                >
            </div>
        </el-drawer>
    </el-card>
</template>

<script setup>
import { ref, toRefs, watch, defineEmits, computed } from "vue";
import { ElMessage } from "element-plus";
import JsonEditorVue from "json-editor-vue3";
import { useStore } from "vuex";
const emit = defineEmits(["update"]);
const store = useStore();
const botServer = computed(() => store.getters.botServer).value;

const props = defineProps({
    info: {
        type: Object,
        require: true,
    },
});
const { info } = toRefs(props);
let status = ref(1);
let show = ref(false);
let jsonConfig = ref({});
watch(
    () => props.info,
    (newValue) => {
        status.value = newValue.status;
    },
    {
        //如果加了这个参数，值为true的话，就消除了惰性，watch会在创建后立即执行一次
        //那么首次执行，val为默认值,preVal为undefined
        immediate: true,
        //这个参数代表监听对象时，可以监听深度嵌套的对象属性
        //比如message是一个对象的话，可以监听到message.a.b.c，也就是message下的所有属性
        deep: true,
    }
);
/**
 * 修改插件状态
 * @param {*} value
 */
const changeStatus = async (value) => {
    const { code } = await VE_API.plugins.changePluginStatus({
        plugin_name: info.value.name,
        status: value,
    });
    if (code === 200) {
        emit("update");
    }
};
/**
 * 显示json 配置
 */
const showConfig = () => {
    show.value = true;
    getPluginSetting();
};
/**
 * 关闭配置页面
 */
const handleClose = () => {
    show.value = false;
    jsonConfig.value = {};
};
/**
 * 获取插件配置
 */
const getPluginSetting = async () => {
    const { code, data } = await VE_API.plugins.getPluginSettings({
        plugin_name: info.value.name,
    });
    if (code === 200) {
        jsonConfig.value = data;
    }
};
/**
 * 取消
 */
const cancel = () => {
    show.value = false;
};
/**
 * 保存配置
 */
const saveConfig = () => {
    updateSetting();
};
/**
 * 修改插件配置
 */
const updateSetting = async () => {
    const { code } = await VE_API.plugins.updatePluginSettings({
        plugin_name: info.value.name,
        setting: jsonConfig.value,
    });
    if (code === 200) {
        ElMessage.success("save success");
        show.value = false;
    }
};
/**
 * 打开插件ui界面
 */
const goView = () => {
    window.open(`/#/plugin-ui?url=${botServer}${info.value.view_url}`);
};
</script>

<style lang="scss" scoped>
.status {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    &.running {
        background-color: #13ce66;
    }
    &.stop {
        background-color: #ff4949;
    }
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .left,
    .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .plugin-avatar {
        margin-right: 10px;
    }
    .plugin-name {
        display: block;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.plugin-info {
    margin-bottom: 30px;
    &_item {
        margin: 5px 0;
        a {
            color: #44a838;
            margin-left: 20px;
        }
        &.author-info {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
    }
}
.json-action {
    margin-top: 30px;
}
</style>
