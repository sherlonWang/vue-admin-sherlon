<template>
    <div>
      <el-card shadow="never">
        <div v-if="withToolbar">
          <div class="toolbtn">
            <el-button class="btn"
                       plain
                       type="primary"
                       size="small"
                       v-for="(item,index) in initButton"
                       :key="index"
                       @click="toolBtnClick(item.operation)"
                       :title="item.label"
                       :icon="item.icon"
                       :disabled="!item.isShow"
            >
              {{item.label}}
            </el-button>
          </div>
          <div class="toolsearch">
            <el-input v-model="keyword" style="width: 80%" size="small" placeholder="请输入名称关键字"></el-input>
            <el-button @click="search" title="搜索" class="bg" size="small"
                       icon="el-icon-search"></el-button>
          </div>
        </div>

        <el-table
          ref="tableWithPage"
          :data="tableData.slice((currentPage - 1)*pageSize,currentPage*pageSize)"
          @selection-change="selectChange"
        >
          <!-- 默认添加多选框 -->
          <el-table-column
            v-if="true"
            type="selection"
            fixed="left"
            align="center"
            width="55">
          </el-table-column>
          <template v-for="(column,index) in tableColumn">
            <el-table-column
              :key="index"
              :fixed="column.fixed"
              :align="column.align?column.align:'left'"
              :prop="column.field"
              :label="column.title"
              :width="column.width?column.width:180"
              :sortable="column.sortable?column.sortable:false"
              v-if="column.type!=='hidden'"
            >
              <!-- 根据不同的type渲染不同的插槽 -->

              <template slot-scope="scope">
                <el-input
                  :type= "column.props.type"
                  :clearable= "column.props.clearable"
                  :maxlength= "column.props.maxlength"
                  :minlength= "column.props.minlength"
                  :prefixIcon= "column.props.prefixIcon"
                  :suffixIcon= "column.props.suffixIcon"
                  :autocomplete= "column.props.autocomplete"
                  :placeholder= "column.props.placeholder"
                  v-if="column.type==='input'"
                  v-model="scope.row[column.field]"
                />
                <el-date-picker
                  v-else-if="column.type==='datePicker'"
                  v-model="scope.row[column.field]"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
                <el-input-number
                  v-else-if="column.type==='InputNumber'"
                  v-model="scope.row[column.field]"
                  label="描述文字"
                  size="small"
                />
                <el-radio-group
                  v-else-if="column.type==='radio'"
                  v-model="scope.row[column.field]"
                >
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
                <el-checkbox-group
                  v-else-if="column.type==='checkbox'"
                  v-model="scope.row[column.field]"
                >
                  <el-checkbox label="好用"/>
                  <el-checkbox label="方便"/>
                  <el-checkbox label="实用"/>
                  <el-checkbox label="有效"/>
                </el-checkbox-group>
                <el-select
                  v-else-if="column.type==='select'"
                  v-model="scope.row[column.field]" multiple placeholder="请选择"
                  :collapseTags="true"
                >
                  <el-option
                    v-for="(item,index) in column.options"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-switch
                  v-else-if="column.type==='switch'"
                  activeValue="1"
                  inactiveValue="0"
                  v-model="scope.row[column.field]"
                />
                <el-rate
                  v-else-if="column.type==='rate'"
                  v-model="scope.row[column.field]"
                  allowHalf
                />
                <div v-else-if="column.type==='BaseUpload'">
                  <el-upload
                    class="upload"
                    action=""
                    :on-preview="handlePreview"
                    :on-success="onSuccess"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :show-file-list="false"
                    :file-list="scope.row[column.field]">
                    <!--      <el-button size="small" type="primary">点击上传</el-button>-->
                    <el-button style="color:#409EFF" title="上传" size="small" icon="el-icon-upload" circle/>
                    <!--      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                  </el-upload>
                  <div class="tagarea">
                    <el-tag
                      class="tag"
                      v-for="(file,index) in scope.row[column.field]"
                      :key="index"
                      size="small"
                      closable
                      :disable-transitions="false"
                      @close="AttachRemove(scope.row[column.field],file)"
                      @click="AttachPreview(file)"
                    >
                      {{file.name}}
                    </el-tag>
                  </div>
                </div>
                <div v-else>{{scope.row[column.field]}}</div>
              </template>
            </el-table-column>
          </template>
          <el-table-column
            v-if="operateColumn.length>0"
            fixed="right"
            align="center"
            label="操作"
            prop="operate"
            :width="operateWidth">
            <template slot-scope="scope">
              <el-button style="margin-left: 15px" v-for="(opColumn,index) in operateColumn" :key="index"
                         :icon="opColumn.icon" @click="operateBtnClick(opColumn.operation,scope.row)"
                         type="text"
                         size="small"
              >
                {{opColumn.label}}
              </el-button>
              <!--              <el-button icon="el-icon-paperclip" @click="operate()" type="text" size="small">详情</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="true"
          background
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20, 30]"
          layout="sizes,prev,pager,next,total"
          :total="tableData.length">
        </el-pagination>
      </el-card>
      <!-- 表单操作 -->
      <el-dialog top="20px" :append-to-body="true" @close="formClose" :title="dialogTitle" v-if="dialogVisible" :visible.sync="dialogVisible">
        <base-custom-form :columns="initTableColumn" :init-value="initValue" :save-url="initApi.save?initApi.save:initApi.baseRoute"/>
      </el-dialog>
    </div>
</template>

<script>
  import BaseCustomForm from "./BaseCustomForm";
  import bus from "./bus";
  export default {
    name: "BaseCustomTable",
    props:['tableColumn','operateColumn','withToolbar','toolButton','api','initFormValue'],
    components:{BaseCustomForm},
    data(){
      return {
        tableData:[],
        pageSize:5, // 默认每页显示5条记录
        currentPage:1, // 默认显示第一页
        multipleSelection:[],
        operateWidth:'',
        keyword: '',
        dialogTitle:'',
        dialogVisible:false,
        initTableColumn:[],
        initValue: {},
        initApi:{},
        initButton:[],// 接收btns的初始值，如果父组件没有传 btns 或者 btns 为空，则取默认值
        defaultButton: [
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
            label: '附件',
            icon: 'el-icon-paperclip',
            operation: 'attach',
            isShow:true
          },{
            label: '导入',
            icon: 'el-icon-paperclip',
            operation: 'import',
            isShow:true
          }
        ]
      }
    },
    mounted() {
      const that = this;
      that.operateWidth = that.operateColumn.length*80+'px';
      if (!that.toolButton || that.toolButton.length === 0) {
        that.initButton = that.defaultButton;
      }else {
        that.initButton = that.toolButton;
      }
      that.initValue = that.initFormValue;
      that.initApi = that.api;
      that.initTableColumn = that.tableColumn;
      // that.initTableData();
      bus.$on('doCallback', state => {
        console.log("表单保存成功后回调事件");
        if (state === 0) {
          that.dialogVisible = false;
          that.initValue = that.initFormValue;
          that.initTableData();
        }else {

        }
      });
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
      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.currentPage = 1;
      },
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      selectChange(selection){
        const that = this;
        that.multipleSelection = selection;
        console.log("selectChange:",selection);
        console.log("initButton:",that.initButton);
      },
      operateBtnClick(operation,row){
        this.$emit("operateBtnClick",operation,row)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
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
        console.log("fileList:",fileList);
        // this.$emit('input',fileList);
      },
      AttachRemove(fileList,file){
        const that = this;
        that.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fileList.splice(fileList.indexOf(file), 1);
        }).catch(() => {
        });
      },
      AttachPreview(file){
        console.log("fileId:",file.id);
        // this.$axios.get("/api/goods/download/"+file.id).then(response => {
        //
        // });
        window.open("/api/goods/download/"+file.id,"_self");
      },
      toolBtnClick(index){
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
            if (that.multipleSelection.length !== 1) {
              this.$message({
                message: '请选择一条记录',
                type: 'warning'
              });
              return;
            }
            that.initValue = that.multipleSelection[0];
            // 给表单初始化
            // that.initTableColumn.forEach(function (column) {
            //   console.log("column:",column);
            //   console.log("当前选中记录:",that.multipleSelection[0]);
            //   console.log("当前字段信息:",that.tableColumn);
            //   column["value"] = that.multipleSelection[0][column.field];
            // });
            that.dialogTitle = '修改数据';
            that.dialogVisible = true;
            console.log("修改数据:",that.initValue);
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
          case "import":
            // console.log("所选记录:",that.multipleSelection);
            break;
        }
      },
      search(keyword){
        console.log("搜索关键字:"+this.keyword);
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
  .table {
    height: 450px;
    overflow-y: auto;
    text-align: left;
    /*margin-top: 10px;*/
    width: 96%;
    margin: 0 auto;
    /*height: 340px;*/
    /*background-color: #5ec66f;*/
  }
  .table .el-pagination{
    margin-top: 10px;
  }
  .upload{
    width: 15%;
    display: inline-block;
    vertical-align: middle;
  }
  .tagarea{
    display: inline-block;
    vertical-align: middle;
    width:80%;
  }
  .tag{
    /*display: inline-block;*/
    margin: 5px;
    cursor: pointer;
  }
  .tag:hover{
    background-color: #e3ebf5;
  }
  .toolbtn {
    display: inline-block;
    /*width: 400px;*/
    width: 55%;
    overflow-x: auto;
    white-space: nowrap;
    padding-left: 20px;
  }

  .btn {
    margin-left: 5px;
  }

  .toolsearch {
    display: inline-block;
    vertical-align: top;
    float: right;
    /*padding-right: 20px;*/
    /*width: 280px;*/
    width: 35%;
  }
</style>
