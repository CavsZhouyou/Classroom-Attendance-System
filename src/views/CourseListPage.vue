/*
 * @Author: zhouyou@werun 
 * @Descriptions: 课程列表页面 
 * @TodoList: 无
 * @Date: 2018-11-21 09:47:34 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 11:29:45
 */


<template>
  <div id="course-list-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="课程列表"
                  key="1">
        <!-- 课程列表 -->
        <a-table :columns="columns"
                 :rowKey="record => (record.courseNumber)"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
          <span slot="action"
                slot-scope="text, record">
            <a href="javascript:;"
               @click="modifyCourse(record.courseNumber)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;"
               @click="deleteCourse(record.cours)">删除</a>
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
import * as paths from "../js/router_paths.js";

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
    title: "课程日期",
    dataIndex: "courseDate",
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
    title: "操作",
    key: "action",
    width: "10%",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "CourseListPage",
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
          courseDate: "10-15周",
          courseTime: "周一 下午2:00",
          courseClass: "1611101-1611105"
        },
        {
          courseNumber: "H89384564",
          courseName: "JavaEE程序设计",
          courseMajor: "软件工程",
          teacher: "朱东杰",
          courseAddress: "研究院中517",
          courseDate: "8-13周",
          courseTime: "周二 上午10:00",
          courseClass: "1611101-1611105"
        },
        {
          courseNumber: "H7987431",
          courseName: "编译原理",
          courseMajor: "软件工程",
          teacher: "韩希先",
          courseAddress: "G楼105",
          courseDate: "5-15周",
          courseTime: "周三 上午10:00",
          courseClass: "1611101-1611105"
        },
        {
          courseNumber: "H7456514",
          courseName: "互联网技术",
          courseMajor: "软件工程",
          teacher: "吴振大",
          courseAddress: "研究院中517",
          courseDate: "10-15周",
          courseTime: "周一 下午2:00",
          courseClass: "1611101-1611105"
        },
        {
          courseNumber: "H21389514",
          courseName: "算法导论",
          courseMajor: "软件工程",
          teacher: "权光日",
          courseAddress: "M楼301",
          courseDate: "1-10周",
          courseTime: "周一 下午2:00",
          courseClass: "1611101-1611105"
        },
        {
          courseNumber: "H55389514",
          courseName: "概率论",
          courseMajor: "通识",
          teacher: "王传才",
          courseAddress: "M楼107",
          courseDate: "1-12周",
          courseTime: "周一 下午2:00",
          courseClass: "1611101-1611105"
        }
      ];
      this.data = data;
      this.loading = false;
      this.pagination.total = 6;
    },

    /**
     * @description 删除课程
     * @param {Integar} CourseId 课程 id
     */
    deleteCourse: function(CourseId = 0) {
      const self = this;
      let postData = {
        CourseId: CourseId,
        workerId: this.userID
      };

      this.$confirm({
        title: "你确定删除此课程吗？",
        onOk() {}
      });
    },

    /**
     * @description 跳转到课程编辑页面
     * @param {Integar} 课程 id
     */
    modifyCourse(CourseId = 0) {}
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

