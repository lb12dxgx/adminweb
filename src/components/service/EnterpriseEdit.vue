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
                  <el-input v-model="addForm.level"  >
                  </el-input> 
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
                <quill-editor v-model="addForm.enterpriseSummary"
                    ref="myQuillEditor"
                    :options="editorOption"
                >
                </quill-editor>
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
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor } from 'vue-quill-editor'
  import {deleteFileinfo,base} from '../../api/fileinfo';
  import {updateEnterprise,getEnterprise} from '../../api/service';
  const uuidv1 = require('uuid/v1');

  export default {
    components: {
      quillEditor
    },
    
    data() {
      return {
        uploadAction:base+"/file/upload.do",
        viewAction:base+"/file/download.do?fileInfoId=",
        otherDate:
        {
          dirName:'content/enterprise/logo',
          token:sessionStorage.getItem('accessToken'),
          bussinessId:uuidv1()
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
        }
      }
        
    },

    methods: {

      handleOtherSuccess(res, file) {
          console.log(res.retData.filePath);
          this.addForm.enterprisePicId=res.retData.fileInfoId;
          this.viewAction=this.viewAction+res.retData.fileInfoId;
          console.log(this.viewAction);
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
        this.addForm=data.retData;
        this.viewAction=base+"/file/download.do?fileInfoId="+data.retData.enterprisePicId;
      })
    }

  }
</script>

<style>

</style>

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
