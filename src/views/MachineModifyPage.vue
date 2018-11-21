/*
 * @Author: zhouyou@werun 
 * @Descriptions: 机器信息修改页面 
 * @TodoList: 无
 * @Date: 2018-08-26 22:37:17 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 19:55:40
 */

<template>
  <div id="machine-modify-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="机器信息修改"
                  key="1">
        <!-- 机器信息修改表单 -->
        <a-form id="modify-machine-form"
                @submit="modifyMachine"
                :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item label='机器名称：'
                       :labelCol="{ span: 5 }"
                       :wrapperCol="{ span: 12 }"
                       fieldDecoratorId="machineName"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入机器名称！' }]}">
            <a-input placeholder="请输入机器名称"
                     v-model="machineName" />
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
                       fieldDecoratorId="machineTypeCode"
                       :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择产品线！' }]}">
            <a-select placeholder='请选择产品线'
                      v-model="machineTypeCode">
              <a-select-option v-for="(item, index) in machineTypeList"
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
  name: "MachineModifyPage",
  data() {
    return {
      machineName: "",
      macAddress: "",
      processCode: "",
      machineTypeCode: "",

      loading: false
    };
  },
  computed: {
    ...mapGetters(["userID", "processList", "machineTypeList"])
  },
  mounted() {
    // 获取机器信息
    this.getMachine();
  },
  methods: {
    /**
     * @description 获取机器信息
     */
    getMachine() {
      let postData = {
        machineId: this.$route.query.machineId,
        workerId: this.userID
      };

      this.$axios
        .post(urls.MES_GET_MACHINE_INFO_URL, qs.stringify(postData))
        .then(response => {
          let data = response.data;

          if (data.success) {
            // 赋值机器信息
            this.machineName = data.data.machineCode;
            this.macAddress = data.data.mac;
            this.processCode = data.data.process;
            this.machineTypeCode = data.data.type;
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
    modifyMachine() {
      // 阻止表单默认提交行为
      event.preventDefault();

      const self = this;
      let postData = {
        machineName: this.machineName,
        macAddress: this.macAddress,
        processCode: this.processCode,
        machineTypeCode: this.machineTypeCode,
        workerId: this.userID,
        machineId: this.$route.query.machineId
      };

      this.form.validateFields((error, values) => {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定要修改此机器信息吗？",
            onOk() {
              self.loading = true;
              self.$axios
                .post(urls.MES_MODIFY_MACHINE_URL, qs.stringify(postData))
                .then(response => {
                  let data = response.data;

                  if (data.success) {
                    self.$message.success("修改成功！");
                    self.$router.push(paths.MES_MACHINE_LIST_PAGE_PATH);
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
        machineName: this.machineName,
        macAddress: this.macAddress,
        processCode: this.processCode,
        machineTypeCode: this.machineTypeCode
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

#modify-machine-form {
  margin-top: 25px;
}

.commit {
  width: 100%;
}
</style>

