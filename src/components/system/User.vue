<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="filters.userName" placeholder="用户名"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
          <el-button type="primary" @click="handleAddd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="accountName" label="账号" width="180"> </el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="orgName" label="部门"> </el-table-column>
        <el-table-column prop="state" label="状态" :formatter='formatState'></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="10" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    
    

  </div>
</template>

<script>
  import {accountList,deleteAccount} from '../../api/api';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          userName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1
      }
    },

    methods: {
      //性别显示转换
      formatState(row, column) {
          if(row.state == 0){
            return '启用';
          }else if(row.state ==1){
            return '停用';
          }
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },
      handleAddd(){

      },
      handleSubmit(){

      },

      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {accountId: row.accountId};
          deleteAccount(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration:2500,
                type: 'success'
              });
             this.getList();
            }
            
          });
        });
      },

      getList() {
          var params = Object.assign({pageNum:this.pageNum}, this.filters);
          this.listLoading = true;
          NProgress.start();
        accountList(params).then(data => {
        this.listLoading = false;
        NProgress.done();
                this.list =data.retData.content;
        this.total=data.retData.totalElements;
        });
      },
    },

    mounted() {
      this.getList();
    }

  }
</script>