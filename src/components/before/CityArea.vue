<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
       <el-form-item>
         <el-button  type="primary" @click="handleAdd">新增</el-button>
          <el-button   @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="areaName" label="网格名称" > </el-table-column>
        <el-table-column prop="areaDesc" label="网格说明" > </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handleDel(scope.row)" v-if="scope.row.state==0">禁用</el-button>
           <el-button  size="small" v-if="scope.row.state==1" @click="handlePass(scope.row)">启用</el-button>
           
          </template>
      </el-table-column>
      </el-table>
    </div>
    

    

  </div>
</template>

<script>
  import {cityareaList,enabledCityarea,disabledCityarea} from '../../api/before';
  
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          orgName: ''
        },
        listLoading:false,
        list: [],
        cityDistrictId:''

        
        
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
          path:'/main/system/cityarea/add', 
          query:{cityDistrictId:this.cityDistrictId}
        });
     },

     handleBack(){
      this.$router.push({
          path:'/main/system/citydistrict', 
          query:{applyCityId:this.applyCityId}
        });
     },

     handlePass(row){
       this.$confirm('确认启用该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {cityAreaId: row.cityAreaId };
          enabledCityarea(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '通过成功',
                duration:2500,
                type: 'success'
              });
              this.getList();
            }
            
          });
        });

     },

    

      //删除
      handleDel(row) {
        this.$confirm('确认禁用该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {cityAreaId: row.cityAreaId };
          disabledCityarea(para).then((res) => {
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

      getList() {
          var params = Object.assign({cityDistrictId:this.cityDistrictId});
          this.listLoading = true;
          NProgress.start();
          cityareaList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
            this.list =data.retData;
           
          });
      },
    },

    mounted() {
      this.cityDistrictId=this.$route.query.cityDistrictId;
      this.applyCityId=this.$route.query.applyCityId;
      this.getList();
     
    }

  }
</script>