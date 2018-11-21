/*
 * @Author: zhouyou@werun 
 * @Descriptions: 项目根组件
 * @TodoList: 无
 * @Date: 2018-08-29 22:02:04 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-31 16:37:33
 */


<template>
  <a-locale-provider :locale="locale">
    <!-- 主路由 -->
    <div id="app">
      <transition name="fade"
                  enter-active-class="fadeInLeft"
                  leave-active-class="fadeOutRight"
                  mode="out-in">
        <router-view/>
      </transition>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  data: function() {
    return {
      locale: zhCN
    };
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
