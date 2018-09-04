<template>
  <div class="content">
    <div style="text-align:right;margin-bottom:5px">
       <el-button type="primary" @click="handleAdd">新增</el-button>

        <el-button  @click="retBack">返回</el-button>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="meetPlanName" label="日程名称" > </el-table-column>
        <el-table-column prop="teacherName" label="教师名称" width="100"  > </el-table-column>
        <el-table-column prop="teacherCompany" label="单位" width="200" > </el-table-column>
         <el-table-column prop="teacherPost" label="职称" width="200" > </el-table-column>
         <el-table-column prop="startDates" label="开始时间" width="100" :formatter='formatStartDate'> </el-table-column>
       
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
             <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>

     
    
  </div>
</template>

<script>
  import {getMeetPlanList,deleteMeetPlan} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        meetId:'', 
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

      handleSubmit(){
           this.getList();
      },

      handleAdd(){
        this.$router.push({ path:'meetPlan/add', query:{meetId:this.meetId}});
      },

      retBack() {
        this.$router.push({ path:'/main/system/meetplan'});
      },

      handleEdit(row){
        this.$router.push({ path:'meetPlan/edit', query:{meetPlanId:row.meetPlanId}});
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
          let para = {meetPlanId: row.meetPlanId };
          deleteMeetPlan(para).then((res) => {
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
          var params = Object.assign({meetId:this.meetId});
          this.listLoading = true;
          NProgress.start();
          getMeetPlanList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
            this.list =data.retData;
            
          });
      }
    },

    mounted() {
      this.meetId=this.$route.query.meetId;
      this.getList();
    }

  }
</script>