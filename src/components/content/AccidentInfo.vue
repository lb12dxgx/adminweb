<template>
  <div class="content">

  <el-tabs value="first" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待通过" name="first"></el-tab-pane>
    <el-tab-pane label="已通过" name="second"></el-tab-pane>
    <el-tab-pane label="未通过" name="third"></el-tab-pane>
    
  </el-tabs>


    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="事故名称">
          <el-input v-model="filters.accidentName" placeholder="事故名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
        
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="accidentName" label="事故名称" > </el-table-column>
        <el-table-column prop="accidentPlace" label="地址" width="200"  > </el-table-column>
        <el-table-column prop="telePhone" label="电话" width="150"  > </el-table-column>
        <el-table-column prop="personName" label="姓名" width="100"  > </el-table-column>
        <el-table-column prop="creatDate" label="时间" width="100" :formatter='formatCreateDate' > </el-table-column>  
       
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
             <el-button size="small" @click="handleView(scope.row)">查看</el-button>
             <el-button size="small" type="primary"  @click="handlePass(scope.row)" v-if="scope.row.state!=1">通过</el-button>
             <el-button size="small" type="primary"  @click="handleNoPass(scope.row)" v-if="scope.row.state!=2">不通过</el-button>
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
  import {getAccidentUnList,getAccidentPassList,getAccidentNoPassList,changePassAccident,changeNoPassAccident,getAccident} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          accidentName: ''
        },
        activeName:'first',
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,
        levelMap:{10:'普通级别',20:'VIP',30:'超级VIP'}
      }
    },

    methods: {

     formatCreateDate(row, column) {
          var val=row.creatDate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },

       handleSubmit(){
           this.getList();
      },

      handleClick(tab){
        this.filters.accidentName='';
        this.getList();
      },
       


      handleView(row){
        this.$router.push({ path:'accidentInfo/view', query:{accidentInfoId:row.accidentInfoId,activeName:this.activeName}});
      },

       handlePass(row){
         this.$confirm('确认通过该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {accidentInfoId: row.accidentInfoId };
          changePassAccident(para).then((res) => {
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


      handleNoPass(row){
       this.$confirm('确认不通过该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {accidentInfoId: row.accidentInfoId };
          changeNoPassAccident(para).then((res) => {
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

      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },

  
      getList() {
          var params = Object.assign({pageNum:this.pageNum}, this.filters);
          this.listLoading = true;
          NProgress.start();
          if(this.activeName=='first'){
            getAccidentUnList(params).then(data => {
              this.listLoading = false;
              NProgress.done();
              this.list =data.retData.content;
              this.total=data.retData.totalElements;
              
            });
          }else if(this.activeName=='second'){
            getAccidentPassList(params).then(data => {
              this.listLoading = false;
              NProgress.done();
              this.list =data.retData.content;
              this.total=data.retData.totalElements;
              
            });
          }else{
            getAccidentNoPassList(params).then(data => {
              this.listLoading = false;
              NProgress.done();
              this.list =data.retData.content;
              this.total=data.retData.totalElements;
              
            });
          }
      }
    },

    mounted() {
       this.activeName=this.$route.query.activeName;
       if(this.activeName==''||this.activeName==null){
        this.activeName='first';
       }
      this.getList();
    }

  }
</script>