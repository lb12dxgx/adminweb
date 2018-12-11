<template>
  <div class="content">
   <el-tabs value="three"  @tab-click="handleClick">
    <el-tab-pane label="进行中" name="first"></el-tab-pane>
    <el-tab-pane label="已解决" name="second"></el-tab-pane>
    <el-tab-pane label="待退款" name="three"></el-tab-pane>
    <el-tab-pane label="已退款" name="four"></el-tab-pane>
   </el-tabs>
   <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="filters.title" placeholder="标题"></el-input>
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
        <el-table-column prop="refundState" label="退款状态" 
        width="150" :formatter='formatState' >
         </el-table-column>
        <el-table-column prop="dayNum" label="问题天数"  width="80" > </el-table-column>
       <el-table-column prop="createDate" label="时间" width="100"> </el-table-column>
       <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleView(scope.row)" >
              查看
            </el-button>
            <el-button size="small" type="primary"  @click="refund(scope.row)">
            退款
            </el-button>
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
  import {getProblemOverList,refundProblem} from '../../api/sns';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          title: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,
        refundStateMap:{
        '0':'未退款',
        '1':'已退款',
        '2':'退款中',
        '3':'退款失败'
        },
      }
    },

    methods: {
      formatState(row, column) {
          var val=row.refundState
          if(val==3){
            return this.refundStateMap[val]+"("+row.refundDesc+")";
          }
          return this.refundStateMap[val];
      },



      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },

      handleSubmit(){
           this.getList();
      },

      handleView(row){
        this.$router.push({ path:'/main/system/sns/problemview', query:{problemId:row.problemId,type:2}});
      },

      refund(row) {
        this.$confirm('确认退款该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {problemId: row.problemId };
          refundProblem(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '发起退款',
                duration:2500,
                type: 'success'
              });
              this.getList();
            }
            
          });
        });
      },

      handleClick(tab){
       if(tab.name=='first'){
         this.$router.push({ path:'/main/system/sns/problem'});
        }else if(tab.name=='second'){
         this.$router.push({ path:'/main/system/sns/problem/finsh'});
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
          getProblemOverList(params).then(data => {
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