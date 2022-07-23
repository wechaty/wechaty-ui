module.exports = {
    // 获取插件列表
    pluginList: {
        url: "/plugins/list",
        type: "get",
    },
    // 修改插件状态
    changePluginStatus: {
        url: "/plugins/status",
        type: "put",
    },
    // 获取插件配置
    getPluginSettings: {
        url: "/plugins/setting",
        type: "get",
    },
    // 更新插件配置
    updatePluginSettings: {
        url: "/plugins/setting",
        type: "put",
    },
};
