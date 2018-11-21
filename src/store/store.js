/*
 * @Author: zhouyou@werun 
 * @Descriptions: 全局状态管理配置文件 
 * @TodoList: 无
 * @Date: 2018-08-29 18:20:12 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 09:36:58
 */



import Vue from 'vue';
import Vuex from 'vuex';
import HomePage from './modules/HomePage';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: [
    HomePage,
  ]
})