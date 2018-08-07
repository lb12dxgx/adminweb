<template>
  <div class="content">
   <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="产品名称">
          <el-input v-model="filters.productName" placeholder="产品名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="productName" label="产品名称" > </el-table-column>
        <el-table-column prop="productPrice" label="产品价格" width="100"  > </el-table-column>
        <el-table-column prop="productBrand" label="产品品牌" width="100"  > </el-table-column>
        <el-table-column prop="person" label="联系人" width="100"  > </el-table-column>
        <el-table-column prop="telphone" label="联系电话" width="100"  > </el-table-column>
        <el-table-column prop="level" label="级别" width="100" :formatter='formatLevel' > </el-table-column>
       <el-table-column prop="createDate" label="创建时间" width="100" :formatter='formatCreateDate'> </el-table-column>
       
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
             <el-button size="small" type="primary"  @click="changeLevel(scope.row)" v-if="scope.row.level==10">提升VIP</el-button>
             <el-button size="small" type="primary"  @click="changeLevel(scope.row)" v-else>降低级别</el-button>
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
  import {getAllProductList,changeProductLevel} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          productName: ''
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
       
     //删除
      changeLevel: function (row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {productId: row.productId };
          changeProductLevel(para).then((res) => {
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
          getAllProductList(params).then(data => {
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