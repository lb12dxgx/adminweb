<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="城市名称">
          <el-input v-model="filters.cityName" placeholder="城市名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
          <el-button  @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="cityName" label="城市名称" width="180"> </el-table-column>
        <el-table-column prop="applyCompany" label="单位名称" width="180"></el-table-column>
        <el-table-column prop="enttelphone" label="单位电话" width="140"></el-table-column>
        <el-table-column prop="person" label="联系人"> </el-table-column>
        <el-table-column prop="telphone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="createDate" label="申请时间" :formatter='formatCreateDate'></el-table-column>
        <el-table-column prop="state" label="状态" :formatter='formatState'></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handlePass(scope.row)" v-if="scope.row.state==0||scope.row.state==2">启用</el-button>
             <el-button size="small" @click="handleDel(scope.row)" v-if="scope.row.state==0">删除</el-button>
            <el-button size="small" @click="handleSet(scope.row)" v-if="scope.row.state==1">
            设置区县
            </el-button>
          
            <el-button  size="small" v-if="scope.row.state==1" @click="handleDisable(scope.$index, scope.row)">禁用</el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>
    

    

  </div>
</template>

<script>
  import {applycityList,enabledApplycity,disabledApplycity,saveApplycity,deleteApplycity} from '../../api/before';
  
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          orgName: ''
        },
        listLoading:false,
        list: [],

        
        
      }
    },

    methods: {


      formatState(row, column) {
          var val=row.state;
          if(val==0){
            return "待审批";  
          }else if (val==1){
              return "启用";  
          }else{
            return "禁用";  
          }
      },

       formatCreateDate(row, column) {
          var val=row.createDate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },
      
      
      
     handleAdd(){
      this.$router.push({ path:'/main/system/applycity/add'});
     },

     handlePass(row){
       this.$confirm('确认启用该城市吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {applyCityId: row.applyCityId };
          enabledApplycity(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '启用成功',
                duration:2500,
                type: 'success'
              });
              this.getList();
            }
            
          });
        });

     },

     handleSet(row){
      this.$router.push({ path:'/main/system/citydistrict', 
          query:{applyCityId:row.applyCityId}});
      },


      //删除
      handleDel: function (row) {
        this.$confirm('确认删除该城市吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {applyCityId: row.applyCityId };
          deleteApplycity(para).then((res) => {
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

      //删除
      handleDisable: function (index, row) {
        this.$confirm('确认禁用该城市吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {applyCityId: row.applyCityId };
          disabledApplycity(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '禁用成功',
                duration:2500,
                type: 'success'
              });
              this.getList();
            }
            
          });
        });
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
            this.list =data.retData;
           
          });
      },
    },

    mounted() {
      this.getList();
     
    }

  }
</script>