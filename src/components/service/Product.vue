<template>
  <div class="content">
   <div style="text-algin:center">
      <span > 
        {{enterpriseName}}产品列表
      </span>
      <span style="float:right;margin-bottom:10px"> 
       <el-button type="primary" @click="handleAdd">新增</el-button>
       <el-button  @click="retBack">返回</el-button>
      </span>
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
             <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>

     
    
  </div>
</template>

<script>
  import {getProductList,deleteProduct,getEnterprise} from '../../api/service';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        enterpriseId:'',
        enterpriseName:'', 
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
        this.$router.push({ path:'product/add', query:{enterpriseId: this.enterpriseId}});
      },

      retBack() {
        this.$router.push({ path:'/main/system/product'});
      },


      handleEdit(row){
        this.$router.push({ path:'product/edit', query:{productId:row.productId}});
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
          let para = {productId: row.productId };
          deleteProduct(para).then((res) => {
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
          var params = Object.assign({enterpriseId: this.enterpriseId});
          this.listLoading = true;
          NProgress.start();
          getProductList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
            this.list =data.retData;
            
          });
      }
    },

    mounted() {
      this.enterpriseId=this.$route.query.enterpriseId;

      let para = {enterpriseId: this.enterpriseId};
      getEnterprise(para).then((data) => {
        this.enterpriseName=data.retData.enterpriseName;
      })

      this.getList();
    }

  }
</script>