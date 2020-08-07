<template>
  <div>
    <base-custom-table
      :tableColumn="tableColumn"
      :operate-column="operateColumn"
      :with-toolbar="withToolbar"
      :tool-button="toolButton"
      :api="api"
      :init-value="initValue"
      v-on:operateBtnClick="operateBtnClick"
    />
  </div>
</template>

<script>
  import BaseCustomTable from "../common/BaseCustomTable";
  export default {
    name: "Goods",
    components: {BaseCustomTable},
    data(){
      return {
        id:'Goods',
        tableColumn:[
          {
            type:'hidden',
            field: 'id',
            title:'ID',
            // align: 'center',
            // hidden: true,
            width: "240"
          },
          {
            type: "input",
            field: 'gName',
            title: '名称',
            // value:'手机壳',
            // align: 'center',
            width: "240",
            props: {
              type: "text",
              clearable: true,
              maxlength: 10,
              minlength: 6,
              prefixIcon: 'el-icon-eleme',
              suffixIcon: 'el-icon-s-home',
              autocomplete: "on",
              readonly: false,
              placeholder: '请输入产品名称'
            },
            validate: [
              {required: true, message: '请输入goods_name', trigger: 'blur'},
            ]
          },
          {
            type: 'datePicker',
            field: 'gDate',
            title: '上传日期',
            // value:'2020-7-17',
            // align: 'center',
            width: "240"
          },
          {
            type: "InputNumber",
            field: 'gPrice',
            title: '价格',
            // value: 18,
            // align: 'center',
            width: "240",
            props: {
              min: 10,
              max: 100,
              precision: 1,
              step: 1,
              size: 'small',
            },
            on:{
              change:(data)=>{
                console.log(data);
              }
            }
          },
          {
            type: "radio",
            // align: 'center',
            field: 'gFreeship',
            title: '是否包邮',
            width: "240",
            // value: "0",
            options: [
              {value: "0", label: "不包邮", disabled: false},
              {value: "1", label: "包邮", disabled: false},
            ],
            props:{
              disabled:false
            }
          },
          {
            type: "checkbox",
            // align: 'center',
            field: 'gTag',
            title: '标签',
            width: "240",
            // value: ["1", "2", "3"],
            options: [
              {value: "好用", label: "好用", disabled: false},
              {value: "方便", label: "方便", disabled: false},
              {value: "实用", label: "实用", disabled: false},
              {value: "有效", label: "有效", disabled: false},
            ],
            props:{
              // min:2,
              // max:3
            }
          },
          {
            type: "select",
            // align: 'center',
            field: 'gCategory',
            title: '分类',
            width: "240",
            // value: ["1", "2"],
            options: [
              {"value": "1", "label": "蔬菜", "disabled": false},
              {"value": "2", "label": "水果", "disabled": false},
              {"value": "3", "label": "服装", "disabled": false},
              {"value": "4", "label": "数码", "disabled": false},
              {"value": "5", "label": "零食", "disabled": false},
            ],
            props: {
              multiple: true,
              clearable:true,
              collapseTags:true,
              multipleLimit:3,
              filterable:false,
              allowCreate:true,
              defaultFirstOption:true,
              automaticDropdown:true
            },
            on:{
              "remove-tag":(tag)=>{
                console.log(tag);
              }
            }
          },
          {
            type: "switch",
            // align: 'center',
            field: 'gPuton',
            title: '是否上架',
            width: "240",
            // value: "0",
            props: {
              width:40,
              activeValue: "1",
              inactiveValue: "0",
              activeText:"on",
              inactiveText:"off",
              activeColor:"#409EFF",
              inactiveColor:"#C0CCDA",
              activeIconClass:"el-icon-medal-1",
              inactiveIconClass:"el-icon-medal"
            },
            on:{
              change:(newValue) => {
                console.log(newValue);
              }
            }
          },
          {
            type:'BaseUpload',
            // align: 'center',
            field:'gAttach',
            title: '附件',
            width: "300",
            value:[],
            props:{
              //预定义
              disabled:false
            }
          },
          {
            type: "rate",
            // align: 'center',
            field: 'gRate',
            title: '评分',
            width: "240",
            // value: 4.5,
            props: {
              max: 5,
              allowHalf:true
            },
            validate: [
              {required: true, type: 'number', min: 3, message: '请大于3颗星', trigger: 'change'}
            ]
          },

        ],
        operateColumn: [
          {
            label: '修改',
            icon: 'el-icon-paperclip',
            operation: 'edit'
          },
          {
            label: '保存',
            icon: 'el-icon-paperclip',
            operation: 'save'
          }
        ],
        withToolbar:true,
        toolButton: [
          {
            label: '新增',
            icon: 'el-icon-plus',
            operation: 'add',
            isShow:true
          },
          {
            label: '修改',
            icon: 'el-icon-edit',
            operation: 'edit',
            isShow:true
          },
          {
            label: '删除',
            icon: 'el-icon-remove',
            operation: 'delete',
            isShow:true
          },
          {
            label: '导入',
            icon: 'el-icon-paperclip',
            operation: 'import',
            isShow:true
          }
        ],
        api: {
          baseRoute:"/api/goods",
          list:'',
          save:'',
          delete:''
        },
        initValue: {},// 表单初始值
      }
    },
    methods:{
      operateBtnClick(index,row){
        const that = this;
        switch (index) {
          case 'edit':
            break;
          case 'save':
            console.log("row:",row);
            break;
        }
        // that.dialogBaseUrl = that.dialogBaseUrl.replace('{ssqsq}',ssqsq);

      },
      // selection(selections){
      //   console.log("所选记录：",selections);
      // },
    }
  }
</script>

<style scoped>

</style>
