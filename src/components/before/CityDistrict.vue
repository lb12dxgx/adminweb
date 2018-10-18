<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
       <el-form-item>
         
          <el-button  @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="districtName" label="区县名称" width="180"> </el-table-column>
        <el-table-column prop="applyCompany" label="单位名称" width="180"></el-table-column>
        <el-table-column prop="enttelphone" label="单位电话" width="140"></el-table-column>
        <el-table-column prop="person" label="联系人"> </el-table-column>
        <el-table-column prop="telphone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="state" label="状态" :formatter='formatState'></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handleDel(scope.row)" v-if="scope.row.state==0">禁用</el-button>
            <el-button size="small" @click="handleSet(scope.row)" v-if="scope.row.state==0">
            网格管理
            </el-button>
            
             <el-button  size="small" v-if="scope.row.state==1" @click="handlePass(scope.row)">启用</el-button>
           
          </template>
      </el-table-column>
      </el-table>
    </div>
    

    

  </div>
</template>

<script>
  import {citydistrictList,enabledCitydistrict,disabledCitydistrict,saveCitydistrict} from '../../api/before';
  
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          orgName: ''
        },
        listLoading:false,
        list: [],
        applyCityId:''

        
        
      }
    },

    methods: {


      formatState(row, column) {
          var val=row.state;
          if(val==0){
            return "启用"; 
          }else if (val==1){
              return "禁用"; 
          }
      },

      
      
     handleAdd(){
      this.$router.push({
          path:'/main/system/citydistrict/add', 
          query:{applyCityId:this.applyCityId}
        });
     },

     handlePass(row){
       this.$confirm('确认启用该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {cityDistrictId: row.cityDistrictId };
          enabledCitydistrict(para).then((res) => {
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
      this.$router.push({ path:'/main/system/cityarea', 
          query:{cityDistrictId:row.cityDistrictId}});
      },

      //删除
      handleDel(row) {
        this.$confirm('确认禁用该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {cityDistrictId: row.cityDistrictId };
          disabledCitydistrict(para).then((res) => {
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
          var params = Object.assign({applyCityId:this.applyCityId});
          this.listLoading = true;
          NProgress.start();
          citydistrictList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
            this.list =data.retData;
           
          });
      },
    },

    mounted() {
      this.applyCityId=this.$route.query.applyCityId;
      this.getList();
     
    }

  }
</script>