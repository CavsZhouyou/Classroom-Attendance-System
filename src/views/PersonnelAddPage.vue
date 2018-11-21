/*
 * @Author: zhouyou@werun 
 * @Descriptions: 员工添加页面 
 * @TodoList: 无
 * @Date: 2018-08-26 22:47:27 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 20:22:01
 */

<template>
  <div id="personnel-add-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="员工添加"
                  key="1">
        <!-- 员工添加表单 -->
        <a-form id="add-personnel-form"
                @submit="addPersonnel()"
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

          <a-form-item label='角色：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="roleCode"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择角色！' }]}">
            <a-select placeholder='请选择角色'
                      v-model="roleCode">
              <a-select-option v-for="(item, index) in userRoleList"
                               :key="index"
                               :value='item.roleCode'>{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-if="isOfficeShow"
                       label='所属办事处：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="officeId"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择所属办事处！' }]}">
            <a-select placeholder='请选择所属办事处'
                      v-model="officeId">
              <a-select-option v-for="(item, index) in officeList"
                               :key="index"
                               :value='item.id'>{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
            <a-button class="commit"
                      type='primary'
                      htmlType='submit'
                      :loading="loading">
              确认添加
            </a-button>
          </a-form-item>
        </a-form>
        <a-upload class="batch-commit"
                  name="file"
                  :fileList="fileList"
                  :beforeUpload="beforeUpload">
          <a-button>
            <a-icon type="upload" /> 批量添加
          </a-button>
        </a-upload>
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
  name: "PersonnelAddPage",
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
  computed: {
    ...mapGetters(["userID", "userRoleList", "officeList", "sexList"]),

    /**
     * @description 判断角色是否为办事处员工
     */
    isOfficeShow() {
      return this.roleCode == OFFICE_CODE;
    }
  },
  methods: {
    /**
     * @description 添加员工
     */
    addPersonnel() {
      event.preventDefault();

      const self = this;
      let postData = {
        name: this.name,
        number: this.number,
        roleCode: this.roleCode,
        officeId: this.officeId,
        sex: this.sex,
        age: this.age,
        password: hex_md5(this.password),
        portrait: PORTRAIT_URL,
        workerId: this.userID
        // registerTime: this.registerTime,
      };

      this.form.validateFields((error, values) => {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定要添加此员工吗？",
            onOk() {
              self.loading = true;
              self.$axios
                .post(urls.MES_ADD_WORKER_URL, qs.stringify(postData))
                .then(response => {
                  let data = response.data;

                  if (data.success) {
                    self.$message.success("添加成功！");
                    self.$router.push(paths.MES_PERSONNEL_LIST_PAGE_PATH);
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
     * @description 组件默认上传前事件
     */

    beforeUpload(file) {
      // 获取当前上传的文件
      this.fileList = [...this.fileList, file];

      // 调用自定义的上传事件
      this.batchAddPersonnel();

      // 阻止组件默认上传事件
      return false;
    },

    /**
     * @description 批量添加员工
     */
    batchAddPersonnel() {
      let formData = new FormData(),
        file = this.fileList[0],
        config = {
          headers: { "Content-Type": "multipart/form-data" } // 设置请求头
        };

      // 设置上传数据
      formData.append("infoFile", file);
      formData.append("headRowCount", 1);

      this.$axios
        .post(urls.MES_IMPORT_INFO_URL, formData, config)
        .then(response => {
          let data = response.data;

          if (data.success) {
            this.$message.success(data.message);
            this.$router.push(paths.MES_PERSONNEL_LIST_PAGE_PATH);
          } else {
            this.$message.error(data.message);
            this.fileList = [];
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

#add-personnel-form {
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

