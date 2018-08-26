<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="招标项目">
          <el-input v-model="filters.zbXmName" placeholder="招标项目"></el-input>
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
        <el-table-column prop="zbXmName" label="招标项目" > </el-table-column>
        <el-table-column prop="area" label="项目地址" width="250"  > </el-table-column>
       
        <el-table-column prop="publishDate" label="发布时间" width="100" :formatter='formatStartDate'> </el-table-column>
       
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
             <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button  size="small" type="primary" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
  import {getZbInfoList,deleteZbInfo} from '../../api/service';
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

      }
    },

    methods: {

     formatStartDate(row, column) {
          var val=row.publishDate
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
        this.$router.push({ path:'zbinfo/add', });
      },

      

      handleEdit(row){
        this.$router.push({ path:'zbinfo/edit', query:{zbInfoId:row.zbInfoId}});
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
          let para = {zbInfoId: row.zbInfoId };
          deleteZbInfo(para).then((res) => {
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
          getZbInfoList(params).then(data => {
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