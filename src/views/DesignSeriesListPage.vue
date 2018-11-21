/*
 * @Author: zhouyou@werun 
 * @Descriptions: 设计系列列表页面
 * @TodoList: 
 *   1. 当前只测试威尔顿，因此获取列表时 parentCode 暂时写死，后面需要更改回来
 * @Date: 2018-08-26 23:31:43 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 19:41:05
 */


<template>
  <div id="design-series-list-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <!-- 设计系列列表 -->
      <a-tab-pane tab="设计系列列表"
                  key="1">
        <a-table :columns="columns"
                 :rowKey="record => record.id"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
          <span slot="action"
                slot-scope="text, record">
            <a href="javascript:;"
               @click="deleteDesignSeries(record.id)">删除</a>
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
    title: "id",
    dataIndex: "id",
    width: "10%",
    align: "center"
  },
  {
    title: "系列码",
    dataIndex: "seriesCode",
    width: "10%",
    align: "center"
  },
  {
    title: "系列名",
    dataIndex: "seriesName",
    width: "10%",
    align: "center"
  },
  {
    title: "父级码",
    dataIndex: "parentCode",
    width: "10%",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    width: "5%",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "DesignSeriesListPage",
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
      columns,
      visible: false,
      portrait: ""
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
      let postData = {
        start: this.pagination.current,
        limit: this.pagination.pageSize,
        dir: "desc",
        parentCode: "01000000", //暂时之获取威尔顿，后面需要可以加筛选选择
        workerId: this.userID
      };

      this.loading = true;

      this.$axios
        .post(urls.MES_GET_DESIGN_SERIES_URL, qs.stringify(postData))
        .then(response => {
          let data = response.data;

          this.loading = false;

          // 更新列表数据
          this.data = data.result;
          this.pagination.total = data.totalCount;
        })
        .catch(error => {
          this.$message.error("网络错误！");
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    },

    /**
     * @description 删除系列码
     * @param {Integar} id 系列码id
     */
    deleteDesignSeries(id = 0) {
      const self = this;
      let postData = {
        seriesId: id,
        workerId: this.userID
      };

      this.$confirm({
        title: "你确定要删除此设计系列码吗？",
        onOk() {
          self.$axios
            .post(urls.MES_DELETE_DESIGN_SERIES_URL, qs.stringify(postData))
            .then(response => {
              let data = response.data;

              if (data.success) {
                self.$message.success("删除成功！");

                // 更新列表内容
                self.fetch();
              } else {
                self.$message.error("删除失败！");
              }
            })
            .catch(error => {
              self.$message.error("网络错误！");
            });
        }
      });
    }
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


