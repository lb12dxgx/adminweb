<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="企业名称">
          <el-input v-model="filters.enterpriseName" placeholder="企业名称"></el-input>
        </el-form-item>
         <el-form-item label="职位名称">
          <el-input v-model="filters.jobName" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称" > </el-table-column>
        <el-table-column prop="jobName" label="职位名称" width="350"  > </el-table-column>
        <el-table-column prop="startDate" label="发布时间" :formatter='formatStartDate' width="100"  > </el-table-column>
        <el-table-column prop="level" label="级别" width="100" :formatter='formatLevel' > </el-table-column>
     
       
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
             <el-button size="small" type="primary"  @click="changeLevel(scope.row)" v-if="scope.row.level==10">提升VIP</el-button>
             <el-button size="small" type="primary"  @click="changeLevel(scope.row)" v-else>降低级别</el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>

     <div class="page">
      <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="5" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
     
    
  </div>
</template>

<script>
  import {getJobInfoList,changeJobLevel} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          enterpriseName: '',
          jobName: '',
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,
        levelMap:{10:'普通级别',20:'VIP'}
      }
    },

    methods: {

     formatStartDate(row, column) {
          var val=row.startDate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },

      formatLevel(row, column) {
          var val=row.level
          return this.levelMap[val];
      },
      
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },

      
      handleSubmit(){
           this.getList();
      },

     //删除
      changeLevel: function (row) {
        this.$confirm('确认修该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {jobInfoId: row.jobInfoId };
          changeJobLevel(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '修改成功',
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
          getJobInfoList(params).then(data => {
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