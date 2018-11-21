/*
 * @Author: zhouyou@werun 
 * @Descriptions: 机器列表页面 
 * @TodoList: 无
 * @Date: 2018-08-26 22:25:52 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 19:50:44
 */

<template>
  <div id="machine-list-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="机器列表"
                  key="1">
        <!-- 机器列表 -->
        <a-table :columns="columns"
                 :rowKey="record => (record.macAddress + record.processName)"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
          <span slot="action"
                slot-scope="text, record">
            <a href="javascript:;"
               @click="modifyMachine(record.machineId)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;"
               @click="deleteMachine(record.machineId)">删除</a>
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
    title: "机器名",
    dataIndex: "machineName",
    width: "10%",
    align: "center"
  },
  {
    title: "排产状态",
    dataIndex: "machineStatusName",
    width: "10%",
    align: "center"
  },
  {
    title: "所属流程",
    dataIndex: "processName",
    width: "10%",
    align: "center"
  },
  {
    title: "产品线",
    dataIndex: "machineTypeName",
    width: "10%",
    align: "center"
  },
  {
    title: "mac地址",
    dataIndex: "macAddress",
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
  name: "MachineListPage",
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
      let postData = {
        start: this.pagination.current,
        limit: this.pagination.pageSize,
        dir: "desc",
        workerId: this.userID
      };

      this.loading = true;

      this.$axios
        .post(urls.MES_GET_MACHINE_PAGE_URL, qs.stringify(postData))
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
     * @description 删除机器
     * @param {Integar} machineId 机器 id
     */
    deleteMachine: function(machineId = 0) {
      const self = this;
      let postData = {
        machineId: machineId,
        workerId: this.userID
      };

      this.$confirm({
        title: "你确定删除此机器吗？",
        onOk() {
          self.$axios
            .post(urls.MES_DELETE_MACHINE_URL, qs.stringify(postData))
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
    },

    /**
     * @description 跳转到机器编辑页面
     * @param {Integar} machineId 机器 id
     */
    modifyMachine(machineId = 0) {
      this.$router.push({
        path: paths.MES_MACHINE_MODIFY_PAGE_PATH,
        query: {
          machineId: machineId
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


