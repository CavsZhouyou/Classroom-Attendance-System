/*
 * @Author: zhouyou@werun 
 * @Descriptions: 页面路由配置文件
 * @Date: 2018-08-25 21:01:37 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 10:12:28
 */


import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import SystemLogListPage from './views/SystemLogListPage';
import MachineAddPage from './views/MachineAddPage';
import MachineModifyPage from './views/MachineModifyPage';
import CourseListPage from './views/CourseListPage';
import ModifyUserInformationPage from './views/ModifyUserInformationPage'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  }, {
    path: "/HomePage",
    name: "HomePage",
    component: HomePage,
    children: [{
        path: "/",
        name: "SystemLogListPage",
        component: SystemLogListPage,
      }, {
        path: "CourseListPage",
        name: "CourseListPage",
        component: CourseListPage,
      }, {
        path: "MachineAddPage",
        name: "MachineAddPage",
        component: MachineAddPage,
      },
      {
        path: "MachineModifyPage",
        name: "MachineModifyPage",
        component: MachineModifyPage,
      }, {
        path: "ModifyUserInformationPage",
        name: "ModifyUserInformationPage",
        component: ModifyUserInformationPage,
      }
    ]
  }]
})