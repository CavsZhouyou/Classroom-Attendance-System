/*
 * @Author: zhouyou@werun 
 * @Descriptions: 课程考勤列表 
 * @TodoList: 无
 * @Date: 2018-11-21 10:48:28 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 11:13:46
 */


<template>
  <div id="course-attendance-list-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="课程考勤列表"
                  key="1">
        <!-- 课程考勤列表 -->
        <a-table :columns="columns"
                 :rowKey="record => record.id"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
          <span slot="action"
                slot-scope="text, record">
            <a href="javascript:;"
               @click="showAttendance(record.param)">点击查看</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import qs from "qs";
import { mapGetters } from "vuex";
import * as urls from "../js/post_urls.js";

const columns = [
  {
    title: "课程号",
    dataIndex: "courseNumber",
    width: "10%",
    align: "center"
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    width: "10%",
    align: "center"
  },
  {
    title: "课程方向",
    dataIndex: "courseMajor",
    width: "10%",
    align: "center"
  },
  {
    title: "任课老师",
    dataIndex: "teacher",
    width: "10%",
    align: "center"
  },
  {
    title: "课程地点",
    dataIndex: "courseAddress",
    width: "10%",
    align: "center"
  },
  {
    title: "课程时间",
    dataIndex: "courseTime",
    width: "10%",
    align: "center"
  },
  {
    title: "上课班级",
    dataIndex: "courseClass",
    width: "10%",
    align: "center"
  },
  {
    title: "考勤状态",
    dataIndex: "attendanceStatus",
    width: "10%",
    align: "center"
  },
  {
    title: "考勤人数",
    dataIndex: "attendanceNumber",
    width: "10%",
    align: "center"
  },

  {
    title: "操作",
    key: "action",
    width: "10%",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "CourseAttendanceListPage",
  data() {
    return {
      data: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true
      },
      loading: false,
      columns
    };
  },
  computed: {
    ...mapGetters(["userID"])
  },
  mounted() {
    // 获取列表内容
    this.fetch();
  },
  methods: {
    /**
     * @description 点击分页动态更新列表数据
     * @param {Object} pagination 分页对象
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    handleTableChange(pagination = {}, filters = {}, sorter = {}) {
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.current = pagination.current;
      this.fetch();
    },

    /**
     * @description 获取列表数据
     */
    fetch() {
      this.loading = true;
      let data = [
        {
          courseNumber: "H75389514",
          courseName: "云计算概论",
          courseMajor: "软件工程",
          teacher: "朴雪峰",
          courseAddress: "研究院中507",
          courseTime: "2018-11-12 14:00",
          courseClass: "1611101-1611105",
          attendanceStatus: "进行中",
          attendanceNumber: "160/182"
        },
        {
          courseNumber: "H89384564",
          courseName: "JavaEE程序设计",
          courseMajor: "软件工程",
          teacher: "朱东杰",
          courseAddress: "研究院中517",
          courseTime: "2018-11-13 10:00",
          courseClass: "1611101-1611105",
          attendanceStatus: "未开始",
          attendanceNumber: "0/182"
        },
        {
          courseNumber: "H7987431",
          courseName: "编译原理",
          courseMajor: "软件工程",
          teacher: "韩希先",
          courseAddress: "G楼105",
          courseTime: "2018-11-14 10:00",
          courseClass: "1611101-1611105",
          attendanceStatus: "未开始",
          attendanceNumber: "0/182"
        },
        {
          courseNumber: "H7456514",
          courseName: "互联网技术",
          courseMajor: "软件工程",
          teacher: "吴振大",
          courseAddress: "研究院中517",
          courseTime: "2018-11-15 2:00",
          courseClass: "1611101-1611105",
          attendanceStatus: "未开始",
          attendanceNumber: "0/182"
        },
        {
          courseNumber: "H21389514",
          courseName: "算法导论",
          courseMajor: "软件工程",
          teacher: "权光日",
          courseAddress: "M楼301",
          courseTime: "2018-11-20 2:00",
          courseClass: "1611101-1611105",
          attendanceStatus: "未开始",
          attendanceNumber: "0/182"
        },
        {
          courseNumber: "H55389514",
          courseName: "概率论",
          courseMajor: "通识",
          teacher: "王传才",
          courseAddress: "M楼107",
          courseTime: "2018-11-21 下午2:00",
          courseClass: "1611101-1611105",
          attendanceStatus: "未开始",
          attendanceNumber: "0/182"
        }
      ];
      this.data = data;
      this.loading = false;
      this.pagination.total = 6;
    },

    /**
     * @description 查看考勤情况
     * @param {Object} params 参数信息
     */
    showAttendance(params = {}) {}
  }
};
</script>

<style lang="scss" scoped>
.tab-list {
  padding-left: 50px;
  padding-right: 50px;

  text-align: left;
}
</style>


