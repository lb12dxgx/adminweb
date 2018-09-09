<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="城市名称">
          <el-input v-model="filters.cityName" placeholder="城市名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
      
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="cityName" label="城市名称" width="180"> </el-table-column>
        <el-table-column prop="applyCompany" label="机构名称" width="180"></el-table-column>
        <el-table-column prop="person" label="管理城市"> </el-table-column>
        <el-table-column prop="telphone" label="机构电话" width="180"></el-table-column>
        <el-table-column prop="createDate" label="申请时间" :formatter='formatCreateDate'></el-table-column>
        
      </el-table>
    </div>
    <div class="page">
      <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="5" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    

  </div>
</template>

<script>
  import {applycityList} from '../../api/before';
  
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          orgName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,
        
        
      }
    },

    methods: {

       formatCreateDate(row, column) {
          var val=row.createDate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },
      
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },
      

      handleSubmit(){
          this.getList();
      }, 


      getList() {
          var params = Object.assign({pageNum:this.pageNum}, this.filters);
          this.listLoading = true;
          NProgress.start();
          applycityList(params).then(data => {
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