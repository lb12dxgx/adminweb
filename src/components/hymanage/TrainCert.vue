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
          </el-form-item>
        </el-form>
      </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="userName" label="姓名" > </el-table-column>
        <el-table-column prop="certCode" label="证书编码" width="100"  > </el-table-column>
        <el-table-column prop="certTypeName" label="证书编码" width="100" :formatter='formatCertType'  > </el-table-column>
        
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
  import {getTrainCertList,deleteTrainCert} from '../../api/train';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          userName: ''
        },
        trainPlanId:'', 
        listLoading:false,
        list:  [],
        total: 0,
        pageNum: 1,
        typeMap:{'gxtc':'地下管线探测'}

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
        this.$router.push({ path:'traincert/add', query:{trainPlanId:this.trainPlanId}});
      },

      retBack() {
        this.$router.push({ path:'/main/system/trainplan'});
      },

      handleEdit(row){
        this.$router.push({ path:'traincert/edit', query:{trainCertId:row.trainCertId}});
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
          let para = {trainCertId: row.trainCertId };
          deleteTrainCert(para).then((res) => {
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
          getTrainCertList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
            this.list =data.retData.content;
            this.total=data.retData.totalElements;
            
          });
      }
    },

    mounted() {
      this.trainPlanId=this.$route.query.trainPlanId;
      this.getList();
    }

  }
</script>