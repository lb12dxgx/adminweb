<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="会议名称">
          <el-input v-model="filters.meetName" placeholder="会议名称"></el-input>
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
        <el-table-column prop="meetName" label="会议名称" width="200"> </el-table-column>
        <el-table-column prop="meetPlace" label="会议地点" width="150"  > </el-table-column>
        <el-table-column prop="num" label="总人数" width="100"  > </el-table-column>
       
        <el-table-column prop="startDate" label="开始时间" width="100" :formatter='formatStartDate'> </el-table-column>
         <el-table-column prop="endDate" label="结束时间" width="100" :formatter='formatEndDate'> </el-table-column>
       
        <el-table-column label="操作" >
          <template slot-scope="scope">
             <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
             <el-button size="small" @click="handlePlan(scope.row)">日程</el-button>
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
  import {getMeetList,deleteMeet,changeSign} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          meetName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,

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

       formatEndDate(row, column) {
          var val=row.endDate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },

      handleSubmit(){
           this.getList();
      },

      handleAdd(){
        this.$router.push({ path:'meet/add', });
      },

      handlePlan(row){
        this.$router.push({ path:'meetplan', query:{meetId:row.meetId}});
      },

      handleEdit(row){
        this.$router.push({ path:'meet/edit', query:{meetId:row.meetId}});
      },

      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },

      handleSignUp(row){
        this.$router.push({ path:'meetsignup', query:{meetId:row.meetId}});
      },

      changeSign(row){
         let para = {meetId: row.meetId };
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

     //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {meetId: row.meetId };
          deleteMeet(para).then((res) => {
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
          getMeetList(params).then(data => {
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