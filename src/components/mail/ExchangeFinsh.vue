<template>
  <div class="content">
   <el-tabs value="second"  @tab-click="handleClick">
    <el-tab-pane label="待发送" name="first"></el-tab-pane>
    <el-tab-pane label="已发送" name="second"></el-tab-pane>
   </el-tabs>
   <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="filters.personName" placeholder="姓名"></el-input>
        </el-form-item>
        
        <el-form-item>
         
          <el-button  @click="handleSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="exchangeCode" label="兑换编码" width="150"  > </el-table-column>
        <el-table-column prop="personName" label="姓名" width="100"  > </el-table-column>
        <el-table-column prop="giftName" label="礼物名称"  width="200" > </el-table-column>
        <el-table-column prop="num" label="兑换数量" width="100"  > </el-table-column>
        <el-table-column prop="telphone" label="用户电话" width="120" > </el-table-column>
        <el-table-column prop="postAddren" label="用户地址"  > </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="100"> </el-table-column>
        <el-table-column prop="postDate" label="快递时间" width="100"> </el-table-column>
        <el-table-column prop="postCode" label="快递单号" width="100"> </el-table-column>
       </el-table>
    </div>

      <div class="page">
      <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="10" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
  import {getExchangeFinshList} from '../../api/sns';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          personName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,
      }
    },

    methods: {

      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },
      
      handleSubmit(){
           this.getList();
      },

     

      handleClick(tab){
        if(tab.name=='first'){
         this.$router.push({ path:'/main/system/exchange'});
        }else{
          this.getList();
        }
         
      },
       
      getList() {
           var params = Object.assign({pageNum:this.pageNum}, this.filters);
          this.listLoading = true;
          NProgress.start();
          getExchangeFinshList(params).then(data => {
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