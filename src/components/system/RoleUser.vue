<template>
  <div class="content">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-transfer
          filterable
          v-model="exitUserList"
          :titles="['待选人员', '已选人员']"
          :data="userList"
          v-loading="listLoading">
        </el-transfer>
      </el-col>
    </el-row>
    <div class="div-center">
      <el-button  type="primary" @click="handleSubmit">保存</el-button>
      <el-button  @click="handleBack" >返回</el-button>
    </div>
  </div>
</template>

<script>
  import {accountAllList,saveRoleAccount,accountByRole} from '../../api/api';  
  export default {
   
    data() {
      return {
        roleId:"",
        listLoading:true,
        userList:[],
        exitUserList:[]
      }
    },
    methods:{
      handleSubmit(){
        saveRoleAccount({"userList":this.exitUserList,roleId:this.roleId}).then(data => {
          if(data.state==1){
             this.$router.push({ path:'/main/system/role'});
          }
        })
      },
      handleBack(){
        this.$router.push({ path:'/main/system/role'});
      }
     
    },
    mounted() {
        this.roleId=this.$route.query.roleId;
      
        accountAllList().then(data => {
            var allUserList=data.retData;
            accountByRole({"roleId": this.roleId}).then(data =>{
               allUserList.forEach((value,index,array) =>{
                var u={key:"",label:""};
                u.key=value.accountId;
                u.label=value.userName;
                this.userList.push(u)
              });
               console.log(data.retData);

               data.retData.forEach((value,index,array) =>{
                 this.exitUserList.push(value.userId)
              });

               this.listLoading=false;

             /*  for(let user of allUserList){
                 let flag=exlist.findIndex((e,index) =>{
                    return user.accountId==e.userId
                 })
                 if(flag==-1){
                  this.userList.push(user);
                 }
               }*/

            })
        })
    }

  }
</script>

<style>

.el-transfer-panel__body {
    height: 346px;
}
.el-transfer-panel__list.is-filterable {
     height: 310px;
    padding-top: 0;
}
.el-transfer-panel__list{
    margin: 0;
    padding: 6px 0;
    list-style: none;
    height: 346px;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}
</style>