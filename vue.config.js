/*
 * @Author: zhouyou@werun 
 * @Descriptions: 项目配置webpack配置文件 
 * @TodoList: 无
 * @Date: 2018-10-05 18:55:44 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-09 22:12:43
 */


module.exports = {
  baseUrl: './',

  configureWebpack: config => {
    config.entry.mondernize = './src/js/modernizr-3.6.0.min.js',
      config.entry.plugins = './src/js/plugins.js'
  },

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 9000,
    https: false,
    hotOnly: false,
    proxy: {
      "/mes/*": {
        // target: "http://localhost:80",
        // target: "http://116.196.115.175:80",
        target: "http://10.245.150.40:8849",
        secure: false
      },
    },
    before: app => {}
  },
}