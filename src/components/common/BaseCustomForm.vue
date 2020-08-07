<template>
  <div>
    <form-create v-model="formValue" :rule="columns" :option="option"></form-create>
  </div>
</template>

<script>
  import bus from './bus';

  export default {
    name: "BaseCustomForm",
    props: ['id','columns','initValue','saveUrl'],
    data() {
      const vm = this;
      return {
        formValue: this.initValue,
        //组件参数配置
        option: {
          //表单提交事件
          onSubmit: function (formData) {
            console.log("准备提交表单数据:",formData);
            // alert(JSON.stringify(formData));
            let newFormData = vm.dataFormat(formData);
            // return;
            vm.$axios.post(vm.saveUrl,newFormData).then(response => {
              console.log("response:",response);
              if (response.data.state === 0) {
                vm.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 1000
                });
                // that.formValue = that.initValue;
              }else {
                vm.$message({
                  message: '保存失败,请检查表单数据是否正常',
                  type: 'error'
                });
              }
              bus.$emit('doCallback',response.data.state);
            }).catch(function (error) {
              vm.$message({
                message: '保存失败,请检查表单数据是否正常',
                type: 'error'
              });
            });
          },
          form: {
            //行内表单模式
            inline: false,
            //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
            labelPosition: 'right',
            //表单域标签的后缀
            labelSuffix: undefined,
            //是否显示必填字段的标签旁边的红色星号
            hideRequiredAsterisk: false,
            //表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
            labelWidth: '125px',
            //是否显示校验错误信息
            showMessage: true,
            //是否以行内形式展示校验信息
            inlineMessage: false,
            //是否在输入框中显示校验结果反馈图标
            statusIcon: false,
            //是否在 rules 属性改变后立即触发一次验证
            validateOnRuleChange: true,
            //是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
            disabled: false,
            //用于控制该表单内组件的尺寸 medium / small / mini
            size: undefined,
          },
          row: {
            //栅格间隔
            gutter: 0,
            //布局模式，可选 flex，现代浏览器下有效
            type: undefined,
            //flex 布局下的垂直排列方式 top/middle/bottom
            align: 'middle',
            //flex 布局下的水平排列方式 start/end/center/space-around/space-between
            justify: 'center',
            //自定义元素标签
            tag: 'div'
          },
          submitBtn: {
            //类型 primary / success / warning / danger / info / text
            type: "primary",
            //尺寸 medium / small / mini
            size: "medium",
            //是否朴素按钮
            plain: false,
            //是否圆角按钮
            round: false,
            //是否圆形按钮
            circle: false,
            //是否加载中状态
            loading: false,
            //是否禁用状态
            disabled: false,
            //图标类名
            icon: 'el-icon-upload',
            //按钮宽度
            width: '50%',
            //是否默认聚焦
            autofocus: false,
            //原生 type 属性
            nativeType: "button",
            //按钮内容
            innerText: "提交",
            //按钮是否显示
            show: true,
            //按钮布局规则
            col: undefined,
            //按钮点击事件
            click: null,
          },
          resetBtn: {
            type: "danger",
            size: "medium",
            plain: false,
            round: false,
            circle: false,
            loading: false,
            disabled: false,
            icon: 'el-icon-refresh',
            width: '50%',
            autofocus: false,
            nativeType: "button",
            innerText: "重置",
            show: true,
            col: undefined,
            click: undefined
          },
          info: {
            //提示消息类型,popover,tooltip
            type: "popover"
          }
        }
      }
    },
    watch:{
      initValue:{
        handler(curVal, oldVal) {
          console.log("监听formValue值变化");
          if (curVal) {
            this.formValue = curVal;
          }
        },
        immediate: true,
        deep: true
      },
    },
    created() {
      // 初始化表单数据
      const $f = formCreate.create(this.columns);
      console.log("formValue",this.formValue);
      $f.setValue(this.formValue);
    },
    methods: {
      dataFormat(formData){
        console.log("数据转换前：",formData);
        let newFormData = {};
        Object.keys(formData).forEach(function (key) {
          let value = formData[key];
          newFormData[key] = key==='id'?value:JSON.stringify(value);
        });
        console.log("数据转换后：",newFormData);
        return newFormData;
      },
      onSubmit() {
        const that = this;
        console.log('submitUrl:',that.saveUrl);
        that.$axios.post(that.saveUrl,that.formValue).then(response => {
          console.log("response:",response);
          if (response.data.state === 0) {
            that.$message({
              message: '保存成功',
              type: 'success',
              duration: 1000
            });
            // that.formValue = that.initValue;
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
