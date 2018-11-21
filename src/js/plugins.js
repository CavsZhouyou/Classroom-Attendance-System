/*
 * @Author: zhouyou@werun 
 * @Descriptions: 解决浏览器 console 禁用后的报错问题 
 * @TodoList: 无
 * @Date: 2018-08-29 18:18:21 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-29 18:18:43
 */


(function () {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.