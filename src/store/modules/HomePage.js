/*
 * @Author: zhouyou@werun 
 * @Descriptions: 首页状态管理 
 * @TodoList: 无
 * @Date: 2018-08-27 13:29:42 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-29 21:34:49
 */



import * as types from '../mutation_type';
import CookieUtils from '../../js/cookie_utils';

const HomePage = {
  state: {
    userName: CookieUtils.getCookie("mes_user_name"),
    userID: CookieUtils.getCookie("mes_user_id"),
  },
  mutations: {
    [types.UPDATE_USER_DATA](state) {
      state.userName = CookieUtils.getCookie("mes_user_name");
      state.userID = CookieUtils.getCookie("mes_user_id");
    },
  },
  actions: {

    /**
     * @description 更新用户信息
     */
    updateUserData({
      commit,
      state
    }) {
      commit(types.UPDATE_USER_DATA);
    }
  },
  getters: {
    userName: state => state.userName,
    userID: state => state.userID,
  }
}


export default HomePage;