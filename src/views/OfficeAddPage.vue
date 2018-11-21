/*
 * @Author: zhouyou@werun 
 * @Descriptions: 添加办事处页面 
 * @TodoList: 
 *   1. 地址选择器的数据双向绑定问题，暂时使用 onchange 事件解决，可以寻找更合适的解决办法
 * @Date: 2018-08-26 17:48:12 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 20:02:05
 */

<template>
  <div id="office-add-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="办事处添加"
                  key="1">
        <!-- 办事处添加表单 -->
        <a-form id="add-office-form"
                @submit="addOffice"
                :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item label='办事处名称：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="name"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入办事处名称！' }]}">
            <a-input placeholder="请输入办事处名称"
                     v-model="name" />
          </a-form-item>
          <a-form-item label='办事处订单编码：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="number"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入办事处订单编码！' }]}">
            <a-input placeholder="请输入办事处订单编码"
                     v-model="number" />
          </a-form-item>
          <a-form-item label='办事处地址：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="address"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择办事处地址！' }]}">
            <a-cascader :options="options"
                        @change="onChange"
                        :loadData="loadData"
                        placeholder="请选择办事处地址"
                        changeOnSelect />
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
            <a-button class="commit"
                      type='primary'
                      htmlType='submit'>
              确认添加
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>


<script>
import qs from "qs";
import * as urls from "../js/post_urls.js";
import { mapGetters, mapActions } from "vuex";
import * as paths from "../js/router_paths.js";

export default {
  name: "OfficeAddPage",
  data() {
    return {
      name: "",
      number: "",
      provinceId: 0,
      cityId: 0,
      options: [
        {
          value: "0",
          label: "正在加载",
          isLeaf: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userID", "provinceList"])
  },
  watch: {
    provinceList(curVal, oldVal) {
      this.options = curVal;
    }
  },
  mounted() {
    // 设置地址数据
    this.options = this.provinceList;
  },
  methods: {
    ...mapActions(["getOfficeList"]),

    /**
     * @description 更新地址数据
     * @param {Array} value 选中地址数组
     */
    onChange(value = []) {
      this.provinceId = value[0];
      this.cityId = value[1];
    },

    /**
     * @description 加载城市列表
     * @param {Array} selectedOptions 选中选项
     */
    loadData(selectedOptions = []) {
      const targetOption = selectedOptions[selectedOptions.length - 1]; // 获取最后一次选中项
      let postData = {
        workerId: 1,
        provinceId: targetOption.value
      };
      targetOption.loading = true;

      // 请求城市列表数据
      this.$axios
        .post(urls.MES_GET_CITY_LIST_URL, qs.stringify(postData))
        .then(response => {
          let data = response.data,
            cityList = [];

          if (data.success) {
            targetOption.loading = false;

            // 格式化数据
            cityList = this.formatAddressList(data.data.addressList);

            // 更新下拉项数据
            targetOption.children = cityList;
            this.options = [...this.options];
          }
        })
        .catch(error => {
          this.$message.error("网络错误！");
          setTimeout(() => {
            targetOption.loading = false;
          }, 1000);
        });
    },

    /**
     * @description 添加办事处
     */
    addOffice() {
      // 阻止表单默认提交行为
      event.preventDefault();

      const self = this;
      let postData = {
        officeName: this.name,
        seriesNumber: this.number,
        provinceId: this.provinceId,
        cityId: this.cityId,
        workerId: this.userID
      };

      this.form.validateFields((error, values) => {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定要添加此办事处吗？",
            onOk() {
              self.loading = true;
              self.$axios
                .post(urls.MES_ADD_OFFICE_URL, qs.stringify(postData))
                .then(response => {
                  let data = response.data;

                  if (data.success) {
                    // 更新办事处列表信息
                    self.getOfficeList();

                    self.$message.success("添加成功！");
                    self.$router.push(paths.MES_OFFICE_LIST_PAGE_PATH);
                  } else {
                    self.$message.error("添加失败！");
                    self.loading = false;
                  }
                })
                .catch(error => {
                  self.$message.error("网络错误！");
                  setTimeout(() => {
                    self.loading = false;
                  }, 1000);
                });
            }
          });
        }
      });
    },

    /**
     * @description 格式化地址列表数据
     * @param {Object} originalData 原始数据
     * @return {Object} addressList 格式化后数据
     */
    formatAddressList(originalData = {}) {
      let addressList = [];

      originalData.forEach((item, index) => {
        let address = {
          value: item.id.toString(),
          label: item.name
        };

        addressList.push(address);
      });

      return addressList;
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

#add-office-form {
  margin-top: 25px;
}

.commit {
  width: 100%;
}
</style>

