<template>
  <div class="content">

  <el-tabs value="first" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待通过" name="first"></el-tab-pane>
    <el-tab-pane label="已通过" name="second"></el-tab-pane>
    <el-tab-pane label="未通过" name="third"></el-tab-pane>
    
  </el-tabs>


    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="企业名称">
          <el-input v-model="filters.enterpriseName" placeholder="企业名称"></el-input>
        </el-form-item>
         <el-form-item label="能力类型">
          <el-input v-model="filters.abilityInfoType" placeholder="能力类型"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
        
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称" > </el-table-column>
        <el-table-column prop="abilityInfoType" label="能力类型" width="200"  > </el-table-column>
        <el-table-column prop="abilityInfoLevel" label="能力级别" width="200"  > </el-table-column>
        
        <el-table-column prop="telphone" label="电话" width="150"  > </el-table-column>
        <el-table-column prop="person" label="申请人" width="100"  > </el-table-column>
        <el-table-column prop="createDate" label="时间" width="100" :formatter='formatCreateDate' > </el-table-column>  
       
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
      <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="10" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
     
    
<el-dialog
  title="审批意见"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>
     <el-input v-model="suggestions" type="textarea"  :rows="8" >
      </el-input> 
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveNoPass">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
  import {getAbilityUnList,getAbilityPassList,getAbilityNoPassList,changePassAbility,changeNoPassAbility,getAbility} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          enterpriseName: '',
          abilityInfoType:'',
        },
        suggestions:'',
        abilityInfoId:'',
        dialogVisible: false,
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
          var val=row.createDate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },

       handleSubmit(){
           this.getList();
      },

      handleClick(tab){
        this.filters.enterpriseName='';
        this.filters.abilityInfoType='';
        
        this.getList();
      },
       


      handleView(row){
        this.$router.push({ path:'hyability/view', query:{abilityInfoId:row.abilityInfoId,activeName:this.activeName}});
      },

       handlePass(row){
         this.$confirm('确认通过该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {abilityInfoId: row.abilityInfoId };
          changePassAbility(para).then((res) => {
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


      saveNoPass(){
          this.listLoading = true;
          NProgress.start();
         let para = {abilityInfoId: this.abilityInfoId,suggestions:this.suggestions};
        changeNoPassAbility(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
             if(res.state==1){
              this.$notify({
                title: '成功',
                message: '修改成功',
                duration:2500,
                type: 'success'
              });
              this.dialogVisible=false;
              this.getList();
            }
            
          });
      },

      handleNoPass(row){
        this.suggestions='';
        this.abilityInfoId=row.abilityInfoId;
        this.dialogVisible=true;
      
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
            getAbilityUnList(params).then(data => {
              this.listLoading = false;
              NProgress.done();
              this.list =data.retData.content;
              this.total=data.retData.totalElements;
              
            });
          }else if(this.activeName=='second'){
            getAbilityPassList(params).then(data => {
              this.listLoading = false;
              NProgress.done();
              this.list =data.retData.content;
              this.total=data.retData.totalElements;
              
            });
          }else{
            getAbilityNoPassList(params).then(data => {
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