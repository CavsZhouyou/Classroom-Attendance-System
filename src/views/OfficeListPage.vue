/*
 * @Author: zhouyou@werun 
 * @Descriptions: 办事处列表页面 
 * @TodoList: 无
 * @Date: 2018-08-26 21:17:09 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 20:07:08
 */

<template>
  <div id="office-list-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <!-- 办事处列表  -->
      <a-tab-pane tab="办事处列表"
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
               @click="modifyOffice(record.id,record.name,record.provinceId,record.cityId,record.seriesNumber)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;"
               @click="deleteOffice(record.id)">删除</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import qs from "qs";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";
import { mapGetters, mapActions } from "vuex";

const columns = [
  {
    title: "系列id",
    dataIndex: "id",
    width: "10%",
    align: "center"
  },
  {
    title: "办事处名称",
    dataIndex: "name",
    width: "10%",
    align: "center"
  },
  {
    title: "省份",
    dataIndex: "provinceName",
    width: "10%",
    align: "center"
  },
  {
    title: "城市",
    dataIndex: "cityName",
    width: "10%",
    align: "center"
  },
  {
    title: "订单编码",
    dataIndex: "seriesNumber",
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
  name: "OfficeListPage",
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
    ...mapActions(["getOfficeList"]),

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
        .post(urls.MES_GET_OFFICE_PAGE_URL, qs.stringify(postData))
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
     * @description 删除办事处
     * @param {Integar} id 办事处id
     */
    deleteOffice(id = 0) {
      const self = this;
      let postData = {
        officeId: id,
        workerId: this.userID
      };

      this.$confirm({
        title: "你确定要删除此办事处吗？",
        onOk() {
          self.$axios
            .post(urls.MES_DELETE_OFFICE_URL, qs.stringify(postData))
            .then(response => {
              let data = response.data;

              if (data.success) {
                // 更新办事处列表信息
                self.getOfficeList();

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
     * @description 跳转到办事处编辑页面
     * @param {Integar} id 办事处id
     * @param {String} name 办事处名称
     * @param {Integar} provinceId 办事处所在省份id
     * @param {Integar} cityId 办事处所在城市id
     * @param {String} seriesNumber 办事处订单编码
     */
    modifyOffice(
      id = 0,
      name = "",
      provinceId = 0,
      cityId = 0,
      seriesNumber = ""
    ) {
      this.$router.push({
        path: paths.MES_OFFICE_MODIFY_PAGE_PATH,
        query: {
          id: id,
          name: name,
          provinceId: provinceId,
          cityId: cityId,
          seriesNumber: seriesNumber
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


