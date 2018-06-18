<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-row>
              <el-col :span="20">
                <el-form-item label="企业名称" required prop="enterpriseName">
                 <el-input v-model="addForm.enterpriseName"  >
                  </el-input> 
                </el-form-item>
              </el-col>
              
            </el-row>

            <el-row>
               <el-col :span="12">
                <el-form-item label="地址" required prop="addree">
                  <el-input v-model="addForm.addree"  >
                  </el-input> 
                 </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="电话" required prop="telphone">
                 <el-input v-model="addForm.telphone" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
               <el-col :span="12">
                  <el-form-item label="级别" required prop="level">
                    <el-select v-model="addForm.level" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="顺序"  prop="orderNum">
                 <el-input v-model="addForm.orderNum" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>
           
            <el-form-item label="主营业务"  prop="business">
                <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="请输入内容"
                v-model="addForm.business">
                </el-input> 
            </el-form-item>

             <el-form-item label="企业logo"  prop="enterprisePicId"> 
              
               <el-upload
                class="avatar-uploader"
                :action="uploadAction" 
                :data="otherDate"
                :show-file-list="false"
                :on-success="handleOtherSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="addForm.enterprisePicId" :src="viewAction" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               
              </el-upload>
            </el-form-item>

            <el-form-item label="企业介绍"  prop="enterpriseSummary">
                <UE :defaultMsg="addForm.enterpriseSummary" 
                :config="{initialFrameWidth:830,initialFrameHeight:300}" 
                id="ue1" 
                ref="ue"> 

                </UE>
            </el-form-item>
          

          </el-form>
        </el-col>
      </el-row>
      <div style="text-align:center">
        <el-button  @click="retBack" >取消</el-button>
        <el-button type="primary" @click="addSubmit" >提交</el-button>
      </div>
    

   </div>
</template>

<script>
  import UE from '../ue/ue.vue';
  import {quillEditor } from 'vue-quill-editor'
  import {deleteFileinfo,base} from '../../api/fileinfo';
  import {updateEnterprise,getEnterprise} from '../../api/service';
  const uuidv1 = require('uuid/v1');

  export default {
     components: {
      UE
    },
    
    
    data() {
      return {
        uploadAction:base+"/file/uploadone.do",
        viewAction:'',
        otherDate:
        {
          dirName:'content/enterprise/logo',
          token:sessionStorage.getItem('accessToken'),
          bussinessId:''
        },
        editorOption: {
        
        },

        addFormRules: {
          enterpriseName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ],
          addree:[
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          telphone:[
            { required: true, message: '请输入电话', trigger: 'blur' }
          ],
          level:[
            { required: true, message: '请输入等级', trigger: 'blur' }
          ],
          orderNum:[
            { required: true, message: '请输入顺序', trigger: 'blur' }
          ],
          
        },

        addForm: {
          enterpriseId:'',
          enterpriseName:'',
          enterpriseSummary:'', 
          business:'',
          addree:'',
          telphone:'',
          level:'',
          orderNum:'',
          enterprisePicId:''
        },

        options:
        [
          {
            value: 10,
            label: '普通级别'
          },{
            value: 20,
            label: 'VIP'
          },{
            value: 30,
            label: '超级VIP'
          }
        ],
      }
        
    },

    methods: {

      handleOtherSuccess(res, file) {
        this.viewAction=base+"/file/downloadByBusi.do?bussinessId="+res.retData.bussinessId+"&timestamp="+new Date().getTime();
        },

      beforeAvatarUpload(file) {
            console.log(file.type);
            const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
       },

      
      getStartDate(date){
          this.addForm.publishDate = date;
          console.log(this.trainStartDate);
      },

      getEndDate(date){
           this.addForm.endDate = date;
          console.log(this.trainStartDate);
      },

     
       //新增
      retBack() {
         this.$router.push({ path:'/main/system/enterprise'});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addForm.enterpriseSummary=this.$refs.ue.getUEContent();
              let para = Object.assign({}, this.addForm);
              console.log(para);
              updateEnterprise(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/enterprise'});
              
              });
            });
          }
        });
      },
    },

    mounted() {
      let enterpriseId=this.$route.query.enterpriseId;
      let para = {enterpriseId: enterpriseId};
      getEnterprise(para).then((data) => {
         console.log("============");
         console.log(data.retData);
         this.addForm=data.retData;
        if(data.retData.enterprisePicId==''||data.retData.enterprisePicId==null){
           this.addForm.enterprisePicId=uuidv1();
        }
         this.otherDate.bussinessId=this.addForm.enterprisePicId;
        this.$refs.ue.setUEContent(this.addForm.enterpriseSummary);
        this.viewAction=base+"/file/downloadByBusi.do?bussinessId="+this.addForm.enterprisePicId+"&timestamp="+new Date().getTime();
      })
    }

  }
</script>



<style>
  /*编辑器样式修改*/
  .ql-container{
    min-height: 220px
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
