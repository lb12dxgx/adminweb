<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="专家名称" required prop="teacherName">
                 <el-input v-model="addForm.teacherName"  style="width:700px">
                  </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">
               
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="工作单位" required prop="companyName">
                 <el-input v-model="addForm.companyName"  style="width:200px">
                  </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-form-item label="职称" required prop="teacherTitle">
                 <el-input v-model="addForm.teacherTitle"  style="width:200px">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="证书编码" required prop="teacherCode">
                 <el-input v-model="addForm.teacherCode"  style="width:200px">
                  </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证书有效期" required prop="startDate" style="display:inline-block">
                    <el-col :span="11">
                       <el-date-picker
                      v-model="addForm.startDate"
                      type="date"
                      placeholder="开始日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="getStartDate">
                      </el-date-picker>
                  </el-col>
                   <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                    v-model="addForm.endDate"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="getEndDate">
                    </el-date-picker>
                  </el-col>
                  
                </el-form-item>
                
              </el-col>
            </el-row>

             <el-row>
              <el-col :span="12">
                <el-form-item label="首页显示"  prop="indexShow">
                   <el-select v-model="addForm.indexShow" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            
            </el-row>
           
            <el-form-item label="照片"  prop="teacherPicPath">
               <el-upload
                class="avatar-uploader"
                :action="uploadAction" 
                :data="otherDate"
                :show-file-list="false"
                :on-success="handleOtherSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="addForm.teacherPicPath" :src="viewAction" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="从业经历"  prop="teacherSumary">
               <quill-editor v-model="addForm.teacherSumary"
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
  import { quillEditor } from 'vue-quill-editor'
  import {deleteFileinfo,base} from '../../api/fileinfo';
  import {saveTrainTeacher} from '../../api/train';
  const uuidv1 = require('uuid/v1');

  export default {
    components: {
      quillEditor
    },
    
    data() {
      return {
        uploadAction:base+"/file/uploadone.do",
        viewAction:'',
         otherDate:
        {
          dirName:'content/teacher',
          token:sessionStorage.getItem('accessToken'),
          bussinessId:uuidv1()
        },

        editorOption: {
        },
        addFormRules: {
          teacherName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          teacherCode: [
            { required: true, message: '请输入编码', trigger: 'blur' }
          ],
          startDate:[
            { required: true, message: '请输入开始时间', trigger: 'blur' }
          ],
            endDate:[
            { required: true, message: '请输入结束时间', trigger: 'blur' }
          ]
        },
        addForm: {
          teacherPicPath:'',
          teacherName:'', 
          teacherCode:'',
          teacherTitle:'',
          companyName:'',
          teacherSumary:'',
          startDate:'',
          endDate:''
        },
        options: 
        [
          {
            value: 1,
            label: '显示'
          },{
            value: 0,
            label: '不显示'
          }
        ],
      }
        
    },

    methods: {

      handleOtherSuccess(res, file) {
         
          this.addForm.teacherPicPath=res.retData.bussinessId;
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
          this.addForm.startDate = date;
          console.log(this.trainStartDate);
      },

      getEndDate(date){
          this.addForm.endDate = date;
          console.log(this.trainStartDate);
      },

     
       //新增
      retBack() {
         this.$router.push({ path:'/main/system/trainteacher'});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              saveTrainTeacher(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/trainteacher'});
              
              });
            });
          }
        });
      },
    },

    mounted() {
      
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
