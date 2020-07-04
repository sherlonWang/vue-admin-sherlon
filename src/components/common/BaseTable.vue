<template>
  <div class="wrapper">
    <el-card shadow="never">
      <toolbar-with-search v-if="withToolbar" :tool-btns="toolBtns" v-on:btn-click="btnClick" v-on:search="search"/>
      <!--      潜水器类型管理-->
      <table-with-page
        :table-column="tableColumn"
        :table-data="tableData"
        :operate-column="operateColumn"
        v-on:operate="operate"
        v-on:selection="selection"
      />
    </el-card>

    <!-- 表单操作 -->
    <el-dialog :append-to-body="true" @close="formClose" :title="dialogTitle" :visible.sync="dialogVisible">
      <base-form :id="id" :columns="tableColumn" :init-value="initValue" :save-url="initApi.save?initApi.save:initApi.baseRoute"/>
    </el-dialog>
  </div>
</template>

<script>
  import TableWithPage from "./TableWithPage";
  import ToolbarWithSearch from "./ToolbarWithSearch";
  import Toolbar from "./Toolbar";
  import BaseForm from "./BaseForm";
  import bus from "./bus";

  export default {
    name: "BaseTable",
    props: ['id','tableColumn','operateColumn','withToolbar','toolBtns','api','initFormValue'],
    components: {BaseForm, Toolbar, ToolbarWithSearch, TableWithPage},
    data() {
      return {
        dialogVisible:false,
        dialogTitle:'',
        initValue: {},
        initApi:{},
        tableData: [],
        multipleSelection:[],
      }
    },
    mounted() {
      console.log("initFormValue:",this.initFormValue);
      this.initValue = this.initFormValue;
      this.initApi = this.api;
      this.initTableData();
    },
    watch:{
      initFormValue(curVal,oldVal){
        console.log("监听initFormValue值变化");
        console.log(curVal,oldVal);
        if (curVal) {
          this.initValue = curVal;
        }
      },
      api:{
        handler(curVal, oldVal) {
          console.log("监听api变化");
          if (curVal) {
            this.initApi = this.api;
            this.initTableData();
          }
        },
        immediate: true,
        deep: true
      },

    },
    created() {
      const that = this;
      that.$on(that.id+'doCallback', state => {
        console.log("表单保存成功后回调事件");
        if (state === 0) {
          that.dialogVisible = false;
          that.initValue = that.initFormValue;
          that.initTableData();
        }else {

        }
      });
    },
    methods:{
      initTableData(){
        const that = this;
        // console.log("baseRoute:",this.api.baseRoute);
        that.$axios.get(that.api.list?that.api.list:that.api.baseRoute).then(response => {
          console.log("response:",response);
          if (response.data.state === 0) {
            that.tableData = response.data.data;
          }
        });
      },
      btnClick(index){
        const that = this;
        console.log("单击按钮:",index);
        console.log("选中记录:",that.multipleSelection);
        switch (index) {
          case 'add':
            that.dialogTitle = '新增数据';
            // that.initValue = {};
            console.log("initValue",that.initValue);
            that.dialogVisible = true;
            break;
          case 'edit':
            that.dialogTitle = '修改数据';
            that.dialogVisible = true;
            that.initValue = that.multipleSelection[0];
            break;
          case 'delete':
            let ids = [];
            that.multipleSelection.forEach(function (row) {
              ids.push(row.id);
            });
            this.$confirm('确定删除选中数据?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.$axios.delete(that.api.delete?that.api.delete:that.api.baseRoute+"/"+ids.join(",")).then(response => {
                console.log("response",response);
                if (response.data.state === 0) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  // 删除成功后刷新表格数据
                  that.initTableData();
                }
              });
            }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '已取消删除'
              // });
            });
            break;

        }
      },
      search(keyword){
        console.log("搜索关键字:"+keyword);
      },
      operate(index,id){
        // console.log("单击按钮:"+index+";ID:"+id);
        this.$emit("operate",index,id);
      },
      selection(selections){
        const that = this;
        // console.log(selections);
        this.$emit("selection",selections);
        that.multipleSelection = selections;
        that.toolBtns.forEach(function (btn) {
          switch (btn.index) {
            case "add":
              break;
            case "edit":
              btn.disable = that.multipleSelection.length !== 1;
              break;
            case "delete":
              btn.disable = that.multipleSelection.length === 0;
              break;
            case "attach":
              btn.disable = that.multipleSelection.length === 0;
              break;
          }
        });
      },
      formClose(){
        console.log('表单关闭');
        console.log("initFormValue:",this.initFormValue);
        this.initValue = this.initFormValue;
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 96%;
    margin: 0 auto;
  }
</style>
