/*
 * @Author: zhouyou@werun 
 * @Descriptions: 课程信息修改页面 
 * @TodoList: 无
 * @Date: 2018-08-26 22:37:17 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 10:40:55
 */

<template>
  <div id="course-modify-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="课程信息修改"
                  key="1">
        <!-- 机器信息修改表单 -->
        <a-form id="modify-course-form"
                @submit="modifyCourse"
                :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item label='课程号：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="courseName"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入课程号！' }]}">
            <a-input placeholder="请输入机器名称"
                     v-model="courseName" />
          </a-form-item>
          <a-form-item label='mac地址：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="macAddress"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入mac地址！' }]}">
            <a-input placeholder="请输入mac地址"
                     v-model="macAddress" />
          </a-form-item>
          <a-form-item label='所属流程：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="processCode"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择所属流程！' }]}">
            <a-select placeholder='请选择所属流程'
                      v-model="processCode">
              <a-select-option v-for="(item, index) in processList"
                               :key="index"
                               :value='item.dicCode'>{{item.dicName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label='产品线：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="courseTypeCode"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择产品线！' }]}">
            <a-select placeholder='请选择产品线'
                      v-model="courseTypeCode">
              <a-select-option v-for="(item, index) in courseTypeList"
                               :key="index"
                               :value='item.dicCode'>{{item.dicName}}</a-select-option>
            </a-select>
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
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";

export default {
  name: "courseModifyPage",
  data() {
    return {
      courseName: "",
      macAddress: "",
      processCode: "",
      courseTypeCode: "",

      loading: false
    };
  },
  computed: {
    ...mapGetters(["userID", "processList", "courseTypeList"])
  },
  mounted() {
    // 获取机器信息
    this.getcourse();
  },
  methods: {
    /**
     * @description 获取机器信息
     */
    getcourse() {
      let postData = {
        courseId: this.$route.query.courseId,
        workerId: this.userID
      };

      this.$axios
        .post(urls.MES_GET_course_INFO_URL, qs.stringify(postData))
        .then(response => {
          let data = response.data;

          if (data.success) {
            // 赋值机器信息
            this.courseName = data.data.courseCode;
            this.macAddress = data.data.mac;
            this.processCode = data.data.process;
            this.courseTypeCode = data.data.type;
            this.setMchineFormData();
          }
        })
        .catch(error => {
          this.$message.error("网络错误！");
        });
    },

    /**
     * @description 修改机器信息
     */
    modifycourse() {
      // 阻止表单默认提交行为
      event.preventDefault();

      const self = this;
      let postData = {
        courseName: this.courseName,
        macAddress: this.macAddress,
        processCode: this.processCode,
        courseTypeCode: this.courseTypeCode,
        workerId: this.userID,
        courseId: this.$route.query.courseId
      };

      this.form.validateFields((error, values) => {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定要修改此机器信息吗？",
            onOk() {
              self.loading = true;
              self.$axios
                .post(urls.MES_MODIFY_course_URL, qs.stringify(postData))
                .then(response => {
                  let data = response.data;

                  if (data.success) {
                    self.$message.success("修改成功！");
                    self.$router.push(paths.MES_course_LIST_PAGE_PATH);
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
     * @description 设置表单数据
     */
    setMchineFormData() {
      this.form.setFieldsValue({
        courseName: this.courseName,
        macAddress: this.macAddress,
        processCode: this.processCode,
        courseTypeCode: this.courseTypeCode
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

#modify-course-form {
  margin-top: 25px;
}

.commit {
  width: 100%;
}
</style>

