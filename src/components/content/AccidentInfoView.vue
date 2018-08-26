<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"   ref="addForm" size="small">
            <el-row>
              <el-col :span="18">
                <el-form-item label="事故名称">
                 <el-input v-model="addForm.accidentName" :disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>

              
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="事故地点"  >
                 <el-input v-model="addForm.accidentPlace" :disabled="true" >
                 </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="事故时间" >
                  <el-input v-model="addForm.accidentDate" :disabled="true">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            

            <el-form-item label="事故描述" >
                 <el-input v-model="addForm.accidentDesc" type="textarea"  :rows="8" :disabled="true">
                  </el-input> 
            </el-form-item>

             <el-form-item label="事故图片"  prop="meetPicId">
                <ul class="pic-list">
                    <li class="pic-item" v-for="item in picfileList">
                      <img :src="basePath+item.fileWebPath" class="pic-item-img" />
                      <span class="pic-item-name">{{ item.fileName }}</span>
                       <span class="pic-item-button">
                       <el-button  @click="download(item.fileInfoId)" type="success" round >下载</el-button>
                      </span>
                    </li>
                </ul>
             </el-form-item>

            <el-form-item label="事故视频"  prop="meetPicId">
                <ul class="file-list">
                    <li class="file-item" v-for="item in videofileList">
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
  import {getAccident} from '../../api/service';
 

  export default {
  
    data() {
      return {
       picfileList:[], 
       videofileList:[], 
      addForm: {
         
        },
        basePath:'',
      }
        
    },

    methods: {

       retBack() {
         this.$router.push({ path:'/main/system/accidentInfo',query:{activeName:this.activeName}});
      },

       download(fileInfoId) {
           downloadFileinfo(fileInfoId);
      },

      

    
    },

     

    mounted() {
      this.accidentInfoId=this.$route.query.accidentInfoId;
      this.activeName=this.$route.query.activeName;
      let para = {accidentInfoId: this.accidentInfoId};
      this.basePath=base
      getAccident(para).then((data) => {
        this.addForm=data.retData;

        fileinfos({'bussinessId':data.retData.accidentPicId}).then((data) => {
          this.picfileList=data.retData;
        });

        fileinfos({'bussinessId':data.retData.accidentVideoId}).then((data) => {
          this.videofileList=data.retData;
        });

      })
      
    }

  }
</script>

<style>
 .pic-list{
  margin: 0;
  padding: 0;
  list-style: none;
 }
 .pic-list .pic-item{
    overflow: hidden;
    z-index: 0;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 10px 10px 90px;
    height: 192px;
 }
 .pic-item-img{
    vertical-align: middle;
    display: inline-block;
    width: 170px;
    height: 170px;
    float: left;
    position: relative;
    z-index: 1;
    margin-left: -80px
 }
 .pic-item-name{
    color: #606266;
    display: block;
    margin:60px 20px 20px;
    float: left;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
    -webkit-transition: color .3s;
    transition: color .3s;
    white-space: nowrap;
 }
 .pic-item-button{
    margin:60px 20px 20px;
    float: right;
 }

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
