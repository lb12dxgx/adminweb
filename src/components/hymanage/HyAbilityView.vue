<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"   ref="addForm" size="small">
            <el-row>
              <el-col :span="18">
                <el-form-item label="企业名称">
                 <el-input v-model="addForm.enterpriseName" :disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>

              
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="类型"  >
                 <el-input v-model="addForm.abilityInfoType" :disabled="true" >
                 </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="级别" >
                  <el-input v-model="addForm.abilityInfoLevel" :disabled="true">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="评价类型"  >
                 <el-input v-model="addForm.evaluateType" :disabled="true" >
                 </el-input> 
                </el-form-item>
              </el-col>

             
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人"  >
                 <el-input v-model="addForm.person" :disabled="true" >
                 </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="联系电话" >
                  <el-input v-model="addForm.telphone" :disabled="true">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>
            

            
       

            <el-form-item label="申请材料"  prop="meetPicId">
                <ul class="file-list">
                    <li class="file-item" v-for="item in fileList">
                      <span class="file-item-name">{{ item.fileName }}</span>
                       <span class="file-item-button">
                       <el-button  @click="download(item.fileInfoId)" type="success" round >下载</el-button>
                      </span>
                    </li>
                </ul>
            </el-form-item>
           
          
          

          </el-form>
        </el-col>
      </el-row>
      <div style="text-align:center">
        <el-button  @click="retBack" type="primary" >返回</el-button>
      </div>
    

   </div>
</template>

<script>
  
  import {fileinfos,base,downloadFileinfo} from '../../api/fileinfo';
  import {getAbility} from '../../api/service';
 

  export default {
  
    data() {
      return {
        fileList:[], 
      addForm: {
         
        },
        basePath:'',
        abilityInfoId:'',
        activeName:'',
      }
        
    },

    methods: {

       retBack() {
         this.$router.push({ path:'/main/system/hyability',query:{activeName:this.activeName}});
      },

       download(fileInfoId) {
           downloadFileinfo(fileInfoId);
      },

      

    
    },

     

    mounted() {
      this.abilityInfoId=this.$route.query.abilityInfoId;
      this.activeName=this.$route.query.activeName;
      let para = {abilityInfoId: this.abilityInfoId};
      this.basePath=base
      getAbility(para).then((data) => {
        this.addForm=data.retData;
        fileinfos({'bussinessId':data.retData.abilityDocId}).then((data) => {
          this.fileList=data.retData;
        });

      })
      
    }

  }
</script>

<style>
 
 .file-list{
  margin: 0;
  padding: 0;
  list-style: none;
 }
 .file-list .file-item{
    overflow: hidden;
    z-index: 0;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 10px 10px 20px;
    height: 60px;
 }
 
 .file-item-name{
    color: #606266;
    display: block;
 
    float: left;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
   
    white-space: nowrap;
 }
 .file-item-button{
    margin-right:20px;
    float: right;
 }

</style>

<style>
 

  
</style>
