/*
 * @Author: zhouyou@werun 
 * @Descriptions: 课程考勤详情页面
 * @TodoList: 无
 * @Date: 2018-11-21 11:19:33 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 11:54:16
 */

<template>
  <div id="course-attendance-detail-page">
    <a-row>
      <a-col :span="17">
        <div class="course-information">
          <h2>课程信息</h2>
          <p>《云计算导论：概念构架与应用》</p>
          <p>14:00-16:00</p>
        </div>
      </a-col>
      <a-col :span="5"
             :offset="1">col-8</a-col>
    </a-row>
  </div>
</template>


<script>
export default {
  name: "CourseAttendanceDetailPage"
};
</script>


<style lang="scss" scoped>
</style>

