/**
 * 组件注册
 */

import Vue from "vue";
import formCreate from "@form-create/element-ui";

Vue.component('BaseUpload',{
  template: '<!--<el-button @click="onClick" long :disabled="disabled">计数器-{{num}}</el-button>-->\n<el-upload\n  class="upload-demo"\n  action="/api/goods/upload"\n  :on-preview="handlePreview"\n  :on-success="onSuccess"\n  :on-remove="handleRemove"\n  :disabled="disabled"\n  :before-remove="beforeRemove"\n  multiple\n  :file-list="fileList">\n  <el-button size="small" type="primary">点击上传</el-button>\n  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>\n</el-upload>',
  props:{
    //预定义
    disabled:Boolean,
    value:Array,
  },
  data() {
    return {
      fileList: []
    };
  },
  created() {
    this.fileList = this.value;
    this.$emit('input',this.fileList);
  },
  methods: {
    handleRemove(file, fileList) {
      console.log("删除附件");
      console.log(file, fileList);
      this.$emit('input',fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSuccess(response, file, fileList){
      console.log("response:",response.data);
      this.fileList.push(response.data);
      // console.log("fileList:",fileList);
      this.$emit('input',this.fileList);
    }
  }
});

formCreate.component('BaseUpload');
