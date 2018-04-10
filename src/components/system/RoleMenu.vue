<template>
  <div class="content">
    <el-row>
      <el-col :span="12" :offset="8">
        <el-tree  ref="tree" :data="menuJson" :props="defaultProps" :default-expand-all="true" :show-checkbox="true" node-key="menuId"
        v-loading="listLoading"
        >
          
        </el-tree>
      </el-col>
    </el-row>
    <div class="div-center">
      <el-button  type="primary" @click="handleSubmit">保存</el-button>
      <el-button  @click="handleBack" >返回</el-button>
    </div>
  </div>
</template>

<script>
  import {getMenuTree,saveRoleMenu,getRoleMenu} from '../../api/api';  
  export default {
   
    data() {
      return {
        menuJson:[],
        listLoading:true,
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
      }
    },
    methods:{
      handleSubmit(){
        var menuList=this.$refs.tree.getCheckedKeys();
        saveRoleMenu({"menuList":menuList,roleId:this.roleId}).then(data => {
          if(data.state==1){
             this.$router.push({ path:'/main/system/role'});
          }
        })
      },
      handleBack(){
        this.$router.push({ path:'/main/system/role'});
      },
      getTree(){
         getMenuTree().then((data) => {
            this.menuJson =data.retData ;
            var keys=[];
            getRoleMenu({"roleId":this.roleId}).then((data) =>{
              if(data.retData!=null){
                data.retData.forEach((value,index,array) =>{
                   keys.push(value.menuId);
                   
                });
              }
              this.$refs.tree.setCheckedKeys(keys);
              this.listLoading=false;
            })
          })
      }
     
    },
    mounted() {
        this.roleId=this.$route.query.roleId;
        this.getTree()
      }
    }
</script>

<style>

</style>