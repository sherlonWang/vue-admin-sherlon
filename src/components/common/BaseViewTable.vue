<template>
  <div>
    <div class="table">
      <el-card shadow="never">
        <el-table
          ref="tableWithPage"
          :data="tableData.slice((currentPage- 1)*pageSize,currentPage*pageSize)"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
        >
          <template v-for="(column,index) in tableColumn">
            <el-table-column
              :key="index"
              :fixed="column.fixed"
              :align="column.align?column.align:'left'"
              :type="column.type?column.type:''"
              :prop="column.prop"
              :label="column.label"
              :width="column.width?column.width:180"
              :sortable="column.sortable?column.sortable:false"
              v-if="!column.hidden"
            >
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
                         :icon="opColumn.icon" @click="operate(opColumn.index,scope.row.id)"
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
    </div>

  </div>
</template>

<script>
  export default {
    name: "BaseViewTable",
    props:['tableColumn','tableData','operateColumn'],
    data() {
      return {
        pageSize:5, // 默认每页显示10条记录
        currentPage:1, // 默认显示第一页
        multipleSelection:[],
        operateWidth:''
      }
    },
    mounted() {
      this.operateWidth = this.operateColumn.length*80+'px';
    },
    methods:{
      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.currentPage = 1;
      },
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      handleSelectionChange(val){
        // console.log("selections:",val);
        this.multipleSelection = val;
        this.$emit("selection",this.multipleSelection);
      },
      handleRowClick(row, column, event) {
        this.$refs.tableWithPage.toggleRowSelection(row);
        // console.log("this.selecTestContent", this.selectTestContent);
      },
      operate(index,id){
        this.$emit("operate",index,id)
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
</style>
