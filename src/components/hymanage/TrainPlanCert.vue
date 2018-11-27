<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="培训名称">
          <el-input v-model="filters.trainName" placeholder="培训名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
         
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="trainName" label="培训名称" > </el-table-column>
        <el-table-column prop="trainAddr" label="培训地点" width="200"  > </el-table-column>
        <el-table-column prop="trainStartDate" label="开始时间" width="100" :formatter='formatTrainStartDate'> </el-table-column>
        <el-table-column prop="trainEndDate" label="结束时间" width="100" :formatter='formatTrainEndDate'> </el-table-column>
        <el-table-column prop="personNum" label="培训人数" width="80"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
           <el-button size="small" type="primary"  @click="handleCert(scope.row)">证书信息</el-button>
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
  import {getTrainPlanList,deleteTrainPlan} from '../../api/train';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          trainName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,

      }
    },

    methods: {

     formatTrainStartDate(row, column) {
          var val=row.trainStartDate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },

       formatTrainEndDate(row, column) {
          var val=row.trainStartDate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },

      
      handleCert(row){
        this.$router.push({ path:'traincert', query:{trainPlanId:row.trainPlanId}});
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
          getTrainPlanList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
            this.list =data.retData.content;
            this.total=data.retData.totalElements;
          });
      }
    },

    mounted() {
      this.getList();
    }

  }
</script>