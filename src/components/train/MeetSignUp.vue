<template>
  <div class="content">
   <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="filters.userName" placeholder="姓名"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
          <el-button type="primary" @click="handleAdd">新增</el-button>
          <el-button type="primary" @click="downloadExcel">导出excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="userName" label="姓名"  width="100" > </el-table-column>
        <el-table-column prop="telphone" label="手机" width="150"  > </el-table-column>
        <el-table-column prop="empName" label="企业名称"  > </el-table-column>
        <el-table-column prop="post" label="职位" width="100"  > </el-table-column>
        <el-table-column prop="isSign" label="是否签到" width="100" :formatter='formatIsSign' > </el-table-column>
        <el-table-column prop="createDate" label="申请时间" width="100" :formatter='formatCreateDate'> </el-table-column>
        <el-table-column prop="isSign" label="是否签到" width="100" :formatter='formatIsSign'> </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
             <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
  import {getMeetSignUpList,deleteMeetSignUp,getMeet,getMeetSignUpExcel} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          userName: ''
        },
        meetId:'',
        userName:'', 
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

      formatIsSign(row, column) {
          var val=row.isSign
          if(val==0){
            return "未签到";
          }else{
            return "已签到";
          }
      },
   handleSubmit(){
           this.getList();
      },

      handleAdd(){
        this.$router.push({ path:'meetsignup/add', query:{meetId: this.meetId}});
      },

       downloadExcel(){
         
        getMeetSignUpExcel(this.meetId);
      },

        retBack() {
         this.$router.push({ path:'/main/system/meet'});
      },


      handleEdit(row){
        this.$router.push({ path:'meetsignup/edit', query:{meetSignUpId:row.meetSignUpId}});
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
          let para = {meetSignUpId: row.meetSignUpId };
          deleteMeetSignUp(para).then((res) => {
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
          
          var params = Object.assign({pageNum:this.pageNum,meetId: this.meetId}, this.filters);
          this.listLoading = true;
          NProgress.start();
          getMeetSignUpList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
            this.list =data.retData.content;
            this.total=data.retData.totalElements;
            
          });
      }
    },

    mounted() {
      this.meetId=this.$route.query.meetId;

      this.getList();
    }

  }
</script>