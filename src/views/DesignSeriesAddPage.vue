/*
 * @Author: zhouyou@werun 
 * @Descriptions: 设计系列添加页面 
 * @TodoList: 
 *   1. 当前只测试威尔顿，因此 parentCode 暂时写死，后面需要修改回来
 * @Date: 2018-08-26 23:25:17 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 19:38:24
 */


<template>
  <div id="design-series-add-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="设计系列添加"
                  key="1">
        <!-- 设计系列添加表单 -->
        <a-form id="add-design-series-form"
                @submit="addDesignSeries"
                :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item label='类别：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="type"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择类别！' }]}">
            <a-select placeholder='请选择类别'
                      v-model="type">
              <a-select-option v-for="(item, index) in designSeriesList"
                               :key="index"
                               :value='item.dicCode'>{{item.dicName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label='系列名：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="seriesName"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入系列名！' }]}">
            <a-input placeholder="请输入系列名"
                     v-model="seriesName" />
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
import { mapGetters } from "vuex";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";

export default {
  name: "DesignSeriesAddPage",
  data() {
    return {
      type: "",
      seriesName: ""
    };
  },
  computed: {
    ...mapGetters(["userID", "designSeriesList"])
  },
  methods: {
    /**
     * @description 添加设计系列码
     */
    addDesignSeries() {
      event.preventDefault();

      const self = this;
      let postData = {
        parentCode: "01000000", //这里暂时写死
        seriesName: this.seriesName,
        workerId: this.userID
      };

      this.form.validateFields((error, values) => {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定添加此设计系列码吗？",
            onOk() {
              self.loading = true;
              self.$axios
                .post(urls.MES_ADD_DESIGN_SERIES_URL, qs.stringify(postData))
                .then(response => {
                  let data = response.data;

                  if (data.success) {
                    self.$message.success("添加成功！");
                    self.$router.push(paths.MES_DESIGN_SERIES_LIST_PAGE_PATH);
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

#add-design-series-form {
  margin-top: 25px;
}

.commit {
  width: 100%;
}
</style>

