<template>
  <div class="content">
   <el-tabs value="first"  @tab-click="handleClick">
    <el-tab-pane label="进行中" name="first"></el-tab-pane>
    <el-tab-pane label="已解决" name="second"></el-tab-pane>
    <el-tab-pane label="待退款" name="three"></el-tab-pane>
    <el-tab-pane label="已退款" name="four"></el-tab-pane>
   </el-tabs>
   <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="filters.标题" placeholder="标题"></el-input>
        </el-form-item>
        
        <el-form-item>
         
          <el-button  @click="handleSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="标题"   > </el-table-column>
        <el-table-column prop="personName" label="姓名" width="70"  > </el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称" width="180"  > </el-table-column>
        <el-table-column prop="giftName" label="礼物名称"  width="130" > </el-table-column>
        <el-table-column prop="viewNum" label="查看量" width="70"  > </el-table-column>
        <el-table-column prop="answerNum" label="回答量" width="70" > </el-table-column>
        <el-table-column prop="dayNum" label="问题天数"  width="80" > </el-table-column>
       <el-table-column prop="createDate" label="时间" width="100"> </el-table-column>
       
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
             <el-button size="small" type="primary"  @click="handleView(scope.row)" >查看</el-button>
             
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
  import {getProblemList} from '../../api/sns';
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

      handleView(row){
        this.$router.push({ path:'/main/system/sns/problemview', query:{problemId:row.problemId,type:1}});
      },

      handleClick(tab){
        if(tab.name=='second'){
         this.$router.push({ path:'/main/system/sns/problem/finsh'});
        }else if(tab.name=='three'){
         this.$router.push({ path:'/main/system/sns/problem/over'});
        }else if(tab.name=='four'){
         this.$router.push({ path:'/main/system/sns/problem/overrefund'});
        }else{
          this.getList();
        }
      },
       
      getList() {
           var params = Object.assign({pageNum:this.pageNum}, this.filters);
          this.listLoading = true;
          NProgress.start();
          getProblemList(params).then(data => {
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