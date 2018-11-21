/*
 * @Author: zhouyou@werun 
 * @Descriptions: 机器添加页面 
 * @TodoList: 无
 * @Date: 2018-08-26 22:11:27 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-05 19:45:36
 */


<template>
  <div id="machine-add-page">
    <a-tabs class="tab-list"
            defaultActiveKey="1">
      <a-tab-pane tab="机器添加"
                  key="1">
        <!-- 机器添加表单 -->
        <a-form id="add-machine-form"
                @submit="addMachine"
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
  name: "MachineAddPage",
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
  methods: {
    /**
     * @description 添加机器
     */
    addMachine() {
      // 阻止表单默认提交行为
      event.preventDefault();

      const self = this;
      let postData = {
        machineName: this.machineName,
        macAddress: this.macAddress,
        processCode: this.processCode,
        machineTypeCode: this.machineTypeCode,
        workerId: this.userID
      };

      this.form.validateFields((error, values) => {
        // 验证成功
        if (!error) {
          self.$confirm({
            title: "你确定添加此机器吗？",
            onOk() {
              self.loading = true;
              self.$axios
                .post(urls.MES_ADD_MACHINE_URL, qs.stringify(postData))
                .then(response => {
                  let data = response.data;

                  if (data.success) {
                    self.$message.success("添加成功！");
                    self.$router.push(paths.MES_MACHINE_LIST_PAGE_PATH);
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

#add-machine-form {
  margin-top: 25px;
}

.commit {
  width: 100%;
}
</style>

