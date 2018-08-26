<template>
  <div class="content">
    <div class="seach">
        <el-form :inline="true" :model="filters" class="demo-form-inline">
         <el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="filters.enterpriseName" placeholder="企业名称"></el-input>
          </el-form-item>

            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称" > </el-table-column>
        <el-table-column prop="certCode" label="证书编码" width="100"  > </el-table-column>
        <el-table-column prop="certTypeName" label="证书类型" width="100" :formatter='formatCertType'  > </el-table-column>
        <el-table-column prop="startDate" label="开始时间" width="100" :formatter='formatStartDate'> </el-table-column>
        <el-table-column prop="endDate" label="结束时间" width="100" :formatter='formatEndDate'> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
             <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
  import {getEnterpriseCertList,deleteEnterpriseCert} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          enterpriseName: ''
        },
        listLoading:false,
        list:  [],
        total: 0,
        pageNum: 1,
        typeMap:{'zynlpj':'作业能力评价','jlqyzs':'监理企业证书'}

      }
    },

    methods: {
      
      formatCertType(row, column) {
          var val=row.certTypeName
          return this.typeMap[val];
      },

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
        this.$router.push({ path:'enterprisecert/add'});
      },

     

      handleEdit(row){
        this.$router.push({ path:'enterprisecert/edit'});
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
          let para = {enterpriseCertId: row.enterpriseCertId };
          deleteEnterpriseCert(para).then((res) => {
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
          var params = Object.assign({pageNum:this.pageNum}, {trainPlanId:this.trainPlanId},this.filters);
          this.listLoading = true;
          NProgress.start();
          getEnterpriseCertList(params).then(data => {
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