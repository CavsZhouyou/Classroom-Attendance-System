/*
 * @Author: zhouyou@werun 
 * @Descriptions: 员工列表页面 
 * @TodoList: 无
 * @Date: 2018-08-26 23:01:40 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 20:25:35
 */

<template>
  <div id="personnel-list-page">
    <a-input-search id="search-box"
                    placeholder="请输入搜索内容"
                    @search="search"
                    enterButton />
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <!-- 员工列表 -->
      <a-tab-pane tab="员工列表"
                  key="1">
        <a-table :columns="columns"
                 :rowKey="record => record.id"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
          <span slot="portrait"
                slot-scope="text, record">
            <a href="javascript:;"
               @click="viewProtrait(record.portrait)">点击查看</a>
          </span>
          <span slot="action"
                slot-scope="text, record">
            <a href="javascript:;"
               @click="modifyPersonnel(record.number)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;"
               @click="deletePersonnel(record.id)">删除</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs>

    <a-modal title="头像查看"
             v-model="visible"
             @ok="hideModal"
             okText="确认">
      <div class="portrait">
        <img :src="portrait"
             title="头像"
             alt="头像">
      </div>

    </a-modal>
  </div>
</template>

<script>
import qs from "qs";
import { mapGetters } from "vuex";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";

const columns = [
  {
    title: "员工号",
    dataIndex: "number",
    width: "10%",
    align: "center"
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: "10%",
    align: "center"
  },
  {
    title: "权限",
    dataIndex: "roleDescription",
    width: "10%",
    align: "center"
  },
  {
    title: "性别",
    dataIndex: "sex",
    width: "10%",
    align: "center"
  },
  {
    title: "年龄",
    dataIndex: "age",
    width: "10%",
    align: "center"
  },
  {
    title: "头像",
    key: "portrait",
    width: "5%",
    align: "center",
    scopedSlots: { customRender: "portrait" }
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
  name: "PersonnelListPage",
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
      portrait: "",
      searchKeyWords: ""
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
        workerId: this.userID,
        searchKeyWords: this.searchKeyWords
      };

      this.loading = true;

      this.$axios
        .post(urls.MES_GET_ALL_WORKERS_URL, qs.stringify(postData))
        .then(response => {
          let data = response.data;

          this.loading = false;

          // 更新列表数据
          this.data = data.result;
          this.pagination.total = data.totalCount;

          // 清除搜索结果
          this.searchKeyWords = "";
        })
        .catch(error => {
          this.$message.error("网络错误！");
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    },

    /**
     * @description 查看员工头像
     * @param {String} protrait 头像图片地址
     */
    viewProtrait(portrait = "") {
      this.portrait = portrait;
      this.visible = true;
    },

    /**
     * @description 隐藏头像对话框
     */
    hideModal() {
      this.visible = false;
    },

    /**
     * @description 删除员工
     * @param {Integar} id 员工id
     */
    deletePersonnel(id = 0) {
      const self = this;
      let postData = {
        deleteWorkerId: id,
        workerId: this.userID
      };

      this.$confirm({
        title: "你确定要删除此员工吗？",
        onOk() {
          self.$axios
            .post(urls.MES_DELETE_WORKER_URL, qs.stringify(postData))
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
     * @description 跳转到员工编辑页面
     * @param {String} number 员工号
     */
    modifyPersonnel(number = "") {
      this.$router.push({
        path: paths.MES_PERSONNEL_MODIFY_PAGE_PATH,
        query: {
          number: number
        }
      });
    },

    /**
     * @description 根据搜索信息查找员工
     * @param {String} value 搜索信息
     */
    search(value) {
      this.searchKeyWords = value;
      this.fetch();
    }
  }
};
</script>

<style lang="scss" scoped>
#personnel-list-page {
  position: relative;
}

#search-box {
  position: absolute;
  right: 50px;

  width: 250px;
}

.tab-list {
  padding-left: 50px;
  padding-right: 50px;

  text-align: left;
}

/* 设置头像居中显示 */
.portrait {
  width: 100%;
  text-align: center;
}
</style>


