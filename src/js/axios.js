/*
 * @Author: zhouyou@werun 
 * @Descriptions: axios 配置文件 
 * @TodoList: 
 *   1. 后期根据需要对 axios 进行相应配置
 * @Date: 2018-08-29 17:55:50 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-29 17:57:10
 */



import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";

//配置 axios 响应拦截器，一下为实例，具体请查考官方配置文档

// axios.interceptors.response.use(
//     response => {
//         if (response.data.message === "未登录或登录超时") {
//             alert("您已登录超时，请重新登陆！");
//         }
//         return response;
//     }
// )

export default axios;