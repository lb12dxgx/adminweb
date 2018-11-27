<template>
  <div class="content">
   <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="采购单位">
          <el-input v-model="filters.empName" placeholder="采购单位"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="empName" label="企业名称" > </el-table-column>
        <el-table-column prop="buyInfoName" label="采购名称" > </el-table-column>
        <el-table-column prop="buyInfoType" label="采购分类" width="100"  > </el-table-column>
        <el-table-column prop="place" label="交货地点" width="100"  > </el-table-column>
        <el-table-column prop="num" label="采购数量" width="100"  > </el-table-column>
       
       <el-table-column prop="createDate" label="发布日期" width="100" :formatter='formatCreateDate'> </el-table-column>
       
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
             <el-button size="small" type="primary"  @click="del(scope.row)" >删除</el-button>
             <el-button size="small" type="primary"  @click="view(scope.row)" >查看</el-button>
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
  import {getBuyinfoList,deleteBuyinfo,viewBuyinfo} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          empName: ''
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

      

      handleSubmit(){
           this.getList();
      },

      view(row){
        viewBuyinfo(row.buyInfoId);
      },
       
     //删除
      del(row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {buyInfoId: row.buyInfoId };
          deleteBuyinfo(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '修改成功',
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
          getBuyinfoList(params).then(data => {
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