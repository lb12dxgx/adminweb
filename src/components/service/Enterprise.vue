r<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="企业名称">
          <el-input v-model="filters.enterpriseName" placeholder="企业名称"></el-input>
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
        <el-table-column prop="enterpriseName" label="企业名称" > </el-table-column>
        <el-table-column prop="addree" label="地址" width="250"  > </el-table-column>
        <el-table-column prop="telphone" label="电话" width="100"  > </el-table-column>
        <el-table-column prop="level" label="级别" width="100" :formatter='formatLevel' > </el-table-column>
     
       
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
             <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
             <el-button size="small" type="primary"  @click="handleProduct(scope.row)">产品</el-button>
             <el-button size="small" type="primary"  @click="handleCert(scope.row)">证书</el-button>
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
  import {getEnterpriseList,deleteEnterprise} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          zbXmName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,
        levelMap:{10:'普通级别',20:'VIP',30:'超级VIP'}
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

      formatLevel(row, column) {
          var val=row.level
          return this.levelMap[val];
      },
       

      handleSubmit(){
           this.getList();
      },

      handleAdd(){
        this.$router.push({ path:'enterprise/add', });
      },

      handleProduct(row){
        this.$router.push({ path:'product', query:{enterpriseId:row.enterpriseId}});
      },

       handleCert(row){
        this.$router.push({ path:'enterprisecert', query:{enterpriseId:row.enterpriseId}});
      },


      handleEdit(row){
        this.$router.push({ path:'enterprise/edit', query:{enterpriseId:row.enterpriseId}});
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
          let para = {enterpriseId: row.enterpriseId };
          deleteEnterprise(para).then((res) => {
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
          getEnterpriseList(params).then(data => {
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