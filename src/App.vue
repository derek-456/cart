<template>
    <div id="app">
        <router-view></router-view>
        <!-- 底部导航 -->
        <nav class="tabbar">
            <router-link to="/home" class="tabbar_item">
                <i class="iconfont icon-shouye"></i>
                <div class="tabbar_label">首页</div>
            </router-link>
            <router-link to="/weitao" class="tabbar_item">
                <i class="iconfont icon-weitao"></i>
                <div class="tabbar_label">微淘</div>
            </router-link>
            <router-link to="/message" class="tabbar_item">
                <i class="iconfont icon-xiaoxi"></i>
                <div class="tabbar_label">消息</div>
            </router-link>
            <router-link to="/cart" class="tabbar_item">
                <i class="iconfont icon-gouwuche"></i>
                <div class="tabbar_label">购物车</div>
            </router-link>
            <router-link to="/user" class="tabbar_item">
                <i class="iconfont icon-wode"></i>
                <div class="tabbar_label">我的淘宝</div>
            </router-link>
        </nav>
    </div>
</template>

<script>
import "@/lib/iconfont.css";
export default {
    data() {
        return {};
    },
};
</script>

<style lang="less">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
html,
body {
    background-color: rgb(240, 240, 240);
}
#app {
    background-color: rgb(240, 240, 240);
}
a {
    text-decoration: none;
    color: black;
}
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    .tabbar_item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: rgb(80, 77, 77);
    }
    .my-active {
        color: rgb(253, 116, 1);
    }
}
</style>
