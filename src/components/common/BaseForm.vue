<template>
  <el-form :model="formValue" label-width="100px" ref="ruleForm">
    <el-form-item
      v-if="column.label"
      v-for="(column,index) in columns"
      :key="index"
      :label="column.label"
      :prop="column.prop"

    >
      <el-input v-model="formValue[column.prop]" :placeholder="column.label"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit()">保存</el-button>
<!--      <el-button @click="resetForm('ruleForm')">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import bus from '../common/bus';

  export default {
    name: "BaseForm",
    props: ['id','columns','initValue','saveUrl'],
    data() {
      return {
        formValue: this.initValue,
      }
    },
    watch:{
      initValue(curVal,oldVal){
        console.log("监听formValue值变化");
        console.log(curVal,oldVal);
        if (curVal) {
          this.formValue = curVal;
        }
      }
    },
    // mounted() {
    //   console.log(this.initValue);
    //   if (this.initValue) {
    //     this.formValue = this.initValue;
    //   }
    //
    // },
    methods: {
      onSubmit() {
        const that = this;
        console.log('submitUrl:',that.saveUrl);
        console.log("表单数据:", that.formValue);
        that.$axios.post(that.saveUrl,that.formValue).then(response => {
          console.log("response:",response);
          if (response.data.state === 0) {
            that.$message({
              message: '保存成功',
              type: 'success'
            });
            that.formValue = that.initValue;
          }else {
            that.$message({
              message: '保存失败,请检查表单数据是否正常',
              type: 'error'
            });
          }
          bus.$emit(that.id+'doCallback',response.data.state);
        }).catch(function (error) {
          that.$message({
            message: '保存失败,请检查表单数据是否正常',
            type: 'error'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
