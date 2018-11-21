/*
 * @Author: zhouyou@werun 
 * @Descriptions: 页面路由配置文件
 * @Date: 2018-08-25 21:01:37 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 11:24:35
 */


import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import CourseAttendanceListPage from './views/CourseAttendanceListPage';
import CourseListPage from './views/CourseListPage';
import ModifyUserInformationPage from './views/ModifyUserInformationPage';
import CourseAttendanceDetailPage from './views/CourseAttendanceDetailPage';

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
        name: "CourseAttendanceListPage",
        component: CourseAttendanceListPage,
      }, {
        path: "CourseListPage",
        name: "CourseListPage",
        component: CourseListPage,
      },
      {
        path: "CourseAttendanceDetailPage",
        name: "CourseAttendanceDetailPage",
        component: CourseAttendanceDetailPage,
      },
      {
        path: "ModifyUserInformationPage",
        name: "ModifyUserInformationPage",
        component: ModifyUserInformationPage,
      }
    ]
  }]
})