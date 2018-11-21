/*
 * @Author: zhouyou@werun 
 * @Descriptions: 个人信息修改页面 
 * @TodoList: 无
 * @Date: 2018-11-21 09:04:30 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 09:10:47
 */


<template>
  <div id="modify-user-information-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="个人信息修改"
                  key="1">
        <!-- 个人信息修改表单 -->
        <a-form id="user-information-form"
                @submit="modifyPersonnel()"
                :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item label='姓名：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="name"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入姓名！' }]}">
            <a-input placeholder="请输入姓名"
                     v-model="name" />
          </a-form-item>
          <a-form-item label='年龄：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="age"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入年龄！' }]}">
            <a-input-number class="age"
                            :min="18"
                            :max="100"
                            placeholder="请输入年龄"
                            v-model="age" />
          </a-form-item>
          <a-form-item label='性别：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="sex"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择性别！' }]}">
            <a-select placeholder='请选择性别'
                      v-model="sex">
              <a-select-option v-for="(item, index) in sexList"
                               :key="index"
                               :value='item.dicCode'>{{item.dicName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label='入职时间：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="registerTime"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择入职时间！' }]}">
            <a-date-picker class="date"
                           placeholder="请选择入职时间"
                           v-model="registerTime" />
          </a-form-item>
          <a-form-item label='员工号：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="number"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入员工号！' }]}">
            <a-input placeholder="请输入员工号"
                     v-model="number" />
          </a-form-item>
          <a-form-item label='密码：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="password"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码！' }]}">
            <a-input type="password"
                     placeholder="请输入密码"
                     v-model="password" />
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
            <a-button class="commit"
                      type='primary'
                      htmlType='submit'
                      :loading="loading">
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
import { mapGetters } from "vuex";
import { hex_md5 } from "../js/md5.js";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";

const OFFICE_CODE = "04000000",
  PORTRAIT_URL = "http://p2p4htzmu.bkt.clouddn.com/images.png";

export default {
  name: "ModifyUserInformationPage",
  data() {
    return {
      name: "",
      number: "",
      roleCode: "",
      officeId: "",
      sex: "",
      age: "",
      password: "",
      registerTime: "",
      fileList: [],

      loading: false,

      officeShow: false
    };
  },
  methods: {
    /**
     * @description 修改个人信息
     */
    modifyPersonnel() {
      event.preventDefault();

      this.form.validateFields((error, values) => {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定要修改吗？",
            onOk() {}
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

#user-information-form {
  margin-top: 25px;
}

.age {
  width: 100%;
}

.date {
  width: 100%;
}

.commit {
  width: 100%;
}

.batch-commit {
  float: right;
  margin-bottom: 20px;
}
</style>

