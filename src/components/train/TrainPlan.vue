<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="培训名称">
          <el-input v-model="filters.trainName" placeholder="培训名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="trainName" label="培训名称" width="300"> </el-table-column>
        <el-table-column prop="trainAddr" label="培训地点" width="100"  > </el-table-column>
        <el-table-column prop="trainStartDate" label="开始时间" width="100" :formatter='formatTrainStartDate'> </el-table-column>
        <el-table-column prop="trainEndDate" label="结束时间" width="100" :formatter='formatTrainEndDate'> </el-table-column>
        <el-table-column prop="personNum" label="培训人数" width="80"> </el-table-column>
         <el-table-column prop="showMain" label="显示方式" width="80" :formatter='formatMain'> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="primary"  @click="handleClass(scope.row)">课程信息</el-button>
            <el-button size="small" type="primary"  @click="handleSignUp(scope.row)">报名信息</el-button>
            <el-button size="small" type="primary"  @click="changeSign(scope.row)" v-if="scope.row.isSign==0">开始签到</el-button>
            <el-button size="small" type="primary"  @click="changeSign(scope.row)" v-if="scope.row.isSign==1">结束签到</el-button>
            <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
  import {getTrainPlanList,deleteTrainPlan,changeSign} from '../../api/train';
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
        mainMap:{1:'单独显示',0:'列表显示'}
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

      formatMain(row, column) {
          var val=row.showMain
          return this.mainMap[val];
      },

       handleSubmit(){
           this.getList();
      },

     handleAdd(){
        this.$router.push({ path:'trainplan/add'});
      },
      handleEdit(row){
        this.$router.push({ path:'trainplan/edit', query:{trainPlanId:row.trainPlanId}});
      },

      handleClass(row){
        this.$router.push({ path:'trainclass', query:{trainPlanId:row.trainPlanId}});
      },

      handleSignUp(row){
        this.$router.push({ path:'trainsignup', query:{trainPlanId:row.trainPlanId}});
      },

      changeSign(row){
         let para = {trainPlanId: row.trainPlanId };
          this.listLoading = true;
          NProgress.start();
          changeSign(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '改变签到状态成功！',
                duration:2500,
                type: 'success'
              });
              this.getList();
            }
            
          });
      },

      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },

     //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {trainPlanId: row.trainPlanId };
          deleteTrainPlan(para).then((res) => {
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