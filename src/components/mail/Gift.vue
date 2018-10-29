<template>
  <div class="content">
   <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="礼物名称">
          <el-input v-model="filters.name" placeholder="礼物名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
          <el-button  @click="handleSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="礼物名称" > </el-table-column>
        <el-table-column prop="price" label="积分" width="100"  > </el-table-column>
        <el-table-column prop="spec" label="规格" width="100"  > </el-table-column>
        <el-table-column prop="num" label="库存数量" width="100"  > </el-table-column>
        <el-table-column prop="post" label="邮费" width="100"  :formatter='formatPost'> </el-table-column>
        <el-table-column prop="state" label="状态" width="100" :formatter='formatState' > </el-table-column>
       <el-table-column prop="createDate" label="创建时间" width="100" :formatter='formatCreateDate'> </el-table-column>
       
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
             <el-button size="small" type="primary"  @click="handleEdit(scope.row)" >修改</el-button>
             <el-button size="small" type="primary"  @click="handleDel(scope.row)" >删除</el-button>
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
  import {getGiftList,deleteGift} from '../../api/sns';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,
        stateMap:{0:'启用',1:'下架'},
        postMap:{0:'免邮费',1:'收邮费'},
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

      formatState(row, column) {
          var val=row.state
          return this.stateMap[val];
      },

      formatPost(row, column) {
          var val=row.post
          return this.postMap[val];
      },

      handleAdd(){
        this.$router.push({ path:'gift/add', });
      },

      handleSubmit(){
           this.getList();
      },

      handleEdit(){
        this.$router.push({ path:'gift/edit', query:{giftId:row.giftId}});
      },
       
     //删除
      handleDel(row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {giftId: row.giftId };
          deleteGift(para).then((res) => {
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
          getGiftList(params).then(data => {
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