<template>
  <div class="content">
    <el-row>
      <el-col :span="12" :offset="8">
       <el-tree ref="tree" :data="columnJson" :props="defaultProps"  node-key="columnId" :default-expand-all="true" :show-checkbox="true"
        v-loading="listLoading" ></el-tree>
      </el-col>
    </el-row>
    <div class="div-center">
      <el-button  type="primary" @click="handleSubmit">保存</el-button>
      <el-button  @click="handleBack" >返回</el-button>
    </div>
  </div>
</template>

<script>
  import {saveRoleColumn,getRoleColumn} from '../../api/api'; 
  import {getColumnTree} from '../../api/column';   
  export default {
   
    data() {
      return {
        columnJson:[],
        listLoading:true,
        defaultProps: {
          children: 'children',
          label: 'columnName'
        },
      }
    },
    methods:{

      handleSubmit(){
        var columnList=this.$refs.tree.getCheckedKeys();
        saveRoleColumn({"columnList":columnList,roleId:this.roleId}).then(data => {
          if(data.state==1){
             this.$router.push({ path:'/main/system/role'});
          }
        })
      },

      handleBack(){
        this.$router.push({ path:'/main/system/role'});
      },

     getTree(){
         getColumnTree().then((res) => {
            this.columnJson =res.retData ;
            var keys=[];
            getRoleColumn({"roleId":this.roleId}).then((data) =>{
              if(data.retData!=null){
                data.retData.forEach((value,index,array) =>{
                   keys.push(value.columnId);
                   
                });
              }
              this.$refs.tree.setCheckedKeys(keys);
              this.listLoading=false;
            })
          })
      },
     
    },
    mounted() {
        this.roleId=this.$route.query.roleId;
        this.getTree()
      }
    }
</script>

<style>

</style>