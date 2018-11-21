/*
 * @Author: zhouyou@werun 
 * @Descriptions: 办事处详细及修改页面
 * @TodoList: 无
 * @Date: 2018-08-26 21:51:17 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 20:14:53
 */

<template>
  <div id="office-modify-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="办事处信息修改"
                  key="1">
        <!-- 办事处信息修改表单 -->
        <a-form id="modify-office-form"
                @submit="modifyOffice"
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
                        placeholder="请选择办事处地址！"
                        changeOnSelect />
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
            <a-button class="commit"
                      type='primary'
                      htmlType='submit'>
              确认修改
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
import * as paths from "../js/router_paths.js";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddOfficePage",
  data() {
    return {
      name: this.$route.query.name,
      number: this.$route.query.seriesNumber,
      provinceId: this.$route.query.provinceId,
      cityId: this.$route.query.cityId,
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

      // 获取默认城市列表
      this.setDefaultCityList();
    }
  },
  mounted() {
    // 设置地址数据
    this.options = this.provinceList;

    // 获取默认城市列表
    this.setDefaultCityList();

    // 设置表单数据
    this.setOfficeFormData();
  },
  methods: {
    ...mapActions(["getOfficeList"]),

    /**
     * @description 更新地址数据
     * @param {Array} value 选中地址数组
     */
    onChange(valu = []) {
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
        workerId: this.userID,
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
            this.options = [...self.options];
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
     * @description 修改办事处信息
     */
    modifyOffice() {
      event.preventDefault();

      const self = this;
      let postData = {
        officeName: this.name,
        seriesNumber: this.number,
        provinceId: this.provinceId,
        cityId: this.cityId,
        workerId: this.userID,
        officeId: this.$route.query.id
      };

      this.form.validateFields((error, values) => {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定要修改此办事处信息吗？",
            onOk() {
              self.loading = true;
              self.$axios
                .post(urls.MES_MODIFY_OFFICE_URL, qs.stringify(postData))
                .then(response => {
                  let data = response.data;

                  if (data.success) {
                    // 更新办事处列表信息
                    self.getOfficeList();

                    self.$message.success("修改成功！");
                    self.$router.push(paths.MES_OFFICE_LIST_PAGE_PATH);
                  } else {
                    self.$message.error("修改失败！");
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
     * @description 获取设置默认城市列表
     */
    setDefaultCityList() {
      let postData = {
        workerId: 1,
        provinceId: this.$route.query.provinceId
      };

      // 请求城市列表数据
      this.$axios
        .post(urls.MES_GET_CITY_LIST_URL, qs.stringify(postData))
        .then(response => {
          let data = response.data,
            cityList = [];

          if (data.success) {
            // 格式化数据
            cityList = this.formatAddressList(data.data.addressList);

            // 找到选中项，添加二级菜单
            this.addChildrenOptions(cityList);
          }
        })
        .catch(error => {
          this.$message.error("网络错误！");
        });
    },

    /**
     * @description 设置表单数据
     */
    setOfficeFormData() {
      this.form.setFieldsValue({
        name: this.$route.query.name,
        number: this.$route.query.seriesNumber,
        address: [
          this.$route.query.provinceId.toString(),
          this.$route.query.cityId.toString()
        ]
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
    },

    /**
     * @description 找到选中项，添加二级菜单
     * @param {Array} data 原始数据
     */
    addChildrenOptions(children = []) {
      this.options.forEach(item, index => {
        if (item.value == this.$route.query.provinceId) {
          item.children = children;
        }
      });

      this.options = [...this.options];
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

#modify-office-form {
  margin-top: 25px;
}

.commit {
  width: 100%;
}
</style>

